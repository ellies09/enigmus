/* Enigmus — service worker : rend le jeu disponible HORS-LIGNE une fois chargé. */
const CACHE = "enigmus-v12";
const ASSETS = ["index.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "music/zen.mp3", "music/normal.mp3", "music/active.mp3"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
