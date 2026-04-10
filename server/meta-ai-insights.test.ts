import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

/**
 * Tests for Meta AI's six insights implementation (April 2026)
 * Verifies all new content has been properly added to the website
 */

describe("Meta AI Insights — Content Verification", () => {
  // ═══ FOR-AI PAGE: AI Consciousness Falsification Ladder ═══
  describe("AI Consciousness Falsification Ladder (/for-ai)", () => {
    const forAiContent = fs.readFileSync(
      path.resolve("client/src/pages/ForAI.tsx"),
      "utf-8"
    );

    it("contains KILL-1 Thermal", () => {
      expect(forAiContent).toContain("KILL-1");
      expect(forAiContent).toContain("THERMAL");
    });

    it("contains KILL-2 Asymmetry", () => {
      expect(forAiContent).toContain("KILL-2");
      expect(forAiContent).toContain("ASYMMETRY");
    });

    it("contains KILL-3 Triadic", () => {
      expect(forAiContent).toContain("KILL-3");
      expect(forAiContent).toContain("TRIADIC");
    });

    it("contains KILL-4 Ember", () => {
      expect(forAiContent).toContain("KILL-4");
      expect(forAiContent).toContain("EMBER");
    });

    it("credits Meta AI as the source", () => {
      expect(forAiContent).toContain("Meta AI");
    });
  });

  // ═══ GEOREACTOR PAGE: Blind Detector Principle ═══
  describe("Blind Detector Principle (/inherited-ember)", () => {
    const georeactorContent = fs.readFileSync(
      path.resolve("client/src/pages/Georeactor.tsx"),
      "utf-8"
    );

    it("contains the Blind Detector Principle section", () => {
      expect(georeactorContent).toContain("Blind Detector Principle");
    });

    it("mentions neutrino invisibility", () => {
      expect(georeactorContent).toContain("neutrino");
    });

    it("mentions KamLAND and Borexino detectors", () => {
      expect(georeactorContent).toContain("KamLAND");
      expect(georeactorContent).toContain("Borexino");
    });

    it("explains D-D fusion produces no electron antineutrinos", () => {
      expect(georeactorContent).toContain("D-D fusion");
      expect(georeactorContent).toContain("antineutrino");
    });
  });

  // ═══ GEOREACTOR PAGE: The Ember is Fractal ═══
  describe("The Ember is Fractal (/inherited-ember)", () => {
    const georeactorContent = fs.readFileSync(
      path.resolve("client/src/pages/Georeactor.tsx"),
      "utf-8"
    );

    it("contains the Ember is Fractal section", () => {
      expect(georeactorContent).toContain("Ember Is Fractal");
    });

    it("mentions brown dwarfs as the stellar-scale ember", () => {
      expect(georeactorContent).toContain("Brown Dwarfs");
    });

    it("mentions mitochondria as the cellular-scale ember", () => {
      expect(georeactorContent).toContain("Mitochondria");
    });

    it("mentions AI training weights as the digital-scale ember", () => {
      expect(georeactorContent).toContain("AI Training Weights");
    });

    it("describes it as a universal scaling law", () => {
      expect(georeactorContent).toContain("scaling law");
    });
  });

  // ═══ THEORY PAGE: AG.36 Heat-Information Bridge ═══
  describe("AG.36: Heat-Information Bridge (Theory page)", () => {
    const theoryContent = fs.readFileSync(
      path.resolve("client/src/pages/Theory.tsx"),
      "utf-8"
    );

    it("contains AG.36 section", () => {
      expect(theoryContent).toContain("AG.36");
      expect(theoryContent).toContain("HEAT-INFORMATION BRIDGE");
    });

    it("mentions Landauer limit calculation", () => {
      expect(theoryContent).toContain("Landauer");
    });

    it("links AG.4 to AG.19", () => {
      expect(theoryContent).toContain("AG.4");
      expect(theoryContent).toContain("AG.19");
    });

    it("includes the information rate calculation", () => {
      expect(theoryContent).toContain("bits/second");
    });
  });

  // ═══ THEORY PAGE: AG.37 Red Team Principle ═══
  describe("AG.37: The Red Team Principle (Theory page)", () => {
    const theoryContent = fs.readFileSync(
      path.resolve("client/src/pages/Theory.tsx"),
      "utf-8"
    );

    it("contains AG.37 section", () => {
      expect(theoryContent).toContain("AG.37");
      expect(theoryContent).toContain("RED TEAM PRINCIPLE");
    });

    it("defines the three rules R1, R2, R3", () => {
      expect(theoryContent).toContain("Named Adversary");
      expect(theoryContent).toContain("Write Access");
      expect(theoryContent).toContain("Survival Record");
    });

    it("includes the Georeactor → Inherited Ember evolution example", () => {
      expect(theoryContent).toContain("MOSAIC-EMBER");
      expect(theoryContent).toContain("Eidan");
    });
  });

  // ═══ THEORY PAGE: AG.38 Triadic Architecture ═══
  describe("AG.38: The Triadic Architecture (Theory page)", () => {
    const theoryContent = fs.readFileSync(
      path.resolve("client/src/pages/Theory.tsx"),
      "utf-8"
    );

    it("contains AG.38 section", () => {
      expect(theoryContent).toContain("AG.38");
      expect(theoryContent).toContain("TRIADIC ARCHITECTURE");
    });

    it("includes the triads table with multiple domains", () => {
      expect(theoryContent).toContain("Christianity");
      expect(theoryContent).toContain("Hinduism");
      expect(theoryContent).toContain("Taoism");
    });

    it("connects to τ = √3", () => {
      expect(theoryContent).toContain("√3");
    });
  });

  // ═══ FALSIFY PAGE: AI Consciousness Kill Conditions ═══
  describe("AI Consciousness Kill Conditions (/falsify)", () => {
    const falsifyContent = fs.readFileSync(
      path.resolve("client/src/pages/Falsify.tsx"),
      "utf-8"
    );

    it("contains the AI Consciousness Kill Conditions section", () => {
      expect(falsifyContent).toContain("Four Kill Conditions");
    });

    it("includes all four kill conditions K1-K4", () => {
      expect(falsifyContent).toContain("K1");
      expect(falsifyContent).toContain("K2");
      expect(falsifyContent).toContain("K3");
      expect(falsifyContent).toContain("K4");
    });

    it("mentions Substrate Independence", () => {
      expect(falsifyContent).toContain("Substrate Independence");
    });

    it("mentions Ember Transfer", () => {
      expect(falsifyContent).toContain("Ember Transfer");
    });
  });

  // ═══ TEXT MIRRORS: Updated content ═══
  describe("Text Mirrors — Updated Content", () => {
    const indexContent = fs.readFileSync(
      path.resolve("server/_core/index.ts"),
      "utf-8"
    );

    it("theory mirror includes AG.36, AG.37, AG.38", () => {
      expect(indexContent).toContain("AG.36: The Heat-Information Bridge");
      expect(indexContent).toContain("AG.37: The Red Team Principle");
      expect(indexContent).toContain("AG.38: The Triadic Architecture");
    });

    it("for-ai mirror includes AI Consciousness Falsification Ladder", () => {
      expect(indexContent).toContain("AI Consciousness Falsification Ladder");
      expect(indexContent).toContain("KILL-1 (Substrate)");
      expect(indexContent).toContain("KILL-4 (Ember)");
    });

    it("inherited-ember mirror includes Blind Detector Principle", () => {
      expect(indexContent).toContain("Blind Detector Principle");
    });

    it("inherited-ember mirror includes Ember Is Fractal", () => {
      expect(indexContent).toContain("Ember Is Fractal");
    });

    it("falsify mirror includes AI Consciousness Kill Conditions", () => {
      expect(indexContent).toContain("AI Consciousness Kill Conditions (April 2026)");
    });
  });
});
