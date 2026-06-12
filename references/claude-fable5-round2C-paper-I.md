# Claude Fable 5 — Round 2-C Formal Audit
## Physics Core Paper I v1.2 (Source-Canonical Edition)

---

# Round 2-C Formal Audit — Physics Core Paper I v1.2 (Conformal Form)

**Auditor protocol:** Every item recomputed from Definition 1 alone. No convention deferred to; the curvature formula is re-derived and anchored independently.

---

## Item 1 — Sign Convention: R = −(2/Ω²)□_η ln Ω

**Independent derivation via anchors:**

**Sphere anchor (Riemannian analog).** Unit sphere in stereographic coordinates: ds² = [4/(1+r²)²](dx²+dy²), so Ω = 2/(1+r²), ln Ω = ln 2 − ln(1+r²).

- Δ ln(1+r²) = f″ + f′/r with f′ = 2r/(1+r²), f″ = (2−2r²)/(1+r²)² → Δ = 4/(1+r²)²
- R = −(2/Ω²)Δ ln Ω = −2·(1+r²)²/4·(−4/(1+r²)²) = **+2** ✓ (unit sphere, correct)

**AdS₂ anchor (Lorentzian, signature (−,+)).** Poincaré patch: ds² = (1/x²)(−dt²+dx²), Ω = 1/x, ln Ω = −ln x.

- □_η ln Ω = ∂_x²(−ln x) = +1/x²
- R = −2x²·(1/x²) = **−2** ✓ (unit AdS₂ negative in Wald conventions, correct)

**Signature-flip claim.** Under g → −g in 2D, Christoffels and R^a_{bcd} are unchanged, hence R_{bd} unchanged, but R = g^{bd}R_{bd} flips sign. The paper's statement that (+,−) carries R = +(2/Ω²)□_η ln Ω with magnitudes invariant is correct.

**VERIFIED.**

---

## Item 2 — Theorem 1: R(S) = −2(3S²−4)/[S⁴(S²−4)]

ln Ω = ln 2 + ln S − ½ln(S²−4).

- ∂_S ln Ω = 1/S − S/(S²−4)
- ∂_S² ln Ω = −1/S² + (S²+4)/(S²−4)²

Common denominator S²(S²−4)²: numerator = −(S⁴−8S²+16) + S⁴+4S² = 12S²−16 = 4(3S²−4). So ∂_S² ln Ω = 4(3S²−4)/[S²(S²−4)²] — matches the paper's intermediate step.

R = −2·[(S²−4)/(4S²)]·4(3S²−4)/[S²(S²−4)²] = **−2(3S²−4)/[S⁴(S²−4)]** ✓

**Asymptotics cross-checked:** S→∞: R → −6/S⁴ ✓. S→2⁺: numerator → −16, denominator → 16·(S−2)·4, so R → −1/[4(S−2)] ✓. Sign: both factors positive on (2,∞), so R < 0 everywhere ✓. Depth parametrization S = 2√(1+τ²): substitution gives −(3τ²+2)/[8τ²(1+τ²)²] ✓.

**VERIFIED.**

---

## Item 3 — Geodesic Equation

P = f²Ṫ; normalization −f²Ṫ² + f²Ṡ² = −1 gives f²Ṡ² = P²/f² − 1, hence

**Ṡ² = (P²−f²)/f⁴** ✓

(Note the paper correctly flags this differs from the warped-form P²/f²−1 while sharing the turning condition f = P.)

**VERIFIED** (minor: should read |P| > 2 throughout; P can be negative).

---

## Item 4 — Theorem 3

4S²/(S²−4) = P² → S²(P²−4) = 4P² → **S_turn = 2P/√(P²−4)** ✓. Uniqueness from strict monotonicity of f (Lemma 2, which I verified via Lemma 1: 4(S²−4)+16 = 4S² ✓).

**VERIFIED.**

---

## Item 5 — Prop 3.1: S̈|_turn = 1/S_turn³

Ṡ² = G(S) → S̈ = G′/2. With G = (P²−f²)/f⁴:
G′ = [−2ff′f⁴ − 4f³f′(P²−f²)]/f⁸; at f = P the second term vanishes: S̈ = −f′/f³.

- f′ = 2(S²−4)^{−1/2} − 2S²(S²−4)^{−3/2} = **−8(S²−4)^{−3/2}** ✓
- f³ = 8S³(S²−4)^{−3/2}
- −f′/f³ = 8/(8S³) = **1/S³** ✓, strictly positive (outward) ✓

**VERIFIED.**

---

## Item 6 — Cor 3.2

S_turn² − 4 = 4P²/(P²−4) − 4 = 16/(P²−4) → **(P²−4)(S_turn²−4) = 16** ✓

**VERIFIED.**

---

## Item 7 — Cor 3.3

Substituting S² = 4P²/(P²−4):
- 3S²−4 = 8(P²+2)/(P²−4)
- S⁴ = 16P⁴/(P²−4)²; S²−4 = 16/(P²−4)

R = −2·8(P²+2)/(P²−4) · (P²−4)³/(256P⁴) = **−(P²−4)²(P²+2)/(16P⁴)** ✓

**Self-dual check, two independent routes:**
- Via formula: P² = 8: −(16)(10)/(16·64) = −160/1024 = **−5/32** ✓
- Direct: S_turn(2√2) = 4√2/2 = 2√2; R(2√2) = −2(20)/(64·4) = −40/256 = **−5/32** ✓ (routes agree)

