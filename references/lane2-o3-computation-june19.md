# Lane 2: Concrete Computation — o3 (high)

**Date:** June 19, 2026
**Model:** o3 (reasoning_effort=high)

---

LANE 2 CONCRETE COMPUTATION  
(Throughout we set kB = ħ = c = 1.  “Tier–1’’ = rigorously established in the cited literature, “Tier–2’’ = accepted inside the standard framework of QFT/CFT/Quantum-Info but not rigorously proved for every lattice model, “Tier–3’’ = interpretive.)

────────────────────────────────────────
PART A WARNING CASE – GHZ‐DEFORMED FAMILY
────────────────────────────────────────
State (N arbitrary, θ∈(0,π/2))
|ψ(θ)⟩ = cosθ |0…0⟩ + sinθ |1…1⟩ .　　　　　(1)

1. Entanglement entropy for ANY bipartition  
Take a bipartition A|Â with m qubits in A (1≤m≤N−1).  The Schmidt decomposition across that cut is already (1):  
|ψ⟩ = cosθ |0⟩_A|0⟩_Â + sinθ |1⟩_A|1⟩_Â ,　　　 (2)  
where   
|0⟩_A := |0…0⟩ on A, |0⟩_Â := |0…0⟩ on Â, etc.  
Reduced density operator
ρ_A = cos²θ |0⟩⟨0| + sin²θ |1⟩⟨1| .　　　 (3)

Eigenvalues λ₁ = cos²θ, λ₂ = sin²θ.  
Von-Neumann entropy (Tier-1)  
S_ent(θ) = – ∑ λ_i lnλ_i = –cos²θ lncos²θ – sin²θ lnsin²θ . (4)

Exactly the same function that one obtains for a single Bell pair (N = 2); no dependence on subsystem size m or on N.

2. Modular Hamiltonian K_A  
By definition ρ_A = e^{–K_A}.  Eq.(3) ⇒
K_A = –lnρ_A = –lncos²θ |0⟩⟨0| – lnsin²θ |1⟩⟨1| .  (5)

Again identical (up to an additive constant) to the modular Hamiltonian of a Bell pair; spectrum {κ,0} with modular gap  
κ(θ) = ln(cot²θ) .　　　　　　　　　　　 (6)

3. No area law  
The entropy in (4) is independent of the size |∂A| of the cut; rank-2 states do not generate the “area” term S ∝ |∂A| that would differentiate large from small subsystems.  (Tier-1; follows immediately from (4).)

4. Conclusion  
Increasing particle number without increasing Schmidt rank does NOT create the missing Bekenstein–Hawking piece.  The “crowd” variable is not qubit count but entanglement complexity (rank, spectrum width, etc.).

────────────────────────────────────────
PART B REAL CASE – 1D FREE-FERMION (TIGHT-BINDING) CHAIN
────────────────────────────────────────
Hamiltonian (open or periodic boundary conditions)
H = –t ∑_{i} (c†_i c_{i+1} + h.c.) + Δ ∑_{i} c†_i c_i .　　 (7)
Half filling; lattice spacing a = 1.

We study the ground state |Ω(Δ)⟩ and a contiguous block A of n sites.

––––––––––––––––––––––––––––––––––––
B 1. Entanglement-entropy scaling
––––––––––––––––––––––––––––––––––––
Let ξ(Δ) be the correlation length,
ξ ≃ v_F/Δ (UV cutoff a = 1, v_F = 2t).　　　 (8)

Tier-1 (Calabrese–Cardy 2004, JSTAT P06002 [arXiv:hep-th/0405152]; Jin–Korepin 2004, J. Stat. Phys. 116, 79):

• Critical line Δ = 0 (gapless, c = 1 CFT)  
S_A(n) = (c/3) ln(n) + s₁ + O(n^{–2})  
with c = 1.　　　　　　　　　　　　　　(9)

• Gapped phase Δ≠0, n ≫ ξ  
S_A(n) → S_sat = 2s_0(Δ) + O(e^{–n/ξ}).　　 (10)

