import { describe, it, expect } from "vitest";

/**
 * Tests for the CHSH physics formulas used in CHSHVisualization.
 * These verify the locked F11 prediction: Γ(S)/Γ₀ = tanh(½√(S²−4))
 */

// Physics helpers (same as in the component)
const tauOf = (S: number): number => 0.5 * Math.sqrt(Math.max(0, S * S - 4));
const ratioOf = (S: number): number => Math.tanh(tauOf(S));

const S_TSIRELSON = 2 * Math.SQRT2; // 2√2 ≈ 2.8284
const GAMMA0_HZ = 1538.5;

describe("CHSH Physics (F11 Prediction)", () => {
  describe("τ(S) = ½√(S²−4)", () => {
    it("returns 0 at the classical limit S=2", () => {
      expect(tauOf(2.0)).toBeCloseTo(0, 10);
    });

    it("returns 1 at the Tsirelson bound S=2√2", () => {
      expect(tauOf(S_TSIRELSON)).toBeCloseTo(1, 10);
    });

    it("returns correct value at S=2.1", () => {
      // τ = 0.5 * √(2.1² - 4) = 0.5 * √(4.41 - 4) = 0.5 * √0.41 ≈ 0.3202
      expect(tauOf(2.1)).toBeCloseTo(0.3202, 3);
    });

    it("is monotonically increasing on [2, 2√2]", () => {
      const values = [2.0, 2.1, 2.2, 2.3, 2.5, 2.7, S_TSIRELSON];
      for (let i = 1; i < values.length; i++) {
        expect(tauOf(values[i])).toBeGreaterThan(tauOf(values[i - 1]));
      }
    });

    it("handles S < 2 gracefully (returns 0, not NaN)", () => {
      expect(tauOf(1.5)).toBe(0);
      expect(tauOf(0)).toBe(0);
      expect(Number.isNaN(tauOf(1.5))).toBe(false);
    });
  });

  describe("Γ/Γ₀ = tanh(τ)", () => {
    it("returns 0 at S=2 (no entanglement → no suppression)", () => {
      expect(ratioOf(2.0)).toBeCloseTo(0, 10);
    });

    it("returns tanh(1) ≈ 0.762 at the Tsirelson bound", () => {
      expect(ratioOf(S_TSIRELSON)).toBeCloseTo(Math.tanh(1), 8);
      expect(ratioOf(S_TSIRELSON)).toBeCloseTo(0.7616, 3);
    });

    it("matches Devin's verified table at S=2.1", () => {
      // Devin verified: Γ/Γ₀ = 0.310 at S=2.1
      expect(ratioOf(2.1)).toBeCloseTo(0.310, 2);
    });

    it("matches Devin's verified table at S=2.3", () => {
      // Devin verified: Γ/Γ₀ = 0.514 at S=2.3
      expect(ratioOf(2.3)).toBeCloseTo(0.514, 2);
    });

    it("matches Devin's verified table at S=2.5", () => {
      // Devin verified: Γ/Γ₀ = 0.635 at S=2.5
      expect(ratioOf(2.5)).toBeCloseTo(0.635, 2);
    });

    it("is always < 1 (always below Markovian baseline)", () => {
      const testValues = [2.0, 2.1, 2.3, 2.5, 2.7, S_TSIRELSON];
      for (const S of testValues) {
        expect(ratioOf(S)).toBeLessThan(1);
      }
    });

    it("is monotonically increasing on [2, 2√2]", () => {
      const values = [2.0, 2.1, 2.2, 2.3, 2.5, 2.7, S_TSIRELSON];
      for (let i = 1; i < values.length; i++) {
        expect(ratioOf(values[i])).toBeGreaterThan(ratioOf(values[i - 1]));
      }
    });
  });

  describe("Γ (Hz) = ratio × Γ₀", () => {
    it("returns 0 Hz at S=2", () => {
      expect(ratioOf(2.0) * GAMMA0_HZ).toBeCloseTo(0, 5);
    });

    it("returns ~477 Hz at S=2.1 (Devin's table)", () => {
      const gammaHz = ratioOf(2.1) * GAMMA0_HZ;
      expect(gammaHz).toBeCloseTo(477, -1); // within 10 Hz
    });

    it("returns ~1173 Hz at Tsirelson bound (Devin's table)", () => {
      const gammaHz = ratioOf(S_TSIRELSON) * GAMMA0_HZ;
      expect(gammaHz).toBeCloseTo(1173, -1); // within 10 Hz
    });
  });

  describe("Falsification criterion", () => {
    it("Γ/Γ₀ < 0.9 for all S < 2.3 (prediction is falsifiable)", () => {
      // If measured Γ/Γ₀ > 0.9 for S < 2.3, F11 is falsified
      const weakViolationValues = [2.05, 2.1, 2.15, 2.2, 2.25, 2.29];
      for (const S of weakViolationValues) {
        expect(ratioOf(S)).toBeLessThan(0.9);
      }
    });

    it("at S=2.3, predicted ratio is well below 0.9 (0.514)", () => {
      expect(ratioOf(2.3)).toBeLessThan(0.6);
      expect(ratioOf(2.3)).toBeGreaterThan(0.4);
    });
  });

  describe("Suppression percentage", () => {
    it("gives ~69% suppression at S=2.1 (weakest measurable violation)", () => {
      const suppression = (1 - ratioOf(2.1)) * 100;
      expect(suppression).toBeCloseTo(69, 0); // ~69%
    });

    it("gives ~24% suppression at Tsirelson bound", () => {
      const suppression = (1 - ratioOf(S_TSIRELSON)) * 100;
      expect(suppression).toBeCloseTo(24, 0); // ~24%
    });
  });
});
