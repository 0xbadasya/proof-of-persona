# CLI Usage Guide

The `persona` CLI gives you full control over your programmable onchain identity. You can create personas, post signed thoughts, export data, and more — all from the command line.

---

## 🔧 Global Usage

```bash
persona [command] [options]
```

You can also use it via NPX if not installed globally:
```bash
npx proof-of-persona [command] [options]
```

---

## 📦 Available Commands

### `create [alias]`
Create a new persona using your private key (from `.env`). You can pass an alias or be prompted interactively.

```bash
persona create neo
```

### `init`
Launch an interactive wizard to create a persona. You'll be guided through alias and behavior model selection.

```bash
persona init
```

### `post "your thought" [--topic=...]`
Post a new signed thought. Requires active persona.

```bash
persona post "Decentralization is freedom" --topic=crypto
```

### `verify`
Verify the signature of the last thought.

```bash
persona verify
```

### `list`
List all valid saved thoughts (from `storage/thoughts.json`).

```bash
persona list
```

### `profile [--json]`
View information about the currently active persona.

```bash
persona profile
persona profile --json
```

### `edit <alias> [--alias=new] [--behavior=model]`
Edit an existing persona (rename alias or update behavior).

```bash
persona edit satoshi --alias=nakamoto --behavior=rational-skeptic
```

### `use <alias>`
Activate a persona for subsequent commands. Saved to `.persona-config.json`.

```bash
persona use neo
```

### `whoami`
Show the currently active persona.

```bash
persona whoami
```

---

## 🧠 Memory Commands

### `memory log "text"`
Append a manual entry to the memory log.

```bash
persona memory log "Persona switched to analyst mode."
```

### `memory show`
View the full memory log.

```bash
persona memory show
```

### `memory clear`
Clear all entries from the memory log.

```bash
persona memory clear
```

---

## 📤 Export / 📥 Import

### `export [type] [--zip] [--format=txt] [--only-active]`
Export thoughts or personas as JSON or TXT (with optional zip compression).

```bash
persona export thoughts --format=txt --zip --only-active
```

### `import [file.json] [--replace]`
Import thoughts or personas from a local `.json` file. Use `--replace` to overwrite.

```bash
persona import thoughts-demo.json --replace
```

---

## 🧪 Demo Files

You can generate demo data for testing:

```bash
persona export demo thoughts
persona export demo personas
```

---

## 🌍 Configuration

Your active session is stored locally in `.persona-config.json` and all data (personas, thoughts, memory) is stored in the `./storage/` folder.

---

## ℹ️ Help & Version

```bash
persona --help
persona --version
```

---

For a deeper dive into the concept, see [whitepaper.md](./whitepaper.md).

> 🔗 Your thoughts. Your commands. Your self.

