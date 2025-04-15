import { Wallet, utils } from "ethers";
import { createPersona } from "../core/persona";
import * as dotenv from "dotenv";
import readline from "readline";
dotenv.config();

async function confirmOwnership(privateKey: string, publicKey: string): Promise<boolean> {
  try {
    const wallet = new Wallet(privateKey);
    const message = `create-persona:${Date.now()}`;
    const signature = await wallet.signMessage(message);
    const recovered = utils.verifyMessage(message, signature);
    return recovered.toLowerCase() === publicKey.toLowerCase();
  } catch (err) {
    console.error("❌ Key verification failed:", err);
    return false;
  }
}

export async function createCommand() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY!;
  const wallet = new Wallet(PRIVATE_KEY);

  const isVerified = await confirmOwnership(PRIVATE_KEY, wallet.address);
  if (!isVerified) {
    console.error("❌ Ownership verification failed. Aborting.");
    return;
  }

  let alias = process.argv[3];

  while (!alias) {
    alias = await ask("Enter alias for new persona: ");
  }

  alias = alias.trim();

  while (true) {
    try {
      const persona = createPersona({
        alias,
        publicKey: wallet.address,
        behaviorModel: "socratic-punk",
      });

      console.log("✅ Created persona:", persona.alias);
      console.log("🧾 Address:", wallet.address);
      break;
    } catch (err: any) {
      if (err.message.includes("alias")) {
        console.warn(`⚠️ ${err.message}`);
        alias = await ask("Enter a different alias: ");
        alias = alias.trim();
      } else if (err.message.includes("public key")) {
        console.error(err.message);
        break;
      } else {
        console.error("❌ Unexpected error:", err.message);
        break;
      }
    }
  }
}

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    })
  );
}
