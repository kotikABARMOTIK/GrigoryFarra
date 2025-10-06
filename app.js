class GardenGamePWA {
    constructor() {
        this.isOnline = true;
        this.deferredPrompt = null;
        this.init();
    }

    async init() {
        this.registerServiceWorker();
        this.setupOnlineOfflineListeners();
        this.setupAppInstallPrompt();
        this.checkAppInstalled();
        this.setupBackgroundSync();
    }

    // Регистрация Service Worker
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const ationregistr = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker зарегистрирован:', registration);
                
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('Обнаружено обновление Service Worker');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateNotification();
                        }
                    });
                });
            } catch (error) {
                console.error('Ошибка регистрации Service Worker:', error);
            }
        }
    }

    // Обработка онлайн/офлайн статуса
    setupOnlineOfflineListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.hideOfflineWarning();
            this.syncPendingData();
            console.log('Приложение онлайн');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineWarning();
            console.log('Приложение офлайн');
        });

        // Проверяем начальный статус
        this.isOnline = navigator.onLine;
        if (!this.isOnline) {
            this.showOfflineWarning();
        }
    }

    showOfflineWarning() {
        if (!document.getElementById('offline-warning')) {
            const warning = document.createElement('div');
            warning.id = 'offline-warning';
            warning.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; right: 0; background: #f44336; color: white; 
                           padding: 10px; text-align: center; z-index: 10000;">
                    <i class="fas fa-wifi"></i> Вы в офлайн-режиме. Некоторые функции ограничены.
                </div>
            `;
            document.body.appendChild(warning);
        }
    }

    hideOfflineWarning() {
        const warning = document.getElementById('offline-warning');
        if (warning) {
            warning.remove();
        }
    }

    // Установка приложения
    setupAppInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPromotion();
        });

        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            this.hideInstallPromotion();
            console.log('Приложение установлено');
            this.trackEvent('app_installed');
        });
    }

    showInstallPromotion() {
        if (!document.getElementById('install-promotion') && !this.isAppInstalled()) {
            const promotion = document.createElement('div');
            promotion.id = 'install-promotion';
            promotion.innerHTML = `
                <div style="position: fixed; bottom: 20px; right: 20px; background: #4caf50; color: white; 
                           padding: 15px 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                           z-index: 10000; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-download"></i>
                    <span>Установить приложение</span>
                    <button onclick="gardenPWA.hideInstallPromotion()" 
                            style="background: none; border: none; color: white; font-size: 1.2em; margin-left: 10px;">
                        ×
                    </button>
                </div>
            `;
            promotion.addEventListener('click', () => this.promptInstall());
            document.body.appendChild(promotion);
        }
    }

    hideInstallPromotion() {
        const promotion = document.getElementById('install-promotion');
        if (promotion) {
            promotion.remove();
        }
    }

    async promptInstall() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`Результат установки: ${outcome}`);
            this.deferredPrompt = null;
        }
    }

    isAppInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches || 
               window.navigator.standalone === true;
    }

    checkAppInstalled() {
        if (this.isAppInstalled()) {
            document.documentElement.setAttribute('data-app-installed', 'true');
        }
    }

    // Фоновая синхронизация
    async setupBackgroundSync() {
        if ('sync' in registration) {
            try {
                await registration.sync.register('background-sync');
                console.log('Фоновая синхронизация зарегистрирована');
            } catch (error) {
                console.error('Ошибка регистрации фоновой синхронизации:', error);
            }
        }

        if ('periodicSync' in registration) {
            try {
                await registration.periodicSync.register('periodic-sync', {
                    minInterval: 24 * 60 * 60 * 1000 // 24 часа
                });
                console.log('Периодическая синхронизация зарегистрирована');
            } catch (error) {
                console.error('Ошибка регистрации периодической синхронизации:', error);
            }
        }
    }

    // Синхронизация отложенных данных
    async syncPendingData() {
        const pendingActions = JSON.parse(localStorage.getItem('pendingActions') || '[]');
        
        if (pendingActions.length > 0) {
            console.log('Синхронизация отложенных действий:', pendingActions.length);
            
            for (const action of pendingActions) {
                try {
                    await this.processPendingAction(action);
                } catch (error) {
                    console.error('Ошибка синхронизации действия:', error);
                }
            }
            
            localStorage.removeItem('pendingActions');
            this.showNotification('Данные синхронизированы с сервером', 'success');
        }
    }

    async processPendingAction(action) {
        // Эмуляция отправки данных на сервер
        switch (action.type) {
            case 'purchase':
                console.log('Синхронизация покупки:', action.data);
                break;
            case 'message':
                console.log('Синхронизация сообщения:', action.data);
                break;
            case 'game_result':
                console.log('Синхронизация результата игры:', action.data);
                break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 500)); // Имитация задержки сети
    }

    // Уведомления
    showNotification(message, type = 'info') {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Garden Game', {
                body: message,
                icon: '/icons/icon-192x192.png',
                badge: '/icons/badge-72x72.png'
            });
        } else {
            // Fallback для браузеров без поддержки уведомлений
            console.log(`Уведомление: ${message}`);
        }
    }

    async requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return false;
    }

    // Обработка обновлений
    showUpdateNotification() {
        if (confirm('Доступна новая версия приложения. Обновить?')) {
            window.location.reload();
        }
    }

    // Аналитика и отслеживание
    trackEvent(eventName, data = {}) {
        const analyticsData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            user: sessionStorage.getItem('currentUser'),
            ...data
        };
        
        console.log('Аналитика:', analyticsData);
        
        // Сохраняем события для последующей отправки
        const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
        events.push(analyticsData);
        localStorage.setItem('analyticsEvents', JSON.stringify(events));
    }

    // Управление кэшем
    async clearCache() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            console.log('Кэш очищен');
        }
    }

    // Проверка поддержки функций
    checkFeatures() {
        const features = {
            serviceWorker: 'serviceWorker' in navigator,
            pushNotifications: 'PushManager' in window,
            backgroundSync: 'sync' in registration,
            periodicSync: 'periodicSync' in registration,
            storage: 'storage' in navigator,
            online: navigator.onLine
        };
        
        console.log('Поддерживаемые функции:', features);
        return features;
    }
}

// Глобальная инициализация
let gardenPWA;

document.addEventListener('DOMContentLoaded', function() {
    gardenPWA = new GardenGamePWA();
    
    // Добавляем стили для PWA
    const styles = `
        [data-app-installed] header {
            padding-top: env(safe-area-inset-top);
        }
        
        @media (display-mode: standalone) {
            body {
                -webkit-user-select: none;
                -webkit-touch-callout: none;
                -webkit-tap-highlight-color: transparent;
            }
        }
        
        .pwa-only {
            display: none;
        }
        
        [data-app-installed] .pwa-only {
            display: block;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
});

// Глобальные функции для использования в HTML
function installApp() {
    if (gardenPWA) {
        gardenPWA.promptInstall();
    }
}

function requestNotifications() {
    if (gardenPWA) {
        gardenPWA.requestNotificationPermission();
    }
}

function checkConnectivity() {
    return gardenPWA ? gardenPWA.isOnline : navigator.onLine;
}