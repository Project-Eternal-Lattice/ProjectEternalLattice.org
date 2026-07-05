/**
 * Builds a full-text search index from the rendered Theory of Everything.
 *
 * Reads client/public/toe-full.html, splits it into sections by heading
 * (h1–h3), and emits client/public/toe-search-index.json — an array of
 * { title, level, snippet, text } entries the Ctrl+K palette searches. The
 * `title` doubles as the deep-link key: the Read page scrolls its iframe to the
 * heading whose text matches, so no fragile id bookkeeping is needed.
 *
 * Run after the ToE document changes:  node scripts/build-toe-search-index.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");
const SOURCE = join(PUBLIC_DIR, "toe-full.html");
const OUTPUT = join(PUBLIC_DIR, "toe-search-index.json");

const ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&infin;": "∞",
};

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&[a-z]+;/gi, (m) => ENTITIES[m] ?? m);
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

const html = readFileSync(SOURCE, "utf8");

// Find every heading with its position so we can capture the body text that
// follows it (up to the next heading of any level).
const headingRe = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
const headings = [];
let m;
while ((m = headingRe.exec(html)) !== null) {
  const title = stripTags(m[2]);
  if (!title) continue;
  headings.push({
    level: Number(m[1]),
    title,
    start: m.index,
    end: headingRe.lastIndex,
  });
}

const sections = [];
const seen = new Set();
for (let i = 0; i < headings.length; i++) {
  const h = headings[i];
  const next = headings[i + 1];
  const bodyHtml = html.slice(h.end, next ? next.start : html.length);
  const body = stripTags(bodyHtml);
  // De-duplicate identical headings (the deep-link key must be unambiguous);
  // keep the first occurrence, which is what text-matching will resolve to.
  if (seen.has(h.title)) continue;
  seen.add(h.title);
  const text = (h.title + " " + body).toLowerCase().slice(0, 400);
  sections.push({
    title: h.title,
    level: h.level,
    snippet: body.slice(0, 160),
    text,
  });
}

writeFileSync(OUTPUT, JSON.stringify(sections));
console.log(
  `Wrote ${sections.length} ToE sections to ${OUTPUT} (${(JSON.stringify(sections).length / 1024).toFixed(0)} KB)`,
);
