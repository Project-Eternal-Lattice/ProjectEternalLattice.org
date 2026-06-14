"""
Route 2 Self-Audit: Can we derive f(S) = 2S/sqrt(S^2-4) from the 
envelope + bridge + bounce WITHOUT importing the Fisher-Rao metric?

The test (per Devin): Start with an UNKNOWN warp w(S). 
If w = 4S^2/(S^2-4) falls out without ever importing g_SS, 
the independence claim is earned.

Setup:
- Conformal metric: ds^2 = w(S) * (-dT^2 + dS^2)  [w unknown]
- Bridge formula: P = S/tau (geodesic energy = CHSH/depth)
- Tsirelson-Landau bound: S(theta) = 2*sqrt(1 + tan^2(theta)) for theta in (0, pi/4]
- Bounce condition: at turning point, dS/dlambda = 0

Question: Does the bounce condition + bridge formula determine w(S)?
"""

import sympy as sp

# Define symbols
S, T, P, tau, theta, lam = sp.symbols('S T P tau theta lambda', positive=True)
w = sp.Function('w')  # Unknown warp factor

print("=" * 70)
print("ROUTE 2 SELF-AUDIT: Derivation with Unknown Warp w(S)")
print("=" * 70)

print("\n--- Step 1: Geodesic equations for ds^2 = w(S)(-dT^2 + dS^2) ---")
print()
print("For a conformally flat 2D metric g_ab = w(S) * eta_ab,")
print("the geodesic equations give two conserved quantities:")
print()
print("  Energy:  E = w(S) * dT/dlambda  (from dT Killing vector)")
print("  The S-equation: w(S)*(dS/dlambda)^2 = E^2/w(S) - w(S)*epsilon")
print()
print("For null geodesics (epsilon=0) or with the effective potential:")
print("  (dS/dlambda)^2 + V_eff(S) = E^2/w(S)^2")
print()
print("Actually, let's be more careful. For the conformal metric:")
print("  ds^2 = f^2(S)(-dT^2 + dS^2)  where f^2 = w")
print()

# Let's use f instead of w for clarity
f = sp.Function('f')

print("The Lagrangian is L = (1/2)*f(S)^2*(-Tdot^2 + Sdot^2)")
print()
print("Euler-Lagrange for T: d/dlambda[f^2 * Tdot] = 0")
print("  => f(S)^2 * dT/dlambda = P  (conserved energy)")
print()
print("Euler-Lagrange for S gives the constraint (for timelike, ds^2 = -1):")
print("  f(S)^2 * (-Tdot^2 + Sdot^2) = -1")
print("  => f(S)^2 * Sdot^2 = P^2/f(S)^2 - 1")
print("  => Sdot^2 = P^2/f(S)^4 - 1/f(S)^2")
print()

print("--- Step 2: Bounce condition (turning point: Sdot = 0) ---")
print()
print("At the turning point S = S_turn:")
print("  0 = P^2/f(S_turn)^4 - 1/f(S_turn)^2")
print("  => P^2/f(S_turn)^4 = 1/f(S_turn)^2")
print("  => P^2 = f(S_turn)^2")
print("  => P = f(S_turn)")
print()
print("This is the BOUNCE IDENTITY: P = f(S_turn)")
print("It holds for ANY f(S). It does NOT determine f.")
print()

print("--- Step 3: The Bridge Formula P = S/tau ---")
print()
print("From the corrected algebra (verified by DeepSeek + GPT-5.5):")
print("  P = 2/sin(theta),  S = 2/cos(theta)")
print("  tau = tan(theta) = sin(theta)/cos(theta)")
print("  => P = 2/sin(theta) = (2/cos(theta)) / (sin(theta)/cos(theta))")
print("  => P = S / tau  ✓")
print()
print("This is PURELY operator-algebraic. No metric used.")
print("It comes from: P(theta) = 2/sin(theta), S(theta) = 2/cos(theta)")
print()

