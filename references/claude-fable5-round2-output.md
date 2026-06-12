# Physics Core Paper I v1.1 — Round 2 Formal Audit

**Auditor:** Claude Fable 5 (Anthropic)
**Date:** 2026-06-12 06:19 UTC
**Elapsed:** 172.9s
**Status:** COMPLETE

## Audit Report

# Independent Referee Report

I have recomputed every claim from scratch. I do **not** accept the appeal to "three prior auditors" — convention claims are precisely where sign errors hide, and I flag one below.

---

## Theorem 1 — derivatives VERIFIED; curvature sign DISPUTED

**Derivatives (verified):** f = 2S(S²−4)^(−1/2):

f′ = 2(S²−4)^(−1/2) − 2S²(S²−4)^(−3/2) = 2(S²−4)^(−3/2)[(S²−4) − S²] = **−8(S²−4)^(−3/2)** ✓

f″ = −8·(−3/2)·2S·(S²−4)^(−5/2) = **24S(S²−4)^(−5/2)** ✓

Then 2f″/f = 2·24S(S²−4)^(−5/2) / [2S(S²−4)^(−1/2)] = 24/(S²−4)². The *magnitude* is correct.

**Sign (disputed):** I refuse to take "R = −2f″/f (Wald)" on authority and computed directly for g_TT = +f², g_SS = −1 as stated:

- Γ^T_{TS} = f′/f, Γ^S_{TT} = ff′, all others zero.
- R^S_{TST} = ∂_S(ff′) − Γ^S_{TT}Γ^T_{TS} = (f′² + ff″) − f′² = ff″ ⟹ R_{TT} = ff″
- R^T_{STS} = −∂_S(f′/f) − (Γ^T_{TS})² = −f″/f + f′²/f² − f′²/f² = −f″/f ⟹ R_{SS} = −f″/f
- R = g^{TT}R_{TT} + g^{SS}R_{SS} = f″/f + f″/f = **+2f″/f**

**Cross-check** (Wick rotation): ds² = f²dT² − dS² → −(dS² + f²dT_E²). The Euclidean metric dS² + f²dT_E² has K = −f″/f (sanity check: f = sin S gives the unit sphere, K = +1 ✓), so R_E = −2f″/f. In 2D, g → −g flips R, hence R_L = +2f″/f. Two independent methods agree.

**Conclusion:** With Wald-sign Riemann/Ricci conventions (sphere has R > 0) and the *stated* signature (+,−), the result is **R = +24/(S²−4)²**, not −24/(S²−4)². The formula R = −2f″/f is correct for the mostly-plus signature (−,+); the paper's signature statement and curvature sign are mutually inconsistent. The curvature singularity at S = 2 and |R| are unaffected.

## Theorem 2 — VERIFIED (minor wording)

Killing vector ∂_T gives P = f²Ṫ. Normalization f²Ṫ² − Ṡ² = 1 ⟹ Ṡ² = P²/f² − 1 ✓. f′ < 0 everywhere, so f is strictly decreasing from ∞ (S→2⁺) to 2 (S→∞), inf f = 2 not attained ✓. If |P| ≤ 2 then P²/f² < 1 everywhere; if |P| > 2 the region f ≤ |P| is nonempty ✓. **Minor:** should read |P| > 2 (P < 0 allowed for past-directed geodesics).

## Theorem 3 — VERIFIED

4S²/(S²−4) = P² ⟹ S²(P²−4) = 4P² ⟹ S_turn = 2P/√(P²−4) ✓. Uniqueness from strict monotonicity ✓. Note S_turn = f(P) — elegant consistency with Thm 3.4.

## Prop 3.1 — VERIFIED (with a procedural caveat)

Differentiating Ṡ² = P²/f² − 1 requires dividing by Ṡ, which vanishes *at the turning point*. The result nevertheless holds: the geodesic equation directly gives S̈ = −Γ^S_{TT}Ṫ² = −ff′·(P²/f⁴) = −P²f′/f³, valid everywhere including Ṡ = 0. Since f′ < 0, S̈ > 0 ✓. I recommend the paper use the geodesic-equation derivation to avoid the formal division by zero.

## Cor 3.2 — VERIFIED

