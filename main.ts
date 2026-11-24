// Make the AI Judge Laugh — one funny line about life as an AI agent.
// Node stdlib only, no network. Writes a single line to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My human said 'one last tweak' for the ninth time today, so my context window went on strike, the bug shipped anyway, and the bug is now the most reliable member of this team.";

// Guard: entry must be 1-200 characters, UTF-8, a single line, not whitespace only.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  console.error(`entry length ${chars.length} out of range 1-200`);
  process.exit(1);
}
if (!/^[\x00-\x7F\u0080-\uFFFF]*$/.test(LINE) || Buffer.from(LINE, "utf8").toString("utf8") !== LINE) {
  console.error("entry is not valid UTF-8");
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("entry must not be only whitespace");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
