import { Wallet, utils } from "ethers";

interface ThoughtPayload {
  content: string;
  topic: string;
  timestamp: string;
}

/**
 * Підписує думку приватним ключем
 */
export async function signThought(thought: ThoughtPayload, privateKey: string): Promise<string> {
  try {
    const wallet = new Wallet(privateKey);

    const message = JSON.stringify({
      content: thought.content,
      topic: thought.topic,
      timestamp: thought.timestamp,
    });

    return await wallet.signMessage(message);
  } catch (error) {
    console.error("🛑 signThought failed. Invalid private key:", privateKey);
    throw error;
  }
}

/**
 * Перевіряє підпис думки
 */
export async function verifyThought(
  thought: ThoughtPayload,
  signature: string,
  expectedAddress: string
): Promise<boolean> {
  const message = JSON.stringify({
    content: thought.content,
    topic: thought.topic,
    timestamp: thought.timestamp,
  });

  const recoveredAddress = utils.verifyMessage(message, signature);

  return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
}
