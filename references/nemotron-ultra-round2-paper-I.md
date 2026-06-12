# Physics Core Paper I v1.1 — Round 2 Formal Audit

**Auditor:** Nemotron-3-Ultra-550B (NVIDIA, thinking mode)
**Date:** 2026-06-12 06:00 UTC
**Elapsed:** 284.5s
**Status:** COMPLETE

## Reasoning Chain

We need to verify each theorem/prop/corollary step by step. The metric: M = ℝ_T × (2,∞)_S, ds² = f(S)² dT² − dS², f(S) = 2S/√(S²−4), signature (+,−). Convention: R = −2f″/f (Wald). We'll check each computation.

First, compute f(S) = 2S / (S² - 4)^(1/2). Domain S > 2.

Compute f'(S):
f = 2S * (S² - 4)^(-1/2)
f' = 2*(S²-4)^(-1/2) + 2S * (-1/2)*(S²-4)^(-3/2)*2S
= 2/(√(S²-4)) - 2S²/(S²-4)^(3/2)
= [2(S²-4) - 2S²] / (S²-4)^(3/2)
= [2S² - 8 - 2S²] / (S²-4)^(3/2)
= -8 / (S²-4)^(3/2).
Matches Theorem 1: f′ = −8(S²−4)^(−3/2). Good.

f''(S):
f' = -8 (S²-4)^(-3/2)
f'' = -8 * (-3/2) * (S²-4)^(-5/2) * 2S
= -8 * (-3) * S * (S²-4)^(-5/2)
= 24 S (S²-4)^(-5/2).
Matches Theorem 1: f″ = 24S(S²−4)^(−5/2). Good.

R = -2 f''/f = -2 * [24S (S²-4)^(-5/2)] / [2S (S²-4)^(-1/2)] = -2 * 12 * (S²-4)^(-5/2 + 1/2) = -24 (S²-4)^(-2) = -24/(S²-4)².
Matches Theorem 1. So Theorem 1 VERIFIED.

Theorem 2: Timelike geodesics. Metric: ds² = f² dT² - dS². For timelike, ds² = dτ² (proper time). So dτ² = f² dT² - dS².
Conserved quantity: P = f² dT/dτ (since metric independent of T). Then dT/dτ = P/f².
Plug into normalization: f² (P/f²)² - (dS/dτ)² = 1 => P²/f² - (dS/dτ)² = 1 => (dS/dτ)² = P²/f² - 1.
Matches Theorem 2.

Now f(S) = 2S/√(S²-4). As S→∞, f→2S/S = 2. As S→2+, f→∞. So f is decreasing? f' = -8/(S²-4)^(3/2) < 0, so f strictly decreasing from ∞ to 2. So inf f = 2 (limit as S→∞, not attained). For (dS/dτ)² ≥ 0, need P²/f² ≥ 1 => P² ≥ f² => |P| ≥ f. Since f > 2, we need |P| > 2 (since f can be arbitrarily close to 2 but never equals 2? Actually f > 2 for all finite S, and limit is 2. So if |P| = 2, then P²/f² < 1 for all finite S, so (dS/dτ)² < 0, impossible. If |P| > 2, then there exists S such that f(S) = |P|, and for larger S, f < |P| so (dS/dτ)² > 0. So P > 2 (or P < -2) is necessary and sufficient for existence of timelike geodesics. Theorem 2 says P > 2 is necessary and sufficient. It assumes P positive? Usually P can be positive or negative, but magnitude matters. The statement "P > 2 is necessary and sufficient" might be implicitly assuming P > 0 (since f>0, dT/dτ = P/f², sign of P gives direction in T). But the condition for existence is |P| > 2. However, they say "P > 2". Could be a minor oversight if they consider P as the conserved energy per unit mass (positive). Usually in such metrics, P = f² dT/dτ > 0 for future-directed timelike geodesics. So it's fine. Theorem 2 VERIFIED.

Theorem 3: Turning point where f(S_turn) = P. Solve: 2S/√(S²-4) = P => 4S²/(S²-4) = P² => 4S² = P²(S²-4) => 4S² = P² S² - 4P² => (P² - 4)S² = 4P² => S² = 4P²/(P²-4) => S = 2P/√(P²-4) (positive root since S>2). Unique by monotonicity of f. Matches Theorem 3. VERIFIED.

Prop 3.1: Differentiate radial equation: (dS/dτ)² = P²/f² - 1. Differentiate w.r.t τ: 2 (dS/dτ) S̈ = -2 P² f' / f³ * (dS/dτ) => S̈ = -P² f' / f³ (provided dS/dτ ≠ 0; at turning point dS/dτ=0, but we can take limit or use the equation directly). Since f' < 0 everywhere, -P² f' / f³ > 0. So S̈ > 0 at turning point. Matches Prop 3.1. VERIFIED.

