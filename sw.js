/* ==========================================================================
   SERVICE WORKER | KYNAR V10.0 OPERATIONS
   Architecture: The Kynar Constitution
   Strategy: Stale-While-Revalidate
   ========================================================================== */

// 1. VERSION BUMP (Forces all users to get the new site)
const CACHE_NAME = 'kynar-v10.0-operations'; 

const ASSETS = [
  /* --- CORE PAGES --- */
  '/',
  '/index.html',       // Operations (Home)
  '/shop.html',        // Library (Archive)
  '/newsletter.html',  // Dashboard (New!)
  '/contact.html',     // Connect (New!)
  '/product.html',     // Spec Sheet
  '/legal.html',
  '/404.html',         // Always good to cache error page

  /* --- SYSTEM ASSETS --- */
  '/styles.css',       // The new v10.0 CSS
  '/ui-core.js',       // The new Engine
  '/vault.js',         // The Data Brain (Moved to Root)
  
  /* --- COMPONENTS --- */
  '/components/header.html',
  '/components/footer.html',
  '/components/overlays.html',

  /* --- FONTS --- */
  '/assets/fonts/Bantayog.woff2',
  '/assets/fonts/GlacialIndifferenceRegular.woff2'
  
  /* NOTE: We removed React components (/src/...) as 
     we are now using the v10.0 Vanilla JS Architecture */
];

/* --- INSTALLATION (Cache System) --- */
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Take control immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching System Assets...');
      return cache.addAll(ASSETS);
    })
  );
});

/* --- ACTIVATION (Cleanup Old Versions) --- */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          // Delete any cache that is NOT v10.0
          if (key !== CACHE_NAME) {
            console.log('[SW] Clearing Old Cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

/* --- FETCH STRATEGY (Network First for HTML, Cache First for Assets) --- */
self.addEventListener('fetch', (e) => {
  
  // 1. HTML Pages (Document) -> Network First
  // We want users to always see the latest "Stock Levels" or prices if possible.
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          // If network works, cache the fresh copy
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
          return res;
        })
        .catch(() => caches.match(e.request)) // Fallback to cache if offline
    );
  } 
  
  // 2. Static Assets (CSS, JS, Fonts) -> Cache First
  // These don't change often, so load them fast from cache.
  else {
    e.respondWith(
      caches.match(e.request).then((res) => {
        return res || fetch(e.request).then((networkRes) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkRes.clone());
            return networkRes;
          });
        });
      })
    );
  }
});
