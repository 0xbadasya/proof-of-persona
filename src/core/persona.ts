import { writePersonaToStorage } from "../storage/local";

export interface Persona {
  alias: string;
  publicKey: string;
  behaviorModel: string;
  createdAt: string;
}

export function createPersona({
  alias,
  publicKey,
  behaviorModel,
}: Omit<Persona, "createdAt">): Persona {
  const persona: Persona = {
    alias,
    publicKey,
    behaviorModel,
    createdAt: new Date().toISOString(),
  };
  writePersonaToStorage(persona);
  return persona;
}