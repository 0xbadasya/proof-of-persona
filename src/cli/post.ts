import { Wallet } from "ethers";
import { postThought } from "../core/thoughts";
import * as dotenv from "dotenv";
dotenv.config();
export async function postCommand() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY!;
  const wallet = new Wallet(PRIVATE_KEY);
  const args = process.argv.slice(3);
  const content = args[0];
  const topic = args.find((arg) => arg.startsWith("--topic="))?.split("=")[1] || "general";

  const persona = {
    alias: "NeoFromCLI",
    publicKey: wallet.address,
  };

  const thought = await postThought(persona, { content, topic });
  console.log("🧠 Posted:", thought.content);
  console.log("🖊 Signature:", thought.signature?.slice(0, 16), "...");
}
