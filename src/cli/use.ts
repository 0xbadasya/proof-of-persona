import fs from "fs";
import path from "path";
import { loadPersonas } from "../storage/local";

const configPath = path.resolve(".persona-config.json");

export function useCommand() {
  const alias = process.argv[3];
  if (!alias) {
    console.error("❌ Please provide a persona alias. Example: persona use satoshi");
    return;
  }

  const personas = loadPersonas();
  const persona = personas.find(p => p.alias === alias);

  if (!persona) {
    console.error(`❌ No persona found with alias "${alias}"`);
    return;
  }

  fs.writeFileSync(configPath, JSON.stringify({ activePersona: alias }, null, 2));
  console.log(`✅ Now using persona: ${alias}`);
}
