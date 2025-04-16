import fs from "fs";
import path from "path";
import { isValidThought, isValidPersona } from "../utils/validate";
import { verifyThought } from "../core/signer";

const storageDir = path.resolve("storage");
const thoughtsFile = path.join(storageDir, "thoughts.json");
const personasFile = path.join(storageDir, "personas.json");

export async function importCommand() {
  const filePath = process.argv[3];
  const replace = process.argv.includes("--replace");

  if (!filePath) {
    console.error("❌ Please provide a path to the file. Example: persona import thoughts.json");
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  if (!filePath.endsWith(".json")) {
    console.error("❌ Only .json files are supported.");
    return;
  }

  let parsed: any;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    console.error("❌ Failed to parse JSON. Make sure the file is valid.");
    return;
  }

  if (!Array.isArray(parsed)) {
    console.error("❌ JSON file must contain an array.");
    return;
  }

  const name = path.basename(filePath).toLowerCase();
  const isThought = name.includes("thought");
  const isPersona = name.includes("persona");

  if (!isThought && !isPersona) {
    console.error("❌ File name must include either 'thought' or 'persona' to detect data type.");
    return;
  }

  let valid = parsed.filter((entry: any) =>
    isThought ? isValidThought(entry) : isValidPersona(entry)
  );

  if (isThought && valid.length) {
    // Optional signature verification for thoughts
    const personas = fs.existsSync(personasFile)
      ? JSON.parse(fs.readFileSync(personasFile, "utf-8"))
      : [];

    valid = await Promise.all(
      valid.map(async (thought: any) => {
        const author = thought.author;
        const found = personas.find((p: any) => p.alias === author);
        if (!found) return null;

        const isVerified = await verifyThought(
          {
            content: thought.content,
            topic: thought.topic,
            timestamp: thought.timestamp,
          },
          thought.signature,
          found.publicKey
        );

        return isVerified ? thought : null;
      })
    ).then((results) => results.filter(Boolean));
  }

  if (!valid.length) {
    console.error("❌ No valid entries found in file.");
    return;
  }

  const targetFile = isThought ? thoughtsFile : personasFile;
  const label = isThought ? "thoughts" : "personas";

  if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);

  if (replace) {
    fs.writeFileSync(targetFile, JSON.stringify(valid, null, 2));
    console.log(`✅ Imported ${valid.length} ${label} (replaced existing data).`);
  } else {
    const existing = fs.existsSync(targetFile)
      ? JSON.parse(fs.readFileSync(targetFile, "utf-8"))
      : [];

    const merged = [...existing, ...valid];
    fs.writeFileSync(targetFile, JSON.stringify(merged, null, 2));
    console.log(`✅ Imported ${valid.length} ${label} (merged with existing).`);
  }
}