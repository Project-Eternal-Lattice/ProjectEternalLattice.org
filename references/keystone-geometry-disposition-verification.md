# Keystone (DeepSeek V4 Pro) — Geometry Disposition Verification

**Date:** 2026-06-12 23:42 UTC
**Model:** deepseek-v4-pro
**Task:** Independent derivation of R_canon(S) = -2(3S²-4)/(S⁴(S²-4))

---

**Independent Mathematical Verification — Keystone Audit**

**Canonical Metric:**
\( ds^2 = f(S)^2(-dT^2 + dS^2) \) with \( f(S)^2 = h(S) = \dfrac{4S^2}{S^2-4} \), domain \( S>2 \).

---

### 1. Ricci scalar via 2D conformal-gauge identity

For a 2D metric \( ds^2 = h(S)(-dT^2 + dS^2) \), the Ricci scalar is
\[
R = -\frac{1}{h}\frac{d^2(\ln h)}{dS^2}.
\]
Compute \( h(S) = \dfrac{4S^2}{S^2-4} \):
\[
\ln h = \ln 4 + 2\ln S - \ln(S^2-4).
\]
First derivative:
\[
\frac{d}{dS}\ln h = \frac{2}{S} - \frac{2S}{S^2-4} = 2\left(\frac{S^2-4 - S^2}{S(S^2-4)}\right) = -\frac{8}{S(S^2-4)}.
\]
Second derivative:
\[
\frac{d^2}{dS^2}\ln h = \frac{d}{dS}\left(-\frac{8}{S(S^2-4)}\right) = -8\left(-\frac{3S^2-4}{S^2(S^2-4)^2}\right) = \frac{8(3S^2-4)}{S^2(S^2-4)^2}.
\]
Now apply the identity:
\[
R = -\frac{1}{h}\frac{d^2(\ln h)}{dS^2} = -\frac{S^2-4}{4S^2} \cdot \frac{8(3S^2-4)}{S^2(S^2-4)^2} = -\frac{8(3S^2-4)}{4S^4(S^2-4)} = -\frac{2(3S^2-4)}{S^4(S^2-4)}.
\]
**VERIFIED** — matches claimed \( R_{\text{canon}}(S) \).

---

### 2. Ricci scalar via full Christoffel assembly

Metric: \( g_{00} = -h,\; g_{11} = h,\; g^{00} = -1/h,\; g^{11} = 1/h \). All \( h \) functions of \( S \) only.
Non-zero derivatives: \( \partial_1 g_{00} = -h',\; \partial_1 g_{11} = h' \).

Non-zero Christoffel symbols:
\[
\Gamma^0_{01} = \Gamma^0_{10} = \frac{1}{2}g^{00}\partial_1 g_{00} = \frac{h'}{2h},
\]
\[
\Gamma^1_{00} = -\frac{1}{2}g^{11}\partial_1 g_{00} = \frac{h'}{2h},
\qquad
\Gamma^1_{11} = \frac{1}{2}g^{11}\partial_1 g_{11} = \frac{h'}{2h}.
\]

Relevant Riemann component (\( \partial_0 \equiv 0 \)):
\[
R^1_{010} = \partial_1\Gamma^1_{00} + \Gamma^1_{1\lambda}\Gamma^\lambda_{00} - \Gamma^1_{0\lambda}\Gamma^\lambda_{10}.
\]
\[
\Gamma^1_{1\lambda}\Gamma^\lambda_{00} = \Gamma^1_{11}\Gamma^1_{00} = \left(\frac{h'}{2h}\right)^2,
\quad
\Gamma^1_{0\lambda}\Gamma^\lambda_{10} = \Gamma^1_{00}\Gamma^0_{10} = \left(\frac{h'}{2h}\right)^2.
\]
Thus the quadratic terms cancel:
\[
R^1_{010} = \partial_1\left(\frac{h'}{2h}\right) = \frac{h''h - (h')^2}{2h^2}.
\]
Then \( R_{00} = R^0_{000} + R^1_{010} = \dfrac{h''h - (h')^2}{2h^2} \).

In 2D, \( R_{\mu\nu} = \frac{R}{2}g_{\mu\nu} \), so \( R_{00} = \frac{R}{2}(-h) \Rightarrow R = -\dfrac{2}{h}R_{00} = -\dfrac{2}{h}\cdot\dfrac{h''h - (h')^2}{2h^2} = -\dfrac{h''h - (h')^2}{h^3} \).
This is exactly \( -\frac{1}{h}\frac{d^2}{dS^2}\ln h \), yielding the same result.
**VERIFIED**.

---

### 3. Comparison with claimed answer
Claimed: \( R_{\text{canon}}(S) = -\dfrac{2(3S^2-4)}{S^4(S^2-4)} \).
Derived result identical.
**VERIFIED**.

---

### 4. Properties on \( S>2 \)
- **Sign:** Numerator \( 2(3S^2-4) > 0 \), denominator \( S^4(S^2-4) > 0 \). Minus sign \(\Rightarrow R < 0\) everywhere.
- **Divergence at \( S\to 2^+ \):** \( S^2-4 = (S-2)(S+2) \approx 4(S-2) \).  
  \( R \approx -\dfrac{2(12-4)}{16\cdot 4(S-2)} = -\dfrac{1}{4(S-2)} \to -\infty \). Order \( (S-2)^{-1} \).
- **Asymptotic at \( S\to\infty \):** \( R \approx -\dfrac{6S^2}{S^6} = -\dfrac{6}{S^4} \to 0 \).
**VERIFIED**.

---

### 5. Non-conformal metric
Metric: \( ds^2 = -f(S)^2 dT^2 + dS^2 \), same \( f^2 = \dfrac{4S^2}{S^2-4} \).
Take \( f = 2S(S^2-4)^{-1/2} \):
\[
f' = -\frac{8}{(S^2-4)^{3/2}}, \quad f'' = \frac{24S}{(S^2-4)^{5/2}}.
\]
For 2D with \( g_{00}=-f^2, g_{11}=1 \): \( R = -2f''/f \).
\[
R_{\text{nonconf}} = -2\cdot \frac{24S}{(S^2-4)^{5/2}} \cdot \frac{(S^2-4)^{1/2}}{2S} = -\frac{24}{(S^2-4)^2}.
\]
**VERIFIED** — matches claimed \( R_{\text{nonconf}} \).

---

### 6. Bounce structure
The “P theorem” gives \( S_{\text{turn}} = 2P/\sqrt{P^2-4} \) from \( f(S_{\text{turn}})=P \). This condition involves **only** \( g_{TT} = -f(S)^2 \), which is identical in both the conformal and non-conformal metrics. Therefore the bounce structure holds in both.
**CONFIRMED**.

---

**FINAL VERDICT: PASS**  
All analytical results match the claimed expressions. No discrepancies found.