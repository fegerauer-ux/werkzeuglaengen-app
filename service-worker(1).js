const CACHE_NAME='wl-app-v3';
const URLS=['/werkzeuglaengen-app/app.html','/werkzeuglaengen-app/manifest.json','/werkzeuglaengen-app/icon-192.png','/werkzeuglaengen-app/icon-512.png','/werkzeuglaengen-app/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS)));self.skipWaiting());});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});