import { describe, expect, it } from "vitest";

/**
 * Geometry of Consciousness Depth — AG.10 Joint Paper
 *
 * Tests for search index registration, route presence, and data integrity
 * of the Geometry page content.
 */

// ─── Search Index Tests ──────────────────────────────────────────────

describe("Geometry page search index", () => {
  it("is registered in the search index with correct path", async () => {
    const { searchContent } = await import(
      "../client/src/lib/searchIndex"
    );
    const results = searchContent("geometry consciousness depth AG.10");
    const geometryResult = results.find((r) => r.path === "/geometry");
    expect(geometryResult).toBeDefined();
    expect(geometryResult!.title).toContain("Geometry");
    expect(geometryResult!.path).toBe("/geometry");
  });

  it("search index entry contains key terms", async () => {
    const { searchContent } = await import(
      "../client/src/lib/searchIndex"
    );
    const results = searchContent("Tsirelson Penrose Kaluza-Klein");
    const geometryResult = results.find((r) => r.path === "/geometry");
    expect(geometryResult).toBeDefined();
  });

  it("search index entry has correct type", async () => {
    const { searchContent } = await import(
      "../client/src/lib/searchIndex"
    );
    const results = searchContent("geometry consciousness depth");
    const geometryResult = results.find((r) => r.path === "/geometry");
    expect(geometryResult).toBeDefined();
    expect(geometryResult!.type).toBe("page");
  });
});

// ─── Data Integrity Tests ────────────────────────────────────────────

describe("Geometry page data integrity", () => {
  it("has exactly 8 predictions", async () => {
    // We test the data by importing the module and checking the rendered output
    // Since predictions are defined inline, we verify via the page content structure
    // This is a structural test — the page must contain all 8 predictions
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    // Count prediction entries in the data array
    const predictionMatches = content.match(/id:\s*\d+,\s*\n\s*title:/g);
    expect(predictionMatches).toHaveLength(8);
  });

  it("has all prediction statuses as supported or testable", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    const statusMatches = content.match(/status:\s*"(supported|testable)"/g);
    expect(statusMatches).toBeDefined();
    expect(statusMatches!.length).toBe(8);
  });

  it("has exactly 9 open questions", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    // Count open question entries in the openQuestions array
    // The regex also matches the type definition, so we expect 9 data + 1 type = 10
    const questionDataMatches = content.match(
      /id:\s*\d+,\s*\n\s*question:/g
    );
    expect(questionDataMatches).toHaveLength(9);
  });

  it("has revision history entries", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    const revisionMatches = content.match(/version:\s*"AG\./g);
    expect(revisionMatches).toBeDefined();
    expect(revisionMatches!.length).toBeGreaterThanOrEqual(6);
  });

  it("contains the foundational equation S(τ) = 2√(1+τ²)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    expect(content).toContain("S(τ) = 2√(1 + τ²)");
  });

  it("contains the Ricci scalar formula", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    expect(content).toContain("R = −24 / (S² − 4)²");
  });

  it("documents the consciousness monopole as RETIRED", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    expect(content).toContain("RETIRED");
    expect(content).toContain("consciousness monopole");
  });

  it("contains Kenneth's testimony quotes", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve("client/src/pages/Geometry.tsx"),
      "utf-8"
    );

    expect(content).toContain(
      "You either take enough to cross over or you don't."
    );
    expect(content).toContain(
      "I absolutely know exactly who I am and am thinking clearly."
    );
    expect(content).toContain(
      "There is a fear of death and not actually coming back."
    );
    expect(content).toContain("Billions of corners moving in patterns.");
  });
});

// ─── Route Registration Test ─────────────────────────────────────────

describe("Geometry route registration", () => {
  it("route is registered in App.tsx", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const appContent = fs.readFileSync(
      path.resolve("client/src/App.tsx"),
      "utf-8"
    );

    expect(appContent).toContain('path="/geometry"');
    expect(appContent).toContain("Geometry");
  });

  it("navigation includes Geometry of Depth link", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const navContent = fs.readFileSync(
      path.resolve("client/src/components/Navbar.tsx"),
      "utf-8"
    );

    expect(navContent).toContain("Geometry of Depth");
    expect(navContent).toContain("/geometry");
  });
});
