import fs from "fs";
import path from "path";
import { getActivePersonaAlias } from "../utils/config";
import { loadPersonas } from "../storage/local";

const thoughtsPath = path.resolve("storage", "thoughts.json");

export function profileCommand() {
  const asJson = process.argv.includes("--json");

  const activeAlias = getActivePersonaAlias();
  if (!activeAlias) {
    console.error("❌ No active persona. Use: persona use <alias>");
    return;
  }

  const personas = loadPersonas();
  const persona = personas.find(p => p.alias === activeAlias);

  if (!persona) {
    console.error(`❌ Active persona "${activeAlias}" not found.`);
    return;
  }

  const { alias, publicKey, behaviorModel, createdAt } = persona;

  const thoughts = fs.existsSync(thoughtsPath)
    ? JSON.parse(fs.readFileSync(thoughtsPath, "utf-8"))
    : [];

  const authoredThoughts = thoughts.filter((t: any) => t.author === alias);
  const lastThought = authoredThoughts.at(-1);

  const createdAtHuman = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          alias,
          publicKey,
          behaviorModel,
          createdAt,
          createdAtHuman,
          totalThoughts: authoredThoughts.length,
          lastThought: lastThought?.content || null,
        },
        null,
        2
      )
    );
    return;
  }

  console.log(`\nPersona Profile
────────────────────────────────────────────
Alias           : ${alias}
Public Key      : ${publicKey}
Behavior Model  : ${behaviorModel}
Created At      : ${createdAtHuman || "unknown"}

Total Thoughts  : ${authoredThoughts.length}
Last Thought    : ${lastThought ? truncate(lastThought.content) : "—"}
────────────────────────────────────────────
`);
}

function truncate(text: string, max = 60): string {
  return text.length > max ? text.slice(0, max - 3) + "..." : text;
}
