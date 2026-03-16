const CACHE_NAME = 'agrosystem-v9';
const ASSETS = [
  'index.html', // Verifique se o seu arquivo HTML tem este nome
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2'
];

// Instalação: Salva os arquivos essenciais no cache do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache do AgroSystem Pro iniciado');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar a versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia de Busca: Tenta o Cache primeiro, se não tiver (e tiver rede), busca na web
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
