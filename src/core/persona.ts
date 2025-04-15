import { v4 as uuidv4 } from "uuid";
import { writePersonaToStorage, loadPersonas } from "../storage/local";

export interface Persona {
  id: string;
  alias: string;
  publicKey: string;
  behaviorModel: string;
  createdAt: string;
}

/**
 * Creates a new persona, checking for unique alias (case-insensitive).
 * Throws error if duplicate alias exists.
 */

export function createPersona({
  alias,
  publicKey,
  behaviorModel,
}: Omit<Persona, "id" | "createdAt">): Persona {
  const existing = loadPersonas();

  const duplicateAlias = existing.find(p => p.alias === alias);
  if (duplicateAlias) {
    throw new Error(`❌ Persona with alias "${alias}" already exists.`);
  }

  const duplicateKey = existing.find(p => p.publicKey.toLowerCase() === publicKey.toLowerCase());
  if (duplicateKey) {
    throw new Error(`❌ Persona with public key "${publicKey}" already exists.`);
  }

  const persona: Persona = {
    id: uuidv4(),
    alias,
    publicKey,
    behaviorModel,
    createdAt: new Date().toISOString(),
  };

  writePersonaToStorage(persona);
  return persona;
}
