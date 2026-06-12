# Physics Core Paper I — Sign Convention Tiebreaker

**Auditor:** GPT-5.5 (OpenAI, reasoning effort: high)
**Date:** 2026-06-12 06:30 UTC
**Elapsed:** 296.8s
**Status:** COMPLETE

## Resolution

A sign convention for the Riemann tensor is mathematically unavoidable, so I will fix it explicitly and then compute. I use

\[
R^a{}_{bcd}
=
\partial_c\Gamma^a{}_{db}
-\partial_d\Gamma^a{}_{cb}
+\Gamma^a{}_{ce}\Gamma^e{}_{db}
-\Gamma^a{}_{de}\Gamma^e{}_{cb},
\]

equivalently

\[
(\nabla_c\nabla_d-\nabla_d\nabla_c)V^a
=
R^a{}_{bcd}V^b,
\]

and Ricci contraction

\[
R_{bd}=R^a{}_{bad}.
\]

This is the convention under which the usual unit 2-sphere has scalar curvature \(+2\).

---

## 1. Metric, inverse metric, derivatives

Coordinates:

\[
x^0=T,\qquad x^1=S.
\]

Metric:

\[
ds^2=f(S)^2\,dT^2-dS^2,
\]

so

\[
g_{TT}=f^2,\qquad g_{SS}=-1,\qquad g_{TS}=0.
\]

The inverse metric is

\[
g^{TT}=\frac1{f^2},\qquad g^{SS}=-1,\qquad g^{TS}=0.
\]

The only nonzero metric derivative is

\[
\partial_S g_{TT}=2ff'.
\]

Here prime means \(d/dS\).

---

## 2. Christoffel symbols

The Levi-Civita symbols are

\[
\Gamma^a{}_{bc}
=
\frac12 g^{ad}
\left(
\partial_b g_{cd}
+\partial_c g_{bd}
-\partial_d g_{bc}
\right).
\]

### Compute \(\Gamma^T{}_{TS}\)