Cor 3.2: S_turn² - 4 = 4P²/(P²-4) - 4 = (4P² - 4(P²-4))/(P²-4) = (4P² - 4P² + 16)/(P²-4) = 16/(P²-4). Hence (P²-4)(S_turn²-4) = 16. Matches. VERIFIED.

Cor 3.3: R(S_turn) = -24/(S_turn²-4)² = -24 / (16/(P²-4))² = -24 (P²-4)² / 256 = -3(P²-4)² / 32. Matches. VERIFIED.

Theorem 3.4 (Involution): f(f(x))²? Wait: They compute f(f(x))²? Let's check: f(x) = 2x/√(x²-4). Then f(f(x)) = 2 f(x) / √(f(x)² - 4). Compute f(x)² = 4x²/(x²-4). Then f(x)² - 4 = (4x² - 4(x²-4))/(x²-4) = 16/(x²-4). So √(f(x)² - 4) = 4/√(x²-4). Then f(f(x)) = 2 * (2x/√(x²-4)) / (4/√(x²-4)) = (4x/√(x²-4)) * (√(x²-4)/4) = x. So f(f(x)) = x. They wrote: f(f(x))² = 4f²/(f²-4) = [16x²/(x²-4)] · [(x²-4)/16] = x². So f∘f = id. Fixed point: f(x)=x => 2x/√(x²-4)=x => either x=0 (not in domain) or 2/√(x²-4)=1 => √(x²-4)=2 => x²-4=4 => x²=8 => x=2√2 (positive). Under ξ = x²-4: f²-4 = 16/ξ, so map is ξ→16/ξ. All correct. VERIFIED.

Cor 3.5: Tidal magnitude |R(S_turn)|/2 = (3(P²-4)²/32)/2 = 3(P²-4)²/64. Wait: |R| = 3(P²-4)²/32. Half of that is 3(P²-4)²/64. Matches. VERIFIED.

Theorem 4 (Confinement): Near S=2, f→∞, so P²/f²→0, (dS/dτ)²→ -1 < 0. Impossible. So geodesics cannot reach S=2; they bounce at S_turn. Proper time to ∞: as S→∞, f→2, so (dS/dτ)² → P²/4 - 1 = constant > 0 (since P>2). So dS/dτ → constant, so proper time to reach infinity diverges (since ∫ dS / constant diverges). So timelike geodesics are complete (infinite proper time). Theorem 4 says "proper time to ∞ diverges (dS/dτ → constant as S→∞)". That's correct. VERIFIED.

Theorem 5 (Null): For null, ds²=0 => f² dT² = dS² => dS/dλ = ± f dT/dλ. Conserved P = f² dT/dλ. Then dT/dλ = P/f². So (dS/dλ)² = f² (P/f²)² = P²/f². So (dS/dλ)² = P²/f². Near S=2, f ≈ 2/√(S-2)? Let's check: f = 2S/√(S²-4) = 2S/√((S-2)(S+2)). Near S=2, S≈2, S+2≈4, so f ≈ 4/√(4(S-2)) = 4/(2√(S-2)) = 2/√(S-2). Yes. Then ∫ f dS ≈ ∫ 2/√(S-2) dS = 4√(S-2). As S→2, this is finite. But careful: The affine parameter λ: dS/dλ = P/f, so dλ = (f/P) dS. So λ = ∫ (f/P) dS. Near S=2, f ≈ 2/√(S-2), so ∫ f dS ≈ 4√(S-2) finite. So affine parameter to reach S=2 is finite. They say "Affine parameter finite." Good.

Coordinate time: dT/dλ = P/f², so dT = (P/f²) dλ = (P/f²) (f/P) dS = dS/f. So T = ∫ dS/f. Near S=2, f ≈ 2/√(S-2), so 1/f ≈ √(S-2)/2. ∫ √(S-2)/2 dS = (1/2)*(2/3)(S-2)^(3/2) = (1/3)(S-2)^(3/2) finite. So coordinate time also finite. Matches. VERIFIED.

