const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    // Додайте сюди інші ресурси, які ви хочете кешувати
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response
            }
            return fetch(event.request)
        })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => {
                        // Видалити застарілі кеші, які не відповідають поточному імені кешу
                        return cacheName !== CACHE_NAME
                    })
                    .map((cacheName) => {
                        return caches.delete(cacheName)
                    })
            )
        })
    )
})
