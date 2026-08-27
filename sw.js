const CACHE_NAME = 'diary-v9'; // भर्सन अपडेट

// आफ्नो फोल्डर स्ट्रक्चर अनुसार पाथ मिलाइएको छ
const ASSETS_TO_CACHE = [
    '/Story-books/',
    '/Story-books/index.html',
    '/Story-books/anusthan.html',
    '/Story-books/adhura.html',
    '/Story-books/bayan.html',
    '/Story-books/style.css'
    // फोटोहरू अहिले धेरै भएकोले सुरुमा मुख्य फाइलहरू मात्र राखौँ
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).catch(err => console.log('Cache failed', err))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // यदि क्यासमा छ भने क्यासबाट दिने, नत्र नेटवर्कबाट तान्ने
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});
