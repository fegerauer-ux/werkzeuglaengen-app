const CACHE_NAME = "wl-cache-v4"; // <— NEU: v4 erzwingt Update
const ASSETS = [
  "./",
  "./app.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./V0.1.png"
];

self.addEventListener("install", e => {
  self.skipWaiting(); // <— sofort aktiv
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys
        .filter(k => k !== CACHE_NAME)
        .map(k => caches.delete(k))
      )),
      self.clients.claim() // <— sofort Kontrolle übernehmen
    ])
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
