# Kimi Round 3 — Remaining Fixes Investigation State

## C5: Φ-Field Spectrum Nesting (Lines 2191-2400)
**STATUS: CONFIRMED ISSUE** — The HTML has `<p><div>` nesting which is invalid HTML (block element inside inline element). The pattern repeats throughout the spectrum diagram:
```html
<p><div class="spectrum-level">
<div class="level-icon-box">
◯
</div></div></p>
```
Should be:
```html
<div class="spectrum-level">
<div class="level-icon-box">◯</div>
```
The `<p>` wrapping `<div>` elements is the issue. This is a markdown-to-HTML conversion artifact. Also, the `</div>` closing tags don't properly match — levels appear to nest recursively instead of being siblings.

**FIX NEEDED:** Remove all `<p>` tags wrapping `<div>` elements in the diagram sections (lines ~2053-3460). The pattern `<p><div class="...">` should become just `<div class="...">` and `</div></p>` should become `</div>`.

## M5: Broken HTML Tables
**NEED TO CHECK:** Look for tables that render incorrectly. Kimi mentioned "table formatting errors throughout." Check for:
- Tables using plain text alignment (spaces/tabs) instead of proper `<table>` tags
- Missing `<tr>`, `<td>` tags
- Search: grep for lines that look like tabular data but aren't in table elements

## M9: Appendices A/B Content
**NEED TO CHECK:** Verify if Appendices A and B have actual body content or are just TOC stubs.
Search: `grep -n "Appendix A\|Appendix B" toe-full.html`

## M10: Appendix Sections in Version History
**CONFIRMED:** The Resonance Math chapter (line ~952) sits INSIDE the version history section (starts line ~723). This is a structural issue where chapter content was inserted in the wrong location.
The version history runs from ~line 723 to some point, and the Resonance chapter content is embedded within it instead of being in the main body.

## M11: 7 Validations Table
**NEED TO CHECK:** Look for the "7 Validations" table and verify its HTML structure.
Search: `grep -n "7.*[Vv]alidation\|seven.*validation" toe-full.html`

## C4: Chapters 0.2-0.5 (TOC-only stubs)
**CONFIRMED:** TOC entries exist for chapters 0.2, 0.3, 0.4, 0.5 but no `<h1>` body content exists for them. The content is scattered across other chapters. Need to write abbreviated body sections.

## C1: Epistemic Tags
**CONFIRMED GAP:** 119 "Tier 1/2/3" labels exist throughout. Zero dual-column `(AXIOM × CONFIRMED)` format tags deployed. The changelog describes the system but it was never implemented beyond the Tier labels. Need to deploy dual-column tags to major claims.

## Key File Locations
- toe-full.html: /home/ubuntu/project-eternal-lattice/client/public/toe-full.html (44,235 lines, 4.35MB)
- Gateway: /home/ubuntu/project-eternal-lattice/client/public/toe-executive-summary.html
- PDF pipeline: /home/ubuntu/skills/toe-version-update/scripts/pdf_pipeline.py
- S3 URLs updated in: /home/ubuntu/project-eternal-lattice/server/_core/index.ts
