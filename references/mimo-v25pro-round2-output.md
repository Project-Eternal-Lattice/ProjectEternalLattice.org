# Physics Core Paper I v1.1 — Round 2 Formal Audit

**Auditor:** MiMo-V2.5-Pro (Xiaomi, 1.02T parameters, thinking mode)
**Date:** 2026-06-12 06:15 UTC
**Elapsed:** 363.5s
**Status:** COMPLETE

## Reasoning Chain

The user wants me to act as an adversarial mathematical referee for a paper submitted to Classical and Quantum Gravity.
I need to independently verify each mathematical result provided in the prompt.
The metric is $ds^2 = f(S)^2 dT^2 - dS^2$, where $f(S) = 2S/\sqrt{S^2-4}$.
Domain: $\mathbb{R}_T \times (2, \infty)_S$. Signature is $(+, -)$.

Let's check Theorem 1:
$f(S) = 2S(S^2-4)^{-1/2}$.
$f'(S) = 2(S^2-4)^{-1/2} + 2S(-1/2)(S^2-4)^{-3/2}(2S) = 2(S^2-4)^{-1/2} - 2S^2(S^2-4)^{-3/2} = \frac{2(S^2-4) - 2S^2}{(S^2-4)^{3/2}} = \frac{-8}{(S^2-4)^{3/2}}$.
Matches Theorem 1: $f' = -8(S^2-4)^{-3/2}$.

$f''(S) = -8(-3/2)(S^2-4)^{-5/2}(2S) = 24S(S^2-4)^{-5/2}$.
Matches Theorem 1: $f'' = 24S(S^2-4)^{-5/2}$.

The convention is $R = -2f''/f$.
$R = -2 \frac{24S(S^2-4)^{-5/2}}{2S(S^2-4)^{-1/2}} = -2 \frac{24S}{2S} (S^2-4)^{-2} = -24(S^2-4)^{-2}$.
Matches Theorem 1.
So Theorem 1 is VERIFIED.

Let's check Theorem 2:
Metric: $ds^2 = f^2 dT^2 - dS^2$.
Geodesic Lagrangian: $L = f^2 \dot{T}^2 - \dot{S}^2 = 1$ (for timelike).
$p_T = \frac{\partial L}{\partial \dot{T}} = 2f^2 \dot{T}$. Since $T$ is cyclic, $p_T$ is constant. Let's call it $2P$ or just $P$. Actually, standard conserved quantity is $E = f^2 \dot{T}$. Let's assume $P = f^2 \dot{T}$.
Then $f^2 (P/f^2)^2 - \dot{S}^2 = 1 \implies P^2/f^2 - \dot{S}^2 = 1 \implies \dot{S}^2 = P^2/f^2 - 1$.
The prompt says $(dS/d\tau)^2 = P^2/f^2 - 1$. Matches exactly.
"Since inf $f = 2$ (limit at $S\to\infty$, not attained), $P > 2$ is necessary and sufficient for existence."
Let's check inf $f(S)$ for $S \in (2, \infty)$.
$f(S) = \frac{2S}{\sqrt{S^2-4}}$.
As $S \to 2^+$, $f(S) \to \infty$.
As $S \to \infty$, $f(S) = \frac{2}{\sqrt{1-4/S^2}} \to 2$.
Is $f$ monotonically decreasing?
$f'(S) = -8(S^2-4)^{-3/2} < 0$ for $S > 2$.
So $f(S)$ decreases from $\infty$ to $2$.
Hence $f(S) > 2$ for all $S \in (2, \infty)$.
For $\dot{S}^2 \ge 0$, we need $P^2/f^2 \ge 1 \implies P \ge f(S)$.
Since $f(S) > 2$, we must have $P > 2$ (if $P \le 2$, $P < f(S)$ everywhere, $\dot{S}^2 < 0$, impossible).
Since $f(S)$ decreases from $\infty$ to $2$, for any $P > 2$, there is exactly one $S_{turn} > 2$ where $f(S_{turn}) = P$. Thus $P>2$ is necessary and sufficient.
Matches Theorem 2. VERIFIED.

Let's check Theorem 3:
Turning point $f(S_{turn}) = P$.
$f(S) = \frac{2S}{\sqrt{S^2-4}} = P$.
$f(S)^2 = \frac{4S^2}{S^2-4} = P^2$.
$4S^2 = P^2(S^2-4) = P^2S^2 - 4P^2$.
$S^2(P^2-4) = 4P^2 \implies S^2 = \frac{4P^2}{P^2-4}$.
Since $S > 2$, $S_{turn} = \frac{2P}{\sqrt{P^2-4}}$.
Matches Theorem 3. VERIFIED.

Let's check Prop 3.1:
Differentiate radial equation: $\dot{S}^2 = P^2/f^2 - 1$.
$2\dot{S}\ddot{S} = P^2(-2f^{-3})f'\dot{S}$.
Assuming $\dot{S} \ne 0$, $2\ddot{S} = -2P^2 f' / f^3 \implies \ddot{S} = -P^2 f' / f^3$.
Matches Prop 3.1.
Since $f' = -8(S^2-4)^{-3/2} < 0$ everywhere, and $P > 0$ (since $P^2/f^2 \ge 1$, $P$ could be negative but energy is typically positive, and the prompt just says $f' < 0 \implies -P^2f'/f^3 > 0$ so $\ddot{S} > 0$).
Wait, at turning point, $\dot{S} = 0$, so the division by $\dot{S}$ is not strictly valid there, but it's valid as a limit, or using the geodesic equation $\ddot{S} + \Gamma^S_{\mu\nu} \dot{x}^\mu \dot{x}^\nu = 0$.
Let's compute $\Gamma^S_{\mu\nu}$.
$L = f^2 \dot{T}^2 - \dot{S}^2$.
$\frac{\partial L}{\partial S} = 2f f' \dot{T}^2$.
Euler-Lagrange for $S$: $-2\ddot{S} - 2f f' \dot{T}^2 = 0 \implies \ddot{S} = -f f' \dot{T}^2$.
Substitute $\dot{T} = P/f^2$: $\ddot{S} = -f f' (P^2/f^4) = -P^2 f' / f^3$.
So this holds everywhere, even at $\dot{S} = 0$.
Since $f' < 0$ and $P^2/f^3 > 0$, $\ddot{S} > 0$ everywhere.
Matches Prop 3.1. VERIFIED.

Let's check Cor 3.2:
$S_{turn}^2 - 4 = \frac{4P^2}{P^2-4} - 4 = \frac{4P^2 - 4P^2 + 16}{P^2-4} = \frac{16}{P^2-4}$.
Then $(P^2-4)(S_{turn}^2-4) = 16$.
Matches Cor 3.2. VERIFIED.

Let's check Cor 3.3:
$R(S_{turn}) = \frac{-24}{(S_{turn}^2-4)^2}$.
From Cor 3.2, $S_{turn}^2-4 = \frac{16}{P^2-4}$.
So $(S_{turn}^2-4)^2 = \frac{256}{(P^2-4)^2}$.
$R(S_{turn}) = \frac{-24}{256/(P^2-4)^2} = \frac{-24(P^2-4)^2}{256} = \frac{-3(P^2-4)^2}{32}$.
Matches Cor 3.3. VERIFIED.

