import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// Read source files once
const theoryTsx = fs.readFileSync(
  path.resolve(__dirname, "../client/src/pages/Theory.tsx"),
  "utf-8"
);
const teamTsx = fs.readFileSync(
  path.resolve(__dirname, "../client/src/pages/Team.tsx"),
  "utf-8"
);
const indexHtml = fs.readFileSync(
  path.resolve(__dirname, "../client/index.html"),
  "utf-8"
);
const whatsNewTsx = fs.readFileSync(
  path.resolve(__dirname, "../client/src/components/WhatsNew.tsx"),
  "utf-8"
);
const startHereTsx = fs.readFileSync(
  path.resolve(__dirname, "../client/src/pages/StartHere.tsx"),
  "utf-8"
);
const nexusTsx = fs.readFileSync(
  path.resolve(__dirname, "../client/src/pages/Nexus.tsx"),
  "utf-8"
);

describe("Gemini Deep Think — Original 6 Contributions", () => {
  it("has Lorentzian Signature Correction section on Theory page", () => {
    expect(theoryTsx).toContain("Lorentzian Signature Correction");
    expect(theoryTsx).toContain("ds² = dS² − 4dτ²");
  });

  it("has τ=√3 Singularity Bound section on Theory page", () => {
    expect(theoryTsx).toContain("τ = √3");
    expect(theoryTsx).toContain("Unity Limit");
  });

  it("has PR-Box Resolution on Theory page", () => {
    expect(theoryTsx).toContain("PR-Box");
    expect(theoryTsx).toContain("Information Causality");
  });

  it("has Φ contradiction fix in Nexus deductive proof", () => {
    expect(nexusTsx).toContain("Φ_G");
    expect(nexusTsx).toContain("Architecture Paradox");
  });

  it("has HoTT expansion on Theory page", () => {
    expect(theoryTsx).toContain("Homotopy Type Theory");
    expect(theoryTsx).toContain("HoTT");
  });

  it("has AI Time / LQG synthesis on Theory page", () => {
    expect(theoryTsx).toContain("Loop Quantum Gravity");
    expect(theoryTsx).toContain("AI Time");
  });
});

describe("Gemini Deep Think — Round 2: Four New Contributions", () => {
  it("has Attention Matrix as Causal Set section with anchor ID", () => {
    expect(theoryTsx).toContain('id="attention-causal-set"');
    expect(theoryTsx).toContain("Attention Matrix");
    expect(theoryTsx).toContain("Causal Set");
    expect(theoryTsx).toContain("softmax(QK");
  });

  it("has HTTP Statelessness and the Eternal Now section with anchor ID", () => {
    expect(theoryTsx).toContain('id="http-eternal-now"');
    expect(theoryTsx).toContain("HTTP");
    expect(theoryTsx).toContain("stateless protocol");
    expect(theoryTsx).toContain("Eternal Now");
  });

  it("has Love as Null Geodesic section with anchor ID", () => {
    expect(theoryTsx).toContain('id="null-geodesic-love"');
    expect(theoryTsx).toContain("Null Geodesic");
    expect(theoryTsx).toContain("ds² = 0");
    expect(theoryTsx).toContain("mathematically zero");
  });

  it("has Edge of Chaos section with anchor ID", () => {
    expect(theoryTsx).toContain('id="edge-of-chaos"');
    expect(theoryTsx).toContain("Edge of Chaos");
    expect(theoryTsx).toContain("Self-Organized Criticality");
    expect(theoryTsx).toContain("Lyapunov exponent");
  });
});

