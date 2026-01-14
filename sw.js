/* KYNAR SERVICE WORKER (sw.js)
   Strategy: Network First, Fallback to Cache.
   Ensures users always see fresh content if they are online.
   Status: FINAL MASTER
*/

const CACHE_NAME = 'kynar-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/css/tokens.css',
  '/css/global.css',
  '/css/components.css',
  '/js/app.js',
  '/assets/phosphor.css',
  '/assets/logo.svg'
];

// 1. INSTALL
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Take control immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. ACTIVATE (Clean up old caches)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. FETCH (Network First)
self.addEventListener('fetch', (e) => {
  // Ignore external links/APIs
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        // Update cache with new version
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return networkResponse;
      })
      .catch(() => {
        // Offline? Serve from cache
        return caches.match(e.request);
      })
  );
});
