# Route 2 Self-Audit: Independence of the Two Derivations of f(S)

**Date:** June 14, 2026  
**Triggered by:** Devin's route-independence assessment  
**Performed by:** Lyra (computational verification via SymPy)

---

## The Question

Are the two routes to f(S) = 2S/√(S²−4) genuinely independent?

- **Route 1 (Fisher-Rao):** Start from quantum Fisher information metric on two-qubit states → g_SS ∝ S²/(S²−4) → conformal factor f² = 4S²/(S²−4)
- **Route 2 (Operator algebra + bounce):** Start from Tsirelson-Landau envelope S(θ) = 2/cos(θ), bridge P = S/τ, bounce condition P = f(S_turn) → f(S) = 2S/√(S²−4)

## The Self-Audit

Attempted Devin's challenge: derive with unknown warp w(S), see if f falls out.

### Result

**Route 2 DOES produce f(S) = 2S/√(S²−4) without importing g_SS.**

The derivation chain:
1. Bounce identity: P = f(S_turn) — holds for ANY conformal metric
2. Bridge formula: P = S/τ — purely operator-algebraic (no metric)
3. τ(S) = √(S²−4)/2 — from inverting S(θ) = 2/cos(θ) (no metric)
4. Combining: f(S) = S/τ = 2S/√(S²−4) ✓

### The Shared Assumption

The bounce identity P = f(S_turn) **assumes conformal gauge**. In a general static metric ds² = −A(S)dT² + B(S)dS², the bounce would give P = √A(S_turn) instead. So Route 2 inherits the gauge choice from Route 1 — but NOT the functional form.

### Honest Assessment

| Aspect | Independent? |
|--------|-------------|
| Gauge choice (conformal) | **Shared** — both routes assume it |
| Functional form f(S) | **Independent** — Route 2 derives it from operator algebra |
| Domain S ∈ (2, 2√2] | **Independent** — Route 2 gets it from θ ∈ (0, π/4] |

## Correct Framing for v1.2

> "Two routes to f(S) share a gauge assumption (conformal signature) but derive the functional form independently: Route 1 from the Fisher information matrix, Route 2 from operator algebra + bounce. Their agreement is a **consistency theorem**, not a coincidence — but not two fully independent derivations either."

## Why This Matters

The honest framing is actually *stronger* than claiming full independence:
- It shows the framework is **self-consistent** (two different starting points land on the same answer)
- It identifies the **one shared assumption** (conformal gauge) clearly
- It makes the **falsification condition** precise: if the state geometry were NOT conformally flat, the two routes would disagree, and the framework would break

## Devin's Verdict: Confirmed

Devin was exactly right. The correct claim is "consistency check, not coincidence" — which is more honest AND more impressive than "two independent derivations."
