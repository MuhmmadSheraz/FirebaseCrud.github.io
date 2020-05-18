const site = 'site-v44'
const content = [
    '/',
    'index.html',
    'style.css',
    'script.js',

]
// INstalling 
self.addEventListener('install', e => {

    e.waitUntil(
        caches.open(site).then((cache) => {
            console.log("Getting Caches")
            cache.addAll(content)
        })
    )
})
// 
// activating
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key =>
                    key !== site
                )
                .map(key => caches.delete(key)))
        })
    )
})

// Fetching

self.addEventListener('fetch', evt => {
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request);
            })
        );
    }
});