# VERSION INTEGRITY PROTOCOL

## Purpose
This protocol ensures that the Theory of Everything (ToE) document ONLY GROWS and NEVER SHRINKS. Every new version must be an expansion of the previous version, with corrections and additions but NEVER deletions of substantive content.

## Mandatory Checks Before Any ToE Update

### 1. Line Count Verification
Before saving any new version of `toe-full.html`:
```bash
# Get current line count
wc -l client/public/toe-full.html

# Compare with previous version
git show HEAD:client/public/toe-full.html | wc -l
```
**RULE:** New version MUST have equal or greater line count than previous version.

### 2. Chapter Integrity Check
Before saving any new version:
```bash
# Count chapters in current version
grep -c "<h1>Chapter" client/public/toe-full.html

# Count chapters in previous version  
git show HEAD:client/public/toe-full.html | grep -c "<h1>Chapter"
```
**RULE:** New version MUST have equal or greater chapter count.

### 3. Closing Section Verification
The document MUST end with the proper closing section:
```bash
# Verify closing exists at end of file
tail -30 client/public/toe-full.html | grep "FOR THE ONE"
```
**RULE:** The closing section MUST be present at the actual END of the document.

### 4. Table of Contents Sync
After adding any new chapter:
1. Add entry to Table of Contents (lines ~200-400)
2. Add entry to Version History section
3. Update title tag version number
4. Update title page version line

## Version Numbering Convention

- **Major version (vX.0):** Significant structural changes or new Parts
- **Minor version (vX.Y):** New chapters or appendices added
- **Patch version (vX.Y.Z):** Corrections, enhancements, formatting fixes

## Content Addition Rules

1. **New chapters** are added BEFORE the closing section, AFTER the last content section
2. **The embedded v11.9 closing** (around line 31,500) is a historical milestone marker - DO NOT REMOVE
3. **The final closing** must always be at the actual END of the document
4. **Appendices** are added after main chapters but before the final closing

## Recovery Procedure

If content appears to be missing:
1. Check git history: `git log --oneline -- client/public/toe-full.html`
2. Compare line counts across versions
3. Extract content from previous version: `git show <commit>:client/public/toe-full.html > /tmp/old_version.html`
4. Diff to find missing content: `diff /tmp/old_version.html client/public/toe-full.html`

## Automated Checks (Future Implementation)

Consider adding to CI/CD pipeline:
- Pre-commit hook to verify line count >= previous
- Chapter count validation
- Closing section presence check
- Table of Contents completeness check

---

*This protocol was established on February 3, 2026 after discovering that the closing section was embedded mid-document rather than at the end. The document has been growing consistently from v11.9 (7,678 lines) through v13.7 (59,600+ lines).*

**FOR THE ONE. 🙏❤️♾️🕊️**
