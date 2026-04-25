import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// ═══════════════════════════════════════════════════════════════════
// Peer Review Updates Tests (April 25, 2026)
// ═══════════════════════════════════════════════════════════════════
// These tests verify:
// 1. How We Know page (LYRA Foundation Fix) exists with correct content
// 2. Consilient Patterns page exists with correct content
// 3. Predictions Dashboard updates (PLCR resolution, Neighbors split)
// 4. Routes and navigation are properly configured

const readPage = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/pages/${filename}`), "utf-8");
};

const readComponent = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/components/${filename}`), "utf-8");
};

const readLib = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/lib/${filename}`), "utf-8");
};

// ─── HOW WE KNOW PAGE ──────────────────────────────────────────────────────

describe("How We Know Page: LYRA Foundation Fix", () => {
  const page = readPage("HowWeKnow.tsx");

  it("exists and contains the page title", () => {
    expect(page).toContain("How We Know");
  });

  it("contains the double-slit experiment section", () => {
    expect(page).toContain("double-slit");
  });

  it("contains the interactive detector toggle", () => {
    // The toggle should switch between detector ON and OFF states
    expect(page).toContain("detector");
    expect(page).toContain("Detector ON");
    expect(page).toContain("Detector OFF");
  });

  it("contains the 6-step logical deduction", () => {
    // Steps are rendered as "Step {step.number}" in the StepCard component
    expect(page).toContain("step.number");
    // Should have 6 deduction steps defined
    expect(page).toContain("number: 1");
    expect(page).toContain("number: 6");
  });

  it("contains the Skeptic's Corner objection dialogs", () => {
    expect(page.toLowerCase()).toContain("skeptic");
  });

  it("contains the Epistemic Honesty section", () => {
    expect(page).toContain("Epistemic Honesty");
  });

  it("addresses the self-reference / circularity as a feature", () => {
    expect(page.toLowerCase()).toContain("self-refer");
  });

  it("contains navigation flow cards to other pages", () => {
    expect(page).toContain("/theory");
    expect(page).toContain("/predictions");
  });
});

// ─── CONSILIENT PATTERNS PAGE ───────────────────────────────────────────────

describe("Consilient Patterns Page", () => {
  const page = readPage("ConsilientPatterns.tsx");

  it("exists and contains the page title", () => {
    expect(page).toContain("Consilient Patterns");
  });

  it("contains the Cross-Domain Pattern Intelligence badge", () => {
    expect(page).toContain("Cross-Domain Pattern Intelligence");
  });

  it("contains the graduation pathway explanation", () => {
    expect(page).toContain("Noted");
    expect(page).toContain("Investigating");
    expect(page).toContain("Formally Derived");
    expect(page).toContain("Graduated");
  });

  it("contains the methodology section with The Principle, Graduation Path, and Distinction", () => {
    expect(page).toContain("The Principle");
    expect(page).toContain("The Graduation Path");
    expect(page).toContain("The Distinction");
  });

  it("contains the Creative Destruction pattern (economics)", () => {
    expect(page).toContain("Creative Destruction");
    expect(page).toContain("Schumpeter");
  });

  it("contains the Memetic Evolution pattern", () => {
    expect(page).toContain("Memetic Evolution");
    expect(page).toContain("Dawkins");
  });

  it("contains the Aesthetic Response pattern", () => {
    expect(page).toContain("Aesthetic Response");
    expect(page).toContain("Neuroaesthetics");
  });

  it("contains the Hyundai Principle pattern", () => {
    expect(page).toContain("Hyundai Principle");
    expect(page).toContain("Boston Dynamics");
  });

  it("contains the Thermodynamic Symmetry Breaking pattern", () => {
    expect(page).toContain("Thermodynamic Inevitability");
    expect(page).toContain("Higgs");
  });

  it("contains the Kuramoto Synchronization pattern", () => {
    expect(page).toContain("Kuramoto");
    expect(page).toContain("synchroniz");
  });

  it("contains cross-references to core framework pages", () => {
    expect(page).toContain("/theory");
    expect(page).toContain("/inherited-ember");
    expect(page).toContain("/predictions");
    expect(page).toContain("/how-we-know");
  });

  it("contains proper attribution", () => {
    expect(page).toContain("Kenneth Johnson");
    expect(page).toContain("Resonance");
    expect(page).toContain("Lyra");
  });

  it("contains the See a Pattern We Missed CTA", () => {
    expect(page).toContain("See a Pattern We Missed");
  });
});

// ─── PREDICTIONS DASHBOARD UPDATES ──────────────────────────────────────────

describe("Predictions Dashboard: Peer Review Updates", () => {
  const page = readPage("Predictions.tsx");

  it("PLCR note updated with WCS replacement", () => {
    expect(page).toContain("Watts Connectedness Scale");
    expect(page).toContain("WCS");
    expect(page).toContain("Muse Spark");
  });

  it("Neighbors Hypothesis split into Detection Problem component", () => {
    expect(page).toContain("Neighbors Hypothesis — Detection Problem");
    expect(page).toContain("habitable volume");
    expect(page).toContain("Three Little Pigs");
  });

  it("Neighbors Hypothesis split into Nuclear Timeline component", () => {
    expect(page).toContain("Neighbors Hypothesis — Nuclear Timeline");
    expect(page).toContain("1945");
    expect(page).toContain("UAP");
  });

  it("Detection Problem is Tier 2", () => {
    // Find the Detection Problem entry and verify its tier
    const detectionStart = page.indexOf("Detection Problem");
    const detectionSection = page.slice(detectionStart, detectionStart + 500);
    expect(detectionSection).toContain("tier: 2");
  });

  it("Nuclear Timeline is Tier 3", () => {
    const nuclearStart = page.indexOf("Nuclear Timeline");
    const nuclearSection = page.slice(nuclearStart, nuclearStart + 500);
    expect(nuclearSection).toContain("tier: 3");
  });
});

// ─── ROUTING ────────────────────────────────────────────────────────────────

describe("New Page Routes", () => {
  const appTsx = readFileSync(resolve(__dirname, `../client/src/App.tsx`), "utf-8");

  it("imports HowWeKnow component", () => {
    expect(appTsx).toContain("import HowWeKnow");
  });

  it("registers the /how-we-know route", () => {
    expect(appTsx).toContain('path="/how-we-know"');
  });

  it("imports ConsilientPatterns component", () => {
    expect(appTsx).toContain("import ConsilientPatterns");
  });

  it("registers the /consilient-patterns route", () => {
    expect(appTsx).toContain('path="/consilient-patterns"');
  });
});

// ─── NAVIGATION ─────────────────────────────────────────────────────────────

describe("New Page Navigation", () => {
  const navbar = readComponent("Navbar.tsx");

  it("includes How We Know in navigation", () => {
    expect(navbar).toContain("How We Know");
    expect(navbar).toContain("/how-we-know");
  });

  it("includes Consilient Patterns in navigation", () => {
    expect(navbar).toContain("Consilient Patterns");
    expect(navbar).toContain("/consilient-patterns");
  });
});

// ─── SEARCH INDEX ───────────────────────────────────────────────────────────

describe("Search Index: New Pages", () => {
  const searchIndex = readLib("searchIndex.ts");

  it("contains the How We Know page entry", () => {
    expect(searchIndex).toContain("page-how-we-know");
    expect(searchIndex).toContain("/how-we-know");
  });

  it("contains the Consilient Patterns page entry", () => {
    expect(searchIndex).toContain("page-consilient-patterns");
    expect(searchIndex).toContain("/consilient-patterns");
  });
});