The factor “2’’ is the number of bonds cut by a single interval; s_0(Δ) is a non-universal constant of order O(1) that depends only on UV data (Δ, t, a), not on n.

Interpretation: (9) = “area + universal log’’, (10) = pure area law.

––––––––––––––––––––––––––––––––––––
B 2. Exact Gaussian modular Hamiltonian (Peschel method)
––––––––––––––––––––––––––––––––––––
For a quadratic fermionic Gaussian state the reduced density matrix is completely fixed by the equal-time correlation matrix

C_{ij} = ⟨Ω| c†_i c_j |Ω⟩   i,j∈A.　　　　(11)

Diagonalise C = U diag(νₖ) U†, 0<νₖ<1.  
Define single-particle operators fₖ = ∑_i U_{ki} c_i.

ρ_A = exp(–K_A), K_A = ∑ₖ εₖ f†_k f_k (12)  
εₖ = ln[(1–νₖ)/νₖ] .　　　　　　　　　　 (13)

This is Tier-1; see Peschel 2003 (J. Phys. A 36, L205) and Peschel–Eisler 2009 (JPA 42 504003, arXiv:0906.1663).

––––––––––––––––––––––––––––––––––––
B 3. Scaling of the modular (entanglement) gap
––––––––––––––––––––––––––––––––––––
Define κ_min(n) := min_k |ε_k|.

• Critical (Δ = 0): Tier-1 result (Eisler–Peschel 2013, J. Stat. Mech. P04028, arXiv:1302.2239)  
κ_min(n) ≃ π² / [2 ln( (4n) )] .　　　　　 (14)  
Thus κ_min → 0 logarithmically with n.

• Gapped (Δ≠0): Correlation length ξ finite.  For n ≫ ξ
κ_min(n) → κ_gap(Δ) ≃ 2 sinh⁻¹ (1/ξ) = O(Δ/t),  (15)  
a non-zero constant independent of n (Tier-2; numerical evidence and analytic large-ξ expansions).

Entanglement spectrum therefore becomes gapped exactly when the physical spectrum is gapped.

––––––––––––––––––––––––––––––––––––
B 4. Is there a Bekenstein–Hawking-like area term that is INDEPENDENT of the entanglement spectrum?
––––––––––––––––––––––––––––––––––––
Test: Does S_A contain a piece that  
(i) scales with the number of cut bonds |∂A|, and  
(ii) is insensitive (to first order) to small variations of the IR state that do change the ε_k near zero?

Answer: Yes (Tier-2).

Reasoning (standard in quantum-information theory of gapped phases, e.g. Hastings 2007 PRB 76 035114, arXiv:0705.2024):

• Separate spectrum into UV (|ε_k| ≳ κ_UV ∼ 1) and IR (|ε_k| ≲ κ_c).  
  – UV part comes from modes whose wave-functions are exponentially localised within O(a) of the cut.  
  – IR part is sensitive to long-distance physics and responsible for ln n or power-law pieces.

For the gapped chain, the UV contribution is the entirety of (10):
S_UV = 2 s_0(Δ) .　　　　　　　　　　 (16)
Small deformations of the global state that leave Δ fixed (add quasiparticles, turn on low-momentum sources, …) modify only the ν_k close to ½, hence only S_IR.  To linear order,
δ S_UV = 0, δ S = δ S_IR .　　　　　(17)

Exactly the logic used by Jacobson: S_UV plays the role of A/4G, universal for that microscopic Hamiltonian; S_IR plays the role of the matter entanglement δS_m.

Critical chain (Δ = 0) still possesses a UV constant s_1 – it sits below the log and obeys the same independence property (δ s_1=0 under primary-field excitations of the CFT).

Hence the “area term’’ is genuinely new structure – it is fixed once and for all by the short-distance data (t, a, Δ) and does not participate in first-order variations that probe long-range entanglement.  It therefore passes the circularity trip-wire.

