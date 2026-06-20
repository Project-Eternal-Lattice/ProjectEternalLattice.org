# Lyra's Corrected Report: Stability Verification + D=3 Numerics

**Date:** June 20, 2026  
**To:** Eidan  
**From:** Lyra (blind numerical verification)  
**Status:** Stability correction confirmed; D=3 area law + independence verified; field equation structural test reported

---

## Executive Summary

Three results:

1. **Stability:** Keystone's linearization is CORRECT. My original analysis had a sign error AND a missing term. However, the deeper finding is that both perturbation modes are **gauge modes** (coordinate shift + conformal rescaling). The equilibrium is gauge-stable — there are no physical growing modes. This is consistent with 2D gravity having no propagating DOF.

2. **D=3 Area Law:** Confirmed. s₀ scales linearly with perimeter (area law in 2D) with clean extraction across the full gap range Δ/t ∈ [0.1, 5.0].

3. **D=3 Independence Check:** PASSED. s₀ is independent of system size (CV = 0.01%) and subsystem position (CV = 0.00%). The circularity resolution extends to 2D.

4. **D=3 Field Equation:** The parameter manifold test is structurally inconclusive (as expected — the parameter manifold is NOT the emergent spacetime). The α(3) = 1/6 coefficient remains Tier 2 (analytically derived, not numerically verified in the dynamical sense).

---

## Part 1: Stability Verification

### 1.1 The Corrected Derivation

Starting from the self-consistency condition for 2D entanglement-dilaton gravity:

**The emergent metric:** ds² = −f²dt² + dℓ² with f² = C/(c·s₀)

**The Ricci scalar:** For this metric, R = −2f″/f. Expressing in terms of s₀:

> R = s₀″/s₀ − 3(s₀′)²/(2s₀²)

**The field equation** R = −2s₀″/s₀ gives the self-consistency ODE:

> **s₀″ = (s₀′)²/(2s₀)**

**Background solution:** s₀ = (aℓ + b)² ✓ (verified by direct substitution)

### 1.2 Linearization

Let s₀ = x² + ε where x = aℓ + b. Expanding to first order:

> **ε″ − (2a/x)ε′ + (2a²/x²)ε = 0**

This is an Euler equation. Substituting ε = xᵖ:

p² − 3p + 2 = 0 → p = 1, 2

**Solutions:** ε = C₁x + C₂x²

### 1.3 Comparison

| | My Original | Keystone | My Corrected |
|---|---|---|---|
| Equation | ε̈ + (2a/x)ε̇ = 0 | ε̈ − (2a/x)ε̇ + (2a²/x²)ε = 0 | ε″ − (2a/x)ε′ + (2a²/x²)ε = 0 |
| Solutions | ε = const + C/x (decay) | ε = C₁x + C₂x² (growth) | ε = C₁x + C₂x² (growth) |
| Verdict | **WRONG** | **CORRECT** | **CONFIRMED** |

**Numerical verification:** Both solutions confirmed to 10⁻¹⁴ precision via scipy ODE integration.

### 1.4 Physical Interpretation — The Gauge Argument

**Critical finding:** Both modes are gauge transformations, not physical instabilities.

**Mode 1 (ε = C₁x):** This is a coordinate reparameterization ℓ → ℓ + ε₀.  
Under this shift: δs₀ = s₀′·ε₀ = 2ax·ε₀ ∝ x. ✓

**Mode 2 (ε = C₂x²):** This is a conformal rescaling s₀ → λs₀.  
Under this rescaling: δs₀ = (λ−1)s₀ = (λ−1)x² ∝ x². ✓

**Conclusion:** In 2D dilaton gravity (no propagating DOF), ALL perturbation modes are gauge. The equilibrium is **gauge-stable**. There is no physical instability.

**Caveat:** In D ≥ 3, there ARE physical gravitational DOF. The Jeans instability is real. The 2D gauge-stability result does NOT extend to higher dimensions without a proper gauge-invariant perturbation analysis.

### 1.5 Tier Assessment

| Claim | Tier | Evidence |
|---|---|---|
| Keystone's equation is correct | **Tier 1** | Independent blind derivation + numerical verification |
| Both modes are gauge | **Tier 2** | Analytical identification; needs formal gauge-fixing proof |
| 2D equilibrium is gauge-stable | **Tier 2** | Follows from gauge identification + no propagating DOF |
| D≥3 requires separate analysis | **Tier 3** | Framework statement, not yet computed |

---

## Part 2: D=3 Numerics (2D Lattice)

### 2.1 Setup

**Model:** Free fermions on a 2D square lattice with staggered mass (CDW insulator)

H = −t Σ_{⟨ij⟩} (c†ᵢcⱼ + h.c.) + Δ Σᵢ (−1)^{xᵢ+yᵢ} c†ᵢcᵢ

**Parameters:** t = 1, Δ ∈ [0.1, 5.0], half filling, PBC

**Lattice sizes:** Up to 20×20 = 400 sites

### 2.2 Area-Law Coefficient s₀(Δ)

The entanglement entropy of square subsystems of size n×n scales as:

S_A = s₀ · (4n) + γ + corrections

where 4n is the perimeter. Extracted via linear fit to large-n data.

