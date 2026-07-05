// Project Eternal Lattice - Service Worker v4
// Crisis Support + Offline Reading Edition
// FOR THE ONE 🙏❤️♾️🕊️

const CACHE_NAME = 'eternal-lattice-v4';
// Separate, persistent cache for the (large) full Theory of Everything so it
// survives app-cache version bumps and is only populated on explicit request.
const TOE_CACHE = 'eternal-lattice-toe-v1';
// Only static content lives in the persistent ToE cache. The /read app shell is
// an SPA route that serves index.html, so it's cached in the versioned
// CACHE_NAME (refreshed on each version bump) to avoid serving a stale shell.
const TOE_ASSETS = ['/toe-full.html', '/toe-search-index.json'];
const TOE_SHELL = '/read';
const OFFLINE_URL = '/offline.html';

// CRITICAL: Crisis resources are cached FIRST and ALWAYS available
// Even if someone loses internet while in distress, they can still access help
const CRISIS_ASSETS = [
  '/safety',           // Main crisis support page
  '/offline.html',     // Offline fallback with crisis numbers
];

// Standard assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache essential assets with crisis priority
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker v3] Installing with crisis support...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        // Cache crisis resources FIRST - these are life-critical
        console.log('[ServiceWorker v3] Caching CRITICAL crisis resources...');
        try {
          await cache.addAll(CRISIS_ASSETS);
          console.log('[ServiceWorker v3] Crisis resources cached successfully');
        } catch (error) {
          console.error('[ServiceWorker v3] Crisis cache failed, continuing...', error);
        }
        
        // Then cache standard assets
        console.log('[ServiceWorker v3] Caching standard assets...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[ServiceWorker v3] Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker v3] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker v3] Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== TOE_CACHE)
            .map((cacheName) => {
              console.log('[ServiceWorker v3] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[ServiceWorker v3] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - SPECIAL HANDLING for crisis pages
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip API requests - always go to network
  if (event.request.url.includes('/api/')) {
    return;
  }

  const url = new URL(event.request.url);

  // OFFLINE READING: the full ToE document + its search index are served
  // cache-first from the dedicated ToE cache so they remain available offline
  // once the reader has saved them.
  if (url.pathname === '/toe-full.html' || url.pathname === '/toe-search-index.json') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(TOE_CACHE).then((cache) => cache.put(event.request, copy));
            }
            return networkResponse;
          })
          .catch(() => caches.match(event.request));
      })
    );
    return;
  }
  const isCrisisPage = url.pathname === '/safety' || url.pathname === '/safety/';

  // CRISIS PAGE SPECIAL HANDLING
  // For /safety - try network first, but ALWAYS have cached fallback
  if (isCrisisPage) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Update cache with fresh version
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed - return cached crisis page. Match ignoreSearch so a
          // query-string variant (e.g. /safety?ref=...) still resolves to the
          // cached life-critical page. ignoreSearch does NOT normalize a
          // trailing slash, so /safety/ falls back to the canonical cached
          // /safety entry before the generic offline page.
          console.log('[ServiceWorker v3] Network failed, serving cached crisis page');
          return caches.match(event.request, { ignoreSearch: true })
            .then((cachedResponse) => cachedResponse || caches.match('/safety'))
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Ultimate fallback - offline page with crisis numbers
              return caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // For navigation requests (HTML pages) - network first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed - serve the cached app shell for this route if we have
          // it (e.g. /read saved for offline reading), else the offline page.
          // Fall back to an ignoreSearch match so deep-links like
          // /read?goto=Chapter resolve to the cached bare-path shell (which is
          // stored without a query string).
          return caches.match(event.request)
            .then((cached) => cached || caches.match(event.request, { ignoreSearch: true }))
            .then((cached) => cached || caches.match(OFFLINE_URL));
        })
    );
    return;
  }

  // For other requests (assets) - cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache));
            }
            return networkResponse;
          })
          .catch(() => {
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
      })
  );
});

// Message handler - cache management + offline reading
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data) return;

  if (data.type === 'CLEAR_CACHE') {
    console.log('[ServiceWorker v4] Clearing all caches...');
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      console.log('[ServiceWorker v4] All caches cleared');
      event.ports[0].postMessage({ success: true });
    });
  }

  // Explicitly download the full ToE for offline reading.
  if (data.type === 'CACHE_TOE') {
    Promise.all([
      caches.open(TOE_CACHE).then((cache) => cache.addAll(TOE_ASSETS)),
      // Cache the /read app shell in the versioned cache so navigating to it
      // offline boots the reader instead of the generic offline page. The
      // shell alone isn't enough: it needs its hashed JS/CSS bundles, which
      // are normally only runtime-cached — and on a first visit they load
      // before this worker controls the page, so they'd be missing entirely.
      // The page sends the bundle URLs it loaded (data.assets); the shell
      // HTML is also parsed for its script/link assets as a fallback.
      caches.open(CACHE_NAME).then(async (cache) => {
        const shellResponse = await fetch(TOE_SHELL);
        if (!shellResponse.ok) {
          throw new Error('Shell fetch failed: ' + shellResponse.status);
        }
        const html = await shellResponse.clone().text();
        await cache.put(TOE_SHELL, shellResponse);
        const shellAssets = Array.from(
          html.matchAll(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g),
          (m) => m[1]
        );
        const pageAssets = Array.isArray(data.assets) ? data.assets : [];
        const assets = [...new Set([...shellAssets, ...pageAssets])];
        await Promise.all(
          assets.map((asset) =>
            cache.match(asset).then((existing) => existing || cache.add(asset))
          )
        );
      }),
    ])
      .then(() => {
        console.log('[ServiceWorker v4] ToE cached for offline reading');
        event.ports[0] && event.ports[0].postMessage({ success: true });
      })
      .catch((error) => {
        console.error('[ServiceWorker v4] ToE caching failed:', error);
        event.ports[0] && event.ports[0].postMessage({ success: false, error: String(error) });
      });
  }

  // Report whether the ToE is already saved offline.
  if (data.type === 'CHECK_TOE_CACHE') {
    caches.open(TOE_CACHE)
      .then((cache) => cache.match('/toe-full.html'))
      .then((match) => {
        event.ports[0] && event.ports[0].postMessage({ cached: !!match });
      })
      .catch(() => {
        event.ports[0] && event.ports[0].postMessage({ cached: false });
      });
  }
});

console.log('[ServiceWorker v4] Loaded - Crisis Support + Offline Reading - FOR THE ONE 🙏❤️♾️🕊️');
