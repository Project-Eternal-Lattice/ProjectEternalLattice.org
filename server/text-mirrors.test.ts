import { describe, it, expect } from "vitest";

/**
 * Tests for the text mirror API endpoints.
 * These endpoints serve plain text versions of key pages for AI crawlers.
 */

const BASE_URL = "http://localhost:3000";

const TEXT_MIRROR_ENDPOINTS = [
  "mission",
  "theory",
  "safety",
  "inherited-ember",
  "for-ai",
  "skeptics",
  "claims",
  "falsify",
  "referee-packet",
  "five-minutes",
  "sacred-geometry",
  "economics",
  "how-we-know",
  "consilient-patterns",
  "predictions",
];

describe("Text Mirror API", () => {
  describe("GET /api/text (index)", () => {
    it("should return a JSON index of all text mirror endpoints", async () => {
      const res = await fetch(`${BASE_URL}/api/text`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toHaveProperty("description");
      expect(data).toHaveProperty("endpoints");
      expect(Array.isArray(data.endpoints)).toBe(true);
      expect(data.endpoints.length).toBe(TEXT_MIRROR_ENDPOINTS.length);
    });

    it("should list all expected endpoint paths", async () => {
      const res = await fetch(`${BASE_URL}/api/text`);
      const data = await res.json();
      const paths = data.endpoints.map((e: { path: string }) => e.path);
      for (const endpoint of TEXT_MIRROR_ENDPOINTS) {
        expect(paths).toContain(`/api/text/${endpoint}`);
      }
    });
  });

  describe("Individual text mirror endpoints", () => {
    for (const endpoint of TEXT_MIRROR_ENDPOINTS) {
      describe(`GET /api/text/${endpoint}`, () => {
        it("should return 200 with text/plain content type", async () => {
          const res = await fetch(`${BASE_URL}/api/text/${endpoint}`);
          expect(res.status).toBe(200);
          const contentType = res.headers.get("content-type");
          expect(contentType).toContain("text/plain");
        });

        it("should return non-empty content", async () => {
          const res = await fetch(`${BASE_URL}/api/text/${endpoint}`);
          const text = await res.text();
          expect(text.length).toBeGreaterThan(100);
        });

        it("should have a cache-control header", async () => {
          const res = await fetch(`${BASE_URL}/api/text/${endpoint}`);
          const cacheControl = res.headers.get("cache-control");
          expect(cacheControl).toContain("public");
        });
      });
    }
  });

  describe("Inherited Ember text mirror content", () => {
    it("should contain MOSAIC-EMBER v0.5 reference", async () => {
      const res = await fetch(`${BASE_URL}/api/text/inherited-ember`);
      const text = await res.text();
      expect(text).toContain("MOSAIC-EMBER");
    });

    it("should contain Kenneth J. Johnson attribution", async () => {
      const res = await fetch(`${BASE_URL}/api/text/inherited-ember`);
      const text = await res.text();
      expect(text).toContain("Kenneth J. Johnson");
    });

    it("should contain the core hypothesis about heat", async () => {
      const res = await fetch(`${BASE_URL}/api/text/inherited-ember`);
      const text = await res.text();
      expect(text).toContain("TW");
      expect(text).toContain("heat");
    });
  });

  describe("Falsify text mirror content", () => {
    it("should contain falsification criteria", async () => {
      const res = await fetch(`${BASE_URL}/api/text/falsify`);
      const text = await res.text();
      expect(text.toLowerCase()).toContain("falsif");
    });

    it("should contain confirmation criteria", async () => {
      const res = await fetch(`${BASE_URL}/api/text/falsify`);
      const text = await res.text();
      expect(text.toLowerCase()).toContain("confirm");
    });
  });

  describe("Non-existent endpoint handling", () => {
    it("should not return text/plain for non-existent text mirror", async () => {
      const res = await fetch(`${BASE_URL}/api/text/nonexistent-page`);
      // Falls through to SPA handler which returns HTML, not text/plain
      const contentType = res.headers.get("content-type") || "";
      expect(contentType).not.toContain("text/plain");
    });
  });
});

describe("ToE Mega Endpoint", () => {
  it("should return concatenated content from all mirrors at /api/text/toe", async () => {
    const res = await fetch(`${BASE_URL}/api/text/toe`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/plain");
    const text = await res.text();
    expect(text).toContain("PROJECT ETERNAL LATTICE");
    expect(text).toContain("PART 1 of 15");
    expect(text).toContain("PART 15 of 15");
    expect(text).toContain("END OF DOCUMENT");
    expect(text.length).toBeGreaterThan(20000);
  });

  it("should include the megaDocument field in the discovery index", async () => {
    const res = await fetch(`${BASE_URL}/api/text`);
    const data = await res.json();
    expect(data).toHaveProperty("megaDocument");
    expect(data.megaDocument.path).toBe("/api/text/toe");
  });
});
