const CACHE_NAME = 'kynar-universe-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/library',
  '/worlds/home',
  '/worlds/lifestyle',
  '/worlds/tools',
  '/styles/globals.css',
  '/manifest.json'
];

// Install: Cache core "Handrail" assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch: Serve from cache, update from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});
