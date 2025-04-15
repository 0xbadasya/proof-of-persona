#!/usr/bin/env node
import { createCommand } from "./create";
import { postCommand } from "./post";
import { verifyCommand } from "./verify";
import { listCommand } from "./list";
import { cleanCommand } from "./clean";
import { exportCommand } from "./export";
import { memoryCommand } from "./memory";
import { importCommand } from "./import";
import pkg from "../../package.json";

const command = process.argv[2];

// Version flag
if (command === "-v" || command === "--version") {
  console.log(`persona v${pkg.version}`);
  process.exit(0);
}

// Help flag
if (!command || command === "help" || command === "-h" || command === "--help") {
  const sub = process.argv[3];
  if (sub === "memory") {
    console.log(`
📘 Memory commands:

  persona memory log "..."    Add an entry to memory
  persona memory show         Show memory log
  persona memory clear        Clear all memory

`);
    process.exit(0);
  }

  printHelp();
  process.exit(0);
}

// Command dispatcher
switch (command) {
  case "create":
    createCommand();
    break;
  case "post":
    postCommand();
    break;
  case "verify":
    verifyCommand();
    break;
  case "list":
    listCommand();
    break;
  case "clean":
    cleanCommand();
    break;
  case "export":
    exportCommand();
    break;
  case "memory":
    memoryCommand();
    break;
  case "import":
    importCommand()
    break;
  default:
    console.log(`❌ Unknown command: "${command}"`);
    printHelp();
    process.exit(1);
}

// Main help
function printHelp() {
    console.log(`
  🧬 persona CLI – your programmable onchain mind
     by badasya · Badasya Software
  
  📦 Available commands:
    🔹 create              Create a new persona
    🗯  post "text"         Post a thought (supports --topic=...)
    ✅ verify              Verify last thought
    📜 list                List all thoughts
    🧹 clean               Remove invalid thoughts
    📤 export [type]       Export thoughts/personas (use --zip, --format=txt)
    📥 import [file]       Import thoughts/personas (.json, --replace optional)
    🧠 memory              Manage memory log (see: help memory)
  
  🌐 Global options:
    -v, --version         Show CLI version
    -h, --help            Show this help
  
  🧪 Examples:
    persona create
    persona post "Crypto = freedom" --topic=cypherpunk
    persona verify
    persona export thoughts --zip
    persona import thoughts-demo.json --replace
  
  ✨ Learn more: https://github.com/0xbadasya/proof-of-persona
  `);
}
