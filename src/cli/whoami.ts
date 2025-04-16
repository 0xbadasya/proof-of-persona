import { getActivePersonaAlias } from "../utils/config";
import { loadPersonas } from "../storage/local";

export function whoamiCommand() {
  const alias = getActivePersonaAlias();

  if (!alias) {
    console.log("❌ No active persona set. Use 'persona use <alias>' to activate one.");
    return;
  }

  const personas = loadPersonas();
  const persona = personas.find(p => p.alias === alias);

  if (!persona) {
    console.log(`❌ No persona found for alias: ${alias}`);
    return;
  }

  const { publicKey, behaviorModel, createdAt } = persona;

  console.log(`
Current Active Persona
────────────────────────────────────────────
Alias           : ${alias}
Public Key      : ${publicKey}
Behavior Model  : ${behaviorModel}
Created At      : ${new Date(createdAt).toLocaleString()}
`);
}