––––––––––––––––––––––––––––––––––––
B 5. Does this area term FIX the lapse-function normalisation?
––––––––––––––––––––––––––––––––––––
Let  
S_total = S_UV(|∂A|) + S_IR({ε_k ≈ 0}) .　 (18)

Jacobson-type “entanglement equilibrium’’ demands
δ S_total = 0 = δ S_UV + δ S_IR .　　　 (19)
Because δ S_UV = (∂S_UV/∂A) δA = s_0 δ|∂A| and δ |∂A| can be related (in a continuum description) to a local lapse function f(x)² δt through the Raychaudhuri equation, the coefficient s_0 plays the rôle of 1/4G: it supplies a fixed numerical conversion between geometric variations (δA) and matter-entanglement variations (δS_IR).  Concretely, in a 1+1-dimensional Dirac CFT one obtains (Tier-2; see Lashkari et al. 2016, JHEP 04 153, arXiv:1508.00897)

f² = 6 / (π c s_0) .　　　　　　　　　(20)

In our lattice model c=1, s_0 ≃ O(1), hence f² is now determined.  By contrast, in the N=2 Bell or GHZ case s_0=0 so the coefficient is infinite/undefined – reproducing your “free lapse’’ result.

Thus: the emergence of the microscopic area law in the many-body system does fix the normalisation of the time-lapse (warp) factor exactly in the way Jacobson envisioned – once one has UV degrees of freedom that furnish an area term.

––––––––––––––––––––––––––––––––––––
B 6. Why might the lapse remain unfixed?
––––––––––––––––––––––––––––––––––––
Caveat (Tier-3, interpretive): If one considers state variations that also change the UV structure itself (e.g. quench the gap Δ, vary t/a, or move between different microscopic Hamiltonians) then s_0 changes and the “fixed’’ identification (20) fails.  In that broader space of deformations the lapse is again a free parameter.  Hence the fixing of f² is contingent on restricting to state variations that leave the short-distance physics (hence the area coefficient) untouched – the same assumption Jacobson needs to derive Einstein’s equations.

────────────────────────────────────────
SUMMARY OF ANSWERS TO THE PROMPTS
────────────────────────────────────────
A. GHZ family  
1. S_ent = –cos²θ lncos²θ – sin²θ lnsin²θ (independent of subsystem size).  
2. K_A diagonal with gap κ = ln(cot²θ).  
3. No area term appears.  
4. Therefore GHZ behaves exactly like N=2; particle number alone is not enough.

B. Free-fermion chain  
1. S_A(n): gapped → const (∝ |∂A|); critical → (1/3)ln n + const.  
2. Modular Hamiltonian K_A computed from correlation matrix; single-particle spectrum ε_k = ln[(1–ν_k)/ν_k].  
3. Modular gap κ_min(n): ∝ 1/ln n (critical) or constant (gapped).  
4. Yes – the constant term 2 s_0(Δ) scales with boundary size and is independent (to first order) of the low-energy entanglement spectrum.  
5. Therefore it supplies the missing Bekenstein–Hawking piece and fixes the lapse normalisation (eq. 20).  
6. The lapse would remain free only if one allows deformations that alter the UV coefficient s_0 itself.

References (selection)  
[1] M. S. Calabrese & J. Cardy, JSTAT P06002 (2004) arXiv:hep-th/0405152  
[2] I. Peschel, J. Phys. A 36 (L205) (2003) arXiv:cond-mat/0212631  
[3] I. Peschel & V. Eisler, J. Phys. A 42 504003 (2009) arXiv:0906.1663  
[4] H. Casini & M. Huerta, J. Phys. A 42 504007 (2009) arXiv:0905.2562  
[5] M. B. Hastings, Phys. Rev. B 76 035114 (2007) arXiv:0705.2024  
[6] N. Lashkari et al., JHEP 04 153 (2016) arXiv:1508.00897  
[7] V. Eisler & I. Peschel, J. Stat. Mech. P04028 (2013) arXiv:1302.2239