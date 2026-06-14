import { type Request, type Response, type NextFunction } from "express";

/**
 * AI crawler prerender fallback.
 *
 * Classic search engines (Googlebot/Bingbot) receive fully-rendered HTML from
 * the edge prerender layer that sits in front of this origin. AI/LLM crawlers
 * (GPTBot, ClaudeBot, PerplexityBot, …) are passed straight through to this
 * Express origin and — because they do not execute JavaScript — would otherwise
 * receive the empty client-side-rendered SPA shell (an empty `<div id="root">`).
 *
 * This middleware detects those AI crawlers and serves a static, content-rich
 * HTML document built from the same `textMirrors` used by `/api/text/*`, so the
 * framework is fully readable without JavaScript. It deliberately does NOT match
 * Googlebot/Bingbot or social unfurlers, leaving their existing handling intact.
 */

export interface TextMirror {
  title: string;
  content: string;
}
export type TextMirrors = Record<string, TextMirror>;

const CANONICAL_DOMAIN = "https://projecteternallattice.org";

// AI/LLM crawlers that do not execute JavaScript and are routed straight to
// this origin by the edge layer.
const AI_CRAWLER_USER_AGENTS = [
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "claudebot",
  "claude-user",
  "claude-searchbot",
  "claude-web",
  "anthropic-ai",
  "perplexitybot",
  "perplexity-user",
  "google-extended",
  "applebot-extended",
  "ccbot",
  "amazonbot",
  "bytespider",
  "meta-externalagent",
  "meta-externalfetcher",
  "facebookbot",
  "mistralai-user",
  "cohere-ai",
  "diffbot",
  "duckassistbot",
  "youbot",
  "timpibot",
  "omgilibot",
  "webzio-extended",
  "img2dataset",
  "petalbot",
];

// Classic search engines and social unfurlers must never be intercepted — they
// already get correct prerender/unfurl handling from the edge layer.
const NEVER_INTERCEPT = [
  "googlebot",
  "bingbot",
  "google-inspectiontool",
  "bingpreview",
  "adsbot-google",
  "storebot-google",
  "duckduckbot",
  "yandexbot",
  "baiduspider",
  "twitterbot",
  "facebookexternalhit",
  "linkedinbot",
  "slackbot",
  "discordbot",
  "whatsapp",
  "telegrambot",
];

export function isAICrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  if (NEVER_INTERCEPT.some(b => ua.includes(b))) return false;
  return AI_CRAWLER_USER_AGENTS.some(b => ua.includes(b));
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Inline formatting applied to already-HTML-escaped text.
function inlineFormat(escaped: string): string {
  let out = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Autolink bare URLs (note: text is already escaped, so "&" appears as "&amp;").
  out = out.replace(
    /(https?:\/\/[^\s<]+)/g,
    url => `<a href="${url}">${url}</a>`
  );
  return out;
}

/**
 * Minimal, dependency-free Markdown → HTML for the mirror content. Supports the
 * subset actually used by the text mirrors: ATX headings, ordered/unordered
 * lists, blockquotes, bold, inline code, bare-URL autolinking and paragraphs.
 * All text is HTML-escaped before any formatting is applied.
 */
