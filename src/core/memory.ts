import fs from "fs";
import path from "path";

const logPath = path.resolve("storage", "memory.log");

export function memoryLog(text: string): void {
  fs.appendFileSync(logPath, `\n[${new Date().toISOString()}] ${text}`);
}

export function memoryShow(): string[] {
  if (!fs.existsSync(logPath)) return [];
  return fs.readFileSync(logPath, "utf-8").split("\n").filter(Boolean);
}

export function memoryClear(): void {
  if (fs.existsSync(logPath)) {
    fs.unlinkSync(logPath);
  }
}
