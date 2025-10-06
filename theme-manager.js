// theme-manager.js
class ThemeManager {
    constructor() {
        this.settings = this.loadSettings();
        this.applyTheme();
    }

    loadSettings() {
        return JSON.parse(localStorage.getItem('appSettings')) || this.getDefaultSettings();
    }

    getDefaultSettings() {
        return {
            theme: 'light',
            darkMode: false,
            fontSize: 16,
            fontFamily: 'Quicksand'
        };
    }

    applyTheme() {
        if (!this.settings.theme) return;

        // Применяем тему
        document.body.setAttribute('data-theme', this.settings.theme);
        
        // Применяем dark mode для не-темных тем
        if (this.settings.darkMode && this.settings.theme !== 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Применяем настройки шрифта
        if (this.settings.fontSize) {
            document.body.style.fontSize = this.settings.fontSize + 'px';
        }
        if (this.settings.fontFamily) {
            document.body.style.fontFamily = this.settings.fontFamily + ', sans-serif';
        }

        console.log('Theme applied:', this.settings.theme, 'Dark mode:', this.settings.darkMode);
    }

    // Метод для обновления темы извне
    updateTheme(settings) {
        this.settings = { ...this.settings, ...settings };
        this.applyTheme();
    }
}

// Создаем глобальный экземпляр
window.themeManager = new ThemeManager();