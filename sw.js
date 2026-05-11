const cacheName = 'adhiraj-v1';
const assets = [
  './',
  './index.html',
  './home.html',
  './4870.png',
  './a.0063.jpg'
];

// फाइलहरू सेभ गर्ने
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
