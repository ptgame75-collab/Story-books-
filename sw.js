const CACHE_NAME = 'diary-v4'; // नयाँ भर्सन

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/photo.html',
    '/anusthan.html',
    '/adhura.html',
    '/bayan.html',
    '/style.css',
    '/Snickles.ttf',
    // फोटोहरू (तपाईंको लिस्ट अनुसार)
    '/1.png', '/2.png', '/3.jpg', '/4.jpg', '/5.png', '/6.jpg', 
    '/7.jpg', '/8.jpg', '/9.jpg', '/10.jpg', '/11.jpg', '/12.jpg', 
    '/13.jpg', '/14.jpg', '/15.jpg', '/16.jpg', '/17.jpg', '/18.jpg', 
    '/19.jpg', '/20.jpg', '/21.jpg'
];

// १. इन्स्टल गर्दा सबै फाइल क्यास गर्ने
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// २. अफलाइन हुँदा क्यासबाट दिने
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// ३. नयाँ भर्सन आउँदा पुरानो क्यास हटाउने
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});
