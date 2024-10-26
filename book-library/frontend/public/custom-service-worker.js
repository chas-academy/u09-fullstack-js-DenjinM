// public/custom-service-worker.js

const CACHE_NAME = 'my-app-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",

  
  "/icons/bl-192x192.png",
  "/icons/bl-512x512.png",
  "/Contact",
  "/Faq",
  "/RegisterPage",
  "/LoginPage",
  "/BookPage"
];

// Install event: Cache essential resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching essential resources');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Serve files from cache first, fall back to network
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    // Hantera API-förfrågningar separat
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(() => {
            return cache.match(event.request);
          });
      })
    );
  } else {
    // Cachar allt under "/static" för att inkludera alla resurser dynamiskt
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            if (event.request.url.includes('/static')) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
    );
  }
});

