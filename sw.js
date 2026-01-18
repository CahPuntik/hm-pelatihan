const CACHE_NAME = "hm-pelatihan-v1";
const OFFLINE_URL = "/hm-pelatihan/index.html";

const ASSETS = [
  "/hm-pelatihan/",
  "/hm-pelatihan/index.html",
  "/hm-pelatihan/manifest.json",
  "/hm-pelatihan/icon-192.png",
  "/hm-pelatihan/icon-512.png"
];

console.log("✅ Service Worker loaded");

// Install event - cache assets
self.addEventListener("install", (event) => {
  console.log("📦 Installing Service Worker...");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("💾 Caching assets...");
        return cache.addAll(ASSETS);
      })
      .catch(err => console.error("❌ Cache failed:", err))
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("🧹 Activating Service Worker...");
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => {
            console.log("🗑️ Deleting old cache:", k);
            return caches.delete(k);
          }),
        ),
      )
      .then(() => {
        console.log("✅ Service Worker activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip cross-origin
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.status === 200) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches
          .match(event.request)
          .then((res) => res || caches.match(OFFLINE_URL))
          .catch(() => new Response("Offline - File not found", { status: 404 }));
      })
  );
});
