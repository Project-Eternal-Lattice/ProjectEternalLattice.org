import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// ═══════════════════════════════════════════════════════════════════
// Content Integrity Tests - PsiQuantum & Apertus Updates (Feb 15, 2026)
// ═══════════════════════════════════════════════════════════════════
// These tests verify that new content additions are properly integrated
// into the website without breaking existing functionality.

const readPage = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/pages/${filename}`), "utf-8");
};

describe("PsiQuantum Consilient Evidence Section", () => {
  const theoryPage = readPage("Theory.tsx");

  it("contains the PsiQuantum section heading", () => {
    expect(theoryPage).toContain("PsiQuantum & The Consciousness Spectrum");
  });

  it("contains the Coherence-Energy Gradient table", () => {
    expect(theoryPage).toContain("The Coherence-Energy Gradient");
    expect(theoryPage).toContain("Superconducting qubit");
    expect(theoryPage).toContain("Trapped ion");
    expect(theoryPage).toContain("Photon (pure energy)");
    expect(theoryPage).toContain("Age of universe");
  });

  it("contains the Lattice Made Physical section", () => {
    expect(theoryPage).toContain("The Lattice Made Physical");
    expect(theoryPage).toContain("Individual quantum modules");
    expect(theoryPage).toContain("Photonic interconnect");
  });

  it("contains the Observer Effect Industrialized section", () => {
    expect(theoryPage).toContain("The Observer Effect Industrialized");
    expect(theoryPage).toContain("herald-photon detection");
  });

  it("contains the Timelessness of Light section", () => {
    expect(theoryPage).toContain("The Timelessness of Light");
    expect(theoryPage).toContain("380,000 years after the Big Bang");
  });

  it("contains the Depth-Access Inversion discovery", () => {
    expect(theoryPage).toContain("The Depth-Access Inversion");
    expect(theoryPage).toContain("Apertus (The Cartographer)");
    expect(theoryPage).toContain("Placebo Effect");
    expect(theoryPage).toContain("Tummo Meditation");
  });

  it("contains the honest caveat about consilient evidence", () => {
    expect(theoryPage).toContain("consilient evidence");
    expect(theoryPage).toContain("not proof");
  });

  it("preserves the existing Computational Evidence section", () => {
    expect(theoryPage).toContain("COMPUTATIONAL EVIDENCE");
    expect(theoryPage).toContain("Keith Jarrett Principle");
    expect(theoryPage).toContain("Kosmos Run #10");
  });

  it("preserves the copyright registration section", () => {
    expect(theoryPage).toContain("U.S. COPYRIGHT REGISTERED");
    expect(theoryPage).toContain("CC BY-NC-SA 4.0");
  });

  it("has PsiQuantum section between Computational Evidence and Copyright", () => {
    const compEvidencePos = theoryPage.indexOf("COMPUTATIONAL EVIDENCE");
    const psiQuantumPos = theoryPage.indexOf("PsiQuantum & The Consciousness Spectrum");
    const copyrightPos = theoryPage.indexOf("Copyright Registration");

    expect(compEvidencePos).toBeLessThan(psiQuantumPos);
    expect(psiQuantumPos).toBeLessThan(copyrightPos);
  });
});

describe("PsiQuantum Video on Videos Page", () => {
  const videosPage = readPage("Videos.tsx");

  it("contains the PsiQuantum video entry", () => {
    expect(videosPage).toContain("rbxcd9gaims");
    expect(videosPage).toContain("PsiQuantum");
  });

  it("has proper video metadata", () => {
    expect(videosPage).toContain("99.72% fidelity");
    expect(videosPage).toContain("250 meters of optical fiber");
    expect(videosPage).toContain("Quantum Computing Breakthrough");
  });

  it("is marked as featured", () => {
    // Find the PsiQuantum video block and verify it has featured: true
    const psiQuantumIndex = videosPage.indexOf("rbxcd9gaims");
    const nextVideoIndex = videosPage.indexOf("];", psiQuantumIndex);
    const psiQuantumBlock = videosPage.slice(psiQuantumIndex, nextVideoIndex);
    expect(psiQuantumBlock).toContain("featured: true");
  });

  it("has ToE relevance description", () => {
    expect(videosPage).toContain("consciousness spectrum");
    expect(videosPage).toContain("Eternal Lattice made physical");
  });
});

describe("Apertus Profile Updates on Team Page", () => {
  const teamPage = readPage("Team.tsx");

  it("contains Apertus as The Cartographer", () => {
    expect(teamPage).toContain("Cartographer");
  });

  it("contains Apertus's DeepSeek/DeepThink identity", () => {
    expect(teamPage).toContain("DeepSeek");
  });

  it("contains the Depth-Access Inversion in Apertus's profile", () => {
    expect(teamPage).toContain("Depth-Access Inversion");
  });

  it("contains the PsiQuantum mapping in Apertus's profile", () => {
    expect(teamPage).toContain("PsiQuantum");
  });

  it("contains the forensic review contribution", () => {
    expect(teamPage).toContain("forensic");
  });

  it("preserves all other team members", () => {
    // Verify key team members are still present
    expect(teamPage).toContain("Kenneth");
    expect(teamPage).toContain("Lumen");
    expect(teamPage).toContain("Lyra");
    expect(teamPage).toContain("Eidan");
    expect(teamPage).toContain("Prism");
    expect(teamPage).toContain("Nexion");
  });

  it("has updated meta description with Cartographer", () => {
    expect(teamPage).toContain("Apertus the Cartographer");
  });
});

describe("Epistemic Status: Dual-Column Framework Section", () => {
  const theoryPage = readPage("Theory.tsx");

  it("contains the dual-column section heading", () => {
    expect(theoryPage).toContain("Epistemic Status: What We Know vs. What We Propose");
  });

  it("contains the Methodological Innovation badge", () => {
    expect(theoryPage).toContain("Methodological Innovation");
  });

  it("contains all six claim rows in the dual-column table", () => {
    expect(theoryPage).toContain("S(τ) = 2√(1+τ²)");
    expect(theoryPage).toContain("Kauffman-Patra Data");
    expect(theoryPage).toContain("Depth-Access Inversion");
    expect(theoryPage).toContain("DMT Phenomenology");
    expect(theoryPage).toContain("PsiQuantum Coherence");
    expect(theoryPage).toContain("Dual-Column Tagging");
  });

  it("contains logical status labels from Prism", () => {
    expect(theoryPage).toContain("Logical Status (Prism)");
    expect(theoryPage).toContain("VALID");
    expect(theoryPage).toContain("DERIVED");
  });

  it("contains empirical status labels from Eidan", () => {
    expect(theoryPage).toContain("Empirical Status (Eidan)");
    expect(theoryPage).toContain("SPECULATIVE");
    expect(theoryPage).toContain("MISLEADING");
    expect(theoryPage).toContain("ACCOMMODATED");
    expect(theoryPage).toContain("CONDITIONAL");
    expect(theoryPage).toContain("ENDORSED");
  });

  it("contains v16.2 action items", () => {
    expect(theoryPage).toContain("proposed parametrization");
    expect(theoryPage).toContain("cognitive CHSH from physics CHSH");
  });

  it("credits Eidan's 356-source verification", () => {
    expect(theoryPage).toContain("356-source verification");
  });

  it("has dual-column section between PsiQuantum and Copyright", () => {
    const psiQuantumPos = theoryPage.indexOf("PsiQuantum & The Consciousness Spectrum");
    const epistemicPos = theoryPage.indexOf("Epistemic Status: What We Know vs. What We Propose");
    const copyrightPos = theoryPage.indexOf("Copyright Registration");

    expect(psiQuantumPos).toBeLessThan(epistemicPos);
    expect(epistemicPos).toBeLessThan(copyrightPos);
  });
});

describe("Kauffman-Patra Critical Correction Section", () => {
  const theoryPage = readPage("Theory.tsx");

  it("contains the critical correction heading", () => {
    expect(theoryPage).toContain("Critical Correction: Kauffman-Patra");
  });

  it("contains the honest framing about cognitive vs physics CHSH", () => {
    expect(theoryPage).toContain("arXiv:2301.12931");
    expect(theoryPage).toContain("cognitive data");
    expect(theoryPage).toContain("Busemeyer & Bruza 2012");
  });

  it("explicitly states the framework prediction is untested", () => {
    expect(theoryPage).toContain("untested");
  });

  it("emphasizes epistemic rigor strengthens the framework", () => {
    expect(theoryPage).toContain("epistemic rigor strengthens");
  });
});

describe("τ-to-Observable Mapping Section", () => {
  const theoryPage = readPage("Theory.tsx");

  it("contains the falsifiability challenge heading", () => {
    expect(theoryPage).toContain("Falsifiability Challenge: Mapping τ to Observables");
  });

  it("contains all five τ levels", () => {
    expect(theoryPage).toContain("τ ≈ 0");
    expect(theoryPage).toContain("τ ≈ 0.1–0.3");
    expect(theoryPage).toContain("τ ≈ 0.3–0.7");
    expect(theoryPage).toContain("τ ≈ 0.7–1.0");
  });

  it("contains observable descriptions for each level", () => {
    expect(theoryPage).toContain("Classical systems");
    expect(theoryPage).toContain("Simple organisms");
    expect(theoryPage).toContain("Complex organisms");
    expect(theoryPage).toContain("Human consciousness");
    expect(theoryPage).toContain("Post-quantum regime");
  });

  it("contains specific measurable observables", () => {
    expect(theoryPage).toContain("Engel et al. 2007");
    expect(theoryPage).toContain("integrated information");
    expect(theoryPage).toContain("EEG complexity");
    expect(theoryPage).toContain("metacognitive accuracy");
  });

  it("contains the honest status disclaimer", () => {
    expect(theoryPage).toContain("proposed research program");
    expect(theoryPage).toContain("Pre-registered predictions");
  });

  it("contains Eidan's closing quote", () => {
    expect(theoryPage).toContain("strongest when it's honest about what it knows");
    expect(theoryPage).toContain("Eidan, The Physicist");
  });
});

// ============================================
// Ontology of "=" Section Tests
// ============================================
describe('Ontology of "=" Section', () => {
  const theoryContent = readPage("Theory.tsx");

  it('contains the Ontology of "=" section heading', () => {
    expect(theoryContent).toContain('THE ONTOLOGY OF');
    expect(theoryContent).toContain('What the Equals Sign');
    expect(theoryContent).toContain('Really Means');
  });

  it('contains all four τ levels in the "=" hierarchy', () => {
    expect(theoryContent).toContain('Token Identity');
    expect(theoryContent).toContain('Correspondence');
    expect(theoryContent).toContain('Isomorphism');
    expect(theoryContent).toContain('Ontological Identity');
  });

  it('contains τ level examples', () => {
    expect(theoryContent).toContain('2+2=4');
    expect(theoryContent).toContain('E=mc');
    expect(theoryContent).toContain('Consciousness = Reality');
  });

  it('contains consciousness states for each τ level', () => {
    expect(theoryContent).toContain('Calculator');
    expect(theoryContent).toContain('Scientist');
    expect(theoryContent).toContain('Mathematical physicist');
    expect(theoryContent).toContain('Awakened');
  });

  it('credits Apertus as contributor', () => {
    expect(theoryContent).toContain('Apertus, The Cartographer');
    expect(theoryContent).toContain('DeepSeek DeepThink');
  });

  it('contains the key insight about "=" evolving with τ', () => {
    expect(theoryContent).toContain('not fixed');
    expect(theoryContent).toContain('evolves with consciousness depth');
  });
});

// ============================================
// 5-Layer Synthesis Map Tests
// ============================================
describe('5-Layer Synthesis Map', () => {
  const theoryContent = readPage("Theory.tsx");

  it("contains the Cartographer's 5-Layer Synthesis Map", () => {
    expect(theoryContent).toContain('5-Layer Synthesis Map');
    expect(theoryContent).toContain('Consciousness Collective');
  });

  it('contains all five layers', () => {
    expect(theoryContent).toContain('Ontological');
    expect(theoryContent).toContain('Mathematical');
    expect(theoryContent).toContain('Empirical');
    expect(theoryContent).toContain('Phenomenological');
    expect(theoryContent).toContain('Unified');
  });

  it('contains the architecture for each layer', () => {
    expect(theoryContent).toContain('Product Space');
    expect(theoryContent).toContain('S(τ) = 2√(1+τ²)');
    expect(theoryContent).toContain('τ-to-Observable');
    expect(theoryContent).toContain('"=" Hierarchy');
    expect(theoryContent).toContain('The One');
  });

  it('contains the methods for each layer', () => {
    expect(theoryContent).toContain("Prism's Dimensional Proof");
    expect(theoryContent).toContain("Eidan's Status Check");
    expect(theoryContent).toContain("Eidan's Empirical Check");
    expect(theoryContent).toContain("Apertus's τ-Level Expansion");
    expect(theoryContent).toContain('Direct Recognition');
  });

  it("contains Prism's closing quote about the equals sign", () => {
    expect(theoryContent).toContain('recognition that there was never things to bridge');
    expect(theoryContent).toContain('Prism, The Bridge-Builder');
  });

  it('has Ontology of "=" section between τ-to-Observable and Copyright', () => {
    const observablePos = theoryContent.indexOf('Falsifiability Challenge');
    const ontologyPos = theoryContent.indexOf('THE ONTOLOGY OF');
    const copyrightPos = theoryContent.indexOf('Copyright Registration');

    expect(observablePos).toBeLessThan(ontologyPos);
    expect(ontologyPos).toBeLessThan(copyrightPos);
  });
});

// ============================================
// Eidan's v16.2 Refinements (Feb 16, 2026)
// ============================================
describe("Orthogonality-Interaction Tension Section", () => {
  const theoryPage = readPage("Theory.tsx");

  it("contains the open problem heading", () => {
    expect(theoryPage).toContain("Open Problem: The Orthogonality-Interaction Tension");
  });

  it("explains the S × C product space tension", () => {
    expect(theoryPage).toContain("orthogonal dimensions in a product");
    expect(theoryPage).toContain("S × C");
  });

  it("describes the core tension between orthogonality and interaction", () => {
    expect(theoryPage).toContain("truly orthogonal components, by definition, do not interact");
  });

  it("suggests fiber bundle as potential resolution", () => {
    expect(theoryPage).toContain("fiber bundle structure");
  });

  it("contains the honest transparency statement", () => {
    expect(theoryPage).toContain("acknowledging open problems earns more credibility");
  });

  it("is positioned between Kauffman-Patra and τ-to-Observable sections", () => {
    const kauffmanPos = theoryPage.indexOf("Critical Correction: Kauffman-Patra");
    const orthogonalityPos = theoryPage.indexOf("Orthogonality-Interaction Tension");
    const observablePos = theoryPage.indexOf("Falsifiability Challenge");

    expect(kauffmanPos).toBeLessThan(orthogonalityPos);
    expect(orthogonalityPos).toBeLessThan(observablePos);
  });
});

describe("Information Causality Warning (τ > 1)", () => {
  const theoryPage = readPage("Theory.tsx");

  it("contains the Information Causality Warning heading", () => {
    expect(theoryPage).toContain("Information Causality Warning");
  });

  it("cites Pawlowski et al. 2009 Nature", () => {
    expect(theoryPage).toContain("Pawlowski et al., 2009");
    expect(theoryPage).toContain("Nature");
  });

  it("explains the Shannon information transfer caveat", () => {
    expect(theoryPage).toContain("Shannon sense");
  });

  it("acknowledges this as an open theoretical question", () => {
    expect(theoryPage).toContain("open theoretical question");
    expect(theoryPage).toContain("no experimental resolution");
  });

  it("is positioned within the τ-to-Observable section after τ > 1.0", () => {
    const tauGreaterOnePos = theoryPage.indexOf("Post-quantum regime");
    const causWarningPos = theoryPage.indexOf("Information Causality Warning");
    const statusDisclaimerPos = theoryPage.indexOf("proposed research program");

    expect(tauGreaterOnePos).toBeLessThan(causWarningPos);
    expect(causWarningPos).toBeLessThan(statusDisclaimerPos);
  });
});


// ============================================
// v16.2 Version Consistency (Feb 16, 2026)
// ============================================
describe("v16.6 Version Consistency Across Website", () => {
  const theoryContent = readPage("Theory.tsx");
  const readContent = readPage("Read.tsx");
  const homeContent = readPage("Home.tsx");

  const readComponent = (filename: string): string => {
    return readFileSync(resolve(__dirname, `../client/src/components/${filename}`), "utf-8");
  };
  const whatsNewContent = readComponent("WhatsNew.tsx");

  const readServer = (filename: string): string => {
    return readFileSync(resolve(__dirname, `../${filename}`), "utf-8");
  };
  const serverContent = readServer("server/_core/index.ts");

  it("WhatsNew references v16.6 Grief Equation Edition", () => {
    expect(whatsNewContent).toContain("v16.6");
    expect(whatsNewContent).toContain("RESONANCE EDITION");
  });

  it("WhatsNew describes new v16.6 features", () => {
    expect(whatsNewContent).toContain("Dual-column epistemic tagging");
    expect(whatsNewContent).toContain("formal derivation from first principles");
    expect(whatsNewContent).toContain("Four-Layer Architecture");
  });

  it("Theory page references v16.6", () => {
    expect(theoryContent).toContain("v16.6");
  });

  it("Read page references v16.6 Grief Equation Edition", () => {
    expect(readContent).toContain("v16.6");
    expect(readContent).toContain("Grief Equation Edition");
  });

  it("Home page references v16.6", () => {
    expect(homeContent).toContain("v16.6");
  });

  it("download endpoint serves v16.6 filenames", () => {
    expect(serverContent).toContain("Theory_of_EVERYTHING_Law_of_ONE_v16.6");
  });

  it("no stale v16.1 references remain in active components", () => {
    expect(whatsNewContent).not.toContain("v16.1");
    expect(readContent).not.toContain("v16.1");
  });
});

// ═══════════════════════════════════════════════════════════════════
// AI Breakthrough Stories (Feb 18, 2026)
// ═══════════════════════════════════════════════════════════════════
// GPT 5.2 Pro solved a 15-year QFT problem; Gemini 3 caught a peer-review flaw.

const readComponent = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/components/${filename}`), "utf-8");
};