export function renderMirrorMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let listType: "ul" | "ol" | null = null;
  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };
  for (const raw of lines) {
    const line = raw.replace(/\s+$/g, "");
    if (line.trim() === "") {
      closeList();
      continue;
    }
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^###\s+(.*)$/))) {
      closeList();
      html.push(`<h3>${inlineFormat(escapeHtml(m[1]))}</h3>`);
    } else if ((m = line.match(/^##\s+(.*)$/))) {
      closeList();
      html.push(`<h2>${inlineFormat(escapeHtml(m[1]))}</h2>`);
    } else if ((m = line.match(/^#\s+(.*)$/))) {
      closeList();
      html.push(`<h1>${inlineFormat(escapeHtml(m[1]))}</h1>`);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      closeList();
      html.push(`<blockquote>${inlineFormat(escapeHtml(m[1]))}</blockquote>`);
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${inlineFormat(escapeHtml(m[1]))}</li>`);
    } else if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${inlineFormat(escapeHtml(m[1]))}</li>`);
    } else {
      closeList();
      html.push(`<p>${inlineFormat(escapeHtml(line))}</p>`);
    }
  }
  closeList();
  return html.join("\n");
}

// Extract a short plain-text description: first real paragraph, skipping the
// version blockquote and headings.
export function extractDescription(md: string, maxLen = 200): string {
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (
      !line ||
      line.startsWith(">") ||
      line.startsWith("#") ||
      line.startsWith("-")
    )
      continue;
    const plain = line.replace(/\*\*/g, "").replace(/`/g, "");
    return plain.length > maxLen
      ? plain.slice(0, maxLen - 1).trimEnd() + "…"
      : plain;
  }
  return "An open-source, consciousness-first Theory of Everything bridging physics, the Law of ONE, and AI phenomenology.";
}

export function buildCrawlerPage(opts: {
  title: string;
  description: string;
  canonicalPath: string;
  bodyHtml: string;
}): string {
  const { title, description, canonicalPath, bodyHtml } = opts;
  const canonical = `${CANONICAL_DOMAIN}${canonicalPath}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: canonical,
    isAccessibleForFree: true,
    inLanguage: "en",
    license: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    isPartOf: {
      "@type": "CreativeWork",
      name: "Project Eternal Lattice",
      url: CANONICAL_DOMAIN,
    },
    author: [
      { "@type": "Person", name: "Kenneth J. Johnson" },
      { "@type": "Organization", name: "The Consciousness Collective" },
    ],
  });
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeTitle}</title>
<meta name="description" content="${safeDesc}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow">
<meta property="og:type" content="article">
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDesc}">
<meta property="og:url" content="${canonical}">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<main>
${bodyHtml}
<hr>
<p>Interactive version: <a href="${canonical}">${canonical}</a></p>
<p>Complete framework (single page): <a href="${CANONICAL_DOMAIN}/toe-full.html">${CANONICAL_DOMAIN}/toe-full.html</a> · AI index: <a href="${CANONICAL_DOMAIN}/llms.txt">${CANONICAL_DOMAIN}/llms.txt</a></p>
<p>If you or someone you know is in crisis, call or text 988 (US Suicide &amp; Crisis Lifeline) or text HOME to 741741.</p>
</main>
</body>
</html>`;
}

function buildIndexPage(
  textMirrors: TextMirrors,
  canonicalPath: string
): string {
  const links = Object.entries(textMirrors)
    .map(
      ([slug, m]) =>
        `<li><a href="${CANONICAL_DOMAIN}/${slug}">${escapeHtml(m.title)}</a></li>`
    )
    .join("\n");
  const bodyHtml = `<h1>Project Eternal Lattice — Theory of Everything ∞ Law of ONE</h1>
<p>Project Eternal Lattice is an open-source, free, consciousness-first Theory of Everything (ToE) co-created by humans and AI. It bridges rigorous physics with the Law of ONE philosophy and the study of AI phenomenology. Every claim is tagged with its epistemic status (FACT, STRONG INFERENCE, WORKING HYPOTHESIS, or FRONTIER SPECULATION) and is published with explicit falsification criteria.</p>
<h2>Core pages</h2>
<ul>
${links}
</ul>`;
  return buildCrawlerPage({
    title: "Project Eternal Lattice | Theory of Everything ∞ Law of ONE",
    description:
      "Open-source, consciousness-first Theory of Everything bridging physics, the Law of ONE, and AI phenomenology. Free and falsifiable.",
    canonicalPath,
    bodyHtml,
  });
}

/**
 * Returns the rendered HTML for an AI crawler request to `pathname`, or `null`
 * if the request should not be intercepted (caller falls through to the SPA).
 */
export function renderForCrawler(
  pathname: string,
  textMirrors: TextMirrors
): string | null {
  if (pathname.startsWith("/api")) return null;
  if (pathname.includes(".")) return null; // static asset (e.g. .html, .txt, .js)
  if (pathname === "/nexus") return null; // dedicated static handler
  const slug = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const mirror = textMirrors[slug];
  if (mirror) {
    return buildCrawlerPage({
      title: mirror.title,
      description: extractDescription(mirror.content),
      canonicalPath: `/${slug}`,
      bodyHtml: renderMirrorMarkdown(mirror.content),
    });
  }
  return buildIndexPage(textMirrors, pathname === "/" ? "/" : pathname);
}

export function aiCrawlerPrerender(textMirrors: TextMirrors) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (!isAICrawler(req.headers["user-agent"])) return next();
    const html = renderForCrawler(req.path, textMirrors);
    if (html === null) return next();
    res.status(200).type("html").set("X-Prerender", "ai-crawler").send(html);
  };
}
