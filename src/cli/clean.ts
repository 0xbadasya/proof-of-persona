import fs from "fs";
import path from "path";
import { Thought } from "../core/thoughts";
import * as dotenv from "dotenv";
dotenv.config();

const thoughtsFile = path.resolve("storage", "thoughts.json");

function isValidThought(t: any): t is Thought {
  return (
    typeof t?.content === "string" &&
    typeof t?.topic === "string" &&
    typeof t?.timestamp === "string" &&
    typeof t?.author === "string" &&
    typeof t?.signature === "string"
  );
}

export function cleanCommand() {
  if (!fs.existsSync(thoughtsFile)) {
    console.log("❌ No thoughts.json found.");
    return;
  }

  const raw = fs.readFileSync(thoughtsFile, "utf-8");
  const thoughts = JSON.parse(raw);
  const validThoughts = thoughts.filter(isValidThought);
  const removed = thoughts.length - validThoughts.length;

  fs.writeFileSync(thoughtsFile, JSON.stringify(validThoughts, null, 2));
  console.log(`🧹 Cleaned thoughts.json: removed ${removed} invalid record(s).`);
}