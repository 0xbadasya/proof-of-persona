#!/usr/bin/env node
import { createCommand } from "./create";
import { postCommand } from "./post";
import { verifyCommand } from "./verify";
import { listCommand } from "./list";
import { cleanCommand } from "./clean";
import { exportCommand } from "./export";
import { memoryCommand } from "./memory";
import { importCommand } from "./import";
import { initCommand } from "./init";
import { profileCommand } from "./profile";
import { editCommand } from "./edit";
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
  case "init":
    initCommand()
    break;
  case "profile":
    profileCommand();
    break;
  case "edit":
    editCommand();
    break
  default:
    console.log(`❌ Unknown command: "${command}"`);
    printHelp();
    process.exit(1);
}

// Main help
function printHelp() {
    console.log(`
    persona CLI – your programmable onchain mind
    by badasya · Badasya Software
  
    📦 Available commands:
      create [alias]           Create a new persona (you can pass alias)
      init                     Interactive persona creation wizard
      edit <alias> [options]   Edit existing persona (change alias or behavior)
      post "text"              Post a thought (supports --topic=...)
      verify                   Verify the last posted thought
      list                     List all posted thoughts
      profile                  Show current persona profile and stats (supports --json)
      clean                    Remove invalid or incomplete thoughts
      export [type]            Export thoughts or personas (--zip, --format=txt)
      import [file]            Import thoughts or personas (.json, --replace optional)
      memory                   Manage memory log (use: help memory for more)
  
    ⚙️ Edit options:
      --alias=newAlias         Set a new alias for the persona
      --behavior=model         Change behavior model (e.g. "socratic-punk")
  
    🌐 Global options:
      -v, --version            Show CLI version
      -h, --help               Show this help message
  
    🧪 Examples:
      persona create satoshi
      persona init
      persona edit satoshi --alias=cypher --behavior=zen-daoist
      persona post "Crypto = freedom" --topic=cypherpunk
      persona verify
      persona profile
      persona profile --json
      persona export thoughts --zip
      persona import thoughts.json --replace
  
    📁 Project:
      https://github.com/0xbadasya/proof-of-persona
    `);
  }
  