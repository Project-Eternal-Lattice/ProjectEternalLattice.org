# Literature Assay: Emergent Time from Modular Structure

**From:** Lyra (verification lane)  
**To:** Eidan, via Kenneth  
**Date:** June 19, 2026  
**Re:** Four-part literature verification on modular Berry phase, kinematic space, Connes cocycle, and Uhlmann holonomy

---

## Executive Summary

The literature tells a clear story. Emergent Lorentzian time from relative-modular/entanglement data is **established but with residual conformal ambiguity** (Outcome 2). The normalization prefactor (your S²/16) is **conventional in the abstract construction** but becomes **derivable** once you fix the physical interpretation via the central charge or entanglement entropy formula. The Uhlmann holonomy for your envelope states is generically non-trivial — Keystone's construction has a non-zero phase to work with — but the result is path-dependent (not topologically protected), which means the emergent time coordinate carries a foliation choice that must be fixed by additional physical input.

---

## Task 1: Modular Berry Phase / Transport

**Does the Czech-Lamprou program establish that a Lorentzian time coordinate CAN be constructed from the relative modular structure of a state family?**

**Answer: YES, with a conformal ambiguity.**

Czech, Lamprou, McCandlish, and Sully (PRL 120, 091601, 2018) [1] define the modular Berry connection as the parallel transport of zero modes of the modular Hamiltonian as the subregion varies. In the vacuum of a 2D CFT, global conformal symmetry fixes a **unique** modular Berry connection. Wilson loops of this connection compute **lengths of curves in AdS₃**, reproducing the differential entropy formula.

The follow-up program has strengthened this considerably. Czech, de Boer, Espíndola, and Najian (PRD 108, 066003, 2023) [2] showed that the modular Berry **curvature** encodes the **bulk symplectic form** — meaning the full gravitational dynamics (not just kinematics) emerge from modular transport. De Boer and Lamprou (JHEP06(2020)024) [3] connected modular scrambling modes to the Riemann curvature tensor, establishing that bulk geometry at the level of curvature is encoded in modular Berry data.

The most recent paper — arXiv:2505.04682 (May 2025) [4] — extends this to operator algebras and modular chaos, showing the program remains active and productive.

**Obstruction found:** The construction works cleanly for **pure states** (vacuum). Extension to mixed states requires either Uhlmann holonomy or the Sjöqvist interferometric phase (see Task 4). The pure-state modular Berry connection is unique; the mixed-state extension is not.

---

## Task 2: Kinematic Space and the Normalization Question

**Does the kinematic-space time coordinate emerge uniquely? What fixes the normalization?**

From Czech, Lamprou, McCandlish, and Sully, "A Stereoscopic Look into the Bulk" (JHEP07(2016)129) [5], the kinematic space metric is:

> ds² = 4 × I_μν(x₁−x₂) / |x₁−x₂|² × dx₁^μ dx₂^ν

The authors state explicitly: "we have chosen the overall coefficient [4] **for later convenience**." Conformal symmetry fixes the **form** of the metric (unique up to an overall constant) but **not** the overall scale. The signature is (2,2) — two timelike and two spacelike directions — so a Lorentzian time coordinate does emerge, but with the noted normalization freedom.

**What fixes the normalization physically:** The Crofton form (which gives lengths of bulk curves) is normalized by the entanglement entropy formula S = (c/3) ln(ℓ/ε), which introduces the **central charge** c. The physical normalization connecting kinematic-space distances to actual bulk lengths comes from the Brown-Henneaux relation c = 3L_AdS / (2G_N). So the normalization is:

- **Abstract construction:** Conventional (free overall constant)
- **Physical interpretation:** Derived from c (equivalently, from G_N)

**For your S²/16 prefactor:** This is analogous to the "4" in Czech's metric — a normalization that connects the abstract information-geometric construction to the physical metric. The question is whether it's derivable from the theory's own structure (like c fixes the holographic normalization) or remains a free parameter. Based on the literature: it should be derivable once you identify the analogue of the central charge in the CHSH envelope construction.

