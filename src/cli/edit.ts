import fs from "fs";
import path from "path";
import readline from "readline";
import { Persona } from "../core/persona";

const personasPath = path.resolve("storage", "personas.json");
const BEHAVIOR_MODELS = [
  "socratic-punk",
  "cypherpunk-minimalist",
  "zen-daoist",
  "rational-skeptic",
  "dreamer-optimist",
];

export async function editCommand() {
  const oldAlias = process.argv[3];
  const newAliasFlag = process.argv.find(arg => arg.startsWith("--alias="));
  const newBehaviorFlag = process.argv.find(arg => arg.startsWith("--behavior="));

  if (!oldAlias) {
    console.error("❌ Please specify an existing alias to edit.");
    return;
  }

  if (!fs.existsSync(personasPath)) {
    console.error("❌ No personas found.");
    return;
  }

  const personas: Persona[] = JSON.parse(fs.readFileSync(personasPath, "utf-8"));
  const index = personas.findIndex(p => p.alias === oldAlias);

  if (index === -1) {
    console.error(`❌ Persona '${oldAlias}' not found.`);
    return;
  }

  const newAlias = newAliasFlag?.split("=")[1] || await ask("Enter new alias (leave blank to keep): ");
  const newBehavior = newBehaviorFlag?.split("=")[1] || await selectBehavior(personas[index].behaviorModel);

  if (newAlias && newAlias !== oldAlias && personas.some(p => p.alias === newAlias)) {
    console.error(`❌ Alias '${newAlias}' is already taken.`);
    return;
  }

  personas[index].alias = newAlias || personas[index].alias;
  personas[index].behaviorModel = newBehavior || personas[index].behaviorModel;

  fs.writeFileSync(personasPath, JSON.stringify(personas, null, 2));
  console.log(`✅ Updated persona '${oldAlias}' → '${personas[index].alias}'`);
}

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    })
  );
  
}

async function selectBehavior(current: string): Promise<string> {
  console.log("\nAvailable behavior models:");
  BEHAVIOR_MODELS.forEach((model, i) => {
    const marker = model === current ? "(current)" : "";
    console.log(`  ${i + 1}. ${model} ${marker}`);
  });
  const selected = await ask("Select new behavior model [1–5] (leave blank to keep): ");
  const index = parseInt(selected);
  if (!selected.trim()) return current;
  if (!isNaN(index) && BEHAVIOR_MODELS[index - 1]) {
    return BEHAVIOR_MODELS[index - 1];
  }
  return current;
}
