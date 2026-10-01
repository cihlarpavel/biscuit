// Offline režim. Strategie „nejdřív síť“: s internetem se vždy načte aktuální verze všech souborů
// najednou (jinak by se po aktualizaci smíchaly nové a staré moduly), mezipaměť je jen záloha.
// Po změně souborů zvyš CACHE.
const CACHE = 'biscuit-v9';
const SHELL = ['./', 'index.html', 'styles.css', 'manifest.webmanifest',
  'js/app.js', 'js/data.js', 'js/store.js', 'js/speech.js', 'js/cas.js', 'js/lekce.js', 'js/hra.js',
  'js/odznaky.js', 'js/postavicka.js', 'js/ikony.js', 'js/svety.js', 'js/maskot.js', 'js/hlasky.js', 'js/ui.js', 'icons/icon-180.png', 'icons/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(e.request, { cache: 'no-cache' });
      if (res.ok) cache.put(e.request, res.clone());
      return res;
    } catch {
      return (await cache.match(e.request, { ignoreSearch: true })) || Response.error();
    }
  })());
});