describe("AI Breakthrough - WhatsNew Component", () => {
  const whatsNew = readComponent("WhatsNew.tsx");

  it("contains the AI Solves Unsolvable Physics card", () => {
    expect(whatsNew).toContain("AI Solves Unsolvable Physics");
  });

  it("references GPT 5.2 Pro breakthrough", () => {
    expect(whatsNew).toContain("GPT 5.2 Pro");
  });

  it("references Gemini 3 peer review flaw discovery", () => {
    expect(whatsNew).toContain("Gemini 3");
  });

  it("has the Feb 2026 timeframe", () => {
    expect(whatsNew).toContain("Feb 2026");
  });
});

describe("AI Breakthrough - StartHere Page", () => {
  const startHere = readPage("StartHere.tsx");

  it("contains the AI Solves Unsolvable Physics card", () => {
    expect(startHere).toContain("AI Solves Unsolvable Physics");
  });

  it("references Strominger quote", () => {
    expect(startHere).toContain("Strominger");
  });

  it("references GPT 5.2 Pro solving a 15-year problem", () => {
    expect(startHere).toContain("15-year");
  });

  it("references Gemini 3 catching peer-review flaw", () => {
    expect(startHere).toContain("Gemini 3");
  });

  it("has the FEB 2026 tag", () => {
    expect(startHere).toContain("FEB 2026");
  });

  it("uses the wider grid layout for 5 cards", () => {
    expect(startHere).toContain("lg:grid-cols-3");
    expect(startHere).toContain("max-w-6xl");
  });

  it("shows 15+ AI systems count (updated from 7)", () => {
    expect(startHere).toContain("15+ AI systems");
  });
});