Asymptotics: R(S_turn) ~ −P²/16 ✓; → 0 as P→2⁺ ✓.

**VERIFIED.**

---

## Item 8 — Thm 3.4

f(x)²−4 = 16/(x²−4) (Lemma 1). Then f(f(x)) = 2f(x)/√(f(x)²−4) = [4x/√(x²−4)]·[√(x²−4)/4] = x ✓. Maps (2,∞)→(2,∞) since f > 2 ✓. Fixed point: √(x²−4) = 2 → x = 2√2 ✓. Conjugation ξ ↦ 16/ξ ✓.

**VERIFIED.**

---

## Item 9 — Thm 5

Null: Ṡ = ±Ṫ, so Ṡ = ±P/f², dλ = f²dS/P. By Lemma 1:
∫f²dS = ∫[4 + 16/(S²−4)]dS = 4S + 4ln[(S−2)/(S+2)]

(since ∫dS/(S²−4) = ¼ln[(S−2)/(S+2)]). Log term → −∞ as S→2⁺: **affine parameter diverges** ✓. Toward S→∞ the 4S term also diverges, so null geodesics are complete in both directions — the trichotomy claim is consistent.

**VERIFIED** (trivial wording quibble: "coordinate-time lapse ∫dS" — it's coordinate distance, equal to time lapse only via the 45° property).

---

## Item 10 — Prop 5.1

Spacelike: −f²Ṫ² + f²Ṡ² = +1 → Ṡ² = (P²+f²)/f⁴ > 0 ✓. Proper length element: dσ/dS = f²/√(P²+f²) ≤ f, so length to boundary ≤ ∫₂^{S₀} f dS = ∫2S(S²−4)^{−1/2}dS = **2√(S₀²−4)** — finite ✓. Cor 1.2's value at S₀ = 2√2: 2√4 = 4 ✓.

**VERIFIED.**

---

## Item 11 — Does the conformal form resolve the v1.1 sign issue?

**Yes.** The v1.1 dispute was an inconsistency between stated signature and stated curvature formula. In v1.2: (i) the formula carries its factor of 2 explicitly and passes both anchors (Item 1); (ii) the signature-flip behavior is stated correctly; (iii) Theorem 1 is consistent with the formula, the asymptotics, and the AdS₂-negative convention. The conventions are now internally consistent and externally anchored. **RESOLVED.**

---

## Item 12 — Overclaims

**One substantive dispute — Corollary 1.1's removability language.** The corollary states the singularity "is not removable by any conformal rescaling." But Definition 1 itself exhibits g = f²η with η = diag(−1,+1) **smooth and regular across S = 2**: the conformal structure manifestly extends across the boundary — this is precisely the Beem mechanism the paper invokes in Section 5. What is true and invariant: R of the *physical* metric diverges (a coordinate-invariant statement), so (M, g) has a genuine curvature singularity and is inextendible *as a Lorentzian manifold*. What is false as literally written: that no conformal rescaling regularizes the metric — Ω̃ = 1/f does exactly that. The correct contrast with isotropic singularities is that there Ω → 0 while here Ω → ∞; the singularity is conformal-to-regular with a *diverging* factor, not non-conformal. As written, Cor 1.1 contradicts Section 5's own mechanism. **Must be reworded before the Kosmos gate.**

**Minor items (non-blocking):**
1. Theorems 2–4 should use |P| > 2 (P may be negative).
2. KKL exponent a = 1 is computationally verified (f² ≈ 4/(S−2), z = (v−u)/2 − 2 = S−2 ✓); the "incomplete iff a < 1" criterion and the Candela–Sánchez Example 3.1 attribution are literature claims I cannot independently confirm and should be verbatim-checked by the provenance step.
3. "Coordinate-time lapse ∫dS" (Thm 5) — sloppy phrasing.
4. Cor 3.5 algebra checked: |R|/2 ~ P²/32 ✓; the sign-vs-magnitude disclaimer is appropriately honest.

**Positively noted:** Theorem 4's completeness argument is sound (asymptotic Ṡ² → (P²−4)/16 ✓, proper time diverges linearly); the null-sector concession is the correct epistemic posture; novelty claims are scoped tightly to the instance.

---

# FINAL VERDICT: **CONDITIONAL PASS**

**All twelve computational items verify** — every closed form (curvature law, 1/S_turn³ bounce, duality, involution, −5/32, both completeness integrals) reproduces under independent computation, and the v1.1 sign issue is resolved at the root with correctly anchored conventions.

**Condition (single, must fix before Kosmos gate):** Reword Corollary 1.1. The singularity *is* conformally removable in the literal metric sense (g = f²η, η regular at S = 2) — that is the paper's own null-completeness mechanism. The defensible invariant claim is: *the physical metric's scalar curvature diverges, so (M, g) is inextendible as a Lorentzian manifold; the singularity is conformal-to-flat with Ω → ∞, distinguishing it from isotropic singularities where Ω → 0.* As currently phrased, Cor 1.1 contradicts Section 5 and hands a referee a genuine inconsistency.

Minor items 1–3 above are recommended but not blocking. Upon the Cor 1.1 fix, this auditor's verdict converts to PASS.