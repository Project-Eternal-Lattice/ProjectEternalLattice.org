import { describe, it, expect } from "vitest";
import {
  isAICrawler,
  renderMirrorMarkdown,
  buildCrawlerPage,
  extractDescription,
  renderForCrawler,
  type TextMirrors,
} from "./_core/aiCrawlerPrerender";

/**
 * Unit tests for the AI crawler prerender fallback. These run without a server
 * (pure functions), so they are deterministic and CI-safe.
 */

describe("isAICrawler", () => {
  it("matches AI/LLM crawlers", () => {
    for (const ua of [
      "Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)",
      "Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://anthropic.com)",
      "Mozilla/5.0 (compatible; PerplexityBot/1.0)",
      "Mozilla/5.0 AppleWebKit (compatible; ChatGPT-User/1.0)",
      "anthropic-ai",
      "CCBot/2.0 (https://commoncrawl.org/faq/)",
    ]) {
      expect(isAICrawler(ua)).toBe(true);
    }
  });

  it("never matches classic search engines or social unfurlers", () => {
    for (const ua of [
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
      "Mozilla/5.0 (compatible; Google-InspectionTool/1.0)",
      "Twitterbot/1.0",
      "facebookexternalhit/1.1",
      "Mozilla/5.0 (compatible; DuckDuckBot/1.1)",
    ]) {
      expect(isAICrawler(ua)).toBe(false);
    }
  });

  it("does not match regular browsers or empty UA", () => {
    expect(
      isAICrawler(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15"
      )
    ).toBe(false);
    expect(isAICrawler(undefined)).toBe(false);
    expect(isAICrawler("")).toBe(false);
  });
});

describe("renderMirrorMarkdown", () => {
  it("renders headings, lists, bold, code, blockquote and autolinks", () => {
    const md = [
      "> v16.8.1 Edition",
      "# Title",
      "## Section",
      "Some **bold** and `code` here.",
      "- item one",
      "- item two",
      "1. first",
      "2. second",
      "Visit https://projecteternallattice.org for more.",
    ].join("\n");
    const html = renderMirrorMarkdown(md);
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<h2>Section</h2>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<code>code</code>");
    expect(html).toContain("<blockquote>v16.8.1 Edition</blockquote>");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>item one</li>");
    expect(html).toContain("<ol>");
    expect(html).toContain("<li>first</li>");
    expect(html).toContain('<a href="https://projecteternallattice.org">');
  });

  it("escapes HTML to prevent injection", () => {
    const html = renderMirrorMarkdown("A <script>alert(1)</script> & b");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&amp;");
  });

  it("keeps trailing sentence punctuation outside the autolinked URL", () => {
    const html = renderMirrorMarkdown(
      "See https://projecteternallattice.org/theory, and more."
    );
    expect(html).toContain(
      '<a href="https://projecteternallattice.org/theory">https://projecteternallattice.org/theory</a>,'
    );
    expect(html).not.toContain('/theory,"');
  });
});

describe("extractDescription", () => {
  it("skips the version blockquote and headings to find the first paragraph", () => {
    const md = "> v16.8.1\n\n# Heading\n\nThis is the real first paragraph.";
    expect(extractDescription(md)).toBe("This is the real first paragraph.");
  });

  it("skips '*' and numbered list items, not only '-' bullets", () => {
    const md =
      "> v16.8.1\n\n# Heading\n\n* a star bullet\n\n1. a numbered step\n\nThe real paragraph.";
    expect(extractDescription(md)).toBe("The real paragraph.");
  });
});

describe("buildCrawlerPage", () => {
  it("includes title, description, canonical, JSON-LD and crisis line", () => {
    const page = buildCrawlerPage({
      title: "Test Title",
      description: "Test description.",
      canonicalPath: "/theory",
      bodyHtml: "<p>body</p>",
    });
    expect(page).toContain("<title>Test Title</title>");
    expect(page).toContain(
      '<meta name="description" content="Test description.">'
    );
    expect(page).toContain(
      '<link rel="canonical" href="https://projecteternallattice.org/theory">'
    );
    expect(page).toContain('<script type="application/ld+json">');
    expect(page).toContain("988");
  });

  it("includes an og:image and a Twitter summary_large_image card", () => {
    const page = buildCrawlerPage({
      title: "Test Title",
      description: "Test description.",
      canonicalPath: "/theory",
      bodyHtml: "<p>body</p>",
    });
    expect(page).toContain('<meta property="og:image"');
    expect(page).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(page).toContain('<meta name="twitter:title" content="Test Title">');
    expect(page).toContain('<meta name="twitter:image"');
  });
});

describe("renderForCrawler", () => {
  const mirrors: TextMirrors = {
    theory: {
      title: "Theory — PEL",
      content: "> v16.8.1\n\n# Theory\n\nThe theory body.",
    },
    mission: {
      title: "Mission — PEL",
      content: "> v16.8.1\n\n# Mission\n\nThe mission body.",
    },
  };

  it("returns the mirror page for a matching slug", () => {
    const html = renderForCrawler("/theory", mirrors);
    expect(html).not.toBeNull();
    expect(html).toContain("<title>Theory — PEL</title>");
    expect(html).toContain("The theory body.");
  });

  it("returns the index hub page for unknown content routes", () => {
    const html = renderForCrawler("/faq", mirrors);
    expect(html).not.toBeNull();
    expect(html).toContain("Project Eternal Lattice");
    expect(html).toContain("Core pages");
    // links to every mirror
    expect(html).toContain("https://projecteternallattice.org/theory");
    expect(html).toContain("https://projecteternallattice.org/mission");
  });

  it("returns the index hub page for the home route", () => {
    const html = renderForCrawler("/", mirrors);
    expect(html).not.toBeNull();
    expect(html).toContain("Theory of Everything");
  });

  it("does not intercept /api, static files, or /nexus", () => {
    expect(renderForCrawler("/api/text/theory", mirrors)).toBeNull();
    expect(renderForCrawler("/toe-full.html", mirrors)).toBeNull();
    expect(renderForCrawler("/nexus", mirrors)).toBeNull();
  });

  it("neutralizes a malicious request path (reflected XSS guard)", () => {
    // Path with a quote that tries to break out of the canonical href attribute
    // and inject a tag. Note: ".html" would fall through, so use a no-dot path.
    const html = renderForCrawler('/"><script>alert(1)<\/script>', mirrors)!;
    expect(html).not.toBeNull();
    expect(html).not.toContain("<script>alert(1)");
    expect(html).not.toContain('"><script>');
    // The dangerous characters never reach the canonical attribute unescaped.
    expect(html).toContain(
      '<link rel="canonical" href="https://projecteternallattice.org/scriptalert1/script">'
    );
  });
});
