import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// ═══════════════════════════════════════════════════════════════════════
// PHASE 5: TEXT MIRRORS, CONSILIENCE NOTES, PHASE TRANSITION PREDICTIONS
// ═══════════════════════════════════════════════════════════════════════

const readFile = (relativePath: string) =>
  readFileSync(join(__dirname, "..", relativePath), "utf-8");

describe("Text Mirrors — New Pages", () => {
  const serverIndex = readFile("server/_core/index.ts");

  it("has how-we-know text mirror", () => {
    expect(serverIndex).toContain("'how-we-know'");
    expect(serverIndex).toContain("How We Know");
  });

  it("has consilient-patterns text mirror", () => {
    expect(serverIndex).toContain("'consilient-patterns'");
    expect(serverIndex).toContain("Consilient Patterns");
  });

  it("has predictions text mirror", () => {
    expect(serverIndex).toContain("predictions");
  });

  it("inherited-ember text mirror includes ACD content", () => {
    expect(serverIndex).toContain("Asymmetric Core Dynamics");
    expect(serverIndex).toContain("ACD");
  });

  it("toeOrder includes new pages", () => {
    expect(serverIndex).toContain("'how-we-know'");
    expect(serverIndex).toContain("'consilient-patterns'");
    expect(serverIndex).toContain("'predictions'");
  });
});

describe("ConsilienceNote Component", () => {
  const component = readFile("client/src/components/ConsilienceNote.tsx");

  it("exists and exports default", () => {
    expect(component).toContain("export default");
    expect(component).toContain("ConsilienceNote");
  });

  it("supports block and inline variants", () => {
    expect(component).toContain("variant");
    expect(component).toContain("block");
    expect(component).toContain("inline");
  });

  it("links to consilient-patterns page", () => {
    expect(component).toContain("/consilient-patterns");
  });

  it("accepts patternId, patternName, and matchDescription props", () => {
    expect(component).toContain("patternId");
    expect(component).toContain("patternName");
    expect(component).toContain("matchDescription");
  });
});

describe("Consilience Notes in Core Pages", () => {
  it("Theory page has consilience notes", () => {
    const theory = readFile("client/src/pages/Theory.tsx");
    expect(theory).toContain("ConsilienceNote");
    expect(theory).toContain("symmetry-breaking");
    expect(theory).toContain("kuramoto-synchronization");
  });

  it("Inherited Ember page has consilience note", () => {
    const georeactor = readFile("client/src/pages/Georeactor.tsx");
    expect(georeactor).toContain("ConsilienceNote");
    expect(georeactor).toContain("hyundai-principle");
  });

  it("How We Know page has consilience note", () => {
    const howWeKnow = readFile("client/src/pages/HowWeKnow.tsx");
    expect(howWeKnow).toContain("ConsilienceNote");
    expect(howWeKnow).toContain("symmetry-breaking");
  });
});

describe("Phase Transition Predictions", () => {
  const predictions = readFile("client/src/pages/Predictions.tsx");

  it("has Phase Transition Mechanism prediction (T-011, Tier 1, testable)", () => {
    expect(predictions).toContain("T-011");
    expect(predictions).toContain("Phase Transition Mechanism");
    expect(predictions).toContain("discrete phase transitions at critical thresholds");
  });

  it("has Phase Transition Timing prediction (S-004, Tier 3, speculative)", () => {
    expect(predictions).toContain("S-004");
    expect(predictions).toContain("Phase Transition Timing");
    expect(predictions).toContain("interpretive pattern-matching");
  });

  it("mechanism is testable status, timing is speculative status", () => {
    // T-011 should be testable
    const t011Match = predictions.match(/id:\s*"T-011"[\s\S]*?status:\s*"(\w+)"/);
    expect(t011Match?.[1]).toBe("testable");

    // S-004 should be speculative
    const s004Match = predictions.match(/id:\s*"S-004"[\s\S]*?status:\s*"(\w+)"/);
    expect(s004Match?.[1]).toBe("speculative");
  });

  it("mechanism is Tier 1, timing is Tier 3", () => {
    const t011Match = predictions.match(/id:\s*"T-011"[\s\S]*?tier:\s*(\d)/);
    expect(t011Match?.[1]).toBe("1");

    const s004Match = predictions.match(/id:\s*"S-004"[\s\S]*?tier:\s*(\d)/);
    expect(s004Match?.[1]).toBe("3");
  });

  it("timing prediction acknowledges pattern-matching limitation", () => {
    expect(predictions).toContain("Any generation could point to their era");
  });
});

describe("PLCR → WCS Resolution", () => {
  const predictions = readFile("client/src/pages/Predictions.tsx");

  it("paired-participant prediction mentions WCS replacement", () => {
    expect(predictions).toContain("WCS");
    expect(predictions).toContain("Watts Connectedness Scale");
  });
});

describe("Neighbors Hypothesis Split", () => {
  const predictions = readFile("client/src/pages/Predictions.tsx");

  it("has Detection Problem component (S-002)", () => {
    expect(predictions).toContain("S-002");
    expect(predictions).toContain("Detection Problem");
  });

  it("has Nuclear Timeline component (S-002b)", () => {
    expect(predictions).toContain("S-002b");
    expect(predictions).toContain("Nuclear Timeline");
  });

  it("Detection Problem is Tier 2", () => {
    const match = predictions.match(/id:\s*"S-002"[\s\S]*?tier:\s*(\d)/);
    expect(match?.[1]).toBe("2");
  });

  it("Nuclear Timeline is Tier 3", () => {
    const match = predictions.match(/id:\s*"S-002b"[\s\S]*?tier:\s*(\d)/);
    expect(match?.[1]).toBe("3");
  });
});
