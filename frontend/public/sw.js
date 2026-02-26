const CACHE_NAME = 'spa-accurate-measure-v2';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/generated/icon-192x192.dim_192x192.png',
  '/assets/generated/icon-512x512.dim_512x512.png',
  '/assets/generated/apple-touch-icon-180x180.dim_180x180.png',
];

// Install: cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: cache-first for static assets, network-first for ICP API calls
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network-first for ICP canister API calls
  if (
    url.hostname.includes('icp') ||
    url.hostname.includes('dfinity') ||
    url.pathname.includes('/api/') ||
    url.hostname.includes('ic0.app') ||
    url.hostname.includes('raw.ic0.app')
  ) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    })
  );
});
