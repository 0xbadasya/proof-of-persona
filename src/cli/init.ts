import { Wallet, utils } from "ethers";
import { createPersona } from "../core/persona";
import { loadPersonas } from "../storage/local";
import readline from "readline";
import * as dotenv from "dotenv";
dotenv.config();

const BEHAVIOR_MODELS = [
  "socratic-punk",
  "cypherpunk-minimalist",
  "zen-daoist",
  "rational-skeptic",
  "dreamer-optimist",
];

export async function initCommand() {
  console.log(`
Welcome to persona init
────────────────────────────────────────────
This wizard will guide you through creating a new persona.

A persona consists of:
  • Alias           → your display name
  • Behavior Model  → your thinking style
  • Public Key      → used to verify your thoughts

All data is stored locally in:
  ./storage/personas.json
────────────────────────────────────────────
`);


  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    console.error("❌ PRIVATE_KEY not set in .env");
    return;
  }

  const wallet = new Wallet(PRIVATE_KEY);

  // 🛡️ Key verification
  const verified = await confirmOwnership(PRIVATE_KEY, wallet.address);
  if (!verified) {
    console.error("❌ Key verification failed. The public and private keys do not match.");
    return;
  } else {
    console.log("🔐 Key ownership verified.\n");
  }

  let finalAlias = "";

  while (true) {
    const input = (await ask("Choose a persona alias (leave empty for random): ")).trim();
    const aliasCandidate = input || generateRandomAlias();
  
    const existing = loadPersonas();
    const taken = existing.some(p => p.alias.toLowerCase() === aliasCandidate.toLowerCase());
  
    if (taken) {
      console.warn(`⚠️ Alias "${aliasCandidate}" is already taken. Please try another one.\n`);
    } else {
      finalAlias = aliasCandidate;
      break;
    }
  }
  

  console.log(`\nAvailable Behavior Models:`);
  BEHAVIOR_MODELS.forEach((model, i) => {
    console.log(`  ${i + 1}. ${model}`);
  });

  const modelIndex = await ask("\nSelect behavior model [1-5]: ");
  const behaviorModel = BEHAVIOR_MODELS[parseInt(modelIndex) - 1] || BEHAVIOR_MODELS[0];

  console.log(`\nCreating persona with:
Alias           : ${finalAlias}
Public Key      : ${wallet.address}
Behavior Model  : ${behaviorModel}
`);

  const confirm = await ask("Proceed? (y/n): ");
  if (confirm.toLowerCase() !== "y") {
    console.log("❌ Cancelled.");
    return;
  }

  while (true) {
    try {
      const persona = createPersona({
        alias: finalAlias,
        publicKey: wallet.address,
        behaviorModel,
      });

      console.log(`\n✅ Persona created: ${persona.alias}`);
      console.log(`🧾 Address: ${wallet.address}`);
      break;
    } catch (err: any) {
      if (err.message.includes("alias")) {
        console.warn(`⚠️ ${err.message}`);
        finalAlias = await ask("Enter a different alias: ");
        finalAlias = finalAlias.trim();
      } else if (err.message.includes("public key")) {
        console.error(`❌ ${err.message}`);
        break;
      } else {
        console.error("❌ Unexpected error:", err.message);
        break;
      }
    }
  }
}

// 🛠 Utility: confirm private key truly owns public key
async function confirmOwnership(privateKey: string, publicKey: string): Promise<boolean> {
  try {
    const wallet = new Wallet(privateKey);
    const message = `create-persona:${Date.now()}`;
    const signature = await wallet.signMessage(message);
    const recovered = utils.verifyMessage(message, signature);

    return recovered.toLowerCase() === publicKey.toLowerCase();
  } catch (err) {
    return false;
  }
}

// 🔁 Prompt helper
function ask(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }
  

// 🧠 Random alias generator
function generateRandomAlias(): string {
  const names = [
    "neo", "arche", "sigil", "aurora", "geist", "dawn", "meta", "kairo", "axiom",
  ];
  const suffix = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return names[Math.floor(Math.random() * names.length)] + suffix;
}
