// sw.js - The Persistence & Offline Engine
const CACHE_NAME = 'kynar-universe-v2';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './theme.js',
  './identity.js',
  './marketplace.js',
  './artifact.js',
  './vault.js',
  './social.js',
  './app.js',
  './supabase-config.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm',
  'https://fonts.cdnfonts.com/s/85631/Bantayog-Regular.woff'
];

// 1. Installation: Lock the core assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('💎 Persistence: Securing Universal Assets...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activation: Purge legacy frequencies
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => {
        return Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        );
      })
    ])
  );
  console.log('📡 Persistence: Active & Monitoring.');
});

// 3. Intelligent Fetch: Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // BYPASS: Never cache live Supabase data requests
  if (url.hostname.includes('supabase.co')) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Update the cache with the fresh version
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
          // If network fails completely, we already have the cache
      });

      // Return cached version immediately, or wait for network if not in cache
      return cachedResponse || fetchPromise;
    })
  );
});
