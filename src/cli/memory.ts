import { memoryLog, memoryShow, memoryClear } from "../core/memory";

export function memoryCommand() {
  const action = process.argv[3];
  const content = process.argv.slice(4).join(" ");

  switch (action) {
    case "log":
      memoryLog(content);
      console.log("🧠 Logged:", content);
      break;
    case "show":
      const logs = memoryShow();
      if (logs.length === 0) {
        console.log("🕳 Memory is empty.");
      } else {
        console.log("📜 Memory Log:");
        logs.forEach((line, i) => {
          console.log(`#${i + 1} ${line}`);
        });
      }
      break;
    case "clear":
      memoryClear();
      console.log("🗑 Memory cleared.");
      break;
    default:
      console.log(`
  📘 Memory commands:

    persona memory log "your thought"   # Add entry to memory
    persona memory show                 # Show all memory log
    persona memory clear                # Clear memory log
      `);
  }
}
