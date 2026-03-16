
const CACHE_NAME = 'agrosystem-v11';
const ASSETS = [
  './',
  'index.html',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2'
];

// Instalação: Salva tudo no celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Arquivos guardados no celular!');
      return cache.addAll(ASSETS);
    })
  );
});

// Estratégia: Tenta o Cache primeiro. Se falhar (sem rede), o cache resolve.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
