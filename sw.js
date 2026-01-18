const CACHE_NAME = "hm-pelatihan-v4";
const urlsToCache = [
  "/hm-pelatihan/",
  "/hm-pelatihan/index.html",
  "/hm-pelatihan/manifest.json",
  "/hm-pelatihan/icon-192.svg",
  "/hm-pelatihan/icon-512.svg"
];

console.log('Service Worker loaded');

// Install event
self.addEventListener("install", (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Cache ready');
        self.skipWaiting();
      })
      .catch(err => console.error('Install failed:', err))
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const clonedResponse = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
        }

        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request).then((response) => {
          return response || caches.match("/hm-pelatihan/index.html");
        });
      }),
  );
});