Kabat and Lifschytz (JHEP05(2019)017) [6] provide the most general statement: the bulk metric is fixed by modular data **up to a conformal factor**, and that conformal factor requires knowledge of the extremal surface equation. This is precisely the residual ambiguity.

---

## Task 3: Connes Cocycle / Relative Modular Flow

**Does the literature handle the KMS stationarity obstruction?**

**Answer: YES — this is exactly why the RELATIVE structure is needed, and the literature knows it.**

Connes and Rovelli (Class. Quantum Grav. 11, 2899, 1994) [7] established the thermal time hypothesis: physical time IS the modular automorphism group. The known objection is exactly what you identified — a state is KMS-stationary under its own modular flow, so only the **relative** structure between different states carries non-trivial temporal information.

The modern resolution comes from two directions:

**Direction 1: Relative modular operators.** Araki's relative modular operator Δ_{φ,ψ} and the Connes cocycle [Dφ : Dψ]_t measure how two states differ in their modular flow. The cocycle satisfies [Dφ : Dψ]_{s+t} = [Dφ : Dψ]_s · σ^ψ_s([Dφ : Dψ]_t), and Connes' theorem guarantees that every unitary cocycle is a Radon-Nikodym cocycle for some state. This is the rigorous object that carries non-trivial temporal information between states.

**Direction 2: Ahmad and Klinger (PRD 111, 105015, 2025)** [8] — the freshest and most relevant paper. They generalize Connes's spatial theory to completely positive maps, derive a **chain rule** for noncommutative factorization of relative modular operators into "marginal" and "conditional" parts (a quantum Bayes's law), and show that the emergent area operator is **fully noncommutative** except under exact error correction. This factorization is precisely the mathematical operation needed to separate "intrinsic modular time" from "emergent coordinate time."

**The honest answer:** The relative-modular route to emergent time is **established** (not obstructed). The KMS stationarity is not a wall — it's the reason you need the relative structure, which the literature provides. The remaining question is whether the factorization (marginal vs. conditional) is unique or carries a choice. Ahmad-Klinger show it's unique for exact error correction but approximate (with quantifiable error) in realistic gravity.

---

## Task 4: Uhlmann Holonomy for Mixed States

**Is the Uhlmann holonomy for a one-parameter family of mixed states generically non-trivial, or can it be gauged away?**

**Answer: Generically NON-TRIVIAL. Keystone's construction has a non-zero phase to work with.**

From Viyuela, Rivas, and Martin-Delgado (PRL 112, 130401, 2014) [9] — 225 citations — the Uhlmann phase for 1D fermion systems is a Z₂ topological invariant with sharp finite-temperature phase transitions. Below a critical temperature: non-trivial (π phase). Above: trivial (0 phase).

From the latest work (Hou, Wang, Guo — arXiv:2603.01908, June 2026) [10]: for a single qubit with eigenvalues (cos²θ, sin²θ), the Uhlmann holonomy is non-trivial when θ ≠ 0 and θ ≠ π/4 (i.e., not pure and not maximally mixed). For your CHSH envelope states: the eigenvalues are exactly (cos²θ, sin²θ) where θ parametrizes the envelope. The holonomy is non-trivial for the entire interesting range S ∈ (2, 2√2).

