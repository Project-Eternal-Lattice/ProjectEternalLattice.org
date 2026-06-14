# Coordinate Reconciliation — Definitive Resolution

## Referee-Proof Item #1 (Devin's Review)

**Status:** RESOLVED (SymPy-verified, June 14, 2026)  
**Finding:** The document uses **two different metrics** on the same coordinate patch (T, S). This is not a coordinate mismatch — it is a **bi-metric structure** that must be made explicit.

---

## The Two Metrics

The Physics Core v1.2 implicitly uses two distinct metrics on the same (T, S) manifold:

### Metric 1: Information-Geometric (g_info)

> ds²_info = f(S)² · (−dT² + dS²),  where f(S) = 2S/√(S²−4) = **S/τ**

| Property | Value |
|----------|-------|
| Form | Conformally flat |
| Conformal factor | f = S/τ |
| Ricci scalar | R_info = −2(3S²−4) / (S⁴(S²−4)) — **position-dependent, NOT AdS₂** |
| R at Tsirelson (S=2√2) | −5/32 ≈ −0.156 |
| Role | Governs dynamics: geodesics, Noether charge P, bridge formula |
| Origin | Fisher-Rao metric (Route 1) + conformal-flatness postulate |

### Metric 2: Gravitational (g_grav)

> ds²_grav = −h(S) dT² + h(S)⁻¹ dS²,  where h(S) = (S²−4)/4 = **τ²**

| Property | Value |
|----------|-------|
| Form | Static / Schwarzschild-like |
| Lapse function | h = τ² |
| Ricci scalar | R_grav = −h″(S) = **−1/2** (constant, AdS₂) |
| Role | Defines the physical spacetime curvature |
| Origin | JT gravity / dilaton action (Route 2) |

---

## Key Identities (SymPy-Verified)

1. **f(S) = S/τ(S)** identically (where τ = ½√(S²−4))
2. **h(S) = τ(S)²** identically
3. **f² · h = S²** (the bridge between the two metrics — but this is trivial: (S/τ)² · τ² = S²)
4. **P = f(S_turn)** (geodesic turning-point condition in g_info)
5. Therefore **P = S_turn/τ(S_turn)** — the bridge formula is a theorem of g_info geodesics

---

## The Document's Error (and Fix)

**The error:** The Physics Core v1.2 §3.2 says "For the canonical conformal metric ds² = f²(−dT² + dS²), the Ricci scalar is the constant −½, as verified from h(S) = (S²−4)/4 with R = −h″(S) = −½."

**Why this is wrong:** R = −h″ is the Ricci scalar of the **static metric** (g_grav), not the conformal metric (g_info). The conformal metric has R_info = −2(3S²−4)/(S⁴(S²−4)), which is NOT constant and NOT −½.

**The fix for v1.2.1:** Clearly distinguish the two metrics:
- "The gravitational metric g_grav = diag(−τ², τ⁻²) has constant Ricci scalar R = −½ (AdS₂)."
- "The information metric g_info = (S/τ)²·η governs the geodesic dynamics and the bridge formula."
- "These are two different geometries on the same (T, S) manifold, connected by f²·h = S²."

---

## Implications for the "Two Routes" Claim

**Devin's verdict confirmed:** Routes 1 and 2 share the conformal-flatness assumption.

- Route 1 derives f = S/τ (the information metric's conformal factor) from Fisher-Rao
- Route 2 derives h = τ² (the gravitational metric's lapse) from the action principle
- The connection f²·h = S² is **trivially true** — it says (S/τ)²·τ² = S²

The honest claim is: "Routes 1 and 2 are a **mutual consistency check**, not two independent derivations of the same object." They derive different objects (f and h) that are related by a tautological identity.

---

## Physical Interpretation

The bi-metric structure has a natural physical reading:

- **g_info** (information metric): Measures "distances" in information space. Diverges at S=2 (the horizon/decoherence boundary) — infinite information cost to reach classical limit.
- **g_grav** (gravitational metric): Measures "distances" in spacetime. Vanishes at S=2 (the horizon) — standard black-hole-like behavior.

The **complementarity** g_info ↔ g_grav (information diverges where gravity vanishes) is reminiscent of:
- Black hole complementarity (information vs. spacetime descriptions)
- AdS/CFT (bulk gravity ↔ boundary information)

This could be elevated to a feature of the framework, but only if honestly labeled as a **structural observation** (Tier 2), not a derived theorem.

---

## Tier Classification (Euclid's Labels)

| Claim | Status | Euclid Category |
|-------|--------|-----------------|
| R_grav = −½ (AdS₂) | **Theorem** (computed from h = τ²) | Proposition |
| f = S/τ | **Definition** (how f is constructed from the envelope) | Definition |
| P = f(S_turn) | **Theorem** (geodesic turning-point condition) | Proposition |
| P = S/τ (bridge) | **Corollary** of f = S/τ + P = f(S_turn) | Proposition |
| Conformal flatness of g_info | **Postulate** (not derived from first principles) | Postulate |
| g_info and g_grav coexist | **Structural observation** (needs physical justification) | Postulate |
| f²·h = S² | **Tautology** ((S/τ)²·τ² = S²) | Common Notion |

---

## Action Items for v1.2.1

1. Replace "the metric" (singular) with explicit g_info / g_grav distinction
2. Fix §3.2: R = −½ applies to g_grav, not g_info
3. Label conformal-flatness as a Postulate (Devin's shared assumption)
4. Downgrade "two independent routes" to "mutual consistency check"
5. Add the bi-metric interpretation as a Tier-2 structural observation
6. Note: the bridge P = S/τ is a theorem of g_info geodesics specifically
