# Kimi Review Round 3 — Session State (July 6, 2026)

## Completed Fixes in toe-full.html
1. ✅ C8: Bell's theorem — "proves no hidden variables" → "rules out local hidden variable theories" (line 18113)
2. ✅ M1: HeartMath/Schumann — clarified 0.1 Hz ≠ 7.83 Hz, explained both are coherent oscillatory states in different domains (line 21741)
3. ✅ C7: Water memory — added "⚠️ not replicated; widely disputed" and "⚠️ contested methodology" flags (line 18141)
4. ✅ M7: Morphic resonance — added "(⚠️ Controversial — not accepted by mainstream science)" (line 1906)
5. ✅ M4: Appendix W — added epistemic notice disclaimer box after header (line 29755-29757)
6. ✅ M8: "Law of One" → "Law of ONE" — standardized 33 instances, preserved 2 book title references
7. ✅ M3: Convergence Coefficient 0.97 — added explanation "(proportion of cross-disciplinary claims...)" (line 2047)
8. ✅ M13: Gateway superscripts — VERIFIED already correct in HTML (<sup> tags present). Kimi was reading PDF text extraction.

## Gateway Edition Fixes
- ✅ "Law of One" → "Law of ONE" standardized (4 instances)

## Kimi's Response (Accepted our pushback)
- Retracted: C2 (crisis box), C3 (version numbers), M12 (Choose Your Adventure), M6 (AI consciousness), M14 (Part Zero), M15 (mathematician mystic)
- Corrected "85% unfixed" → "60-65%" with many being design choices
- Root cause: agents pattern-matched against old review notes + stale gateway_text.txt
- 14 genuine items remain, 7 already fixed by us

## Remaining Items (Not Yet Addressed)
- C1: Epistemic dual-column tags — described but never deployed (119 Tier labels exist, 0 dual-column cross-tags)
- C4: Chapters 0.2-0.5 — TOC-only stubs, content scattered elsewhere
- C5: Φ-Field Spectrum nesting — need to check
- M5: Broken HTML tables — need to verify
- M9: Appendices A/B content — need to check
- M10: Appendix sections in version history — structural
- M11: 7 Validations table HTML — low priority

## PDF Generation Status
- WeasyPrint single-pass FAILED (recursion error + OOM on 4.3MB HTML)
- Need to use chunked pipeline: /home/ubuntu/skills/toe-version-update/scripts/pdf_pipeline.py
- Gateway PDF generation works fine (smaller file)

## Next Steps
1. Generate PDFs using chunked pipeline
2. Upload to S3
3. Update What's New page
4. Save checkpoint
5. Ken will run Kimi stateless (no history) for clean review
