const CACHE_NAME = 'nome-do-cache-v1';
const urlsToCache = [
  '/game/textures/ui/ico.png',
  '/game/textures/ui/minecraft_title.png',
  '/game/ui/styles/textures/panorama.png',
  '/game/ui/styles/textures/open.png',
  '/game/ui/styles/offline.css',
  '/verification.js',
  '/bot.svg'
  // Adicione outras URLs dos recursos que você deseja armazenar em cache
];
const MAX_CACHE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Defina um tempo para limpar o cache (por exemplo, 30 segundos)
const CACHE_EXPIRATION = 60 * 1000; // 30 segundos em milissegundos

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Atualiza o cache com a nova resposta
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, networkResponse.clone());
                });
              return networkResponse;
            });

          return Promise.race([response, fetchPromise]);
        } else {
          return fetch(event.request);
        }
      })
  );
});

// Limpa o cache após o tempo definido
setInterval(() => {
  caches.open(CACHE_NAME)
    .then(cache => {
      cache.keys().then(keys => {
        keys.forEach(key => {
          const now = Date.now();
          const cachedTime = parseInt(key.url.split('-')[1], 10);
          if (now - cachedTime > CACHE_EXPIRATION) {
            cache.delete(key);
          }
        });
      });
    });
}, CACHE_EXPIRATION);

// Limpa caches antigos ao ativar o novo Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Verifica o tamanho do cache e ajusta conforme necessário
function checkCacheSize() {
  caches.open(CACHE_NAME).then(cache => {
    cache.keys().then(keys => {
      let size = 0;
      keys.forEach(key => {
        cache.match(key).then(response => {
          size += response.headers.get('content-length');
        });
      });
      if (size > MAX_CACHE_SIZE_BYTES) {
        // Remova ou ajuste o cache conforme necessário
        console.log('Cache excedeu o limite de tamanho.');
      }
    });
  });
}