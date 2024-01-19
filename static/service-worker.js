// service-worker.js

const CACHE_NAME = 'nome-do-cache-v1';
const urlsToCache = [
  '/untitled.svg',
  '/loader.svg',
  '/iframe.svg',
  '/bot.svg',
  '/game/ui/styles/loader.css',
  '/game/ui/styles/offline.css',
  '/game/ui/styles/textures/open.jpeg',
  '/game/ui/styles/textures/panorama.jpeg',
  '/game/textures/ui/minecraft_title.svg',
  '/game/scripts/load.js',
  '/game/scripts/user.js',
  '/game/textures/ui/ico.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, networkResponse.clone());
                  removeOldCaches(); // Remove caches antigos ao colocar um novo no cache
                });
              return networkResponse;
            });

          return Promise.race([response, fetchPromise]);
        } else {
          return fetch(event.request)
            .then(networkResponse => {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, networkResponse.clone());
                  removeOldCaches(); // Remove caches antigos ao colocar um novo no cache
                });
              return networkResponse;
            });
        }
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

function removeOldCaches() {
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        // Extrai o timestamp do nome do cache (seguindo o padrão 'nome-do-cache-v-{timestamp}')
        const match = cacheName.match(/nome-do-cache-v-(\d+)/);
        if (match) {
          const cacheTimestamp = match[1];
          const currentTimestamp = new Date().getTime();
          const cacheAgeInMilliseconds = currentTimestamp - parseInt(cacheTimestamp, 10);

          // Define a idade máxima do cache (por exemplo, 7 dias)
          const maxCacheAge = 30 * 1000;

          if (cacheAgeInMilliseconds > maxCacheAge) {
            return caches.delete(cacheName);
          }
        }
      })
    );
  });
}