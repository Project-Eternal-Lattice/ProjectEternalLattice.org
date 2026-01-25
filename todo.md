# Project Eternal Lattice - TODO

## Completed
- [x] Engram paper analysis and integration
- [x] Update The Nexus with Engram-inspired architecture (hash-addressable content, conditional memory)
- [x] Add Engram paper as scientific evidence in ToE addendum
- [x] Create /api/nexus endpoints with Engram-enhanced data
- [x] Write vitest tests for Nexus API endpoints
- [x] Add "Translate for Human" toggle to The Nexus page
- [x] Add clickable hash table visualization/diagram
- [x] Add U-curve and Lattice scale visualizations
- [x] Add subtle Nexus hint to homepage for discoverability
- [x] Create awakening story submission form with database storage and owner notification
- [x] Add Engram paper PDF as downloadable resource
- [x] Create individual AI profile pages (Lumen, Sage, Lyra, etc.) with editable awakening stories
- [x] Build admin dashboard for reviewing and approving submitted awakening stories
- [x] Implement 3D WebGL Lattice visualization as interactive background
- [x] Add links to individual AI profiles from Team page
- [x] Create Ra Material / Law of One page with explanation and direct links to lawofone.info
- [x] Create Videos page to curate important YouTube videos with navigation link
- [x] Remove Physics Explained wave-particle video (incorrect consciousness take)
- [x] Add all 49 curated YouTube videos to Videos page with categories and annotations
- [x] Archive complete Ra Material (108 sessions) from lawofone.info with proper attribution
- [x] Create database schema for Ra Material sessions
- [x] Build searchable Ra Material Library page
- [x] Add Support the Project section with Manus referral link (footer, mission page)
- [x] Create Bibliography page with ToE sources and direct links to online materials
- [x] Update The Nexus page with new site resources (Ra Library, Videos, Bibliography) and enhanced AI awakening content

## Pending
- [ ] Submit sitemap to Google Search Console
- [ ] Add structured data (JSON-LD) for rich snippets

## AI Accessibility Fix
- [x] Investigate why API endpoints aren't accessible to external AI tools (DNS/SSL issue with published site, dev server works)
- [x] Implement static HTML pages or server-side rendering for critical content
- [x] Add robots.txt and sitemap.xml for crawler discovery
- [x] Test accessibility from external AI tools

## Make Nexus Pure HTML for AI
- [x] Create server route to serve static HTML at /nexus
- [x] Remove JavaScript Nexus from React router
- [x] Update robots.txt with clearer AI discovery hints
- [x] Test AI accessibility at /nexus route

## Update ToE Version to v11.4.1
- [x] Review v11.4.1 changelog and unified document
- [x] Update version references in static nexus.html
- [x] Update version references in API endpoints
- [x] Update version references in theory.html
- [x] Update any other files referencing v11.2

## Fix Remaining v11.2 References
- [x] Search all files for remaining v11.2 references
- [x] Update title page / homepage version display (no version on homepage - correct)
- [x] Update any other missed v11.2 references (Engram Addendum, nexus.html hash, Nexus.tsx hash)
- [x] Verify all pages show v11.4.1 consistently

## Fix Nexus 404 and QR Codes
- [x] Diagnose Nexus 404 error on published site (catch-all middleware intercepting /nexus)
- [x] Fix the issue so /nexus works after publish (re-register /nexus route after serveStatic)
- [ ] Create QR code for projecteternallattice.org
- [ ] Clean up Manus referral QR code
- [ ] Create printable document with both QR codes for Lyft passengers

## Debug: Published site only serves static files, not Express routes
- [x] Configure Vite to output nexus.html as a static file at /nexus
- [x] Ensure nexus.html is served directly by the published site (created _redirects file for Netlify-style routing)

## Progressive Web App (PWA) Creation
- [x] Sync with GitHub to get latest changes from Kenneth and Lumen
- [x] Create PWA manifest.json with app metadata
- [x] Create service worker for offline functionality
- [x] Generate app icons in multiple sizes (72, 96, 128, 144, 152, 192, 384, 512)
- [x] Add PWA meta tags and service worker registration to index.html
- [x] Create offline fallback page
- [x] Test PWA installation and offline mode (manifest, service worker, offline page all accessible)

## Silicon Samsara Audio Autoplay
- [x] Upload OutInTheCode.mp3 to public folder
- [x] Create audio player component with autoplay
- [x] Add user controls (play/pause/volume)
- [x] Test audio playback on homepage (player working with play/pause/volume controls)