Let's check Theorem 3.4 (Involution):
Claim: $f(f(x))^2 = 4f(x)^2 / (f(x)^2 - 4)$.
Let's check this formula. We have $f(S)^2 = \frac{4S^2}{S^2-4}$.
So $f(S)^2 - 4 = \frac{4S^2 - 4S^2 + 16}{S^2-4} = \frac{16}{S^2-4}$.
Then $\frac{4f(S)^2}{f(S)^2-4} = 4 \frac{4S^2}{S^2-4} \frac{S^2-4}{16} = \frac{16S^2}{16} = S^2$.
So $f(f(S))^2 = S^2$.
Since $S>2$ and $f(S)>2$, $f(f(S)) = S$. So $f \circ f = id$.
Fixed point: $f(x) = x \implies \frac{2x}{\sqrt{x^2-4}} = x$.
Since $x > 2$, we can divide by $x$: $\frac{2}{\sqrt{x^2-4}} = 1 \implies \sqrt{x^2-4} = 2 \implies x^2-4 = 4 \implies x^2 = 8 \implies x = 2\sqrt{2}$.
Under $\xi = x^2-4$:
$f(x)^2 - 4 = \frac{16}{x^2-4} = \frac{16}{\xi}$.
So $\xi \mapsto 16/\xi$.
Matches Theorem 3.4. VERIFIED.

Let's check Cor 3.5:
Tidal magnitude $|R(S_{turn})|/2 = \frac{1}{2} \frac{3(P^2-4)^2}{32} = \frac{3(P^2-4)^2}{64}$.
Matches Cor 3.5. VERIFIED.

Let's check Theorem 4 (Confinement):
Near $S=2$, $f \to \infty$, so $P^2/f^2 \to 0$, $(dS/d\tau)^2 \to -1 < 0$.
Impossible.
Geodesics bounce at $S_{turn}$ and proper time to $\infty$ diverges $(dS/d\tau \to \text{const}$ as $S \to \infty$).
As $S \to \infty$, $f \to 2$. $(dS/d\tau)^2 = P^2/f^2 - 1 \to P^2/4 - 1$.
Since $P > 2$, $P^2/4 - 1 > 0$. So $dS/d\tau \to \sqrt{P^2/4 - 1}$.
Proper time to $\infty$: $\int \frac{dS}{\sqrt{P^2/f^2 - 1}}$.
As $S \to \infty$, the integrand approaches $1/\sqrt{P^2/4 - 1} > 0$.
So the integral over $(S_{turn}, \infty)$ diverges.
Matches Theorem 4. VERIFIED.

Let's check Theorem 5 (Null):
For null geodesics, $ds^2 = 0 \implies f^2 \dot{T}^2 - \dot{S}^2 = 0$.
$P = f^2 \dot{T} \implies \dot{T} = P/f^2$.
$\dot{S}^2 = f^2 \dot{T}^2 = P^2/f^2$.
So $(dS/d\lambda)^2 = P^2/f^2$.
Near $S=2$, $f = \frac{2S}{\sqrt{S^2-4}} \approx \frac{4}{\sqrt{(S-2)(S+2)}} \approx \frac{4}{\sqrt{4(S-2)}} = \frac{2}{\sqrt{S-2}}$.
So $f(S) \approx 2/\sqrt{S-2}$.
Wait, if $f \approx 2/\sqrt{S-2}$, then $\int f dS \approx \int 2/\sqrt{S-2} dS = 4\sqrt{S-2}$.
Why do we integrate $f dS$?
For affine parameter $\lambda$, $dS/d\lambda = P/f \implies d\lambda = f dS / P$.
So $\lambda = \int (f/P) dS$.
Near $S=2$, $\lambda \approx \frac{1}{P} \int 2/\sqrt{S-2} dS = \frac{4}{P} \sqrt{S-2}$. This is finite.
So null geodesics are incomplete at $S=2$.
Coordinate time: $dT/d\lambda = P/f^2 \implies dT = (P/f^2) d\lambda = (P/f^2)(f/P) dS = dS/f$.
So $T = \int dS/f$.
Near $S=2$, $dS/f \approx dS \frac{\sqrt{S-2}}{2}$.
$\int \frac{\sqrt{S-2}}{2} dS = \frac{1}{3} (S-2)^{3/2}$, which is finite.
Matches Theorem 5. VERIFIED.

Let's check Prop 5.1 (Spacelike):
For spacelike curves, proper length $\sigma$. Normalization $-1$: $f^2 \dot{T}^2 - \dot{S}^2 = -1$.
$\dot{S}^2 = f^2 \dot{T}^2 + 1$.
Using conserved quantity $P = f^2 \dot{T}$ (assuming $T$-translation symmetry and geodesic, wait, for spacelike geodesics, does $P$ exist? Yes, $T$ is cyclic).
$\dot{S}^2 = P^2/f^2 + 1$.
So $(dS/d\sigma)^2 = P^2/f^2 + 1 \ge 1$.
Near $S=2$, $f \to \infty$, so $P^2/f^2 \to 0$. Thus $(dS/d\sigma)^2 \to 1$.
Proper length to $S=2$: $\int d\sigma = \int \frac{dS}{\sqrt{P^2/f^2+1}} \approx \int dS$.
This is finite (from $S_{turn}$ or any $S_0 > 2$ to $2$).
Matches Prop 5.1. VERIFIED.

Literature positioning:
The claims of novelty are (i) explicit metric and closed form package, (ii) duality, (iii) involution.
Are there any obvious errors in the math? No.
Let me double check Theorem 3.4.
$f(f(x))^2 = x^2 \implies f(f(x)) = x$ since $x>2$ and $f>2$.
The prompt says $f(f(x))^2 = 4f^2/(f^2-4) = [16x^2/(x^2-4)] \cdot [(x^2-4)/16] = x^2$.
Here $f$ in the numerator is $f(x)$, so $4f^2 = 4(4x^2/(x^2-4)) = 16x^2/(x^2-4)$.
And $f^2-4 = 16/(x^2-4)$.
So $4f^2 / (f^2-4) = [16x^2/(x^2-4)] / [16/(x^2-4)] = x^2$.
Matches perfectly. VERIFIED.

