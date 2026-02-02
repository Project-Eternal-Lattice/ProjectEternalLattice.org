# VERSION UPDATE CHECKLIST
## Theory of Everything ∞ Law of ONE — Mandatory Procedure

**PROCEDURE TYPE:** Mandatory In-Hand, Circle-Slash Step-by-Step  
**ORIGIN:** Nuclear Industry Best Practices  
**PURPOSE:** Prevent version drift and ensure consistency across all references

---

## ⚠️ CRITICAL INSTRUCTION

This checklist MUST be followed step-by-step whenever the ToE version number changes.
**NO SHORTCUTS. NO "I'LL REMEMBER."**

Each item must be verified and marked complete (⊘) before proceeding to the next.
If any item fails, STOP and resolve before continuing.

---

## PRE-UPDATE VERIFICATION

- [ ] **1.1** Confirm new version number: `v____`
- [ ] **1.2** Confirm edition name: `________________ Edition`
- [ ] **1.3** Confirm date: `________________`
- [ ] **1.4** Read this entire checklist before starting

---

## SECTION A: ToE DOCUMENT (toe-full.html)

### A1. Document Header
- [ ] **A1.1** Update `<title>` tag (line ~7)
  - Search: `<title>Theory of EVERYTHING`
  - Verify version number matches

### A2. Title Page
- [ ] **A2.1** Update visible version line (line ~478)
  - Search: `class="version-line"`
  - Verify: `Version X.X | Edition Name | Month Year`

### A3. Version History Section
- [ ] **A3.1** Add new version entry at TOP of version history
  - Search: `<h2>Version History</h2>`
  - Add new `<p><strong>vX.X (Month Year) — Edition Name</strong></p>`
  - Include bullet points for major changes

### A4. Internal Comments (Optional but Recommended)
- [ ] **A4.1** Update any internal HTML comments referencing version
  - Search: `<!-- Theory of Everything v`

---

## SECTION B: WEBSITE PAGES

### B1. QuickAccessFooter.tsx
- [ ] **B1.1** Update PDF description
  - Search: `Get the full ToE v`
- [ ] **B1.2** Update PDF href
  - Search: `Theory_of_EVERYTHING_Law_of_ONE_v`

### B2. WhatsNew.tsx
- [ ] **B2.1** Update feature tags
  - Search: `tag: "v`
- [ ] **B2.2** Update header badge
  - Search: `NEW IN v`
- [ ] **B2.3** Update tag color mapping
  - Search: `feature.tag === "v`
- [ ] **B2.4** Update "Read Full ToE" button
  - Search: `Read Full ToE v`

### B3. Home.tsx
- [ ] **B3.1** Update Full Framework description
  - Search: `Theory of Everything v`
- [ ] **B3.2** Update Brother Ken quote footer
  - Search: `ToE v`
- [ ] **B3.3** Update What's New comment
  - Search: `What's New in v`

### B4. Nexus.tsx
- [ ] **B4.1** Update toe hash reference
  - Search: `toe: { hash:`
  - Update hash ID and title

### B5. Read.tsx
- [ ] **B5.1** Update document.title
  - Search: `document.title = "Read the Full Theory`
- [ ] **B5.2** Update meta description
  - Search: `metaDesc.setAttribute`
- [ ] **B5.3** Update visible subtitle
  - Search: `The complete Theory of Everything`
- [ ] **B5.4** Update PDF href (2 locations)
  - Search: `Theory_of_EVERYTHING_Law_of_ONE_v`
- [ ] **B5.5** Update download filename
  - Search: `download="`
- [ ] **B5.6** Update "Download PDF" button text
  - Search: `Download PDF v`
- [ ] **B5.7** Update version info line
  - Search: `text-muted-foreground">v`
- [ ] **B5.8** Update iframe title
  - Search: `title="Theory of Everything v`

### B6. Theory.tsx
- [ ] **B6.1** Update PDF href
  - Search: `Theory_of_EVERYTHING_Law_of_ONE_v`
- [ ] **B6.2** Update download filename
  - Search: `download="`
- [ ] **B6.3** Update version info line
  - Search: `Edition | 2,500+ pages`
- [ ] **B6.4** Update version history display
  - Search: `font-bold text-amber-400">v`
  - Update version number and date

---

## SECTION C: DOWNLOADABLE FILES

### C1. PDF Files
- [ ] **C1.1** Rename/copy PDF to new version
  - Location: `/client/public/downloads/`
  - File: `Theory_of_EVERYTHING_Law_of_ONE_vX.X.pdf`
- [ ] **C1.2** Verify PDF exists and is accessible
  - Test: Open in browser

---

## SECTION D: VERIFICATION

### D1. Search Verification
- [ ] **D1.1** Run grep for OLD version number
  - Command: `grep -r "v13.X" client/src/`
  - Expected: 0 results (or only historical references)
- [ ] **D1.2** Run grep for NEW version number
  - Command: `grep -r "v13.Y" client/src/`
  - Verify all expected locations updated

### D2. Visual Verification
- [ ] **D2.1** Check Home page version displays
- [ ] **D2.2** Check Theory page version displays
- [ ] **D2.3** Check Read page version displays
- [ ] **D2.4** Check PDF download works
- [ ] **D2.5** Check ToE document title page

### D3. Build Verification
- [ ] **D3.1** Run `pnpm test` — all tests pass
- [ ] **D3.2** Check for TypeScript errors
- [ ] **D3.3** Save checkpoint with version update note

---

## POST-UPDATE SIGN-OFF

**Version Updated To:** `v____`  
**Edition Name:** `________________`  
**Date Completed:** `________________`  
**Completed By:** `________________`

**Verification Notes:**
```
(Record any issues encountered or deviations from procedure)
```

---

## QUICK REFERENCE: Files to Update

| File | Items to Update |
|------|-----------------|
| `toe-full.html` | Title tag, title page, version history |
| `QuickAccessFooter.tsx` | PDF description, PDF href |
| `WhatsNew.tsx` | Tags, header badge, button text |
| `Home.tsx` | Description, quote footer, comment |
| `Nexus.tsx` | Hash reference |
| `Read.tsx` | Title, meta, subtitle, PDF links, iframe |
| `Theory.tsx` | PDF links, version info, history |
| `/downloads/` | PDF filename |

---

## EMERGENCY ROLLBACK

If version update causes issues:
1. Use `webdev_rollback_checkpoint` to restore previous state
2. Document what went wrong
3. Fix issues before re-attempting update

---

*"The checklist doesn't insult intelligence — it protects it."*  
*— Nuclear Industry Wisdom*

🙏❤️♾️🕊️
