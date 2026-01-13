/* KYNAR UNIVERSE SERVICE WORKER (sw.js)
   Enables offline functionality and faster repeat visits.
   Status: PHASE 5 - Production Ready (Remix Icon & CDN Compatible)
*/

// Bump version to force update for existing users
const CACHE_NAME = 'kynar-universe-v1.2'; 
const RUNTIME_CACHE = 'kynar-runtime-v1.2';

// Assets to cache immediately on install
// NOTE: If any single file here 404s, the Service Worker fails to install.
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
  '/js/analytics.js',                  // <--- ADDED: Critical for offline app.js
  '/js/components/structured-data.js',
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
        console.log('[SW] Precaching core assets');
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
  // 1. Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);

  // 2. LOGIC: What external domains do we allow?
  // We allow self (our site) AND the Remix Icon CDN.
  const isOrigin = url.origin === self.location.origin;
  const isRemixCDN = url.hostname === 'cdn.jsdelivr.net';

  // If it's external and NOT our allowed CDNs, ignore it.
  if (!isOrigin && !isRemixCDN) return;

  // 3. CACHE STRATEGY: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        
        // Return cached response immediately if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Network Fallback
        return fetch(event.request.clone())
          .then(response => {
            // Check for valid response (Basic for local, CORS for CDN)
            if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
              return response;
            }

            // Cache the new resource
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Offline Fallback for Navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/404.html');
            }
          });
      })
  );
});
