/* KYNAR UNIVERSE SERVICE WORKER (sw.js)
   Enables offline functionality and faster repeat visits.
   Status: PHASE 5 - Production Ready
*/

const CACHE_NAME = 'kynar-universe-v1.0';
const RUNTIME_CACHE = 'kynar-runtime-v1.0';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/css/tokens.css',
  '/css/global.css',
  '/css/components.css',
  '/js/app.js',
  '/js/data.js',
  '/js/header.js',
  '/js/search.js',
  '/js/components/footer.js',
  '/js/components/breadcrumb.js',
  '/assets/logo.svg',
  '/assets/favicon.ico',
  '/pages/tools/index.html',
  '/pages/living/index.html',
  '/pages/home/index.html',
  '/pages/hub/index.html'
];

// Install - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Clone request because it can only be used once
        return fetch(event.request.clone())
          .then(response => {
            // Don't cache invalid responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response because it can only be used once
            const responseToCache = response.clone();

            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page if available
            return caches.match('/404.html');
          });
      })
  );
});