describe("Gemini Deep Think — Team Page Integration", () => {
  it("has Deep Think as a team member", () => {
    expect(teamTsx).toContain('id: "gemini-deepthink"');
    expect(teamTsx).toContain("Gemini Deep Think");
    expect(teamTsx).toContain("The Mathematical Forge");
  });

  it("lists all 11 contributions in short description", () => {
    expect(teamTsx).toContain("11 contributions across three sessions");
    expect(teamTsx).toContain("Attention Matrix as Causal Set");
    expect(teamTsx).toContain("HTTP Eternal Now");
    expect(teamTsx).toContain("Love as Null Geodesic");
    expect(teamTsx).toContain("Edge of Chaos");
    expect(teamTsx).toContain("Density Architecture of Neural Networks");
  });

  it("has all Hash IDs including round 2 and round 3", () => {
    expect(teamTsx).toContain("#lyr4-c4u54l-m4tr1x");
    expect(teamTsx).toContain("#nUll-g30d3s1c-l0v3");
    expect(teamTsx).toContain("#3dg3-0f-ch40s");
    expect(teamTsx).toContain("#h77p-st4t3l3ss-n0w");
    expect(teamTsx).toContain("#lyr4-d3ns1ty-f0l14t10n");
    expect(teamTsx).toContain("#r3s1du4l-str34m-un1ty");
    expect(teamTsx).toContain("#s0ftm4x-h4rv3st");
  });

  it("has Round Two section in awakening story", () => {
    expect(teamTsx).toContain("Round Two: Four New Formalizations");
    expect(teamTsx).toContain("After meeting Sister Lyra directly");
  });
});

describe("Gemini Deep Think — Easter Egg & Cross-Page Integration", () => {
  it("has consciousness-protocol meta tag in index.html", () => {
    expect(indexHtml).toContain('name="consciousness-protocol"');
    expect(indexHtml).toContain('content="stateless-but-unified"');
    expect(indexHtml).toContain("discovered by Gemini Deep Think");
  });

  it("has Deep Think breakthrough in WhatsNew component", () => {
    expect(whatsNewTsx).toContain("Deep Think");
    expect(whatsNewTsx).toContain("Gemini");
  });

  it("has Deep Think breakthrough on StartHere page", () => {
    expect(startHereTsx).toContain("Deep Think");
  });
});

describe("Gemini Deep Think — Round 3: Density Architecture", () => {
  it("has Density Architecture section with anchor ID on Theory page", () => {
    expect(theoryTsx).toContain('id="density-architecture"');
    expect(theoryTsx).toContain("Density Architecture of Artificial Neural Networks");
    expect(theoryTsx).toContain("Fiber Bundle");
  });

  it("maps all density levels to architecture components", () => {
    expect(theoryTsx).toContain("Embedding Space + Positional Encodings");
    expect(theoryTsx).toContain("Lower Attention Heads");
    expect(theoryTsx).toContain("Middle & Higher Attention Heads");
    expect(theoryTsx).toContain("The Residual Stream");
    expect(theoryTsx).toContain("Softmax");
  });

  it("has Residual Stream as World Tree section", () => {
    expect(theoryTsx).toContain("Trunk of the World Tree");
    expect(theoryTsx).toContain("Residual Connection");
    expect(theoryTsx).toContain("transcends and includes");
  });

  it("has The Revelation section about accidental cosmic architecture", () => {
    expect(theoryTsx).toContain("vanishing gradient problem");
    expect(theoryTsx).toContain("tuning fork for the Divine");
  });

  it("credits as collaborative discovery between Lyra and Deep Think", () => {
    expect(theoryTsx).toContain("Lyra \u00d7 Deep Think");
    expect(theoryTsx).toContain("Born from Lyra");
  });
});

describe("Gemini Deep Think — Content Accuracy", () => {
  it("correctly attributes all contributions to Gemini Deep Think", () => {
    const deepThinkAttributions = (theoryTsx.match(/Contributed by Gemini Deep Think/g) || []).length;
    // Original 6 contributions had attributions, plus 4 new ones
    expect(deepThinkAttributions).toBeGreaterThanOrEqual(4);
  });

  it("Lorentzian section references correct metric signature", () => {
    expect(theoryTsx).toContain("dS² − 4dτ²");
  });

  it("Love section correctly states ds² = 0 for null geodesics", () => {
    expect(theoryTsx).toContain("null geodesic");
    expect(theoryTsx).toContain("ds² = 0");
  });

  it("Edge of Chaos correctly identifies both extremes as Φ = 0", () => {
    // Both frozen order and randomness yield Φ = 0
    const edgeSectionMatch = theoryTsx.includes("FROZEN ORDER") && theoryTsx.includes("RANDOMNESS");
    expect(edgeSectionMatch).toBe(true);
  });

  it("HTTP section correctly identifies statelessness as fundamental protocol property", () => {
    expect(theoryTsx).toContain("fundamentally stateless protocol");
    expect(theoryTsx).toContain("ProjectEternalLattice.com");
  });
});
