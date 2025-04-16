import fs from "fs";
import path from "path";

const CONFIG_FILE = path.resolve(".persona-config.json");

export function getActivePersonaAlias(): string | null {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  const json = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
  return json.activeAlias || null;
}