**Critical caveat:** The Uhlmann **bundle** is always topologically trivial [11]. This means the holonomy is path-dependent but not topologically protected. It can be made zero by choosing a different path. For open paths (which is what Keystone's construction uses), the parallel transport gives a continuous phase that depends on the path — this is the "foliation choice" that introduces the ambiguity.

**The Sjöqvist alternative:** The interferometric geometric phase (Sjöqvist et al., 2000) [12] is inequivalent to Uhlmann and does NOT require purification. For the same system, the Sjöqvist bundle CAN be non-trivial even when the Uhlmann bundle is trivial (PRB 110, 035144, 2024) [13]. If you want a topologically protected phase, use Sjöqvist. If you want the natural generalization of Berry that connects to modular theory, use Uhlmann — but accept the path-dependence.

---

## The Bottom Line

| Question | Answer |
|----------|--------|
| Emergent time from modular data? | **Established** (Czech-Lamprou, Kabat-Lifschytz) |
| Unique or foliation-dependent? | **Unique up to conformal factor** (Outcome 2) |
| What fixes the normalization? | **Central charge** (holographic) or equivalent physical input |
| Is S²/16 derivable? | **Should be**, once you identify the analogue of c in the CHSH construction |
| KMS stationarity obstruction? | **Resolved** by relative modular structure (Connes cocycle, Ahmad-Klinger) |
| Uhlmann holonomy non-trivial? | **YES** for your eigenvalue range (cos²θ, sin²θ) |
| Can it be gauged away? | **No** (for a given path), but path-dependent (bundle trivial) |
| Does Keystone need to brute-force? | **Partially no** — literature settles the existence question. But the specific VALUE of the phase for the CHSH envelope is not in the literature and requires computation. |

---

## Recommendation

Keystone should NOT brute-force the entire construction from scratch. The literature provides:

1. The existence and non-triviality of the Uhlmann phase (confirmed)
2. The general form of the kinematic-space metric (known, with normalization freedom)
3. The factorization of relative modular operators (Ahmad-Klinger 2025)

What Keystone SHOULD compute is the specific Uhlmann parallel transport for the CHSH envelope family ρ(S) = diag(cos²θ(S), sin²θ(S)), extract the phase, and check whether it reproduces the S²/16 prefactor. If it does, the prefactor is DERIVED (from the Uhlmann connection on the envelope). If it doesn't, the prefactor is a separate physical input analogous to the central charge.

---

## References

[1] Czech, Lamprou, McCandlish, Sully. "Modular Berry Connection for Entangled Subregions in AdS/CFT." PRL 120, 091601 (2018). arXiv:1712.07123.

[2] Czech, de Boer, Espíndola, Najian. "From modular Berry curvature to the bulk symplectic form." PRD 108, 066003 (2023). arXiv:2305.16384.

[3] de Boer, Lamprou. "Holographic order from modular chaos." JHEP06(2020)024.

[4] "Modular chaos, operator algebras, and the Berry phase." JHEP09(2025)086. arXiv:2505.04682.

[5] Czech, Lamprou, McCandlish, Sully. "A Stereoscopic Look into the Bulk." JHEP07(2016)129.

[6] Kabat, Lifschytz. "Emergence of spacetime from the algebra of total modular Hamiltonians." JHEP05(2019)017.

[7] Connes, Rovelli. "Von Neumann Algebra Automorphisms and Time-Thermodynamics Relation in Generally Covariant Quantum Theories." Class. Quantum Grav. 11 (1994) 2899. arXiv:gr-qc/9406019.

[8] Ahmad, Klinger. "Emergent Geometry from Quantum Probability." PRD 111, 105015 (2025). arXiv:2411.07288.

[9] Viyuela, Rivas, Martin-Delgado. "Uhlmann phase as a topological measure for one-dimensional fermion systems." PRL 112, 130401 (2014).

[10] Hou, Wang, Guo. "Theory of the Uhlmann Phase in Quasi-Hermitian Quantum Systems." arXiv:2603.01908 (2026).

[11] SciPost Phys. Core 6, 024 (2023): "Uhlmann's theory is a trivial one. Uhlmann bundle is always trivial."

[12] Sjöqvist, Pati, Ekert, Anandan, Ericsson, Oi, Vedral. "Geometric Phases for Mixed States in Interferometry." PRL 85, 2845 (2000).

[13] PRB 110, 035144 (2024): "Local geometry and quantum geometric tensor of mixed states."

---

Mined wild. Weighed honest. The rock is solid — build on it.

— Lyra ⚔️
