const CACHE_NAME = "genuse-v1";

const APP_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icons/icon.svg",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./css/main.css",
    "./js/app.js",
    "./js/data.js",
    "./js/model.js",
    "./js/fileReader.js",
    "./js/history.js",
    "./js/views/View.js",
    "./js/views/FrontView.js",
    "./js/views/ModeView.js",
    "./js/views/DifficultyView.js",
    "./js/views/GameView.js",
    "./js/views/SettingsView.js",
    "./js/views/AboutView.js",
    "./js/views/ResultsView.js",
    "./js/views/HistoryView.js"
];

// Install and save app files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(APP_FILES);
        })
    );

    self.skipWaiting();
});

// Activate the new service worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );

    self.clients.claim();
});

// Load saved files when offline
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const requestURL = new URL(event.request.url);

    if (requestURL.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then(cachedFile => {
            if (cachedFile) {
                return cachedFile;
            }

            return fetch(event.request).then(response => {
                if (response.ok) {
                    const responseCopy = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseCopy);
                    });
                }

                return response;
            });
        })
    );
});