var CACHE_NAME = 'static-v1';
var urlsToCache = [
    // '/',
    'index.html',
    'javascript/flickity.pkgd.js',
    'javascript/anime.min.js',
    'javascript/jquery-2.2.4.min.js',
    'javascript/main.js',
    'css/flickity.min.css',
    'css/style.css',
    'assets/image/logo-x516.png',
    'assets/image/Desktop/guide-map.jpg',
    'assets/image/Desktop/home-about.jpg',
    'assets/image/Desktop/home-event01.jpg',
    'assets/image/Desktop/home-event02.jpg',
    'assets/image/Desktop/home-event03.jpg',
    'assets/image/Desktop/home-top-image-test.jpg',
    'assets/image/Desktop/info-access.jpg',
    'assets/image/Desktop/info-contact.jpg',
    'assets/image/Desktop/info-guide.jpg',
    'assets/image/Desktop/info-home.jpg',
    'assets/image/Mobile/home-about.jpg',
    'html/access.html',
    'html/contact.html',
    'html/guide.html',
    'html/information.html',
];

self.addEventListener('install', (event) => {
    // do install
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // cacheがある場合responseを返す
            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
                (response) => {
                    // check response data
                    if (!response || response.status !== 200 ||
                        response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});

self.addEventListener('activate', (event) => {
    var cacheWhitelist = ["static-v1"];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if(cacheWhitelist.indexOf(cacheName) === 1){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})