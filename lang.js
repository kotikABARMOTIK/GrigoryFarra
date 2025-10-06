// lang.js
const translations = {
    'ru': {
        // Общие
        'app_name': 'Garden Game',
        'settings': 'Настройки',
        'save': 'Сохранить',
        'cancel': 'Отмена',
        'logout': 'Выйти',
        
        // Навигация
        'home': 'Главная',
        'profile': 'Профиль',
        'shop': 'Магазин',
        'friends': 'Друзья',
        'games': 'Игры',
        'settings': 'Настройки',
        
        // Заголовки настроек
        'settings_title': 'Настройки',
        'settings_subtitle': 'Настройте приложение под свои предпочтения',
        
        // Категории настроек
        'appearance': 'Внешний вид',
        'notifications': 'Уведомления',
        'privacy': 'Конфиденциальность',
        'account': 'Аккаунт',
        'system': 'Система',
        
        // Внешний вид
        'theme': 'Тема оформления',
        'dark_mode': 'Темный режим',
        'dark_mode_desc': 'Включить темную тему для комфортного использования ночью',
        'color_scheme': 'Цветовая схема',
        'color_scheme_desc': 'Выберите preferred цветовую палитру',
        'light_theme': 'Светлая',
        'dark_theme': 'Темная',
        'green_theme': 'Зеленая',
        'blue_theme': 'Синяя',
        
        // Текст и шрифты
        'text_fonts': 'Текст и шрифты',
        'font_size': 'Размер шрифта',
        'font_size_desc': 'Настройте размер текста для комфортного чтения',
        'font_style': 'Стиль шрифта',
        'font_style_desc': 'Выберите preferred шрифт для интерфейса',
        
        // Аватар
        'profile_avatar': 'Аватар профиля',
        
        // Уведомления
        'app_notifications': 'Уведомления приложения',
        'push_notifications': 'Push-уведомления',
        'push_notifications_desc': 'Получать уведомления о новых событиях',
        'friend_notifications': 'Уведомления от друзей',
        'friend_notifications_desc': 'Сообщения, запросы дружбы, подарки',
        'game_notifications': 'Игровые уведомления',
        'game_notifications_desc': 'Завершение заданий, новые достижения',
        'sound_notifications': 'Звук уведомлений',
        'sound_notifications_desc': 'Воспроизводить звук при получении уведомлений',
        
        // Звуки
        'sounds_music': 'Звуки и музыка',
        'background_music': 'Фоновая музыка',
        'background_music_desc': 'Включить фоновую музыку в игре',
        'music_volume': 'Громкость музыки',
        'music_volume_desc': 'Уровень громкости фоновой музыки',
        'sfx_volume': 'Звуковые эффекты',
        'sfx_volume_desc': 'Звуки интерфейса и игровых действий',
        
        // Конфиденциальность
        'profile_visibility': 'Видимость профиля',
        'public_profile': 'Публичный профиль',
        'public_profile_desc': 'Разрешить другим пользователям просматривать ваш профиль',
        'online_status': 'Показывать онлайн-статус',
        'online_status_desc': 'Отображать, когда вы онлайн',
        'allow_messages': 'Разрешить сообщения',
        'allow_messages_desc': 'Кто может отправлять вам сообщения',
        'all_users': 'Все пользователи',
        'friends_only': 'Только друзья',
        'nobody': 'Никто',
        
        // Безопасность
        'security': 'Безопасность',
        'two_factor': 'Двухфакторная аутентификация',
        'two_factor_desc': 'Дополнительная защита вашего аккаунта',
        'login_notifications': 'Уведомления о входе',
        'login_notifications_desc': 'Получать уведомления о новых входах в аккаунт',
        
        // Данные
        'data': 'Данные',
        'analytics': 'Сбор аналитики',
        'analytics_desc': 'Помогите нам улучшить приложение',
        'clear_cache': 'Очистить кэш',
        'export_data': 'Экспорт данных',
        
        // Аккаунт
        'profile_info': 'Информация профиля',
        'username': 'Имя пользователя',
        'username_desc': 'Ваше отображаемое имя в игре',
        'email': 'Электронная почта',
        'email_desc': 'Для уведомлений и восстановления доступа',
        'bio': 'О себе',
        'bio_desc': 'Краткое описание для вашего профиля',
        'save_changes': 'Сохранить изменения',
        
        'account_security': 'Безопасность аккаунта',
        'change_password': 'Именить пароль',
        'login_history': 'История входов',
        
        'account_deletion': 'Удаление аккаунта',
        'delete_account': 'Удалить аккаунт',
        'delete_account_desc': 'Это действие нельзя отменить. Все данные будут удалены.',
        
        // Система
        'performance': 'Производительность',
        'graphics_quality': 'Качество графики',
        'graphics_quality_desc': 'Настройте качество графики для лучшей производительности',
        'low': 'Низкое',
        'medium': 'Среднее',
        'high': 'Высокое',
        'ultra': 'Ультра',
        'fps_limit': 'Ограничение FPS',
        'fps_limit_desc': 'Ограничение кадров в секунду для экономии заряда батареи',
        'power_saving': 'Энергосберегающий режим',
        'power_saving_desc': 'Снижает производительность для экономии энергии',
        
        'language_region': 'Язык и регион',
        'interface_language': 'Язык интерфейса',
        'interface_language_desc': 'Выберите preferred язык приложения',
        'date_format': 'Формат даты и времени',
        'date_format_desc': 'Как отображаются дата и время в приложении',
        
        'about_app': 'О приложении',
        'app_version': 'Версия приложения',
        'license_agreement': 'Лицензионное соглашение',
        'privacy_policy': 'Политика конфиденциальности',
        'check_updates': 'Проверить обновления',
        'view': 'Просмотреть',
        
        // Модальные окна
        'logout_confirm': 'Подтверждение выхода',
        'logout_confirm_text': 'Вы уверены, что хотите выйти из аккаунта?',
        'delete_account_confirm': 'Удаление аккаунта',
        'delete_account_text': 'Это действие нельзя отменить. Все ваши данные будут удалены.',
        'enter_password': 'Введите ваш пароль:',
        'your_password': 'Ваш пароль',
        
        // Уведомления
        'settings_saved': 'Настройки сохранены!',
        'profile_updated': 'Профиль обновлен!',
        'cache_cleared': 'Кэш очищен!',
        'checking_updates': 'Проверка обновлений...',
        'latest_version': 'У вас установлена последняя версия!'
    },
    
    'en': {
        // Common
        'app_name': 'Garden Game',
        'settings': 'Settings',
        'save': 'Save',
        'cancel': 'Cancel',
        'logout': 'Logout',
        
        // Navigation
        'home': 'Home',
        'profile': 'Profile',
        'shop': 'Shop',
        'friends': 'Friends',
        'games': 'Games',
        'settings': 'Settings',
        
        // Settings headers
        'settings_title': 'Settings',
        'settings_subtitle': 'Customize the app to your preferences',
        
        // Settings categories
        'appearance': 'Appearance',
        'notifications': 'Notifications',
        'privacy': 'Privacy',
        'account': 'Account',
        'system': 'System',
        
        // Appearance
        'theme': 'Theme',
        'dark_mode': 'Dark Mode',
        'dark_mode_desc': 'Enable dark theme for comfortable night use',
        'color_scheme': 'Color Scheme',
        'color_scheme_desc': 'Choose your preferred color palette',
        'light_theme': 'Light',
        'dark_theme': 'Dark',
        'green_theme': 'Green',
        'blue_theme': 'Blue',
        
        // Text and fonts
        'text_fonts': 'Text and Fonts',
        'font_size': 'Font Size',
        'font_size_desc': 'Adjust text size for comfortable reading',
        'font_style': 'Font Style',
        'font_style_desc': 'Choose your preferred font for the interface',
        
        // Avatar
        'profile_avatar': 'Profile Avatar',
        
        // Notifications
        'app_notifications': 'App Notifications',
        'push_notifications': 'Push Notifications',
        'push_notifications_desc': 'Receive notifications about new events',
        'friend_notifications': 'Friend Notifications',
        'friend_notifications_desc': 'Messages, friend requests, gifts',
        'game_notifications': 'Game Notifications',
        'game_notifications_desc': 'Quest completions, new achievements',
        'sound_notifications': 'Notification Sound',
        'sound_notifications_desc': 'Play sound when receiving notifications',
        
        // Sounds
        'sounds_music': 'Sounds and Music',
        'background_music': 'Background Music',
        'background_music_desc': 'Enable background music in the game',
        'music_volume': 'Music Volume',
        'music_volume_desc': 'Background music volume level',
        'sfx_volume': 'Sound Effects',
        'sfx_volume_desc': 'Interface sounds and game actions',
        
        // Privacy
        'profile_visibility': 'Profile Visibility',
        'public_profile': 'Public Profile',
        'public_profile_desc': 'Allow other users to view your profile',
        'online_status': 'Show Online Status',
        'online_status_desc': 'Display when you are online',
        'allow_messages': 'Allow Messages',
        'allow_messages_desc': 'Who can send you messages',
        'all_users': 'All Users',
        'friends_only': 'Friends Only',
        'nobody': 'Nobody',
        
        // Security
        'security': 'Security',
        'two_factor': 'Two-Factor Authentication',
        'two_factor_desc': 'Additional protection for your account',
        'login_notifications': 'Login Notifications',
        'login_notifications_desc': 'Receive notifications about new logins to your account',
        
        // Data
        'data': 'Data',
        'analytics': 'Analytics Collection',
        'analytics_desc': 'Help us improve the app',
        'clear_cache': 'Clear Cache',
        'export_data': 'Export Data',
        
        // Account
        'profile_info': 'Profile Information',
        'username': 'Username',
        'username_desc': 'Your display name in the game',
        'email': 'Email',
        'email_desc': 'For notifications and account recovery',
        'bio': 'About Me',
        'bio_desc': 'Brief description for your profile',
        'save_changes': 'Save Changes',
        
        'account_security': 'Account Security',
        'change_password': 'Change Password',
        'login_history': 'Login History',
        
        'account_deletion': 'Account Deletion',
        'delete_account': 'Delete Account',
        'delete_account_desc': 'This action cannot be undone. All data will be deleted.',
        
        // System
        'performance': 'Performance',
        'graphics_quality': 'Graphics Quality',
        'graphics_quality_desc': 'Adjust graphics quality for better performance',
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High',
        'ultra': 'Ultra',
        'fps_limit': 'FPS Limit',
        'fps_limit_desc': 'Frame rate limit for battery saving',
        'power_saving': 'Power Saving Mode',
        'power_saving_desc': 'Reduces performance to save energy',
        
        'language_region': 'Language & Region',
        'interface_language': 'Interface Language',
        'interface_language_desc': 'Choose your preferred language',
        'date_format': 'Date & Time Format',
        'date_format_desc': 'How date and time are displayed in the app',
        
        'about_app': 'About App',
        'app_version': 'App Version',
        'license_agreement': 'License Agreement',
        'privacy_policy': 'Privacy Policy',
        'check_updates': 'Check for Updates',
        'view': 'View',
        
        // Modal windows
        'logout_confirm': 'Logout Confirmation',
        'logout_confirm_text': 'Are you sure you want to logout?',
        'delete_account_confirm': 'Delete Account',
        'delete_account_text': 'This action cannot be undone. All your data will be deleted.',
        'enter_password': 'Enter your password:',
        'your_password': 'Your password',
        
        // Notifications
        'settings_saved': 'Settings saved!',
        'profile_updated': 'Profile updated!',
        'cache_cleared': 'Cache cleared!',
        'checking_updates': 'Checking for updates...',
        'latest_version': 'You have the latest version!'
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = this.getSavedLanguage() || 'ru';
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLang);
        this.setupLanguageSelector();
    }

    getSavedLanguage() {
        return localStorage.getItem('appLanguage') || 'ru';
    }

    saveLanguage(lang) {
        localStorage.setItem('appLanguage', lang);
        this.currentLang = lang;
    }

    applyLanguage(lang) {
        this.saveLanguage(lang);
        
        // Обновляем все элементы с data-lang атрибутом
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Обновляем выбранный язык в селекторе
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            langSelect.value = lang;
        }

        // Обновляем атрибут lang у html элемента
        document.documentElement.lang = lang;
    }

    setupLanguageSelector() {
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            langSelect.value = this.currentLang;
            langSelect.addEventListener('change', (e) => {
                this.applyLanguage(e.target.value);
            });
        }
    }

    getText(key) {
        return translations[this.currentLang]?.[key] || key;
    }
}

// Глобальный экземпляр
let languageManager;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    languageManager = new LanguageManager();
});