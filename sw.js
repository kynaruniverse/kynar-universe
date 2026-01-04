const CACHE_NAME = 'kynar-v7.5-industrial';
const ASSETS = [
  '/index.html',
  '/shop.html',
  '/product.html',
  '/styles.css',
  '/ui-core.js',
  '/src/data/vault.js',
  '/src/core/events.js',
  '/src/modules/cart.js',
  '/src/modules/checkout.js',
  '/components/ProductCard.js',
  '/components/ProductDetail.js',
  '/assets/fonts/Bantayog.woff2',
  '/assets/fonts/GlacialIndifferenceRegular.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  if (e.request.destination === 'document') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
  }
});