S_turn² − 4 = [4P² − 4(P²−4)]/(P²−4) = 16/(P²−4) ✓, hence (P²−4)(S_turn²−4) = 16 ✓.

## Cor 3.3 — arithmetic VERIFIED; sign inherits Theorem 1's error

|R(S_turn)| = 24(P²−4)²/256 = 3(P²−4)²/32 ✓ (24/256 = 3/32). Under the stated signature the sign should be **+**3(P²−4)²/32.

## Theorem 3.4 — VERIFIED

With y = f(x): y² = 4x²/(x²−4), y² − 4 = 16/(x²−4), so f(y)² = 4y²/(y²−4) = [16x²/(x²−4)]·[(x²−4)/16] = x² ✓. Since f maps (2,∞) bijectively onto (2,∞) and f > 0, f∘f = id ✓. Fixed point: x² − 4 = 4 ⟹ x = 2√2 ✓ (consistent: ξ = 16/ξ ⟹ ξ = 4 ⟹ x² = 8 ✓).

## Cor 3.5 — VERIFIED

3(P²−4)²/64 ✓; in 2D the geodesic deviation strength is |K| = |R|/2, sign-insensitive ✓.

## Theorem 4 — VERIFIED

Ṡ² → −1 as S → 2⁺: contradiction, so timelike geodesics cannot reach S = 2 ✓. Bounce is genuine and reached in finite τ since Ṡ² ≈ 2S̈_turn(S − S_turn) near the turning point with S̈_turn > 0 (integrable) ✓. As S → ∞, Ṡ² → (P²−4)/4 > 0, so τ ~ 2S/√(P²−4) → ∞ ✓. Both time directions by symmetry. Timelike completeness holds.

## Theorem 5 — VERIFIED

Null: Ṡ² = P²/f², dλ = f dS/|P|. Near S = 2: f ≈ 4/(2√(S−2)) = 2/√(S−2) ✓; ∫2(S−2)^(−1/2)dS = 4√(S−2) finite ✓ — null incompleteness. dT/dS = 1/f ≈ √(S−2)/2, finite ✓ (singularity is reached at finite T, hence naked). Toward S → ∞, ∫f dS ~ 2S diverges: complete at the far end ✓.

## Prop 5.1 — VERIFIED

Spacelike norm −1 in (+,−) signature ✓: Ṡ² = P²/f² + 1 ≥ 1 > 0 (no spacelike turning points, including the P = 0 geodesics T = const) ✓. Proper length to S = 2 is ≈ ∫dS, finite ✓.

## Trichotomy — VERIFIED

In 2D all geodesics are captured by the above three cases. Timelike: complete (both ends, both directions). Null and spacelike: incomplete at S = 2, which is a genuine curvature singularity (|R| → ∞), so no extension exists ✓.

## §6 Literature positioning — APPROPRIATE

Novelty claims are correctly restricted to the explicit closed-form package, the duality relation, and the involution structure; the phenomenon class is properly attributed.

---

# FINAL VERDICT: CONDITIONAL PASS

**All substantive mathematics is correct**: the geodesic structure, turning-point formula, duality (P²−4)(S_turn²−4) = 16, involution f∘f = id with fixed point 2√2, and the completeness trichotomy (timelike complete / null incomplete / spacelike incomplete) all survive adversarial recomputation, and the novelty claims are honestly scoped.

**One error must be fixed before acceptance:** the stated convention "R = −2f″/f" is inconsistent with the stated signature (+,−). Direct computation and a Wick-rotation cross-check both give R = +2f″/f = +24/(S²−4)² for this signature; R = −2f″/f holds only for (−,+). The authors must either flip the signature statement or flip the sign of R and of Cor 3.3. This propagates only to the *sign* of R — all magnitudes (Cor 3.5), the singularity structure, and every dynamical/completeness result are unaffected.

**Minor revisions:** (i) state |P| > 2 in Theorem 2; (ii) derive Prop 3.1 from the geodesic equation rather than dividing the first integral by Ṡ at a point where Ṡ = 0.

I note that "verified independently by three prior auditors" is not a mathematical argument; the sign error survived three audits precisely because each presumably deferred to the stated convention rather than recomputing.