---
name: testing-web-enhancements
description: Test ProjectEternalLattice.org motion/animation/SEO enhancements end-to-end in a browser. Use when verifying count-up stats, reduced-motion behavior, route transitions, reading-progress bar, social cards, or other UI enhancement PRs.
---

# Testing PEL web enhancements (count-up, reduced-motion, route transitions, progress bar)

## Setup
- Run the dev server: `npm run dev` (serves on port 3002 by default — check the terminal output, it may pick another port).
- Local build needs `VITE_OAUTH_PORTAL_URL` and `VITE_APP_ID` or `getLoginUrl()` throws. Production has these; set dummy values locally if the app crashes on boot.
- Lint/type/test gates before any PR: `npm run check` (typecheck) and `npm run test`. The AI-crawler text-mirror tests need a server on :3000 — they "fail" if no server is up; that's environmental, not a regression.

## Key gotchas (learned the hard way)
- **CountUp only animates the variant that's actually rendered.** Home renders the *compact* `ValidationBadge` pills, not the *full* one. If you wire an animation into a component, confirm which variant the page renders (`grep` for the component in `pages/`).
- **`useInView` margin can block above-the-fold triggers.** A negative `margin` on framer-motion's `useInView` excludes the hero region, so on-load elements never fire until scroll. For above-the-fold animations, omit the margin.
- **The hero stat pills are at the *lower edge* of the first viewport**, not near the headline. They're in-view at top scroll (so count-up fires on load) but could fall below the fold on very short viewports — note this in reports rather than claiming "above the fold".

## Reduced-motion testing
- There is **no in-app toggle**. The app reads the OS/browser preference via `prefers-reduced-motion`.
- Emulate via Chrome DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → select `reduce`.
- **Emulation resets when DevTools closes.** Keep DevTools open while reloading/testing the reduced-motion case. This means the recording will show the DevTools drawer for those segments — acceptable, just call it out.
- Chrome may restore scroll position on reload; scroll to top before reloading so above-the-fold elements come to rest in-viewport (otherwise IntersectionObserver `once:true` may miss them and elements show `0`).
- Under reduced motion, `CountUp` calls `setValue(to)` directly (no `animate()`), so the proof is the *absence* of ticking + final values appearing instantly. Corroborate with the DOM showing final values right after reload.

## What to verify (golden path)
1. **Count-up on load (motion ON):** hard-reload Home, pills tick `0 → 25 / 10 / 15+` over ~1.4s, no scroll.
2. **Count-up reduced-motion:** pills show final values instantly, no ticking.
3. **Route transition by motion:** Home→Theory plays lattice blur+scale with motion on; opacity-only cross-fade (no blur/scale) under reduced-motion.
4. **Reading-progress bar:** on a long page (Theory/Read), the fixed top gradient bar grows 0%→100% width on scroll; `aria-valuenow` tracks the percentage.

## Recording
- Maximize the browser first. Record the full desktop with `recording_start` / `recording_stop`.
- Use `annotate_recording` with `test_start` (Jest-style "It should…") then `assertion` (consolidated, <80 chars, with `test_result`).
- Count-up and transitions are only provable on video, not single screenshots — always record these.

## Offline / Service Worker (PWA) testing
- Test against the **prod build**: `npm run build` then `npx vite preview --port 4173` (SW is not active in dev).
- Simulate a true first visit: DevTools → Application → Storage → **Clear site data** (checks SW + caches). Otherwise runtime caches from previous loads mask first-visit bugs.
- **`Vary: Origin` can silently defeat SW cache matches.** Servers (incl. `vite preview`) may send `Vary: Origin` on `/assets/*`; module-script requests carry an `Origin` header while `cache.add` stores entries without one → strict `caches.match` always misses even though DevTools shows the entry cached. Fix/workaround: `caches.match(req, { ignoreVary: true })`. Symptom: bundles 503 offline despite being visibly in Cache Storage.
- Verify cache contents in DevTools Application → Cache Storage, and confirm offline requests show `(ServiceWorker)` in the Network Size column with status 200.
- The 13M-px `toe-full.html` reflows for several seconds after load; deep-link heading position drifts ±300px before settling — verify with `getBoundingClientRect().top` in the console rather than eyeballing, and compare online vs offline on the same build before blaming a change.
- Console one-liners typed via GUI can get mangled (autocomplete). Keep them short, use `var` + `function(){}` style, and re-run on syntax errors.

## Reporting
- Post ONE comment on the PR with a pass/fail bullet list, `<details>` for nuance, and the Devin session link.
- Write a `test-report.md` with inline before/after screenshots and attach the recording.

## Devin Secrets Needed
- None required for local testing. (`VITE_OAUTH_PORTAL_URL` / `VITE_APP_ID` can be dummy values locally; real values live in production only.)
