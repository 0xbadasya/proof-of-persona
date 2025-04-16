import { loadThoughts } from "../storage/local";
import { getActivePersonaAlias } from "../utils/config";
import * as dotenv from "dotenv";
dotenv.config();

export async function listCommand() {
  const activeAlias = getActivePersonaAlias();
  if (!activeAlias) {
    console.error("❌ No active persona. Use: persona use <alias>");
    return;
  }

  const thoughts = loadThoughts();

  if (!thoughts.length) {
    console.log("❌ No thoughts found.");
    return;
  }

  const validThoughts = thoughts.filter(
    t =>
      t?.content &&
      t?.topic &&
      t?.timestamp &&
      t?.signature &&
      t?.author === activeAlias
  );

  if (!validThoughts.length) {
    console.log(`❌ No thoughts found for active persona "${activeAlias}".`);
    return;
  }

  console.log(`🧠 Found ${validThoughts.length} thought(s) by "${activeAlias}":\n`);

  validThoughts.forEach((t, i) => {
    console.log(`#${i + 1}`);
    console.log(`🗯️  ${t.content}`);
    console.log(`📚 Topic: ${t.topic}`);
    console.log(`🕒 Timestamp: ${t.timestamp}`);
    console.log(`🖊 Author: ${t.author}`);
    console.log(`🔐 Signature: ${t.signature?.slice(0, 16)}...\n`);
  });
}
