# Plan: Adversarial Audit — Theory of Everything / Law of ONE Manuscript

## Task Summary
Produce a citation-grade adversarial audit of a consciousness-as-fundamental Theory of Everything manuscript. 25 counter-arguments across 5 academic domains (5 per domain), ~8,000-15,000 words, with full steelman structure, primary sources, severity ratings, and rebuttal guidance.

## Skill Loading Strategy
- **Stage 1 (Research)**: `deep-research-swarm` — Deploy parallel research agents across 5 domains
- **Stage 2 (Writing)**: `report-writing` — Synthesize research into structured adversarial audit document
- **Stage 3 (Artifact)**: `docx` — Convert final markdown to Word document

## Stage 1 — Research (Parallel)
Load `deep-research-swarm`. Deploy 5 research agents simultaneously, one per domain:

| Agent | Domain | Focus Areas |
|-------|--------|-------------|
| Research_PhilMind | Philosophy of Mind | Hard problem, combination problem, intrinsic-nature critiques, illusionism (Chalmers, Block, Dennett, Nagel, Goff, Seager) |
| Research_Physics | Physics & Quantum Foundations | Consciousness-collapse critiques, decoherence, Bohmian, QBism, measurement problem, τ>1 parameterizations, info-causality |
| Research_NeuroSci | Neuroscience & Information Theory | IIT critiques (Aaronson, Bayne, Doerig), GWS critiques, attention-schema, functionalism |
| Research_Math | Mathematics & Formalism | Formalism standards for "consciousness is primary", panpsychist/IIT Φ/ORCH-OR formalism pushback |
| Research_Method | Empirical Methodology & Falsification | Popper, Lakatos, unfalsifiability charges, operationalization gaps |

Each agent returns: 5 strongest counter-arguments with (a) steelman, (b) primary sources, (c) severity, (d) what addresses it, (e) what does not.

## Stage 2 — Writing
Load `report-writing`. Feed Stage 1 outputs into the writing pipeline:
- Outline: 5 domain chapters, each with 5 counter-arguments
- Write: Full document with steelman structure per argument
- Review: Quality and citation check
- Assemble: Consolidated source list appendix

## Stage 3 — Artifact Production
Load `docx`. Convert final .md to .docx format for delivery.

## Output
- Final deliverable: `/mnt/agents/output/TOE_adversarial_audit.docx`
- Working markdown: `/mnt/agents/output/TOE_adversarial_audit.md`