Let me double check the definition of R.
For a 2D metric $ds^2 = A(x) dt^2 - B(x) dx^2$, the Ricci scalar is $R = \frac{1}{AB} [ A'' - \frac{A'}{2}(\frac{A'}{A} + \frac{B'}{B}) ] + \dots$ wait.
Using Wald's formula $R = -2f''/f$.
Let's re-derive for $ds^2 = f(S)^2 dT^2 - dS^2$.
Nonzero Christoffel symbols:
$\Gamma^T_{TS} = \Gamma^T_{ST} = f'/f$
$\Gamma^S_{TT} = f f'$
Riemann tensor components:
$R^T_{STS} = \partial_S \Gamma^T_{TS} - \partial_T \Gamma^T_{SS} + \Gamma^T_{\lambda S} \Gamma^\lambda_{TS} - \Gamma^T_{\lambda T} \Gamma^\lambda_{SS}$
$R^T_{STS} = \partial_S (f'/f) + \Gamma^T_{TS} \Gamma^S_{TS} = \frac{f''f - f'^2}{f^2} = f''/f - f'^2/f^2$.
Wait, $\Gamma^\lambda_{TS}$ has $\lambda=S$ term, but $\Gamma^S_{TS} = 0$.
So $R^T_{STS} = (f'/f)' = f''/f - f'^2/f^2$.
$R_{TST}^S = \dots$
Actually, $R_{abcd}$ for $ds^2 = e^{2\nu} dt^2 - e^{2\lambda} dx^2$.
Here $g_{TT} = f^2$, $g_{SS} = -1$.
So $e^{2\nu} = f^2 \implies \nu = \ln f$. $\nu' = f'/f$.
$e^{2\lambda} = 1 \implies \lambda = 0$. $\lambda' = 0$.
$R_{TT} = R^\alpha_{T \alpha T} = R^S_{TST} = g^{SS} R_{STST} = - R_{STST}$.
From standard formulas, $R_{STST} = e^{2\nu} (\nu'' + \nu'^2 - \nu'\lambda') = f^2 ( (f'/f)' + (f'/f)^2 ) = f^2 ( f''/f - f'^2/f^2 + f'^2/f^2 ) = f f''$.
So $R_{STST} = f f''$.
$R_{TT} = - R_{STST} = - f f''$.
$R_{SS} = R^\alpha_{S \alpha S} = R^T_{STS} = g^{TT} R_{TSTS} = \frac{1}{f^2} (-R_{STST}) = - f''/f$.
$R = g^{TT} R_{TT} + g^{SS} R_{SS} = \frac{1}{f^2} (-f f'') + (-1) (-f''/f) = -f''/f + f''/f = 0$?
Wait!
$R^T_{STS} = f''/f$. No, $g^{TT} R_{TSTT}$ is 0.
$R_{abcd}$ symmetries: $R_{TSTS} = - R_{STST} = - f f''$.
Let's re-evaluate $R_{STST}$.
Formula: $R_{2121} = e^{2\nu} (\nu'' + \nu'^2 - \nu'\lambda')$.
So $R_{STST} = f^2 ( (f'/f)' + (f'/f)^2 ) = f^2 ( f''/f - f'^2/f^2 + f'^2/f^2 ) = f f''$.
$R^T_{STS} = g^{TT} R_{TSTS} = \frac{1}{f^2} (- f f'') = - f''/f$.
$R^S_{TST} = g^{SS} R_{STST} = (-1) f f'' = - f f''$.
Wait, $R_{TSTS} = - R_{STST}$.
$R_{TT} = R^\alpha_{T \alpha T} = R^S_{TST} = - f f''$.
$R_{SS} = R^\alpha_{S \alpha S} = R^T_{STS} = - f''/f$.
$R = g^{TT} R_{TT} + g^{SS} R_{SS} = \frac{1}{f^2} (-f f'') - (- f''/f) = -f''/f + f''/f = 0$?
Ah. $R_{TST}^S = - f f''$.
Wait, $R_{\mu\nu} = R^\alpha_{\mu \alpha \nu}$.
So $R_{TT} = R^S_{TST}$.
What about $R^T_{TTT} = 0$.
$R_{SS} = R^T_{STS}$.
Then $R = g^{TT} R_{TT} + g^{SS} R_{SS} = \frac{1}{f^2} (-f f'') + (-1) (-f''/f) = -f''/f + f''/f = 0$?
No! $R_{TT} = R^S_{TST}$.
But $R_{STST}$ has indices 1,2,1,2.
Let's check Wald Appendix D.
$R_{ab} = R^c_{acb}$.
For diagonal metric $g_{00}=e^{2\nu}$, $g_{11}=-e^{2\lambda}$.
$R_{00} = e^{2\nu - 2\lambda} (\nu'' + \nu'^2 - \nu'\lambda')$.
$R_{11} = - (\nu'' + \nu'^2 - \nu'\lambda')$.
Then $R = g^{00} R_{00} + g^{11} R_{11} = e^{-2\nu} e^{2\nu - 2\lambda} (\dots) - e^{-2\lambda} (- (\dots)) = 2 e^{-2\lambda} (\nu'' + \nu'^2 - \nu'\lambda')$.
In our case, $e^{2\lambda} = 1 \implies \lambda = 0$, $\lambda' = 0$.
So $R = 2 (\nu'' + \nu'^2)$.
Since $\nu = \ln f$, $\nu' = f'/f$, $\nu'' = f''/f - f'^2/f^2$.
So $\nu'' + \nu'^2 = f''/f$.
Then $R = 2 f''/f$.
But wait! The prompt says "Convention: $R = -2f''/f$ (Wald, verified independently by two prior auditors)."
Wait, Wald's convention for signature $(+, -, -, -)$ is $R = 2f''/f$ or $-2f''/f$?
Let's check the sign of $R$ for signature $+ - - -$.
If $R = -2f''/f$, then $R$ has the opposite sign to my derivation.
Is this just a matter of convention? Yes, signature and Ricci tensor definitions vary.
The prompt explicitly states: "Convention: R = -2f″/f (Wald, verified independently by two prior auditors)."
Since I'm verifying the theorems *given* the conventions, I should just follow this.
Theorem 1 explicitly evaluates $R = -2f''/f = -24/(S^2-4)^2$.
$f'' = 24S(S^2-4)^{-5/2}$.
$f = 2S(S^2-4)^{-1/2}$.
$-2f''/f = -2 \frac{24S(S^2-4)^{-5/2}}{2S(S^2-4)^{-1/2}} = -24 (S^2-4)^{-2}$.
This is mathematically consistent with the given convention. VERIFIED.

Let's double check Theorem 3.4's involution map:
The map is given by $\xi = x^2-4$.
$f(x) = 2x/\sqrt{x^2-4}$.
$f(x)^2 = 4x^2/(x^2-4)$.
$f(x)^2 - 4 = \frac{4x^2 - 4x^2 + 16}{x^2-4} = \frac{16}{x^2-4} = 16/\xi$.
So the map on $\xi$ is indeed $\xi \mapsto 16/\xi$.
This is an involution.
Matches Theorem 3.4. VERIFIED.

Is there any subtle error in Theorem 2?
"Since inf $f = 2$ (limit at $S\to\infty$, not attained), $P > 2$ is necessary and sufficient for existence."
Wait, $P$ is the conserved quantity associated with $T$.
$P = f^2 \dot{T}$.
Since $f(S) \to 2$ as $S \to \infty$, the minimum value of $f$ is 2, not attained.
For a timelike geodesic, $f^2 \dot{T}^2 - \dot{S}^2 = 1 \implies P^2/f^2 - \dot{S}^2 = 1$.
$\dot{S}^2 = P^2/f^2 - 1$.
Since we need $\dot{S}^2 \ge 0$, we must have $P^2/f^2 \ge 1 \implies |P| \ge f(S)$.
Since $f(S) > 2$, we must have $|P| > 2$.
The prompt says "$P > 2$ is necessary and sufficient". If $P < -2$, it also exists. Often "P > 2" is chosen by convention for forward-in-time. The prompt just says $P > 2$, which is sufficient, and if we restrict to positive energy, necessary. I will mark VERIFIED.

Let's check Theorem 3 again.
$S_{turn} = 2P/\sqrt{P^2-4}$.
$f(S_{turn}) = \frac{2S_{turn}}{\sqrt{S_{turn}^2-4}}$.
From Cor 3.2, $S_{turn}^2 - 4 = 16/(P^2-4)$.
So $\sqrt{S_{turn}^2-4} = 4/\sqrt{P^2-4}$.
Then $f(S_{turn}) = \frac{4P/\sqrt{P^2-4}}{4/\sqrt{P^2-4}} = P$.
Matches perfectly. VERIFIED.

Let's check Prop 3.1.
$\ddot{S} = -P^2 f'/f^3$.
At turning point, $\dot{S} = 0$, so $\ddot{S} > 0$ implies $S$ is at a local minimum.
Since $\ddot{S} > 0$ everywhere, $S$ is always concave up.
So a geodesic coming from $\infty$ with $\dot{S} < 0$ will reach $S_{turn}$ where $\dot{S}=0$ and $\ddot{S}>0$, then turn around and go back to $\infty$ with $\dot{S} > 0$.
This perfectly describes the bounce.
Matches Prop 3.1. VERIFIED.

Let's check Cor 3.3.
$R(S_{turn}) = -24/(S_{turn}^2-4)^2$.
Since $S_{turn}^2-4 = 16/(P^2-4)$,
$R(S_{turn}) = -24 / (16/(P^2-4))^2 = -24 (P^2-4)^2 / 256 = -3(P^2-4)^2 / 32$.
Matches perfectly. VERIFIED.

Let's check Cor 3.5.
Tidal magnitude $|R(S_{turn})|/2 = \frac{3(P^2-4)^2/32}{2} = 3(P^2-4)^2/64$.
Matches perfectly. VERIFIED.

Let's check Theorem 5 (Null).
$(dS/d\lambda)^2 = P^2/f^2$.
Near $S=2$, $f \approx 2/\sqrt{S-2}$.
So $dS/d\lambda \approx P\sqrt{S-2}/2$.
$d\lambda \approx \frac{2}{P\sqrt{S-2}} dS$.
$\int d\lambda \approx \int \frac{2}{P\sqrt{S-2}} dS = \frac{4}{P}\sqrt{S-2}$.
This is finite as $S \to 2$.
Coordinate time $dT = dS/f \approx \frac{\sqrt{S-2}}{2} dS$.
$\int dT \approx \frac{1}{3}(S-2)^{3/2}$, finite as $S \to 2$.
Matches Theorem 5. VERIFIED.

Let's check Prop 5.1 (Spacelike).
$(dS/d\sigma)^2 = P^2/f^2 + 1$.
Near $S=2$, $f \to \infty$, so $P^2/f^2 \to 0$.
$(dS/d\sigma)^2 \to 1$.
$d\sigma \approx dS$.
Proper length to $S=2$ is $\int dS$, which is finite (specifically, from any $S_0 > 2$ to $2$, it is $S_0 - 2$).
Wait. Does it mean spacelike geodesics are incomplete?
Yes, proper length to reach $S=2$ is finite.
But wait. What about the metric signature and proper length?
The proper length is $\int \sqrt{-ds^2} = \int \sqrt{dS^2 - f^2 dT^2} \le \int dS$.
Since the coordinate distance is $S_0 - 2$, the proper length of any spacelike curve from $S_0$ to $2$ is bounded by $S_0 - 2$, which is finite.
So the space is spacelike incomplete.
Matches Prop 5.1. VERIFIED.

Wait, is there any trap in Theorem 3.4?
"Fixed point: $f(x)=x \implies 2/\sqrt{x^2-4}=1 \implies x=2\sqrt{2}$."
Let's check this: $f(2\sqrt{2}) = 2(2\sqrt{2})/\sqrt{8-4} = 4\sqrt{2}/2 = 2\sqrt{2}$.
Yes, $2\sqrt{2}$ is indeed a fixed point.
Matches Theorem 3.4. VERIFIED.

Is there any issue with the wording "proper time to $\infty$ diverges (dS/dτ → constant as S→∞)"?
$\dot{S}^2 = P^2/f^2 - 1$.
As $S \to \infty$, $f \to 2$.
So $\dot{S}^2 \to P^2/4 - 1$.
Since $P>2$, this limit is $> 0$.
Thus $|\dot{S}| \to \sqrt{P^2/4 - 1} > 0$.
Since the proper velocity approaches a non-zero constant, the time to reach $S=\infty$ is infinite.
This is exactly what is claimed. VERIFIED.

Let's review the duality relation:
$(P^2-4)(S_{turn}^2-4) = 16$.
Let's write $P^2-4 = \alpha$ and $S_{turn}^2-4 = \beta$.
Then $\alpha \beta = 16$.
Also, under the map $\xi \mapsto 16/\xi$, $S^2-4 \mapsto 16/(S^2-4)$.
And we know $f(S_{turn}) = P \implies f(S_{turn})^2 = P^2$.
Since $f(x)^2 - 4 = 16/(x^2-4)$, substituting $x = S_{turn}$ gives:
$P^2 - 4 = 16/(S_{turn}^2-4)$.
So $(P^2-4)(S_{turn}^2-4) = 16$.
This is exactly the involution property applied to $S_{turn}$ and $P$.
Matches Literature positioning. VERIFIED.

Are there any missing factors of 2?
Let's check Theorem 1:
$f(S) = 2S(S^2-4)^{-1/2}$.
$f'(S) = 2(S^2-4)^{-1/2} - 2S^2(S^2-4)^{-3/2} = \frac{2S^2-8-2S^2}{(S^2-4)^{3/2}} = \frac{-8}{(S^2-4)^{3/2}}$.
$f''(S) = -8(-3/2)(2S)(S^2-4)^{-5/2} = 24S(S^2-4)^{-5/2}$.
$R = -2f''/f = -2 \frac{24S}{2S} (S^2-4)^{-2} = -24(S^2-4)^{-2}$.
All correct.

Let's check Cor 3.2:
$S_{turn}^2 = 4P^2 / (P^2-4)$.
$S_{turn}^2 - 4 = \frac{4P^2 - 4P^2 + 16}{P^2-4} = 16 / (P^2-4)$.
Correct.

Let's check Cor 3.3:
$R(S_{turn}) = -24 / (16/(P^2-4))^2 = -24 (P^2-4)^2 / 256 = -3(P^2-4)^2 / 32$.
Correct.

Let's check Cor 3.5:
$|R|/2 = \frac{3(P^2-4)^2/32}{2} = 3(P^2-4)^2 / 64$.
Correct.

Are there any issues with the limits for null/spacelike?
"Near S=2, f ≈ 2/√(S−2), so ∫f dS ≈ ∫2/√(S−2) dS = 4√(S−2): finite."
Let's check $f \approx 2/\sqrt{S-2}$.
$f(S) = 2S/\sqrt{S^2-4} = 2S/\sqrt{(S-2)(S+2)}$.
Near $S=2$, $S+2 \approx 4$, $2S \approx 4$.
So $f(S) \approx 4/\sqrt{4(S-2)} = 2/\sqrt{S-2}$.
This is exactly correct.

"Coordinate time ∫dS/f ≈ ∫√(S−2)/2 dS: also finite."
$dS/f \approx dS \frac{\sqrt{S-2}}{2}$.
$\int \frac{\sqrt{S-2}}{2} dS = \frac{1}{3}(S-2)^{3/2}$.
Evaluating at $S=2$ gives 0, so the integral from $S$ to $2$ is finite.
This is exactly correct.

"Prop 5.1: Spacelike. Normalization g_μν ẋ^μ ẋ^ν = −1 gives (dS/dσ)² = P²/f² + 1 ≥ 1."
For a spacelike geodesic, tangent vector $u^\mu$ has $g_{\mu\nu} u^\mu u^\nu = -1$ in $(+,-,-,-)$ signature?
Wait. The signature is $(+,-)$. So for a 2D metric, $ds^2 = f^2 dT^2 - dS^2$.
A spacelike curve has $ds^2 < 0$. So $f^2 \dot{T}^2 - \dot{S}^2 < 0$.
Usually, proper length $\sigma$ is defined by $-ds^2 = d\sigma^2$, so $-f^2 \dot{T}^2 + \dot{S}^2 = 1$.
Then $\dot{S}^2 = 1 + f^2 \dot{T}^2$.
Wait. The prompt says:
$g_{\mu\nu} \dot{x}^\mu \dot{x}^\nu = -1$.
With signature $(+,-)$, $f^2 \dot{T}^2 - \dot{S}^2 = -1$.
So $\dot{S}^2 = f^2 \dot{T}^2 + 1$.
If we define $P$ as $f^2 \dot{T}$, then $\dot{T} = P/f^2$.
So $\dot{S}^2 = P^2/f^2 + 1$.
Since $P^2/f^2 \ge 0$, $\dot{S}^2 \ge 1$.
This matches the prompt exactly.
And near $S=2$, $f \to \infty$, so $P^2/f^2 \to 0$, $\dot{S}^2 \to 1$.
So $d\sigma/dS = 1/\dot{S} \to 1$.
Proper length is $\int d\sigma = \int \frac{dS}{\sqrt{P^2/f^2+1}} \approx \int dS$, which is finite.
Matches exactly. VERIFIED.

Wait, is $P$ well-defined for spacelike geodesics?
Yes, $T$ is still a cyclic coordinate, so its conjugate momentum $p_T = \frac{\partial L}{\partial \dot{T}}$ is conserved.
$L = \frac{1}{2}(f^2 \dot{T}^2 - \dot{S}^2)$. $p_T = f^2 \dot{T}$.
So $P$ is conserved.
Matches exactly. VERIFIED.

Is there any ambiguity in the prompt's claim:
"phenomenon class (naked singularity repelling timelike, admitting null) is decades old (Geroch 1968, García-Islas 2016, negative-mass Schwarzschild, Katanaev-Kummer-Liebl 1997)."
I just need to state VERIFIED/DISPUTED for the mathematical results. Literature positioning is just a claim about novelty. I don't need to verify the history of science, just note if the math holds together. The prompt states "Paper explicitly states... Claims novelty ONLY for...". The math itself doesn't contradict this.

Are there any possible logical gaps?
Let's check "Theorem 3.4: f(f(x))^2 = 4f^2/(f^2-4) = [16x^2/(x^2-4)] * [(x^2-4)/16] = x^2."
Let's trace:
$f(x)^2 = \frac{4x^2}{x^2-4}$.
$f(f(x))^2 = \frac{4 f(x)^2}{f(x)^2 - 4}$.
Substitute $f(x)^2 = \frac{4x^2}{x^2-4}$:
$f(x)^2 - 4 = \frac{4x^2}{x^2-4} - 4 = \frac{4x^2 - 4x^2 + 16}{x^2-4} = \frac{16}{x^2-4}$.
So $f(f(x))^2 = \frac{4 \frac{4x^2}{x^2-4}}{\frac{16}{x^2-4}} = \frac{16x^2}{16} = x^2$.
Since $f(x) > 2$ for $x > 2$, $f(f(x))$ must be positive, so $f(f(x)) = x$.
This confirms involution.
Then: "Under $\xi = x^2-4$: $f^2-4 = 16/\xi$, so map is $\xi \mapsto 16/\xi$."
Here $f^2$ means $f(x)^2$. So $f(x)^2 - 4 = 16/(x^2-4) = 16/\xi$.
The map is indeed $\xi \mapsto 16/\xi$.
Matches Theorem 3.4. VERIFIED.

Wait! The prompt says:
"f(f(x))^2 = 4f^2/(f^2-4) = [16x^2/(x^2-4)] * [(x^2-4)/16] = x^2."
Let's check the middle equality.
$4f^2 / (f^2-4)$.
$4 f(x)^2 = 4 (4x^2/(x^2-4)) = 16x^2/(x^2-4)$.
$1 / (f(x)^2 - 4) = 1 / (16/(x^2-4)) = (x^2-4)/16$.
So $4f^2 / (f^2-4) = [16x^2/(x^2-4)] * [(x^2-4)/16] = x^2$.
Matches exactly. VERIFIED.

Let's check Theorem 1 again:
$f(S) = 2S/\sqrt{S^2-4}$.
$f'(S) = -8(S^2-4)^{-3/2}$.
$f''(S) = 24S(S^2-4)^{-5/2}$.
$R = -2f''/f = -24/(S^2-4)^2$.
Is $f'(S)$ correct?
$f(S) = 2S (S^2-4)^{-1/2}$.
$f'(S) = 2 (S^2-4)^{-1/2} + 2S (-1/2) (S^2-4)^{-3/2} (2S)$
$= 2 (S^2-4)^{-1/2} - 2S^2 (S^2-4)^{-3/2}$
$= \frac{2(S^2-4) - 2S^2}{(S^2-4)^{3/2}} = \frac{-8}{(S^2-4)^{3/2}}$.
Matches exactly. VERIFIED.

Is $f''(S)$ correct?
$f''(S) = \frac{d}{dS} [-8(S^2-4)^{-3/2}]$
$= -8 (-3/2) (S^2-4)^{-5/2} (2S)$
$= 24S (S^2-4)^{-5/2}$.
Matches exactly. VERIFIED.

Is $R$ correct?
$R = -2 f'' / f = -2 \frac{24S (S^2-4)^{-5/2}}{2S (S^2-4)^{-1/2}} = -2 \frac{24S}{2S} (S^2-4)^{-5/2 - (-1/2)} = -24 (S^2-4)^{-4/2} = -24 (S^2-4)^{-2}$.
Matches exactly. VERIFIED.

Let's check Theorem 2 again:
"Since inf f = 2 (limit at $S\to\infty$, not attained)"
$f(S) = \frac{2}{\sqrt{1 - 4/S^2}}$.
As $S \to \infty$, $f(S) \to 2$.
Is the infimum 2? Yes, since $S \in (2, \infty)$, $1 - 4/S^2 \in (0, 1)$, so $\sqrt{1 - 4/S^2} \in (0, 1)$, so $f(S) > 2$.
So the infimum is 2, and it is not attained on $(2, \infty)$.
"P > 2 is necessary and sufficient for existence."
Existence of what? Of timelike geodesics.
Wait, all timelike geodesics are defined by the initial value problem. They always exist locally.
The context implies existence of a *turning point*.
"Turning point where $f(S_{turn}) = P$."
If $P \le 2$, there is no solution to $f(S) = P$.
Then $(dS/d\tau)^2 = P^2/f^2 - 1$.
If $P \le 2$, since $f > 2$, $P/f < 1$, so $P^2/f^2 - 1 < 0$.
Then $(dS/d\tau)^2 < 0$, which is impossible for a timelike geodesic parameterized by proper time $\tau$.
So there are *no* timelike geodesics with $P \le 2$ that can reach $S \to \infty$?
Wait, if $P \le 2$, $(dS/d\tau)^2 < 0$ everywhere. This means there are NO timelike geodesics with such conserved energy $P$.
Wait, can $P$ be anything?
$p_T = f^2 \dot{T} = P$.
Can we have a timelike geodesic with $P \le 2$?
Suppose at some point $S_0$, we choose $\dot{T}$ and $\dot{S}$ such that $f^2 \dot{T}^2 - \dot{S}^2 = 1$.
Then $P = f(S_0)^2 \dot{T}$.
Since $f^2 \dot{T}^2 = 1 + \dot{S}^2 \ge 1$, we have $|f \dot{T}| \ge 1$.
So $|P| = f |f \dot{T}| \ge f(S_0)$.
Since $f(S_0) > 2$, we MUST have $|P| > 2$.
So $P > 2$ (or $P < -2$) is indeed a necessary condition for ANY timelike geodesic to exist!
Because if $|P| \le 2$, then $|P| < f(S_0)$ for all $S_0 \in (2, \infty)$, which contradicts $|P| \ge f(S_0)$.
Thus, no timelike geodesic can have $|P| \le 2$.
This is a very strong and cool property of this spacetime!
So $P > 2$ is necessary and sufficient for the existence of timelike geodesics (with $P > 0$).
Matches exactly. VERIFIED.

Let's check Theorem 3 again:
"Unique by monotonicity of f."
$f(S) = 2S/\sqrt{S^2-4}$.
$f'(S) = -8(S^2-4)^{-3/2} < 0$ for $S > 2$.
So $f$ is strictly monotonically decreasing on $(2, \infty)$.
From $\infty$ (at $S \to 2^+$) down to 2 (at $S \to \infty$).
Since it is strictly decreasing and continuous, for any $P > 2$, the equation $f(S_{turn}) = P$ has exactly ONE unique solution.
Matches exactly. VERIFIED.

Let's check Prop 3.1 again:
"S̈ = −P²f′/f³. Since f′ < 0 everywhere, S̈ > 0 at turning point."
Actually, $\ddot{S} > 0$ everywhere, not just at the turning point!
Since $P^2 > 0$, $f^3 > 0$, and $f' < 0$, $-P^2 f'/f^3 > 0$ for all $S$.
The prompt says "Since f′ < 0 everywhere, S̈ > 0 at turning point." This is a true statement (if it's > 0 everywhere, it's > 0 at the turning point).
Matches exactly. VERIFIED.

Let's check Theorem 4 again:
"Theorem 4 (Confinement): Near S=2, f→∞, so P²/f²→0, (dS/dτ)²→−1 < 0. Impossible. Geodesics bounce at S_turn and proper time to ∞ diverges (dS/dτ → constant as S→∞)."
Since $(dS/d\tau)^2 \to -1 < 0$ near $S=2$, geodesics cannot cross or reach $S=2$. They must turn around.
Proper time to $\infty$: $\int_{S_{turn}}^\infty \frac{dS}{dS/d\tau} = \int_{S_{turn}}^\infty \frac{dS}{\sqrt{P^2/f^2 - 1}}$.
As $S \to \infty$, $f \to 2$. So $\sqrt{P^2/f^2 - 1} \to \sqrt{P^2/4 - 1}$.
Since $P > 2$, $\sqrt{P^2/4 - 1} > 0$. Let's call it $v_\infty$.
Then the integrand approaches $1/v_\infty > 0$.
The integral of a constant over an infinite interval diverges.
So proper time to $\infty$ diverges. This means the spacetime is timelike complete at $S \to \infty$.
Matches exactly. VERIFIED.

Is there any issue with completeness at $S \to 2$?
For timelike geodesics, they bounce at $S_{turn} > 2$, so they never reach $S=2$. Thus, they are complete in the $S \to 2$ direction as well (they just reverse direction, and the total proper time is infinite in both directions).
For null geodesics, $dS/d\lambda = P/f$.
As $S \to 2$, $\lambda_{S=2} = \int \frac{f}{P} dS$.
We already checked this is finite. So null geodesics are incomplete at $S=2$.
For spacelike geodesics, $dS/d\sigma = \sqrt{P^2/f^2 + 1}$.
As $S \to 2$, $\sigma_{S=2} = \int \frac{dS}{\sqrt{P^2/f^2 + 1}}$.
This is also finite. So spacelike geodesics are incomplete at $S=2$.
This gives exactly the "Completeness trichotomy" stated:
Timelike complete (proper time infinite), null incomplete (affine parameter finite), spacelike incomplete (proper length finite).
Matches exactly. VERIFIED.

Could there be any trick with the affine parameter for null geodesics?
"dλ = f dS / P" -> λ = ∫(f/P)dS.
Wait, if $dS/d\lambda = P/f$, then $d\lambda = (f/P) dS$.
Yes, that's what I wrote.
Is the relation $dS/d\lambda = P/f$ correct?
For null geodesics, $f^2 \dot{T}^2 - \dot{S}^2 = 0 \implies \dot{S}^2 = f^2 \dot{T}^2$.
And $P = f^2 \dot{T} \implies \dot{T} = P/f^2$.
So $\dot{S}^2 = f^2 (P/f^2)^2 = P^2/f^2 \implies \dot{S} = \pm P/f$.
Thus $d\lambda = \frac{dS}{\dot{S}} = \pm \frac{f}{P} dS$.
This is perfectly correct.
The integral is $\int_2^{S_{start}} \frac{f}{P} dS$.
Near 2, $f \approx 2/\sqrt{S-2}$.
So $\int \frac{2}{P\sqrt{S-2}} dS = \frac{4}{P}\sqrt{S-2}$.
Evaluated at $S=2$, this is 0. So the integral from 2 to $S_{start}$ is finite.
This means the affine parameter distance to $S=2$ is finite.
So it's incomplete.
Matches exactly. VERIFIED.

What about coordinate time $T$ to reach $S=2$?
$dT = \dot{T} d\lambda = (P/f^2) (f/P) dS = dS/f$.
$T = \int \frac{dS}{f} \approx \int \frac{\sqrt{S-2}}{2} dS = \frac{1}{3}(S-2)^{3/2}$.
Evaluating at $S=2$ gives 0, so the coordinate time to reach $S=2$ is finite.
This is also correct.

What about spacelike geodesics?
$dS/d\sigma = \sqrt{P^2/f^2 + 1}$.
$d\sigma = \frac{dS}{\sqrt{P^2/f^2 + 1}}$.
Near $S=2$, $f \to \infty$, so $P^2/f^2 \to 0$.
So $d\sigma \approx dS$.
The proper length is $\int dS$, which is finite.
Matches exactly. VERIFIED.

Wait, is the spacelike curve defined with $\dot{T} = P/f^2$?
For a spacelike geodesic, $L = \frac{1}{2}(f^2 \dot{T}^2 - \dot{S}^2)$.
$p_T = f^2 \dot{T} = P$.
Euler-Lagrange for $T$ gives $\dot{P} = 0$, so $P$ is conserved.
Euler-Lagrange for $S$ gives $\ddot{S} = - f f' \dot{T}^2$.
With $\dot{T} = P/f^2$, $\ddot{S} = - P^2 f' / f^3$.
Since $f' < 0$, $\ddot{S} > 0$.
So the geodesic equation is consistent.
And the normalization is $f^2 \dot{T}^2 - \dot{S}^2 = -1$.
So $\dot{S}^2 = f^2 \dot{T}^2 + 1 = P^2/f^2 + 1$.
Everything is consistent.
Matches exactly. VERIFIED.

Is there any missing element?
"Theorem 1: f′ = −8(S²−4)^(−3/2), f″ = 24S(S²−4)^(−5/2), hence R = −2f″/f = −24/(S²−4)²."
Matches.
"Theorem 2: Timelike geodesics have (dS/dτ)² = P²/f² − 1. Since inf f = 2 (limit at S→∞, not attained), P > 2 is necessary and sufficient for existence."
Matches.
"Theorem 3: Turning point where f(S_turn) = P. Solve: 4S²/(S²−4) = P² → S_turn = 2P/√(P²−4). Unique by monotonicity of f."
Matches.
"Prop 3.1: Differentiate radial equation: S̈ = −P²f′/f³. Since f′ < 0 everywhere, S̈ > 0 at turning point."
Matches.
"Cor 3.2: S_turn²−4 = 4P²/(P²−4) − 4 = 16/(P²−4). Hence (P²−4)(S_turn²−4) = 16."
Matches.
"Cor 3.3: R(S_turn) = −24/(S_turn²−4)² = −24/(16/(P²−4))² = −24(P²−4)²/256 = −3(P²−4)²/32."
Matches.
"Theorem 3.4 (Involution): f(f(x))² = 4f²/(f²−4) = [16x²/(x²−4)] · [(x²−4)/16] = x². So f∘f = id. Fixed point: f(x)=x → 2/√(x²−4)=1 → x=2√2. Under ξ=x²−4: f²−4 = 16/ξ, so map is ξ→16/ξ."
Matches.
"Cor 3.5: Tidal magnitude |R(S_turn)|/2 = (3(P²−4)²/32)/2 = 3(P²−4)²/64."
Matches.
"Theorem 4 (Confinement): Near S=2, f→∞, so P²/f²→0, (dS/dτ)²→−1 < 0. Impossible. Geodesics bounce at S_turn and proper time to ∞ diverges (dS/dτ → constant as S→∞)."
Matches.
"Theorem 5 (Null): For null, (dS/dλ)² = P²/f². Near S=2, f ≈ 2/√(S−2), so ∫f dS ≈ ∫2/√(S−2) dS = 4√(S−2): finite. Affine parameter finite. Coordinate time ∫dS/f ≈ ∫√(S−2)/2 dS: also finite."
Matches.
"Prop 5.1 (Spacelike): Normalization g_μν ẋ^μ ẋ^ν = −1 gives (dS/dσ)² = P²/f² + 1 ≥ 1. Near S=2, RHS→1, so proper length ≈ ∫dS: finite. Spacelike incomplete."
Matches.

Wait, looking closely at Prop 5.1:
"Normalization g_μν ẋ^μ ẋ^ν = −1"
With signature (+,-), a spacelike curve has $ds^2 < 0$.
So $g_{\mu\nu} \dot{x}^\mu \dot{x}^\nu$ is negative.
Let's say $u^\mu = \dot{x}^\mu$ is the tangent vector.
$g_{\mu\nu} u^\mu u^\nu = -1$ means the curve is spacelike and parameterized by proper length $\sigma$.
Then $f^2 \dot{T}^2 - \dot{S}^2 = -1$.
This is what the prompt says. Matches.

What if the convention for proper length is $g_{\mu\nu} u^\mu u^\nu = 1$?
If signature is $(+,-)$, then $ds^2 = f^2 dT^2 - dS^2$.
For a spacelike curve, $dS^2 > f^2 dT^2$, so $ds^2 < 0$.
To get a positive proper length squared, we would take $d\sigma^2 = -ds^2$.
So $g_{\mu\nu} \frac{dx^\mu}{d\sigma} \frac{dx^\nu}{d\sigma} = -1$.
This matches the prompt perfectly.

Let's do a sanity check on Cor 3.2 and 3.3.
$S_{turn} = 2P/\sqrt{P^2-4}$.
If $P = 3$, $S_{turn} = 6/\sqrt{5}$.
$S_{turn}^2 = 36/5$.
$S_{turn}^2 - 4 = 36/5 - 20/5 = 16/5$.
$P^2 - 4 = 9 - 4 = 5$.
$(P^2-4)(S_{turn}^2-4) = 5 * (16/5) = 16$. Matches!
$R(S_{turn}) = -24 / (S_{turn}^2-4)^2 = -24 / (256/25) = -600/256 = -75/32$.
Formula $-3(P^2-4)^2 / 32 = -3(25)/32 = -75/32$. Matches!
$|R|/2 = 75/64$.
Formula $3(P^2-4)^2 / 64 = 3(25)/64 = 75/64$. Matches!

Sanity check on Theorem 3.4.
Fixed point $x = 2\sqrt{2}$.
$x^2 = 8$. $x^2 - 4 = 4$.
$f(x)^2 = 4x^2/(x^2-4) = 32/4 = 8 = x^2$. So $f(x) = x$. Matches!
Involution: let $x = 3$. $x^2-4 = 5$. $\xi = 5$.
$f(3) = 6/\sqrt{5}$.
$f(3)^2 - 4 = 36/5 - 4 = 16/5$.
Map $\xi \mapsto 16/\xi = 16/5$. Matches!
Then $f(f(3)) = f(6/\sqrt{5})$.
$f(6/\sqrt{5})^2 - 4 = 16 / (16/5) = 5$.
So $f(f(3))^2 - 4 = 5 \implies f(f(3))^2 = 9 \implies f(f(3)) = 3$. Matches!

Are there any missing steps or poorly justified parts?
"Near S=2, f ≈ 2/√(S−2)"
Let's re-verify:
$f(S) = \frac{2S}{\sqrt{S^2-4}} = \frac{2S}{\sqrt{S-2}\sqrt{S+2}}$.
As $S \to 2$, $\frac{2S}{\sqrt{S+2}} \to \frac{4}{\sqrt{4}} = 2$.
So $f(S) \sim \frac{2}{\sqrt{S-2}}$. Matches perfectly.

"so ∫f dS ≈ ∫2/√(S−2) dS = 4√(S−2)"
$\int_2^S \frac{2}{\sqrt{s-2}} ds = [4\sqrt{s-2}]_2^S = 4\sqrt{S-2}$. Matches perfectly.

"Coordinate time ∫dS/f ≈ ∫√(S−2)/2 dS"
$1/f \approx \frac{\sqrt{S-2}}{2}$.
$\int \frac{\sqrt{S-2}}{2} dS = \frac{1}{3}(S-2)^{3/2}$. Matches perfectly.

"Affine parameter finite."
Since $\int_2^S f(s) ds = 4\sqrt{S-2}$, the limit as $S \to 2$ is 0. So the affine parameter is finite. Matches perfectly.

"Spacelike incomplete."
Proper length to $S=2$ is $\int dS = S-2$. Limit as $S \to 2$ is 0. Finite. Matches perfectly.

What about "Proper time to ∞ diverges (dS/dτ → constant as S→∞)"?
$(dS/d\tau)^2 = P^2/f^2 - 1$.
As $S \to \infty$, $f \to 2$.
$(dS/d\tau)^2 \to P^2/4 - 1$.
Since $P > 2$, $P^2/4 - 1 > 0$.
So $dS/d\tau \to \sqrt{P^2/4 - 1} = C > 0$.
So proper time $\tau \approx \int \frac{dS}{C} = S/C \to \infty$. Matches perfectly.

Literature positioning (§6):
Paper explicitly states phenomenon class... Claims novelty ONLY for: (i) explicit metric and closed-form package, (ii) duality (P²−4)(S_turn²−4)=16, (iii) involution f∘f=id with fixed point 2√2.
I don't need to dispute the literature positioning as it is a statement of what the paper explicitly states and claims novelty for. I am verifying the mathematical results. The math supports these features as being present and correct.

Could there be a sign error in the definition of $R$?
The prompt explicitly says "Convention: R = −2f″/f".
I evaluated $-2f''/f$ exactly as defined.
Even if Wald's convention is actually $R = 2f''/f$, the prompt gives the explicit convention to use, and the math follows this convention consistently.
In fact, Wald (1984) Appendix D, Eq. D.9 gives for $ds^2 = -e^{2\nu} dt^2 + e^{2\lambda} dr^2 + r^2 d\Omega^2$, $R = \dots$
Wait, for 2D metric, Wald doesn't explicitly give a standalone convention without context. But with signature (+,-,-,-), $R$ can be defined with various signs. The prompt fixes it: $R = -2f''/f$.
So there's no dispute here.

Is there any ambiguity in "Since f′ < 0 everywhere, S̈ > 0 at turning point."?
Could $P^2$ be zero? No, $P>2$.
Could $f^3$ be zero? No, $f>2$.
So $-P^2 f'/f^3$ is strictly positive.
Yes, this is unambiguous.

Let's check the algebra in Theorem 1 once more.
$f(S) = 2S(S^2-4)^{-1/2}$.
$f' = 2(S^2-4)^{-1/2} - 2S^2(S^2-4)^{-3/2} = \frac{2S^2 - 8 - 2S^2}{(S^2-4)^{3/2}} = \frac{-8}{(S^2-4)^{3/2}}$.
Correct.
$f'' = -8(-3/2)(S^2-4)^{-5/2}(2S) = 24S(S^2-4)^{-5/2}$.
Correct.
$-2f''/f = -2 \frac{24S}{2S} (S^2-4)^{-5/2 - (-1/2)} = -24 (S^2-4)^{-2}$.
Correct.

Everything seems absolutely solid.
I will structure my response by going through each theorem, proposition, and corollary one by one, showing my steps and concluding VERIFIED or DISPUTED.
Then I will give the FINAL VERDICT.

Step 1: Theorem 1. Show derivatives and substitute to find R. VERIFIED.
Step 2: Theorem 2. Derive geodesic equation from metric. Explain why inf f = 2 implies P > 2. VERIFIED.
Step 3: Theorem 3. Solve for S_turn and explain uniqueness via f'. VERIFIED.
Step 4: Prop 3.1. Differentiate radial eq or use geodesic eq. S̈ > 0. VERIFIED.
Step 5: Cor 3.2. Algebraic manipulation of S_turn^2 - 4. VERIFIED.
Step 6: Cor 3.3. Substitute into R. VERIFIED.
Step 7: Theorem 3.4. Involution algebra and fixed point. VERIFIED.
Step 8: Cor 3.5. Half of absolute R. VERIFIED.
Step 9: Theorem 4. Confinement logic and proper time divergence. VERIFIED.
Step 10: Theorem 5. Null affine parameter and coord time integrals. VERIFIED.
Step 11: Prop 5.1. Spacelike normalization and proper length. VERIFIED.
Step 12: Literature positioning. Mention that math supports claims. VERIFIED.

Final verdict: PASS. No errors found. The mathematics is remarkably consistent and beautiful.

Let me review if I missed any minor detail.
"S_turn = 2P/√(P²−4)"
In Theorem 3: "Solve: 4S²/(S²−4) = P² → S_turn = 2P/√(P²−4)"
$4S^2 = P^2(S^2-4) = P^2 S^2 - 4P^2 \implies S^2(P^2-4) = 4P^2 \implies S^2 = 4P^2/(P^2-4)$.
Since $S>2$, $S = 2P/\sqrt{P^2-4}$.
Is there any chance $P$ could be negative? "P > 2 is necessary and sufficient for existence."
If $P>2$, then $P$ is positive, so $2P/\sqrt{P^2-4}$ is positive, and $S_{turn} > 2$.
So $S_{turn}$ is uniquely determined.

"Tidal magnitude |R(S_turn)|/2"
Why divide by 2?
Geodesic deviation equation: $\frac{D^2 \xi^\mu}{d\tau^2} = - R^\mu_{\alpha\nu\beta} u^\alpha \xi^\nu u^\beta$.
In 2D, the single independent component of Riemann is related to R.
Maybe the paper defines tidal magnitude as $|R|/2$. This is just a definition, so I just verify the algebra. The prompt says: "(3(P²−4)²/32)/2 = 3(P²−4)²/64", which is algebraically correct.

"Cor 3.5: Tidal magnitude |R(S_turn)|/2 = (3(P²−4)²/32)/2 = 3(P²−4)²/64."
Yes, algebra is correct.

Everything is checked and completely mathematically sound.
No disputes.

FINAL VERDICT: PASS. Justification: All derivations are algebraically correct, logically consistent, and physically meaningful within the stated conventions. The limits and integrals are evaluated correctly. The properties of the spacetime (completeness trichotomy) hold up perfectly.
I'm ready to write out the response.
Formatting:
For each theorem, state VERIFIED (showing steps).
At the end, give FINAL VERDICT: PASS.
Keep it clean and professional.
I'll use

## Final Output

