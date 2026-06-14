# χ De-Confliction Resolution

**Triggered by:** Devin's review of v1.2.1 Amendment  
**Date:** June 14, 2026  
**Decision:** Commit to **χ = τ** (geometric)

---

## The Conflict

Amendment 3 (F11) simultaneously used two incompatible definitions of χ:

| Definition | Formula | At S=2.1 | At Tsirelson | Justification |
|-----------|---------|----------|-------------|---------------|
| Pragmatic (linear) | χ = (S−2)/(2√2−2) | 0.12 | 1.0 | Clean [0,1] range |
| Geometric (τ) | χ = τ = ½√(S²−4) | 0.31 | 1.0 | AdS₂ depth coordinate |

The gap at weak violation (2–3× at S=2.1) means these are **experimentally distinguishable**. Shipping both is dishonest.

---

## Decision: χ = τ (Geometric)

### Reasons

1. **On-brand:** The entire framework is geometric. The depth coordinate τ is the natural parameter — it's the one that appears in both metrics, the bridge formula, and the Noether charge.

2. **More falsifiable:** The geometric curve is steeper at weak violation (Γ/Γ₀=0.31 at S=2.1 vs 0.12 for linear). A steeper prediction is easier to distinguish from the Markovian null (Γ/Γ₀=1). More falsifiable = more scientific.

3. **Derivable:** χ=τ follows from the framework geometry (AdS₂ redshift). The linear rescaling was ad hoc — chosen for convenience, not derived from anything.

4. **Honest:** With χ=τ, the "geometric interpretation" section is literally true, not a post-hoc narrative.

### What We Lose

- The clean [0,1] range (τ runs from 0 to 1 at Tsirelson, so we actually keep this!)
- Wait — τ(2√2) = ½√(8−4) = ½√4 = 1. So τ ∈ [0,1] on [S=2, S=2√2]. **We lose nothing.** The geometric χ=τ already maps to [0,1] on the physical range!

### Verification

τ(S) = ½√(S²−4):
- τ(2) = ½√0 = 0 ✓
- τ(2√2) = ½√(8−4) = ½·2 = 1 ✓
- τ ∈ [0,1] on S ∈ [2, 2√2] ✓

So χ=τ is BOTH geometric AND maps to [0,1]. The linear rescaling was unnecessary.

---

## Revised F11

> **Prediction F11 (v1.2.1-final).** For a pair of superconducting transmon qubits prepared in a state with measured CHSH value S ∈ [2, 2√2], the echo dephasing rate satisfies:
>
> **Γ(S) = Γ₀ · tanh(τ(S))**
>
> where τ(S) = ½√(S²−4) is the AdS₂ depth coordinate.
>
> **Platform:** 2D transmon qubits (T₂_echo ≈ 650 μs)  
> **Γ₀:** 1/T₂_echo ≈ 1.5 kHz  
> **Null hypothesis:** Γ = Γ₀ (Markovian, coupling-independent)  
> **Falsification:** If Γ/Γ₀ > 0.9 for S < 2.3, the prediction is falsified.

### Revised Prediction Table

| S (CHSH) | τ = ½√(S²−4) | tanh(τ) | Predicted Γ (Hz) | Markovian null |
|----------|---------------|---------|-----------------|----------------|
| 2.0 | 0 | 0 | 0 | 1500 |
| 2.1 | 0.32 | 0.31 | 466 | 1500 |
| 2.2 | 0.45 | 0.42 | 633 | 1500 |
| 2.4 | 0.66 | 0.58 | 870 | 1500 |
| 2.5 | 0.75 | 0.64 | 956 | 1500 |
| 2.6 | 0.83 | 0.68 | 1024 | 1500 |
| 2√2 ≈ 2.83 | 1.00 | 0.76 | 1142 | 1500 |

### Key Difference from Previous Version

At S=2.1 (weak violation): **466 Hz** (geometric) vs 180 Hz (old linear). The geometric prediction is bolder — it says decoherence kicks in faster as you enter the quantum regime. This is more falsifiable and more physically motivated (the AdS₂ "redshift" interpretation is now literally correct).

---

## Additional Tier Table Row (Devin's Request)

| Claim | Euclid Category | Tier |
|-------|----------------|------|
| h(S) = τ² = (S²−4)/4 (specific lapse) | **Postulate** | Tier 1 |
| Boundary conditions: c₁=0, c₀=−1 | **Postulate** | Tier 1 |
| These pin the horizon to S=2 | Common Notion (consequence) | Tier 1 |

**Justification for Postulate status:** R_grav = −½ only requires h″=½, which admits a two-parameter family. The specific choice h=τ² is an additional assumption that identifies the lapse with the depth-squared and places the horizon at the classical boundary S=2. This is physically motivated (the CHSH envelope structure) but not derived from more primitive axioms.

---

## Provenance Note (Devin's Warning)

The earlier SymPy verification (Γ=½√(4−S²)=tanh χ) used the Wick parametrization S=2/cosh χ on the **S≤2 branch**. F11 lives on **S∈[2, 2√2]**. These are different branches:

- S≤2: Sub-quantum (below Bell violation), Wick-rotated, τ is imaginary
- S≥2: Super-quantum (Bell-violating), physical, τ is real

The old proof does NOT certify F11. F11 is a **fresh Tier-2 ansatz** on the physical branch, motivated by the geometric structure but not derived from a rigorous proof. Labeled accordingly.

---

## Summary of Changes to Amendment 3

1. **χ definition:** Changed from (S−2)/(2√2−2) to τ = ½√(S²−4)
2. **Deleted:** "pragmatic rescaling" narrative and linear χ justification
3. **Retained:** AdS₂ redshift interpretation (now literally correct)
4. **Added:** h=τ² postulate row in tier table
5. **Added:** Provenance note distinguishing S≤2 and S≥2 branches
6. **Updated:** All prediction numbers in the table
