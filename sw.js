const cacheName = 'v1';


const cacheAssets = [

    'Home.html',
    'Blog.html',
    'Cities.html',
    'Money.html',
    'main.js',
    'app.js',
    'style.css',
];



// Call Install Event 

self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
         .open(cacheName)
         .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets)
         })
         .then(() => self.skipWaiting())
    );
});

// Coll Activate Event

self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');

    // Remove Unwanted Caches

    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing Old Cache ');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );

});



// Call Fetch Event 

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});