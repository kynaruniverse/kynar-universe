/* KYNAR UNIVERSE SERVICE WORKER (sw.js)
   Status: EVOLVED MASTER (Resilient Install + App-Level Caching)
   Description: Manages offline capability and instant-load performance.
*/

const VERSION = 'v1.3.1'; // Bumped for new pages
const CACHE_NAME = `kynar-core-${VERSION}`;
const RUNTIME_CACHE = `kynar-runtime-${VERSION}`;

// 1. UPDATED ASSET LIST (Includes all new evolved pages)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/css/tokens.css',
  '/css/global.css',
  '/css/components.css',
  '/js/app.js',
  '/js/loader.js',
  '/js/header.js',
  '/js/search.js',
  '/js/footer.js',
  '/js/breadcrumb.js',
  '/js/data.js',
  '/js/analytics.js',
  '/js/components/structured-data.js',
  '/assets/logo.svg',
  '/assets/favicon.ico',
  '/pages/tools/index.html',
  '/pages/living/index.html',
  '/pages/home/index.html',
  '/pages/hub/index.html',
  '/pages/account/index.html',    // ADDED
  '/pages/settings/index.html',   // ADDED
  '/pages/onboarding/index.html'  // ADDED
];

// 2. RESILIENT INSTALL (Don't let one 404 kill the whole SW)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Initiating resilient precache...');
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) => {
          return cache.add(url).catch((err) => console.error(`[SW] Failed to cache: ${url}`, err));
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 3. CLEANUP OLD CACHES
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== RUNTIME_CACHE) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 4. SMART FETCH (Network-First for HTML, Cache-First for Assets)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isInternal = url.origin === self.location.origin;
  const isCDN = url.hostname === 'cdn.jsdelivr.net';

  if (!isInternal && !isCDN) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If we have it in cache, return it immediately
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Update the cache in the background (Stale-While-Revalidate)
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      }).catch(() => {
        // If network fails and it's a page navigation, show 404 or Offline page
        if (event.request.mode === 'navigate') return caches.match('/404.html');
      });

      return cachedResponse || fetchPromise;
    })
  );
});
