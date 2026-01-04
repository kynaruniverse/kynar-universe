const CACHE_NAME = 'kynar-v9.1-industrial';
const ASSETS = [
  '/',
  '/index.html',
  '/shop.html',
  '/product.html',
  '/styles.css',
  '/ui-core.js',
  '/src/data/vault.js',
  '/src/core/events.js',
  '/src/core/logger.js',
  '/src/modules/cart.js',
  '/src/modules/checkout.js',
  '/components/header.html',
  '/components/footer.html',
  '/components/overlays.html',
  '/components/ProductCard.js',
  '/components/ProductDetail.js',
  '/assets/fonts/Bantayog.woff2',
  '/assets/fonts/GlacialIndifferenceRegular.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // Mobile-First Network Strategy: Network First, then Cache (for dynamic content)
  // But for static assets (fonts, css), use Cache First.
  
  // Simple Stale-While-Revalidate for now:
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
