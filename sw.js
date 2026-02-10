const CACHE_NAME = 'kynar-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/theme.js',
  '/identity.js',
  '/marketplace.js',
  '/artifact.js',
  '/manifest.json',
  '/vault.js',
  '/social.js',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
