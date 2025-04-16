# Installation Guide

## Overview
**persona** is a privacy-first programmable identity layer built for CLI. It allows you to create pseudonymous identities (personas), sign and post thoughts locally, and interact with decentralized systems without user accounts.

This document will guide you through the full installation and setup process to start using `persona` CLI.

---

## 1. Install via NPM

### Global Installation (recommended):
```bash
npm install -g proof-of-persona
```

This exposes the `persona` command globally in your terminal.

---

## 2. Setup Environment Variables

In your working directory, create a `.env` file with the following:

```
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
PUBLIC_KEY=0xYOUR_PUBLIC_KEY
```

> 💡 You can generate a private key using `ethers.Wallet.createRandom()` in Node.js.
> In production, make sure your keys are **secured and never exposed**.

---

## 3. Run Your First Command

To verify everything is working, try:
```bash
persona --version
```

Then create your first persona:
```bash
persona create myalias
```

---

## 4. Optional Local Mode
All data is stored in the current folder under `./storage/`, including:
- `personas.json`: list of your created identities
- `thoughts.json`: all signed posts
- `memory.log`: local memory log

You can move your working directory, or isolate separate sessions per folder.

---

## 5. Updating
To get the latest version:
```bash
npm update -g proof-of-persona
```

Or uninstall:
```bash
npm uninstall -g proof-of-persona
```

---

## 6. Full CLI Help
Run this to see all available commands:
```bash
persona --help
```

---

## 7. Advanced Notes
- You can switch active personas via `persona use <alias>`
- Default behavior model is `socratic-punk`, editable via `persona edit`
- All CLI commands support `--help` for subcommand-specific options

---

## You're Ready
You're now fully set up to:
- Create & switch personas
- Post signed thoughts
- Track your pseudonymous onchain mind

---

For a deeper dive into the concept, see [whitepaper.md](./whitepaper.md).

> 🧬 Your thoughts are your identity.
> Welcome to programmable self-expression.
