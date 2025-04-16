import fs from "fs";
import path from "path";

const storageDir = path.resolve("storage");
const personasFile = path.join(storageDir, "personas.json");
const thoughtsFile = path.join(storageDir, "thoughts.json");

function ensureFile(filePath: string) {
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir);
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
}

export function writePersonaToStorage(persona: any): void {
    ensureFile(personasFile);
  
    const personas = JSON.parse(fs.readFileSync(personasFile, "utf-8"));
  
    const exists = personas.some(
      (p: any) => p.id === persona.id || (p.alias === persona.alias && p.publicKey === persona.publicKey)
    );
  
    if (exists) {
      console.warn(`⚠️ Persona with alias "${persona.alias}" already exists. Skipping.`);
      return;
    }
  
    personas.push(persona);
    fs.writeFileSync(personasFile, JSON.stringify(personas, null, 2));
  }
  

export function writeThoughtToStorage(thought: any): void {
  ensureFile(thoughtsFile);
  const thoughts = JSON.parse(fs.readFileSync(thoughtsFile, "utf-8"));
  thoughts.push(thought);
  fs.writeFileSync(thoughtsFile, JSON.stringify(thoughts, null, 2));
}

export function loadThoughts(): any[] {
    ensureFile(thoughtsFile);
    return JSON.parse(fs.readFileSync(thoughtsFile, "utf-8"));
}
  
export function loadPersonas(): any[] {
    ensureFile(personasFile);
    return JSON.parse(fs.readFileSync(personasFile, "utf-8"));
  }

// badasya