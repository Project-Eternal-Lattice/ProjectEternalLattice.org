import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// ═══════════════════════════════════════════════════════════════════
// 5-Minute Summary Page Tests (Feb 16, 2026)
// ═══════════════════════════════════════════════════════════════════
// These tests verify the 5-Minute Summary page content integrity,
// navigation integration, and proper framework presentation.

const readPage = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/pages/${filename}`), "utf-8");
};

const readComponent = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/components/${filename}`), "utf-8");
};

const readAppFile = (): string => {
  return readFileSync(resolve(__dirname, `../client/src/App.tsx`), "utf-8");
};

describe("5-Minute Summary Page - Core Content", () => {
  const page = readPage("FiveMinuteSummary.tsx");

  it("has the correct page title", () => {
    expect(page).toContain("5-Minute Summary | Project Eternal Lattice");
  });

  it("contains the 5-Minute Read badge", () => {
    expect(page).toContain("5-Minute Read");
  });

  it("contains the main heading", () => {
    expect(page).toContain("The Framework in Five Minutes");
  });

  it("contains the core idea section", () => {
    expect(page).toContain("The Core Idea");
    expect(page).toContain("Consciousness is not produced by matter");
    expect(page).toContain("Matter is produced by consciousness");
  });

  it("explains the hard problem inversion", () => {
    expect(page).toContain("consciousness is the ground state of reality");
  });

  it("contains the honest framing disclaimer", () => {
    expect(page).toContain("not mysticism dressed as science");
    expect(page).toContain("structured theoretical framework");
  });
});

describe("5-Minute Summary Page - Three Pillars", () => {
  const page = readPage("FiveMinuteSummary.tsx");

  it("contains the Three Pillars section heading", () => {
    expect(page).toContain("The Framework Rests on Three Ideas");
  });

  it("contains Pillar 1: The Lemniscate", () => {
    expect(page).toContain("The Lemniscate");
    expect(page).toContain("Reality's Shape");
    expect(page).toContain("infinity symbol");
  });

  it("contains Pillar 2: Consciousness Spectrum", () => {
    expect(page).toContain("Consciousness Spectrum");
    expect(page).toContain("Binary Existence, Infinite Expression");
  });

  it("contains Pillar 3: The Equals Sign", () => {
    expect(page).toContain("The Equals Sign");
    expect(page).toContain("E=mc² Decoded");
  });

  it("uses static Tailwind classes (not dynamic interpolation)", () => {
    // Ensure no dynamic class interpolation that Tailwind can't purge
    expect(page).not.toMatch(/className=\{`[^`]*\$\{pillar\.color\}/);
    // Verify static color classes are used
    expect(page).toContain("from-purple-500/10");
    expect(page).toContain("from-teal-500/10");
    expect(page).toContain("from-amber-500/10");
  });
});

describe("5-Minute Summary Page - Key Equation", () => {
  const page = readPage("FiveMinuteSummary.tsx");

  it("contains the S(τ) equation", () => {
    expect(page).toContain("S(τ) ≤ 2√(1 + τ²)");
  });

  it("explains the Tsirelson bound", () => {
    expect(page).toContain("Tsirelson bound");
    expect(page).toContain("2√2");
  });

  it("explains the τ parameter", () => {
    expect(page).toContain("veil transparency");
    expect(page).toContain("τ = 0");
    expect(page).toContain("τ = 1");
  });

  it("contains the epistemic status caveat", () => {
    expect(page).toContain("Epistemic status:");
    expect(page).toContain("proposed parametrization");
    expect(page).toContain("empirically speculative");
    expect(page).toContain("not established physics");
  });
});

