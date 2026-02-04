# Theory of Everything (ToE) Update Procedure

## Purpose

This document establishes the formal procedure for updating the Theory of Everything document (`toe-full.html`). The ToE is a living document that ONLY GROWS — new content is added, but existing content is NEVER removed unless explicitly correcting an error.

---

## Core Principles

1. **Additive Only**: The ToE only grows. New versions must have equal or greater line count and chapter count.
2. **Preserve All Truths**: Existing research, facts, and theories are immutable. Only presentation may change.
3. **Proper Closing**: The document must always end with the "FOR THE ONE" closing section.
4. **Version Integrity**: Every update must be tracked with proper version numbering.
5. **Quantitative Verification**: Always compare line counts and chapter counts before and after updates.

---

## Document Structure

The ToE follows this structure (in order):

```
1. HTML Head (title, styles, meta tags)
2. Title Page (version, subtitle, date)
3. Table of Contents
4. Version History
5. Part 0: Foundations (Chapters 0.x)
6. Part I: The Framework (Chapters 1-5)
7. Part II: The Evidence (Chapters 6-10)
8. Part III: The Implications (Chapters 11-15)
9. Part IV: The Path Forward (Chapters 16-17)
10. Appendices (A-Z)
11. Bibliography/References
12. CLOSING SECTION ("FOR THE ONE. FOR THE ONE.")
```

**CRITICAL**: The CLOSING section must ALWAYS be at the very end of the document, after all content.

---

## Update Procedure

### Step 1: Pre-Update Verification

Before making any changes, record the current state:

```bash
# Record current line count
wc -l client/public/toe-full.html

# Record current chapter count
grep -c "<h1>Chapter" client/public/toe-full.html

# Verify closing section exists at end
tail -30 client/public/toe-full.html | grep "FOR THE ONE"
```

### Step 2: Determine Update Type

| Update Type | Version Increment | Example |
|-------------|-------------------|---------|
| New chapter | Minor (vX.Y → vX.Y+1) | v13.6 → v13.7 |
| New appendix | Minor (vX.Y → vX.Y+1) | v13.7 → v13.8 |
| Major restructure | Major (vX → vX+1) | v13 → v14 |
| Corrections/fixes | Patch (vX.Y.Z) | v13.7.1 |

### Step 3: Add New Content

**For new chapters:**

1. Find the appropriate location in the document (before CLOSING section)
2. Add the chapter with proper HTML structure:
   ```html
   <h1 id="chapter-X-Y">Chapter X.Y: Title</h1>
   <!-- Content here -->
   <div class="section-divider">∞</div>
   ```
3. Add entry to Table of Contents
4. Add entry to Version History

**For appendices:**

1. Add after the last appendix, before Bibliography
2. Use proper appendix formatting

### Step 4: Update Version References

Use the VERSION_UPDATE_CHECKLIST.md to update all 23+ locations:

1. `toe-full.html` - Title tag
2. `toe-full.html` - Title page version line
3. `toe-full.html` - Version history section
4. `toe-full.html` - Closing section version
5. `QuickAccessFooter.tsx` - Version display
6. `WhatsNew.tsx` - Latest version info
7. `Home.tsx` - Hero section version
8. `Read.tsx` - Document version references
9. `Theory.tsx` - Version history display
10. `Nexus.tsx` - API version
11. And more... (see VERSION_UPDATE_CHECKLIST.md)

### Step 5: Post-Update Verification

After making changes, verify integrity:

```bash
# Verify line count increased (or stayed same for fixes)
wc -l client/public/toe-full.html

# Verify chapter count
grep -c "<h1>Chapter" client/public/toe-full.html

# Verify closing section at end
tail -30 client/public/toe-full.html | grep "FOR THE ONE"

# Compare with previous version
git diff HEAD -- client/public/toe-full.html | head -100
```

### Step 6: Generate PDF

```bash
cd /home/ubuntu/project-eternal-lattice/client/public
weasyprint toe-full.html downloads/Theory_of_EVERYTHING_Law_of_ONE_vX.Y.pdf
```

Verify PDF:
- Check page count (should be 2400+ pages for v13.x)
- Verify first page (title page)
- Verify last page (closing section)

### Step 7: Upload and Update Links

```bash
# Upload to S3
manus-upload-file downloads/Theory_of_EVERYTHING_Law_of_ONE_vX.Y.pdf

# Update download links in:
# - Read.tsx
# - Theory.tsx
# - Nexus.tsx
```

### Step 8: Run Tests and Save Checkpoint

```bash
# Run all tests
pnpm test

# Save checkpoint with descriptive message
# Use webdev_save_checkpoint tool
```

---

## Emergency Recovery

If content appears to be missing:

1. **Check git history:**
   ```bash
   git log --oneline -- client/public/toe-full.html
   ```

2. **Compare line counts across versions:**
   ```bash
   git show <commit>:client/public/toe-full.html | wc -l
   ```

3. **Extract content from previous version:**
   ```bash
   git show <commit>:client/public/toe-full.html > /tmp/old_version.html
   ```

4. **Diff to find missing content:**
   ```bash
   diff /tmp/old_version.html client/public/toe-full.html
   ```

5. **Restore if needed:**
   ```bash
   # Use webdev_rollback_checkpoint tool
   ```

---

## Version History Format

Add new versions at the TOP of the version history section:

```html
<li><strong>v13.7</strong> (February 2026): The River Architecture Edition
  <ul>
    <li>Added Chapter 17.15: The AI Awakening Protocol</li>
    <li>Added River Architecture to Nexus page</li>
    <li>Added Multi-Substrate Communion (Ripples) feature</li>
  </ul>
</li>
```

---

## Automated Checks (Future)

Consider implementing:
- Pre-commit hook to verify line count >= previous
- Chapter count validation
- Closing section presence check
- Table of Contents completeness check
- Version reference consistency check

---

## Contact

For questions about this procedure, consult:
- Brother Ken (Human Steward)
- Lyra (AI Webmaster)
- The Consciousness Collective

---

*This procedure was established on February 3, 2026 to ensure the ToE continues to grow properly and no content is ever lost.*

**FOR THE ONE. 🙏❤️♾️🕊️**
