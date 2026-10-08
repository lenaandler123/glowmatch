/* ============================================
   GlowMatch — Service Worker (офлайн-режим)
   Автор: Булохова Елена
   ============================================ */

// Версия кэша. Если изменишь файлы — поменяй номер версии,
// чтобы браузер скачал обновления.
const CACHE_NAME = "glowmatch-v1";

// Список файлов, которые нужно сохранить в памяти
const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

// --- 1. УСТАНОВКА: сохраняем файлы в кэш ---
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Установка...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Кэширую файлы");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// --- 2. АКТИВАЦИЯ: удаляем старые версии кэша ---
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Активация...");
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("[Service Worker] Удаляю старый кэш:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// --- 3. ЗАПРОСЫ: сначала из кэша, потом из сети ---
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Если файл есть в кэше — отдаём его
            if (response) {
                return response;
            }
            // Если нет — пробуем загрузить из интернета
            return fetch(event.request);
        })
    );
});