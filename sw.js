// =============================================================
// Oyun Dükkanı - servis çalışanı (ana ekrana ekleme + çevrimdışı kopya)
// Dükkanı güncelleyip yüklerken ONBELLEK numarasını 1 artır.
// Not: Oyunların kendileri burada saklanmaz; her oyun kendi adresinden açılır.
// =============================================================

const ONBELLEK = 'oyun-dukkani-v1';
const DOSYALAR = [
  './', 'index.html', 'style.css', 'oyunlar.js', 'dukkan.js',
  'manifest.webmanifest', 'ikonlar/ikon-192.png', 'ikonlar/ikon-512.png',
];

self.addEventListener('install', olay => {
  olay.waitUntil(caches.open(ONBELLEK).then(o => o.addAll(DOSYALAR.map(d => new Request(d, { cache: 'reload' })))));
  self.skipWaiting();
});
self.addEventListener('activate', olay => {
  olay.waitUntil(caches.keys().then(adlar => Promise.all(adlar.filter(a => a.startsWith('oyun-dukkani-') && a !== ONBELLEK).map(a => caches.delete(a)))));
  self.clients.claim();
});
// Önce internet (en yeni sürüm), olmazsa kayıtlı kopya. Sadece dükkanın kendi dosyaları.
self.addEventListener('fetch', olay => {
  if (olay.request.method !== 'GET') return;
  const url = new URL(olay.request.url);
  const kapsam = new URL(self.registration.scope);
  if (url.origin !== kapsam.origin || !url.pathname.startsWith(kapsam.pathname)) return;
  olay.respondWith(
    fetch(olay.request.url, { cache: 'no-cache' })
      .then(cevap => { if (cevap.ok) { const k = cevap.clone(); caches.open(ONBELLEK).then(o => o.put(olay.request, k)); } return cevap; })
      .catch(() => caches.match(olay.request)),
  );
});
