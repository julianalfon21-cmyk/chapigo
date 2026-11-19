/* ChapiGo — guarda la app en el celular para que abra rápido y funcione sin conexión.
   publicar-sitio.js reemplaza VERSION y FILES en cada publicación. */
const VERSION = 'chapigo-202611191601';
const FILES = ["./","app.js","assets/icon-512.png","assets/logo-dark.png","assets/logo-light.png","assets/logo-mark.png","assets/places/p1-thumb.jpg","assets/places/p1.jpg","assets/places/p2-thumb.jpg","assets/places/p2.jpg","assets/places/p3-thumb.jpg","assets/places/p3.jpg","assets/places/p4-thumb.jpg","assets/places/p4.jpg","assets/places/p5-thumb.jpg","assets/places/p5.jpg","assets/places/p6-thumb.jpg","assets/places/p6.jpg","assets/places/p7-thumb.jpg","assets/places/p7.jpg","assets/places/p8-thumb.jpg","assets/places/p8.jpg","assets/places/p9-thumb.jpg","assets/places/p9.jpg","assets/places/tm-thumb.jpg","assets/places/tm.jpg","assets/qr-chapigo.png","data.js","geo.js","icons/apple-touch-icon.png","icons/favicon-48.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","index.html","manifest.webmanifest","map-data.js","map.css","site.js","styles.css"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const font = /(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== self.location.origin && !font) return;

  // La página: primero la red, para ver siempre la última versión; sin conexión, la guardada.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req)
      .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('./', copy)); return res; })
      .catch(() => caches.match('./').then((r) => r || caches.match('index.html'))));
    return;
  }
  // Lo demás: lo guardado al instante y se actualiza por detrás.
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
