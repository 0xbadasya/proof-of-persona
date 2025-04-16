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
import { useCommand } from "./use";
import pkg from "../../package.json";
import { whoamiCommand } from "./whoami";

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
  case "use":
    useCommand();
    break;
  case "whoami":
    whoamiCommand();
    break;
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
  
  ────────────────────────────────────────────────────────────
  📘 General Commands:
    create [alias]            Create a new persona (optionally pass alias)
    init                      Interactive persona creation wizard
    edit <alias> [options]    Edit an existing persona (alias or behavior)
    use <alias>               Set the active persona
    whoami                    Show the currently active persona
  
  🧠 Thought Commands:
    post "text"               Post a thought (use --topic=...)
    verify                    Verify the last posted thought
    list                      List all posted thoughts
    profile                   Show active persona profile (use --json)
    clean                     Remove invalid or incomplete thoughts
  
  🧳 Import / Export:
    export [type]             Export thoughts or personas
                              Options:
                                --zip             Compress export to .zip
                                --format=txt      Export as .txt (default is JSON)
                                --only-active     Export only active persona's data
    import [file]             Import from a .json file
                              Options:
                                --replace         Overwrite existing entries
  
  🧠 Memory Management:
    memory log "..."          Append a memory entry
    memory show               Show memory log
    memory clear              Clear memory log
  
  🌍 Global Options:
    -v, --version             Show CLI version
    -h, --help                Show this help message
  
  📁 Config:
    Config is stored in .persona-config.json and updated via:
      persona use <alias>
  
  ────────────────────────────────────────────────────────────
  📌 Examples:
    persona create satoshi
    persona edit satoshi --alias=cypher --behavior=zen-daoist
    persona post "Crypto is freedom" --topic=cypherpunk
    persona verify
    persona profile --json
    persona export thoughts --zip --only-active
    persona import backup.json --replace
    persona memory log "Posted my first thought"
  
  🔗 Project: https://github.com/0xbadasya/proof-of-persona
    `);
  }
  