\[
\Gamma^T{}_{TS}
=
\frac12 g^{TT}\partial_S g_{TT}
=
\frac12 \frac1{f^2}(2ff')
=
\frac{f'}{f}.
\]

By symmetry of the lower indices,

\[
\Gamma^T{}_{ST}=\frac{f'}{f}.
\]

### Compute \(\Gamma^S{}_{TT}\)

\[
\Gamma^S{}_{TT}
=
\frac12 g^{SS}
\left(
-\partial_S g_{TT}
\right)
=
\frac12(-1)(-2ff')
=
ff'.
\]

All other Christoffel symbols vanish.

Therefore the complete nonzero list is

\[
\boxed{
\Gamma^T{}_{TS}=\Gamma^T{}_{ST}=\frac{f'}{f},
\qquad
\Gamma^S{}_{TT}=ff'.
}
\]

---

## 3. Riemann tensor component \(R^S{}_{TST}\)

Using

\[
R^a{}_{bcd}
=
\partial_c\Gamma^a{}_{db}
-\partial_d\Gamma^a{}_{cb}
+\Gamma^a{}_{ce}\Gamma^e{}_{db}
-\Gamma^a{}_{de}\Gamma^e{}_{cb},
\]

take \(a=S\), \(b=T\), \(c=S\), \(d=T\):

\[
R^S{}_{TST}
=
\partial_S\Gamma^S{}_{TT}
-\partial_T\Gamma^S{}_{ST}
+\Gamma^S{}_{Se}\Gamma^e{}_{TT}
-\Gamma^S{}_{Te}\Gamma^e{}_{ST}.
\]

Now

\[
\Gamma^S{}_{TT}=ff',
\qquad
\Gamma^S{}_{ST}=0,
\qquad
\Gamma^S{}_{Se}=0.
\]

Thus

\[
R^S{}_{TST}
=
\partial_S(ff')
-
\Gamma^S{}_{TT}\Gamma^T{}_{ST}.
\]

Compute each term:

\[
\partial_S(ff')=f'^2+ff'',
\]

and

\[
\Gamma^S{}_{TT}\Gamma^T{}_{ST}
=
(ff')\left(\frac{f'}{f}\right)
=
f'^2.
\]

Therefore

\[
R^S{}_{TST}
=
(f'^2+ff'')-f'^2
=
ff''.
\]

So

\[
\boxed{
R^S{}_{TST}=ff''.
}
\]

Equivalently,

\[
R^T{}_{STS}
=
-\frac{f''}{f}.
\]

Indeed,

\[
R^T{}_{STS}
=
-\partial_S\Gamma^T{}_{TS}
-\Gamma^T{}_{ST}\Gamma^T{}_{TS}
=
-\partial_S\left(\frac{f'}{f}\right)
-\left(\frac{f'}{f}\right)^2
=
-\frac{f''}{f}.
\]

So

\[
\boxed{
R^T{}_{STS}=-\frac{f''}{f}.
}
\]

---

## 4. Ricci tensor

With the contraction

\[
R_{bd}=R^a{}_{bad},
\]

we get

\[
R_{TT}=R^a{}_{TaT}.
\]

The \(a=T\) term vanishes by antisymmetry, so

\[
R_{TT}=R^S{}_{TST}=ff''.
\]

Thus

\[
\boxed{
R_{TT}=ff''.
}
\]

Similarly,

\[
R_{SS}=R^a{}_{SaS}.
\]

Only the \(a=T\) term contributes:

\[
R_{SS}=R^T{}_{STS}=-\frac{f''}{f}.
\]

Thus

\[
\boxed{
R_{SS}=-\frac{f''}{f}.
}
\]

The mixed/off-diagonal Ricci components vanish:

\[
\boxed{
R_{TS}=R_{ST}=0.
}
\]

Notice that

\[
R_{ab}=\frac{f''}{f}g_{ab},
\]

because

\[
R_{TT}=ff''=\frac{f''}{f}f^2,
\qquad
R_{SS}=-\frac{f''}{f}=\frac{f''}{f}(-1).
\]

---

## 5. Ricci scalar

The scalar curvature is

\[
R=g^{ab}R_{ab}
=
g^{TT}R_{TT}+g^{SS}R_{SS}.
\]

Substitute:

\[
R
=
\frac1{f^2}(ff'')
+
(-1)\left(-\frac{f''}{f}\right).
\]

Therefore

\[
R
=
\frac{f''}{f}
+
\frac{f''}{f}
=
2\frac{f''}{f}.
\]

So for the metric exactly as written,

\[
\boxed{
R=+\,2\frac{f''}{f}.
}
\]

Thus, with the curvature convention above,

\[
\boxed{
R\neq -2\frac{f''}{f};
\qquad
R=+2\frac{f''}{f}.
}
\]

---

## 6. Apply to \(f(S)=\dfrac{2S}{\sqrt{S^2-4}}\)

We have

\[
f(S)=2S(S^2-4)^{-1/2}.
\]

Differentiate:

\[
f'
=
2(S^2-4)^{-1/2}
+
2S\left(-\frac12\right)(S^2-4)^{-3/2}(2S).
\]

So

\[
f'
=
2(S^2-4)^{-1/2}
-
2S^2(S^2-4)^{-3/2}.
\]

Put over a common denominator:

\[
f'
=
\frac{2(S^2-4)-2S^2}{(S^2-4)^{3/2}}
=
-\frac{8}{(S^2-4)^{3/2}}.
\]

Differentiate again:

\[
f''
=
-8\left(-\frac32\right)(S^2-4)^{-5/2}(2S)
=
\frac{24S}{(S^2-4)^{5/2}}.
\]

Therefore

\[
\frac{f''}{f}
=
\frac{\dfrac{24S}{(S^2-4)^{5/2}}}
{\dfrac{2S}{(S^2-4)^{1/2}}}
=
\frac{12}{(S^2-4)^2}.
\]

Hence

\[
R
=
2\frac{f''}{f}
=
\frac{24}{(S^2-4)^2}.
\]

Final result:

\[
\boxed{
R=+\frac{24}{(S^2-4)^2}.
}
\]

So, under the standard sphere-positive convention used above, the fourth auditor’s sign is correct.

---

## 7. Cross-checks

A useful general formula is this: for

\[
ds^2=F(x)^2dy^2+\varepsilon\,dx^2,
\qquad \varepsilon=\pm1,
\]

the same calculation gives

\[
\boxed{
R=-2\varepsilon\,\frac{F''}{F}.
}
\]

The sign depends on the sign of the \(dx^2\) direction.

### Unit 2-sphere

For

\[
ds^2=d\theta^2+\sin^2\theta\,d\phi^2,
\]

we have

\[
\varepsilon=+1,
\qquad
F(\theta)=\sin\theta,
\qquad
F''=-\sin\theta.
\]

Thus

\[
R=-2(+1)\frac{-\sin\theta}{\sin\theta}=+2.
\]

So the formula gives

\[
\boxed{R=+2}
\]

for the unit sphere, as expected.

### Lorentzian metric \(ds^2=\cosh^2\rho\,dt^2-d\rho^2\)

Here

\[
\varepsilon=-1,
\qquad
F(\rho)=\cosh\rho,
\qquad
F''=\cosh\rho.
\]

Therefore

\[
R=-2(-1)\frac{\cosh\rho}{\cosh\rho}=+2.
\]

So for the metric exactly as written,

\[
\boxed{
ds^2=\cosh^2\rho\,dt^2-d\rho^2
\quad\Longrightarrow\quad
R=+2
}
\]

under the same convention that gives the unit sphere \(R=+2\).

The usual AdS\(_2\) scalar \(R=-2\) is obtained for the opposite overall-sign metric

\[
ds^2=-\cosh^2\rho\,dt^2+d\rho^2,
\]

or by reversing the Riemann tensor sign convention. But if one keeps the sphere-positive convention and uses the metric with signature \((+,-)\) exactly as written, the scalar is \(+2\), not \(-2\).

Therefore the two statements

\[
\text{“unit sphere has }R=+2\text{”}
\]

and

\[
\text{“}\cosh^2\rho\,dt^2-d\rho^2\text{ has }R=-2\text{”}
\]

cannot both hold under one fixed Riemann-sign convention. For the disputed metric, using the convention fixed by the sphere check,

\[
\boxed{
R=+2\frac{f''}{f}
=
+\frac{24}{(S^2-4)^2}.
}
\]