// settings-manager.js
class SettingsManager {
    constructor() {
        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.applySettings();
        this.setupCrossPageListener();
    }

    loadSettings() {
        return JSON.parse(localStorage.getItem('appSettings')) || this.getDefaultSettings();
    }

    getDefaultSettings() {
        return {
            theme: 'light',
            darkMode: false,
            fontSize: 16,
            fontFamily: 'Quicksand',
            avatar: '🌿',
            
            pushNotifications: true,
            friendNotifications: true,
            gameNotifications: true,
            soundNotifications: true,
            backgroundMusic: true,
            musicVolume: 70,
            sfxVolume: 80,
            
            publicProfile: true,
            onlineStatus: true,
            messagePermissions: 'friends',
            twoFactor: false,
            loginNotifications: true,
            analytics: true,
            
            language: 'ru',
            dateFormat: 'dd.mm.yyyy',
            graphicsQuality: 'medium',
            animations: true,
            autosave: 5,
            
            previousTheme: 'light'
        };
    }

    applySettings() {
        if (!document.body) return;
        
        // Применяем настройки темы с учетом darkMode
        document.body.setAttribute('data-theme', this.settings.theme);
        
        // Добавляем или удаляем класс dark-mode для не-темных тем
        if (this.settings.darkMode && this.settings.theme !== 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Применяем настройки шрифта
        document.body.style.fontSize = this.settings.fontSize + 'px';
        document.body.style.fontFamily = this.settings.fontFamily + ', sans-serif';
        
        // Применяем анимации
        if (!this.settings.animations) {
            document.body.style.transition = 'none';
            document.querySelectorAll('*').forEach(el => {
                el.style.transition = 'none';
            });
        } else {
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
        }

        // Сохраняем настройки в CSS переменных для глобального доступа
        this.updateCSSVariables();
    }

    updateCSSVariables() {
        const root = document.documentElement;
        
        // Сохраняем основные настройки как CSS переменные
        root.style.setProperty('--user-font-size', this.settings.fontSize + 'px');
        root.style.setProperty('--user-font-family', this.settings.fontFamily);
    }

    updateSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
        this.applySettings();
        
        // Уведомляем другие страницы об изменении
        this.notifyOtherPages(key, value);
    }

    saveSettings() {
        localStorage.setItem('appSettings', JSON.stringify(this.settings));
        
        // Сохраняем в профиль пользователя
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        const userIndex = users.findIndex(u => u.email === currentUser?.email);
        
        if (userIndex !== -1) {
            users[userIndex].settings = this.settings;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        this.showNotification('Настройки сохранены!');
    }

    showNotification(message) {
        // Создаем уведомление, если его нет
        let notification = document.getElementById('global-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'global-notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary, #4CAF50);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: var(--shadow, 0 4px 20px rgba(0, 0, 0, 0.08));
                transform: translateX(100%);
                transition: transform 0.3s ease;
                z-index: 1001;
            `;
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
        }, 3000);
    }

    setupCrossPageListener() {
        // Слушаем сообщения от других вкладок
        window.addEventListener('storage', (e) => {
            if (e.key === 'appSettings' && e.newValue) {
                this.settings = JSON.parse(e.newValue);
                this.applySettings();
            }
        });

        // Слушаем broadcast messages
        window.addEventListener('message', (e) => {
            if (e.data.type === 'SETTINGS_UPDATE') {
                this.settings = e.data.settings;
                this.applySettings();
            }
        });
    }

    notifyOtherPages(key, value) {
        // Отправляем сообщение другим вкладкам через localStorage
        localStorage.setItem('settings_update', JSON.stringify({
            key: key,
            value: value,
            timestamp: Date.now()
        }));

        // Отправляем broadcast message
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'SETTINGS_UPDATE',
                settings: this.settings
            }, '*');
        }
    }

    // Методы для получения настроек
    getTheme() {
        return this.settings.theme;
    }

    getFontSize() {
        return this.settings.fontSize;
    }

    getFontFamily() {
        return this.settings.fontFamily;
    }

    getAvatar() {
        return this.settings.avatar;
    }

    // Метод для применения настроек к конкретному элементу
    applyToElement(element) {
        if (!element) return;
        
        element.style.fontSize = this.settings.fontSize + 'px';
        element.style.fontFamily = this.settings.fontFamily + ', sans-serif';
        
        if (!this.settings.animations) {
            element.style.transition = 'none';
        }
    }
}

// Создаем глобальный экземпляр
window.AppSettings = new SettingsManager();