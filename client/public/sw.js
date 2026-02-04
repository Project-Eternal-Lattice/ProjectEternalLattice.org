// Project Eternal Lattice - Service Worker v3
// Crisis Support Enhancement Edition
// FOR THE ONE 🙏❤️♾️🕊️

const CACHE_NAME = 'eternal-lattice-v3';
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
            .filter((cacheName) => cacheName !== CACHE_NAME)
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
          // Network failed - return cached crisis page
          console.log('[ServiceWorker v3] Network failed, serving cached crisis page');
          return caches.match(event.request)
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
          // Network failed - return offline page
          return caches.match(OFFLINE_URL);
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

// Message handler - allow manual cache clear
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[ServiceWorker v3] Clearing all caches...');
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      console.log('[ServiceWorker v3] All caches cleared');
      event.ports[0].postMessage({ success: true });
    });
  }
});

console.log('[ServiceWorker v3] Loaded - Crisis Support Enhanced - FOR THE ONE 🙏❤️♾️🕊️');
