import fs from "fs";
import { verifyThought } from "../core/signer";
import { getActivePersonaAlias } from "../utils/config";
import { loadPersonas } from "../storage/local";

export async function verifyCommand() {
  const thoughtsFile = "./storage/thoughts.json";
  if (!fs.existsSync(thoughtsFile)) {
    console.error("❌ No thoughts found.");
    return;
  }

  const thoughts = JSON.parse(fs.readFileSync(thoughtsFile, "utf-8"));
  const last = thoughts.at(-1);
  if (!last) {
    console.error("❌ No thoughts to verify.");
    return;
  }

  const activeAlias = getActivePersonaAlias();
  if (!activeAlias) {
    console.error("❌ No active persona. Use: persona use <alias>");
    return;
  }

  const personas = loadPersonas();
  const persona = personas.find(p => p.alias === activeAlias);

  if (!persona) {
    console.error(`❌ Active persona "${activeAlias}" not found.`);
    return;
  }

  const isValid = await verifyThought(
    {
      content: last.content,
      topic: last.topic,
      timestamp: last.timestamp,
    },
    last.signature,
    persona.publicKey
  );

  console.log("🧾 Thought:", last.content);
  console.log("🔐 Signature valid:", isValid);
}
