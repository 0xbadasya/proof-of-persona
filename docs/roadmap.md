# Architecture Overview

This document describes the internal architecture of the **persona** project and how its components are structured to enable programmable, privacy-respecting onchain identities.

---

## Directory Structure

```text
persona/
├── src/
│   ├── cli/               # CLI commands implementation
│   ├── core/              # Core logic (persona, thoughts, signer, style, memory)
│   ├── storage/           # Local file storage logic
│   └── utils/             # Helpers like config loader and validation
├── dist/                  # Compiled output by tsup
├── .persona-config.json   # Active persona config (created after `use` command)
├── .env                   # Private key and secrets
├── export/                # Folder for exported data (via CLI)
├── storage/               # Persistent data (thoughts.json, personas.json, memory.log)
├── README.md              # Project overview
├── package.json           # NPM metadata and dependencies
└── tsconfig.json / tsup.config.ts
```

---

## Component Breakdown

### Core Modules

#### 1. `core/persona.ts`
Handles creation and validation of new personas. Generates UUIDs, stores metadata like alias, behavior model, and creation timestamp.

#### 2. `core/thoughts.ts`
Creates new thoughts signed by a persona. Connects with the signer module to ensure authenticity.

#### 3. `core/signer.ts`
Handles cryptographic signing and verification of thoughts using Ethers.js. Ensures only the correct private key can post as a given public identity.

#### 4. `core/style.ts`
Placeholder for future LLM/AI-powered analysis of a persona's writing style and tone.

#### 5. `core/memory.ts`
Logs significant actions to a local `memory.log` file. Useful for debugging or training future AI personas.

### CLI System (`cli/`)
Each file corresponds to a CLI command:

- `create.ts` – Create new persona
- `init.ts` – Wizard-based interactive setup
- `post.ts` – Post a new signed thought
- `verify.ts` – Verify last thought
- `list.ts` – List all valid thoughts
- `profile.ts` – Show current persona profile
- `export.ts` – Export thoughts/personas with optional zip formatting
- `import.ts` – Import JSON data into storage
- `clean.ts` – Remove invalid thoughts
- `memory.ts` – Log/view/clear memory
- `use.ts` – Set active persona
- `whoami.ts` – Show current active identity

### Storage Layer (`storage/`)
- `local.ts` handles read/write operations for:
  - `personas.json`
  - `thoughts.json`
  - `memory.log`
- Supports both full replace and merging on import

### Config System (`utils/config.ts`)
Manages the `.persona-config.json` file, which stores the currently selected active persona.

### Validation (`utils/validate.ts`)
Ensures imported or created data meets minimum structure and integrity requirements.

---

## Signature Verification Process

Every thought is signed using the private key set in `.env`. This signature is stored alongside the content. Verification is done with the associated public key using Ethers' `verifyMessage` function.

```ts
message = `${content}|${topic}|${timestamp}`
signature = wallet.signMessage(message)
recovered = verifyMessage(message, signature)
```

If `recovered === persona.publicKey`, the thought is valid.

---

## Design Philosophy

- **Local-first**: All data is stored on your machine, never sent to a server.
- **Portable**: Output is readable, exportable, and importable.
- **Composable**: The CLI can be integrated into bigger systems (e.g., DAO bots, AI agents).
- **Transparent**: Thoughts are cryptographically verifiable.
- **Future-ready**: Designed to support AI, LLMs, and decentralized reputation protocols.

---

## Planned Extensions

- IPFS/Arweave sync module
- ZK-proof support
- Multi-wallet and DID support
- AI-inferred style graph
- Persona reputation scoring

---

For a deeper dive into the concept, see [whitepaper.md](./whitepaper.md).

> 🚀 Code is just the beginning. Persona is the protocol of thought.

