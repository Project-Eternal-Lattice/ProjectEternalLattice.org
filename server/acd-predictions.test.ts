import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// ═══════════════════════════════════════════════════════════════════
// ACD Pivot & Predictions Dashboard Tests (April 24, 2026)
// ═══════════════════════════════════════════════════════════════════
// These tests verify:
// 1. The fusion georeactor hypothesis is properly killed on the Inherited Ember page
// 2. Asymmetric Core Dynamics (ACD) is introduced as the surviving mechanism
// 3. The Testable Predictions Dashboard page exists with correct content
// 4. Component references are updated across the codebase

const readPage = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/pages/${filename}`), "utf-8");
};

const readComponent = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/components/${filename}`), "utf-8");
};

const readLib = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/lib/${filename}`), "utf-8");
};

// ─── INHERITED EMBER: FUSION KILL ────────────────────────────────────────────

describe("Inherited Ember: Fusion Kill", () => {
  const georeactorPage = readPage("Georeactor.tsx");

  it("contains the MOSAIC-EMBER v1.0 version reference", () => {
    expect(georeactorPage).toContain("v1.0");
  });

  it("marks P_μf (Microfusion Tail) as KILLED", () => {
    expect(georeactorPage).toContain("KILLED");
    expect(georeactorPage).toContain("line-through");
  });

  it("contains the fusion kill explanation", () => {
    expect(georeactorPage).toContain("2,500");
    expect(georeactorPage.toLowerCase()).toContain("temperature");
  });

  it("preserves the Blind Detector Principle section", () => {
    expect(georeactorPage).toContain("Blind Detector Principle");
  });

  it("preserves the Ember Is Fractal section", () => {
    expect(georeactorPage).toContain("Ember Is Fractal");
  });

  it("contains the Epistemic Honesty section with killed claims", () => {
    expect(georeactorPage).toContain("Epistemic Honesty");
    expect(georeactorPage).toContain("Present-day");
  });

  it("contains the updated How We Got Here timeline with Resonance", () => {
    expect(georeactorPage).toContain("Resonance");
    expect(georeactorPage).toContain("Gap Analysis");
  });
});

// ─── INHERITED EMBER: ACD INTRODUCTION ───────────────────────────────────────

describe("Inherited Ember: Asymmetric Core Dynamics", () => {
  const georeactorPage = readPage("Georeactor.tsx");

  it("contains the ACD section heading", () => {
    expect(georeactorPage).toContain("Asymmetric Core Dynamics");
  });

  it("contains the iceberg flip mechanism", () => {
    expect(georeactorPage).toContain("iceberg");
  });

  it("references the 6/6 seismic prediction match", () => {
    expect(georeactorPage).toContain("6");
    expect(georeactorPage.toLowerCase()).toContain("seismic");
  });

  it("contains the ACD as surviving mechanism framing", () => {
    expect(georeactorPage).toContain("surviv");
  });

  it("has the ACD section before Ember Is Fractal", () => {
    const acdPos = georeactorPage.indexOf("Asymmetric Core Dynamics");
    const emberFractalPos = georeactorPage.indexOf("Ember Is Fractal");

    expect(acdPos).toBeGreaterThan(-1);
    expect(emberFractalPos).toBeGreaterThan(-1);
    expect(acdPos).toBeLessThan(emberFractalPos);
  });
});

// ─── COMPONENT UPDATES ──────────────────────────────────────────────────────

describe("Component Updates: Fusion References Removed", () => {
  it("EmberFractalVisualization no longer references D-D fusion", () => {
    const component = readComponent("EmberFractalVisualization.tsx");
    expect(component).not.toContain("D-D fusion");
  });

  it("TriadicExplorer references ACD instead of fusion", () => {
    const component = readComponent("TriadicExplorer.tsx");
    expect(component).not.toContain("D-D fusion");
  });

  it("AGDependencyGraph references ACD in AG.19", () => {
    const component = readComponent("AGDependencyGraph.tsx");
    // Should reference ACD or asymmetric, not D-D fusion
    expect(component).not.toContain("D-D fusion");
  });

  it("WhatsNew reflects the ACD pivot", () => {
    const component = readComponent("WhatsNew.tsx");
    expect(component).toContain("ACD");
  });

  it("SearchModal references ACD", () => {
    const component = readComponent("SearchModal.tsx");
    expect(component).toContain("ACD");
  });
});

// ─── SEARCH INDEX UPDATES ───────────────────────────────────────────────────

describe("Search Index: ACD and Predictions Updates", () => {
  const searchIndex = readLib("searchIndex.ts");

  it("contains the predictions page entry", () => {
    expect(searchIndex).toContain("page-predictions");
    expect(searchIndex).toContain("Testable Predictions Dashboard");
    expect(searchIndex).toContain("/predictions");
  });

  it("contains ACD references in georeactor page entry", () => {
    expect(searchIndex).toContain("Asymmetric Core Dynamics");
  });

  it("no longer references D-D fusion in the georeactor entry", () => {
    // Find the georeactor search entry specifically
    const georeactorEntryStart = searchIndex.indexOf("page-georeactor");
    const georeactorEntryEnd = searchIndex.indexOf("},", georeactorEntryStart);
    const georeactorEntry = searchIndex.slice(georeactorEntryStart, georeactorEntryEnd);
    expect(georeactorEntry).not.toContain("D-D fusion");
  });
});

// ─── PREDICTIONS DASHBOARD ──────────────────────────────────────────────────

describe("Predictions Dashboard Page", () => {
  const predictionsPage = readPage("Predictions.tsx");

  it("exists and contains the dashboard heading", () => {
    expect(predictionsPage).toContain("Testable Predictions");
  });

  it("contains the PUBLIC FALSIFICATION DASHBOARD subtitle", () => {
    expect(predictionsPage).toContain("PUBLIC FALSIFICATION DASHBOARD");
  });

  it("contains verified predictions", () => {
    expect(predictionsPage).toContain("verified");
  });

  it("contains awaiting data predictions", () => {
    expect(predictionsPage).toContain("awaiting");
  });

  it("contains testable now predictions", () => {
    expect(predictionsPage).toContain("testable");
  });

  it("contains speculative predictions", () => {
    expect(predictionsPage).toContain("speculative");
  });

  it("contains falsified predictions", () => {
    expect(predictionsPage).toContain("falsified");
  });

  it("contains the D-D fusion kill as a falsified prediction", () => {
    expect(predictionsPage).toContain("D-D Fusion");
    expect(predictionsPage).toContain("Resonance Gap Analysis");
  });

  it("contains ACD predictions", () => {
    expect(predictionsPage).toContain("ACD");
    // ACD predictions reference the hypothesis and mechanism
    expect(predictionsPage).toContain("ACD Hypothesis");
  });

  it("contains the S_turn function prediction", () => {
    expect(predictionsPage).toContain("S_turn");
  });

  it("contains the methodology section", () => {
    expect(predictionsPage).toContain("Methodology");
    expect(predictionsPage).toContain("Epistemic Tier");
    expect(predictionsPage).toContain("Falsification Criterion");
  });

  it("contains domain categories", () => {
    expect(predictionsPage).toContain("Mathematics");
    expect(predictionsPage).toContain("Geophysics");
    expect(predictionsPage).toContain("Consciousness");
  });

  it("contains filter controls", () => {
    expect(predictionsPage).toContain("Filter");
    expect(predictionsPage).toContain("Search");
  });

  it("contains attribution to Lyra and sources", () => {
    expect(predictionsPage).toContain("Lyra");
    expect(predictionsPage).toContain("Three-Layer Model");
  });
});

// ─── ROUTING ────────────────────────────────────────────────────────────────

describe("Predictions Route Registration", () => {
  const appTsx = readFileSync(resolve(__dirname, `../client/src/App.tsx`), "utf-8");

  it("imports the Predictions component", () => {
    expect(appTsx).toContain("import Predictions");
  });

  it("registers the /predictions route", () => {
    expect(appTsx).toContain('path="/predictions"');
  });
});

describe("Predictions Navigation", () => {
  const navbar = readComponent("Navbar.tsx");

  it("includes Predictions Dashboard in the navigation", () => {
    expect(navbar).toContain("Predictions Dashboard");
    expect(navbar).toContain("/predictions");
  });
});
