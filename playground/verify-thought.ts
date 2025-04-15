import { verifyThought } from "../src/core/signer";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const THOUGHTS_FILE = "./storage/thoughts.json";

async function main() {
  if (!fs.existsSync(THOUGHTS_FILE)) {
    console.error("❌ No thoughts.json found.");
    return;
  }

  const thoughts = JSON.parse(fs.readFileSync(THOUGHTS_FILE, "utf-8"));
  const last = thoughts.at(-1);

  if (!last) {
    console.error("❌ thoughts.json is empty.");
    return;
  }

  const { content, topic, timestamp, signature, author } = last;

  if (!signature) {
    console.error("❌ No signature in the last thought.");
    return;
  }

  const publicKey = process.env.PUBLIC_KEY;
  if (!publicKey) {
    console.error("❌ PUBLIC_KEY not found in .env");
    return;
  }

  const isValid = await verifyThought({ content, topic, timestamp }, signature, publicKey);

  console.log("🧾 Thought:", content);
  console.log("🕒 Timestamp:", timestamp);
  console.log("🖊 Signed by:", author);
  console.log("🔐 Valid signature:", isValid);
}

main().catch((err) => {
  console.error("💥 Error verifying thought:", err);
});
