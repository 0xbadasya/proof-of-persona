import { Wallet } from "ethers";
import { createPersona } from "../core/persona";
import * as dotenv from "dotenv";
dotenv.config();

export function createCommand() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY!;
  const wallet = new Wallet(PRIVATE_KEY);

  const persona = createPersona({
    alias: "NeoFromCLI",
    publicKey: wallet.address,
    behaviorModel: "socratic-punk",
  });

  console.log("✅ Created persona:", persona.alias);
  console.log("🧾 Address:", wallet.address);
}
