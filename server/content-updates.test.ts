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
