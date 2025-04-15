import { signThought } from "./signer";
import { writeThoughtToStorage } from "../storage/local";

export interface Thought {
  content: string;
  topic: string;
  timestamp: string;
  author: string; 
  signature?: string;
}

export async function postThought(
  persona: { alias: string; publicKey: string },
  {
    content,
    topic,
  }: { content: string; topic: string }
): Promise<Thought> {
  const thought: Thought = {
    content,
    topic,
    timestamp: new Date().toISOString(),
    author: persona.alias,
  };

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error("❌ PRIVATE_KEY not set");

  const signature = await signThought(thought, privateKey);
  thought.signature = signature;

  writeThoughtToStorage(thought);
  return thought;
}
