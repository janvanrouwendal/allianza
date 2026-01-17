// service-worker.js
const CACHE_NAME = 'allianza-cache-v1';
const OFFLINE_URL = 'offline.html';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/mediation.html',
    '/coaching.html',
    '/schuldhulp.html',
    '/over-mij.html',
    '/contact.html',
    '/index.css',
    '/index.js',
    '/manifest.json',
    '/public/assets/images/logo-full.png',
    '/public/assets/images/logo-icon.png',
    // add other critical assets if needed
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).then(response => {
                // Clone and store in cache
                const cloned = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
                return response;
            }).catch(() => {
                // If offline and request is for a navigation, show offline page
                if (event.request.mode === 'navigate') {
                    return caches.match(OFFLINE_URL);
                }
            });
        })
    );
});
