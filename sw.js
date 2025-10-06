const CACHE_NAME = 'garden-game-v1.2.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/main-site.html',
    '/profile.html',
    '/shop.html',
    '/friends.html',
    '/games.html',
    '/flower-match.html',
    '/garden-design.html',
    '/plant-care.html',
    '/quiz-game.html',
    '/leaderboard.html',
    '/messages.html',
    '/auction.html',
    '/seasons.html',
    '/game-system.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Quicksand:wght@300;400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/bcryptjs/2.4.3/bcrypt.min.js'
];

// Установка Service Worker
self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                console.log('Service Worker: Skip waiting on install');
                return self.skipWaiting();
            })
    );
});

// Активация Service Worker
self.addEventListener('activate', function(event) {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('Service Worker: Claiming clients');
            return self.clients.claim();
        })
    );
});

// Перехват запросов
self.addEventListener('fetch', function(event) {
    console.log('Service Worker: Fetching', event.request.url);
    
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Возвращаем кэшированную версию или делаем запрос
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(function(response) {
                    // Проверяем валидность ответа
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Клонируем ответ
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(function() {
                    // Офлайн-страница для HTML запросов
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/offline.html');
                    }
                });
            })
    );
});

// Фоновая синхронизация
self.addEventListener('sync', function(event) {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Периодическая синхронизация
self.addEventListener('periodicsync', function(event) {
    console.log('Service Worker: Periodic sync', event.tag);
    
    if (event.tag === 'periodic-sync') {
        event.waitUntil(doPeriodicSync());
    }
});

// Push уведомления
self.addEventListener('push', function(event) {
    console.log('Service Worker: Push message received');
    
    const options = {
        body: event.data.text(),
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Открыть игру',
                icon: '/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Закрыть',
                icon: '/icons/icon-72x72.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Garden Game', options)
    );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', function(event) {
    console.log('Service Worker: Notification click');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/main-site.html')
        );
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Фоновая синхронизация данных
async function doBackgroundSync() {
    console.log('Service Worker: Performing background sync');
    
    // Здесь будет синхронизация данных с сервером
    try {
        const users = await getLocalData('users');
        if (users) {
            // Отправляем данные на сервер
            await syncWithServer(users);
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Периодическая синхронизация
async function doPeriodicSync() {
    console.log('Service Worker: Performing periodic sync');
    
    try {
        // Обновляем кэш
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urlsToCache);
        
        // Синхронизируем пользовательские данные
        await doBackgroundSync();
    } catch (error) {
        console.error('Periodic sync failed:', error);
    }
}

// Вспомогательные функции
function getLocalData(key) {
    return new Promise((resolve) => {
        // Эмуляция получения данных из localStorage
        if (typeof localStorage !== 'undefined') {
            resolve(JSON.parse(localStorage.getItem(key)));
        } else {
            resolve(null);
        }
    });
}

function syncWithServer(data) {
    return new Promise((resolve) => {
        // Эмуляция синхронизации с сервером
        console.log('Syncing data with server:', data);
        setTimeout(resolve, 1000);
    });
}