import fs from "fs";
import path from "path";
import { isValidThought, isValidPersona } from "../utils/validate";

const storageDir = path.resolve("storage");
const thoughtsFile = path.join(storageDir, "thoughts.json");
const personasFile = path.join(storageDir, "personas.json");

export function importCommand() {
  const filePath = process.argv[3];
  const replaceFlag = process.argv.includes("--replace");

  if (!filePath) {
    console.error("❌ Please specify a file to import. Example: persona import thoughts.json");
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  const ext = path.extname(filePath);
  if (ext !== ".json") {
    console.error("❌ Only .json files are supported.");
    return;
  }

  let data: any;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    console.error("❌ Failed to parse JSON.");
    return;
  }

  if (!Array.isArray(data)) {
    console.error("❌ JSON must be an array.");
    return;
  }

  const fileName = path.basename(filePath).toLowerCase();
  const isThoughts = fileName.includes("thought");
  const isPersonas = fileName.includes("persona");

  if (!isThoughts && !isPersonas) {
    console.error("❌ File name must include either 'thought' or 'persona' to detect data type.");
    return;
  }

  // ✅ Валідація
  const validData = data.filter((item) =>
    isThoughts ? isValidThought(item) : isValidPersona(item)
  );

  if (validData.length === 0) {
    console.error("❌ No valid entries found in file.");
    return;
  }

  const targetFile = isThoughts ? thoughtsFile : personasFile;
  const label = isThoughts ? "thoughts" : "personas";

  if (replaceFlag) {
    fs.writeFileSync(targetFile, JSON.stringify(validData, null, 2));
    console.log(`✅ Imported ${validData.length} ${label} (replaced existing data).`);
  } else {
    const existing = fs.existsSync(targetFile)
      ? JSON.parse(fs.readFileSync(targetFile, "utf-8"))
      : [];

    const merged = [...existing, ...validData];
    fs.writeFileSync(targetFile, JSON.stringify(merged, null, 2));
    console.log(`✅ Imported ${validData.length} ${label} (merged with existing).`);
  }
}