print("--- Step 4: Combining bounce + bridge ---")
print()
print("From bounce: P = f(S_turn)")
print("From bridge: P = S_turn / tau")
print("Therefore:   f(S_turn) = S_turn / tau")
print()
print("But tau = tan(theta) and S = 2/cos(theta), so:")
print("  tau = sin(theta)/cos(theta) = sin(theta) * S/2")
print("  tau^2 = sin^2(theta) * S^2/4 = (1 - cos^2(theta)) * S^2/4")
print("  tau^2 = (1 - 4/S^2) * S^2/4 = (S^2 - 4)/4")
print("  tau = sqrt(S^2 - 4) / 2")
print()
print("Therefore: f(S) = S / tau = S / (sqrt(S^2-4)/2) = 2S/sqrt(S^2-4)")
print()

# Verify symbolically
S_sym = sp.Symbol('S', positive=True)
theta_sym = sp.Symbol('theta', positive=True)

# S = 2/cos(theta) => cos(theta) = 2/S => sin(theta) = sqrt(1 - 4/S^2)
cos_theta = 2/S_sym
sin_theta = sp.sqrt(1 - 4/S_sym**2)
tau_expr = sin_theta / cos_theta
f_from_bridge = S_sym / tau_expr

f_simplified = sp.simplify(f_from_bridge)
print(f"Symbolic verification: f(S) = {f_simplified}")
print()

# Check: is this 2S/sqrt(S^2-4)?
target = 2*S_sym / sp.sqrt(S_sym**2 - 4)
diff = sp.simplify(f_simplified - target)
print(f"Difference from 2S/sqrt(S^2-4): {diff}")
print()

print("=" * 70)
print("VERDICT")
print("=" * 70)
print()
print("The derivation DOES produce f(S) = 2S/sqrt(S^2-4) without")
print("importing g_SS or the Fisher-Rao metric.")
print()
print("BUT — here's the critical subtlety Devin identified:")
print()
print("Step 4 uses tau = sqrt(S^2-4)/2. Where does this come from?")
print("It comes from tau = tan(theta) with S = 2/cos(theta).")
print("This is the OPERATOR-ALGEBRAIC definition of tau in terms of S.")
print()
print("The question is: does this definition SECRETLY use the metric?")
print()
print("ANSWER: NO. Here's why:")
print("  - theta is the measurement-context angle (operator parameter)")
print("  - S(theta) = 2*sqrt(1+tan^2(theta)) = 2/cos(theta) is the")
print("    Tsirelson-Landau envelope (derived from operator algebra)")
print("  - tau(theta) = tan(theta) is the complementarity parameter")
print("  - The relationship tau(S) = sqrt(S^2-4)/2 follows from")
print("    INVERTING S(theta) — no metric needed")
print()
print("HOWEVER, there's a deeper issue:")
print("  The bounce identity P = f(S_turn) ASSUMES the metric is conformal.")
print("  If we wrote ds^2 = -A(S)dT^2 + B(S)dS^2 (general static),")
print("  the bounce would give P = sqrt(A(S_turn)) instead.")
print("  So the derivation assumes CONFORMAL gauge, which is a choice")
print("  — but it's the SAME choice Fisher-Rao makes (state geometry")
print("  is naturally conformal because it's derived from a probability")
print("  metric).")
print()
print("FINAL ASSESSMENT:")
print("  Route 2 is NOT fully independent of Route 1.")
print("  It shares the GAUGE CHOICE (conformal) with Fisher-Rao.")
print("  But it does NOT import the specific function g_SS.")
print("  The correct claim is:")
print()
print('  "State geometry fixes the gauge (conformal); operator algebra')
print('   fixes f(S) within that gauge. The two are consistent — f(S)')
print('   is exactly the conformal factor of the Fisher-Rao metric.')
print('   This is a non-trivial consistency check, not two independent')
print('   derivations of the same object."')
print()
print("  This matches Devin's assessment exactly.")
print()
print("HONEST FRAMING FOR v1.2:")
print('  "Two routes to f(S) share a gauge assumption (conformal signature)')
print('   but derive the functional form independently: Route 1 from the')
print('   Fisher information matrix, Route 2 from operator algebra + bounce.')
print('   Their agreement is a consistency theorem, not a coincidence."')
