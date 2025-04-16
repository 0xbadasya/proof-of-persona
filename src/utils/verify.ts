import { Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

let verifyMessage: (message: string, signature: string) => string;

// Auto-detect ethers version (5 vs 6)
try {
  const { utils } = require("ethers");
  verifyMessage = utils.verifyMessage;
} catch {
  // fallback for ethers@6
  const { verifyMessage: verifyV6 } = require("ethers");
  verifyMessage = verifyV6;
}

/**
 * Confirms that the private key provided corresponds to the expected public address
 */
export async function confirmOwnership(privateKey: string, publicKey: string): Promise<boolean> {
  try {
    const wallet = new Wallet(privateKey);
    const message = `create-persona:${Date.now()}`;
    const signature = await wallet.signMessage(message);
    const recovered = verifyMessage(message, signature);
    return recovered.toLowerCase() === publicKey.toLowerCase();
  } catch (err) {
    console.error("❌ Key verification failed:", err);
    return false;
  }
}
