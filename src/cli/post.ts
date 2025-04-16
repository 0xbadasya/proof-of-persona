import { Wallet } from "ethers";
import { postThought } from "../core/thoughts";
import { loadPersonas } from "../storage/local";
import { getActivePersonaAlias } from "../utils/config";
import * as dotenv from "dotenv";
dotenv.config();

export async function postCommand() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    console.error("❌ PRIVATE_KEY not set in .env");
    return;
  }

  const wallet = new Wallet(PRIVATE_KEY);
  const args = process.argv.slice(3);
  const content = args[0];

  if (!content) {
    console.error("❌ Please provide content: persona post \"your text\" --topic=...");
    return;
  }

  const topic = args.find((arg) => arg.startsWith("--topic="))?.split("=")[1] || "general";

  const activeAlias = getActivePersonaAlias();
  if (!activeAlias) {
    console.error("❌ No active persona. Use: persona use <alias>");
    return;
  }

  const personas = loadPersonas();
  const persona = personas.find(p => p.alias === activeAlias);

  if (!persona) {
    console.error(`❌ Persona "${activeAlias}" not found in local storage.`);
    return;
  }

  const thought = await postThought(persona, { content, topic });
  console.log("🧠 Posted:", thought.content);
  console.log("🖊 Signature:", thought.signature?.slice(0, 16), "...");
}
