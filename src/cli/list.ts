import { loadThoughts } from "../storage/local";
import * as dotenv from "dotenv";
dotenv.config();

export async function listCommand() {
  const thoughts = loadThoughts();

  if (!thoughts.length) {
    console.log("❌ No thoughts found.");
    return;
  }

  console.log(`🧠 Found ${thoughts.length} thought(s):\n`);

  const validThoughts = thoughts.filter(t =>
    t?.content && t?.topic && t?.timestamp && t?.signature && t?.author
  );
  
  if (!validThoughts.length) {
    console.log("❌ No valid thoughts found.");
    return;
  }
  
  validThoughts.forEach((t, i) => {
    console.log(`#${i + 1}`);
    console.log(`🗯️  ${t.content}`);
    console.log(`📚 Topic: ${t.topic}`);
    console.log(`🕒 Timestamp: ${t.timestamp}`);
    console.log(`🖊 Author: ${t.author}`);
    console.log(`🔐 Signature: ${t.signature?.slice(0, 16)}...\n`);
  });
}