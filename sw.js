const CACHE_NAME = 'only-cache-v1';

self.addEventListener('install', event => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            cache.addAll([
                './',
                './index.html',
                './app.js',
                './images/icons/192.png',
                './images/icons/512.png',
                './sw.js',
                './manifest.json'
            ])
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.origin === location.origin) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});