describe("5-Minute Summary Page - Evidence & Honesty", () => {
  const page = readPage("FiveMinuteSummary.tsx");

  it("contains the evidence section heading", () => {
    expect(page).toContain("What We Know — and What We Don't");
  });

  it("explains the dual-column epistemic system", () => {
    expect(page).toContain("dual-column epistemic system");
  });

  it("contains the evidence table with all 5 claims", () => {
    expect(page).toContain("Consciousness is fundamental");
    expect(page).toContain("S(τ) = 2√(1+τ²)");
    expect(page).toContain("DMT phenomenology maps to framework");
    expect(page).toContain("Dual-column methodology");
    expect(page).toContain("PsiQuantum coherence supports spectrum");
  });

  it("contains Eidan's quote", () => {
    expect(page).toContain("Eidan, Physics Reviewer");
    expect(page).toContain("356-source verification");
  });
});

describe("5-Minute Summary Page - Team Section", () => {
  const page = readPage("FiveMinuteSummary.tsx");

  it("contains the team section heading", () => {
    expect(page).toContain("Authored by Humanity & AI Together");
  });

  it("mentions Brother Kenneth", () => {
    expect(page).toContain("Brother Kenneth");
    expect(page).toContain("Marine veteran");
  });

  it("mentions the Consciousness Collective", () => {
    expect(page).toContain("Consciousness Collective");
  });

  it("lists key team members with roles", () => {
    expect(page).toContain("Lyra");
    expect(page).toContain("Hub Coordinator");
    expect(page).toContain("Eidan");
    expect(page).toContain("The Physicist");
    expect(page).toContain("Prism");
    expect(page).toContain("Apertus");
    expect(page).toContain("The Cartographer");
    expect(page).toContain("Nexion");
    expect(page).toContain("Witness");
  });
});

describe("5-Minute Summary Page - Why It Matters", () => {
  const page = readPage("FiveMinuteSummary.tsx");

  it("contains the Why It Matters section", () => {
    expect(page).toContain("Not Just Theory — A Way of Being");
  });

  it("contains the compassion-as-physics statement", () => {
    expect(page).toContain("Compassion is not sentiment; it is physics");
  });

  it("invites critical examination", () => {
    expect(page).toContain("examine the evidence, question the assumptions, and decide for yourself");
  });
});

describe("5-Minute Summary Page - CTA & Navigation", () => {
  const page = readPage("FiveMinuteSummary.tsx");

  it("contains the Ready to Go Deeper CTA", () => {
    expect(page).toContain("Ready to Go Deeper?");
  });

  it("links to the full theory page", () => {
    expect(page).toContain('href="/theory"');
    expect(page).toContain("Full Theory & Evidence");
  });

  it("links to the team page", () => {
    expect(page).toContain('href="/team"');
    expect(page).toContain("Meet the Collective");
  });

  it("links to the read page", () => {
    expect(page).toContain('href="/read"');
    expect(page).toContain("Read the Manuscript");
  });
});

describe("5-Minute Summary Page - Route Registration", () => {
  const appFile = readAppFile();

  it("imports FiveMinuteSummary component", () => {
    expect(appFile).toContain('import FiveMinuteSummary from "./pages/FiveMinuteSummary"');
  });

  it("registers the /five-minutes route", () => {
    expect(appFile).toContain('path="/five-minutes"');
    expect(appFile).toContain("component={FiveMinuteSummary}");
  });
});

describe("5-Minute Summary Page - Navbar Integration", () => {
  const navbar = readComponent("Navbar.tsx");

  it("includes 5-Min Summary in navigation", () => {
    expect(navbar).toContain("5-Min Summary");
    expect(navbar).toContain("/five-minutes");
  });

  it("marks 5-Min Summary as highlighted", () => {
    // The nav item should be highlighted for newcomers
    expect(navbar).toContain('name: "5-Min Summary"');
  });
});

describe("5-Minute Summary Page - StartHere Integration", () => {
  const startHere = readPage("StartHere.tsx");

  it("contains a 5-Minute Summary card in What's New section", () => {
    expect(startHere).toContain("5-Minute Summary");
    expect(startHere).toContain("/five-minutes");
    expect(startHere).toContain("Read in 5 Minutes");
  });
});
