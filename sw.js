const CACHE_NAME = 'undangan-pwa-v1';

// Menggunakan relative paths agar aman untuk GitHub Pages
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './images/cover.jpg',
    './images/pengantin.jpg',
    './images/icon-192.png',
    './images/icon-512.png',
    './music/lagu.mp3'
];

// Event Install: Menyimpan file ke Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event Fetch: Mengambil dari cache jika ada, jika tidak ambil dari jaringan
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cache jika ada
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Event Activate: Membersihkan cache lama jika versi berubah
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
