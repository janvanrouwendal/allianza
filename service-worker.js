const CACHE_NAME = 'allianza-v3-multipage';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/over-ons.html',
    '/expertise.html',
    '/diensten.html',
    '/contact.html',
    '/index.css',
    '/index.js',
    '/public/assets/images/logo-icon.png',
    '/public/assets/images/logo-text.png',
    '/public/assets/images/team-healthcare.png',
    '/public/assets/images/agency-office.png',
    '/public/assets/images/alice-portrait.jpg',
    '/public/assets/images/illus-maze.jpg',
    '/public/assets/images/illus-connection.jpg',
    '/public/assets/images/illus-compass.jpg',
    '/public/assets/images/map-meppel.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
