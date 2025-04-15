import { createPersona, postThought } from "../src";

// For future AI integration
// import { analyzeStyle } from "../src/core/style";
// import { memoryLog } from "../src/core/memory";

// 📌 This must be an ETH address (not a private key!)
const PUBLIC_ADDRESS = process.env.PUBLIC_KEY || "0xYourWalletAddress";

async function main() {
  const persona = createPersona({
    alias: "badasyaDev",
    publicKey: PUBLIC_ADDRESS, // address only
    behaviorModel: "socratic-punk",
  });

  console.log("✅ Persona created:", persona.alias);

  const thought = await postThought(persona, {
    content: "Крипта — це нова мова свободи.",
    topic: "philosophy",
  });

  console.log("🧠 Thought posted:", thought.content);

  // For future LLM integration:
  // const style = await analyzeStyle(thought.content);
  // memoryLog(`Style vector for "${thought.content}" → ${style.slice(0, 64)}...`);
  // console.log("🔍 Style analyzed. Logged to memory.");
}

main().catch((err) => {
  console.error("❌ Error:", err);
});