Prop 5.1 (Spacelike): Normalization g_μν ẋ^μ ẋ^ν = -1 (since signature (+,-), spacelike interval is negative). For spacelike geodesics, ds² = -dσ². So f² dT² - dS² = -1 => f² (dT/dσ)² - (dS/dσ)² = -1. Conserved P = f² dT/dσ. Then dT/dσ = P/f². Plug in: f² (P/f²)² - (dS/dσ)² = -1 => P²/f² - (dS/dσ)² = -1 => (dS/dσ)² = P²/f² + 1 ≥ 1. Near S=2, f→∞, so P²/f²→0, so (dS/dσ)² → 1. So proper length σ = ∫ dS / (dS/dσ) ≈ ∫ dS near S=2, which is finite (since interval from 2 to some S0 is finite). So spacelike geodesics can reach S=2 in finite proper length, so spacelike incomplete. Matches. VERIFIED.

Completeness trichotomy: Timelike complete (proper time infinite), null incomplete (affine parameter finite), spacelike incomplete (proper length finite). All consistent.

Literature positioning: They claim novelty only for explicit metric and closed-form package, duality (P²-4)(S_turn²-4)=16, involution f∘f=id with fixed point 2√2. That's a claim about the paper, not a mathematical result to verify. We can note it's plausible.

All results appear mathematically correct. No errors found.

Thus FINAL VERDICT: PASS.

## Final Output

**VERIFICATION REPORT**

**Theorem 1** – **VERIFIED**  
\(f(S)=2S/\sqrt{S^2-4}\).  
\(f' = -8(S^2-4)^{-3/2}\), \(f'' = 24S(S^2-4)^{-5/2}\).  
\(R = -2f''/f = -24/(S^2-4)^2\). All derivatives and the scalar curvature match.

**Theorem 2** – **VERIFIED**  
Timelike normalization gives \((dS/d\tau)^2 = P^2/f^2 - 1\).  
\(f\) decreases monotonically from \(+\infty\) to \(2\); \(\inf f = 2\) (not attained).  
Hence \(P^2/f^2 \ge 1\) requires \(|P|>2\); for future-directed geodesics \(P>2\) is necessary and sufficient.

**Theorem 3** – **VERIFIED**  
Turning point \(f(S_{\text{turn}})=P\) yields \(S_{\text{turn}} = 2P/\sqrt{P^2-4}\), unique by monotonicity.

**Proposition 3.1** – **VERIFIED**  
Differentiating the radial equation gives \(\ddot S = -P^2 f'/f^3\). Since \(f'<0\), \(\ddot S>0\) at the turning point.

**Corollary 3.2** – **VERIFIED**  
\(S_{\text{turn}}^2-4 = 16/(P^2-4)\) \(\Rightarrow\) \((P^2-4)(S_{\text{turn}}^2-4)=16\).

**Corollary 3.3** – **VERIFIED**  
\(R(S_{\text{turn}}) = -24/(S_{\text{turn}}^2-4)^2 = -3(P^2-4)^2/32\).

**Theorem 3.4 (Involution)** – **VERIFIED**  
\(f(f(x)) = x\) (direct computation). Fixed point \(f(x)=x\) gives \(x=2\sqrt2\).  
Under \(\xi=x^2-4\), the map is \(\xi \mapsto 16/\xi\).

**Corollary 3.5** – **VERIFIED**  
\(|R(S_{\text{turn}})|/2 = 3(P^2-4)^2/64\).

**Theorem 4 (Confinement)** – **VERIFIED**  
Near \(S=2\), \(f\to\infty\) \(\Rightarrow\) \((dS/d\tau)^2\to -1\) (impossible). Timelike geodesics bounce at \(S_{\text{turn}}\); as \(S\to\infty\), \(dS/d\tau\to\) constant \(\Rightarrow\) proper time to infinity diverges (timelike complete).

**Theorem 5 (Null)** – **VERIFIED**  
Null: \((dS/d\lambda)^2 = P^2/f^2\). Near \(S=2\), \(f\sim 2/\sqrt{S-2}\) \(\Rightarrow\) \(\int f\,dS\) and \(\int dS/f\) both finite \(\Rightarrow\) affine parameter and coordinate time to \(S=2\) are finite (null incomplete).

**Proposition 5.1 (Spacelike)** – **VERIFIED**  
Spacelike normalization gives \((dS/d\sigma)^2 = P^2/f^2+1 \ge 1\). Near \(S=2\), RHS\(\to 1\) \(\Rightarrow\) proper length \(\approx\int dS\) finite (spacelike incomplete).

**Completeness Trichotomy** – **VERIFIED**  
Timelike complete, null incomplete, spacelike incomplete – all consistent with the above.

**Literature Positioning** – Not a mathematical claim requiring verification; the stated novelty items are correctly identified as (i) explicit closed-form metric, (ii) duality \((P^2-4)(S_{\text{turn}}^2-4)=16\), (iii) involution \(f\circ f=\text{id}\) with fixed point \(2\sqrt2\).

---

**FINAL VERDICT: PASS**