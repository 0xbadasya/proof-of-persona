import { verifyThought } from "../core/signer";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

export async function verifyCommand() {
  const thoughtsFile = "./storage/thoughts.json";
  if (!fs.existsSync(thoughtsFile)) return console.error("❌ No thoughts found");

  const thoughts = JSON.parse(fs.readFileSync(thoughtsFile, "utf-8"));
  const last = thoughts.at(-1);
  if (!last) return console.error("❌ No thoughts to verify");

  const isValid = await verifyThought(
    {
      content: last.content,
      topic: last.topic,
      timestamp: last.timestamp,
    },
    last.signature,
    process.env.PUBLIC_KEY!
  );

  console.log("🧾 Thought:", last.content);
  console.log("🔐 Signature valid:", isValid);
}
