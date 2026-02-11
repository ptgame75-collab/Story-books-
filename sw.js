self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // पहिला नेटवर्कबाट डाटा तान्ने, छैन भने मात्र क्यास हेर्ने
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