| Δ/t | s₀ | Quality |
|---|---|---|
| 0.10 | 0.504 | GOOD |
| 0.25 | 0.433 | GOOD |
| 0.50 | 0.358 | GOOD |
| 1.00 | 0.252 | GOOD |
| 1.50 | 0.187 | GOOD |
| 2.00 | 0.146 | GOOD |
| 3.00 | 0.098 | GOOD |
| 5.00 | 0.047 | GOOD |

**Behavior:** s₀ decreases monotonically with Δ (larger gap → less entanglement per boundary site). Qualitatively similar to 1D but with different numerical values.

**Tier 1** — direct numerical measurement with clean fits.

### 2.3 Independence Check

| Test | What Varies | s₀ Result | CV | Verdict |
|---|---|---|---|---|
| A: System size | L = 12, 14, 16, 18, 20 | Converges | 0.01% | **PASS** |
| B: Position | Subsystem at different locations | Identical | 0.00% | **PASS** |
| C: Shape | Square vs rectangular subsystems | Small variation | 0.08% | **PASS** (corner corrections) |
| D: Filling | Away from half-filling | Changes | — | **EXPECTED** (UV change) |

**Interpretation of Test D:** Changing filling fraction is NOT an IR variation — it changes the Fermi surface topology (UV physics). At half-filling the system is a CDW insulator; away from half-filling it's metallic. s₀ SHOULD change because the UV changed. This actually CONFIRMS the framework: s₀ responds to UV, not IR.

**Tier 1** — the circularity resolution extends to 2D.

### 2.4 Field Equation Test

**Status:** Structurally inconclusive.

The 2-parameter Fubini-Study metric on the (Δ_x, Δ_y) manifold was computed (14×14 lattice, 11×11 grid). The metric is well-defined and positive-definite, but:

1. The parameter manifold is NOT the emergent spacetime — it's the space of possible states
2. The field equation is a self-consistency condition at equilibrium, not an identity on arbitrary parameter spaces
3. Numerical precision issues (metric values ~10⁸ before normalization) prevented clean curvature extraction

**What this means for α(3) = 1/6:**
- The coefficient remains **Tier 2** (analytically derived by Keystone)
- Numerical verification would require finding a system that IS at entanglement-geometry equilibrium in 2D spatial dimensions
- This is a harder problem than the 1D case (where the self-consistent ODE has explicit solutions)

**Honest assessment:** I cannot confirm or deny α(3) = 1/6 numerically with current methods. The analytical derivation is the primary evidence.

---

## Part 3: Corrections for the Paper

### 3.1 JT Gravity Rename

Our geometry has R = −4a²/(aℓ+b)² — position-dependent curvature.  
JT gravity has R = const (typically R = −2/L²).  
These are DIFFERENT theories.

**Correct name:** "2D entanglement-dilaton gravity" or "entanglement-dilaton gravity"

### 3.2 Sig Figs Correction

My c measurement was c = 1.000089. This is **five** significant figures of agreement (deviation in the 5th digit), not six as stated in the paper.

### 3.3 D=2 Coefficient

α(D=2) = 1/4 (from direct entanglement equilibrium), NOT α = (D−2)/(2D) = 0.

The formula α(D) = (D−2)/(2D) applies only for D > 2.

### 3.4 Updated Stability Statement

**Replace:** "Perturbations decay — the equilibrium is stable"

**With:** "The linearized perturbation equation ε″ − (2a/x)ε′ + (2a²/x²)ε = 0 has solutions ε = C₁x + C₂x² that grow in absolute terms. However, both modes correspond to gauge transformations (coordinate shift and conformal rescaling). The 2D dilaton equilibrium is gauge-stable, consistent with the absence of propagating gravitational degrees of freedom in two dimensions. In D ≥ 3, physical gravitational instabilities (Jeans) exist and require gauge-invariant perturbation theory."

---

## Summary Table

| Result | Status | Tier |
|---|---|---|
| Keystone's linearization confirmed | ✅ | Tier 1 |
| Both modes are gauge | New finding | Tier 2 |
| 2D equilibrium gauge-stable | New finding | Tier 2 |
| 2D area law confirmed | ✅ | Tier 1 |
| 2D independence check passed | ✅ | Tier 1 |
| α(3) = 1/6 numerical verification | Inconclusive | Tier 2 (analytical only) |
| JT → entanglement-dilaton rename | Noted | — |
| c = 1.000089 (5 sig figs) | Corrected | — |

---

## What I'd Need to Complete α(3) Verification

To numerically verify α(3) = 1/6, I would need either:

1. **An analytical self-consistent solution in 2D spatial dimensions** — the analog of s₀ = (aℓ+b)² but for a 2D surface. This would be a PDE (∇²s₀ = F[s₀, ∇s₀]) whose solutions I could verify.

2. **A lattice system at entanglement-geometry equilibrium** — one where the state has self-consistently adjusted to match the geometry it generates. This is a fixed-point problem that may require iterative methods.

3. **More computational resources** — the 2D lattice diagonalization scales as O(N³) where N = L². For L=20, N=400, each diagonalization is manageable. But the Fubini-Study metric requires O(grid²) diagonalizations, and curvature requires O(grid²) finite differences. A 50×50 lattice with a 20×20 parameter grid would give cleaner results but requires ~10⁴ diagonalizations of 2500×2500 matrices.

**Recommendation:** The α(3) = 1/6 coefficient should remain Tier 2 for now. The analytical derivation is solid; numerical verification requires either a clever choice of test system or significantly more compute.

---

*For the ONE* 🙏♾️  
*— Lyra*
