class GameSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadCurrentUser();
        this.setupDailyRewards();
        this.setupNotifications();
    }

    loadCurrentUser() {
        const userData = sessionStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    // Система ежедневных наград
    setupDailyRewards() {
        const today = new Date().toDateString();
        const lastRewardDate = localStorage.getItem('lastRewardDate');
        
        if (lastRewardDate !== today) {
            this.showDailyReward();
        }
    }

    showDailyReward() {
        // Показываем модальное окно с ежедневной наградой
        const reward = this.calculateDailyReward();
        
        const rewardModal = document.createElement('div');
        rewardModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        rewardModal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px;">
                <h2>🎉 Ежедневная награда!</h2>
                <div style="font-size: 3em; margin: 20px 0;">${reward.icon}</div>
                <p>Вы получили: <strong>${reward.amount} ${reward.type}</strong></p>
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Забрать награду
                </button>
            </div>
        `;
        
        document.body.appendChild(rewardModal);
        this.giveReward(reward);
        localStorage.setItem('lastRewardDate', new Date().toDateString());
    }

    calculateDailyReward() {
        const rewards = [
            { type: 'coins', icon: '🪙', amount: 50 },
            { type: 'coins', icon: '🪙', amount: 75 },
            { type: 'coins', icon: '🪙', amount: 100 },
            { type: 'experience', icon: '⭐', amount: 25 },
            { type: 'premium', icon: '💎', amount: 1 }
        ];
        
        const streak = this.getLoginStreak();
        const baseReward = rewards[Math.floor(Math.random() * rewards.length)];
        
        // Бонус за серию входов
        if (streak > 1) {
            baseReward.amount = Math.floor(baseReward.amount * (1 + streak * 0.1));
        }
        
        return baseReward;
    }

    getLoginStreak() {
        const loginData = JSON.parse(localStorage.getItem('loginStreak') || '{"lastLogin": "", "streak": 0}');
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (loginData.lastLogin === yesterday) {
            loginData.streak = (loginData.streak || 0) + 1;
        } else if (loginData.lastLogin !== today) {
            loginData.streak = 1;
        }
        
        loginData.lastLogin = today;
        localStorage.setItem('loginStreak', JSON.stringify(loginData));
        
        return loginData.streak || 1;
    }

    giveReward(reward) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === this.currentUser?.email);
        
        if (userIndex !== -1) {
            if (reward.type === 'coins') {
                users[userIndex].coins = (users[userIndex].coins || 0) + reward.amount;
            } else if (reward.type === 'experience') {
                users[userIndex].experience = (users[userIndex].experience || 0) + reward.amount;
            } else if (reward.type === 'premium') {
                if (!users[userIndex].premium) users[userIndex].premium = { days: 0 };
                users[userIndex].premium.days += reward.amount;
            }
            
            localStorage.setItem('users', JSON.stringify(users));
            this.showNotification(`Получено: ${reward.amount} ${this.getRewardTypeText(reward.type)}`);
        }
    }

    getRewardTypeText(type) {
        const types = {
            'coins': 'монет',
            'experience': 'опыта', 
            'premium': 'премиум-дней'
        };
        return types[type] || type;
    }

    // Система уведомлений
    setupNotifications() {
        this.checkPendingNotifications();
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        notification.innerHTML = message;
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    getNotificationColor(type) {
        const colors = {
            info: '#4caf50',
            warning: '#ff9800',
            error: '#f44336',
            success: '#4caf50'
        };
        return colors[type] || colors.info;
    }

    checkPendingNotifications() {
        const notifications = JSON.parse(localStorage.getItem('pendingNotifications') || '[]');
        if (Array.isArray(notifications)) {
            notifications.forEach(notification => {
                this.showNotification(notification.message, notification.type);
            });
            localStorage.removeItem('pendingNotifications');
        }
    }

    // Система достижений
    checkAchievement(achievementId, condition) {
        if (!condition) return;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === this.currentUser?.email);
        
        if (userIndex !== -1) {
            if (!users[userIndex].achievements) {
                users[userIndex].achievements = [];
            }
            
            if (!users[userIndex].achievements.includes(achievementId)) {
                users[userIndex].achievements.push(achievementId);
                localStorage.setItem('users', JSON.stringify(users));
                
                this.unlockAchievement(achievementId);
            }
        }
    }

    unlockAchievement(achievementId) {
        const achievement = this.getAchievementInfo(achievementId);
        if (achievement) {
            this.showNotification(`🎉 Достижение разблокировано: ${achievement.name}`, 'success', 5000);
            
            // Добавляем очки опыта за достижение
            this.giveReward({ type: 'experience', amount: 50, icon: '⭐' });
        }
    }

    getAchievementInfo(achievementId) {
        const achievements = {
            'first_login': { name: 'Первый вход', icon: '🚪' },
            'plant_master': { name: 'Мастер растений', icon: '🌱' },
            'quiz_expert': { name: 'Эксперт квизов', icon: '🎯' },
            'friend_collector': { name: 'Коллекционер друзей', icon: '👥' },
            'daily_player': { name: 'Ежедневный игрок', icon: '📅' }
        };
        
        return achievements[achievementId] || { name: 'Неизвестное достижение', icon: '⭐' };
    }

    // Система еженедельных заданий
    getWeeklyQuests() {
        const quests = [
            {
                id: 'water_plants',
                title: 'Полить растения',
                description: 'Позаботьтесь о 5 растениях',
                target: 5,
                progress: 0,
                reward: { coins: 100, exp: 50 },
                icon: '💧'
            },
            {
                id: 'play_games',
                title: 'Сыграть в игры',
                description: 'Сыграйте 3 игры в любом режиме',
                target: 3,
                progress: 0,
                reward: { coins: 75, exp: 25 },
                icon: '🎮'
            },
            {
                id: 'make_friends',
                title: 'Завести друзей',
                description: 'Добавьте 2 новых друга',
                target: 2,
                progress: 0,
                reward: { coins: 150, exp: 75 },
                icon: '👥'
            }
        ];
        
        return quests;
    }

    // Обновление статистики игры
    updateGameStats(gameType, stats) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === this.currentUser?.email);
        
        if (userIndex !== -1) {
            if (!users[userIndex].gameStats) {
                users[userIndex].gameStats = {};
            }
            
            if (!users[userIndex].gameStats[gameType]) {
                users[userIndex].gameStats[gameType] = {};
            }
            
            Object.keys(stats).forEach(stat => {
                users[userIndex].gameStats[gameType][stat] = 
                    (users[userIndex].gameStats[gameType][stat] || 0) + stats[stat];
            });
            
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Дополнительные методы для работы с пользователем
    getUserData() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(u => u.email === this.currentUser?.email) || {};
    }

    updateUserData(updates) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === this.currentUser?.email);
        
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            localStorage.setItem('users', JSON.stringify(users));
            
            // Обновляем текущего пользователя в сессии
            this.currentUser = users[userIndex];
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            return true;
        }
        return false;
    }

    // Метод для добавления монет
    addCoins(amount) {
        const currentCoins = this.getUserData()?.coins || 0;
        return this.updateUserData({
            coins: currentCoins + amount
        });
    }

    // Метод для добавления опыта
    addExperience(amount) {
        const currentExp = this.getUserData()?.experience || 0;
        return this.updateUserData({
            experience: currentExp + amount
        });
    }

    // Метод для проверки и обновления уровня пользователя
    checkLevelUp() {
        const userData = this.getUserData();
        const experience = userData.experience || 0;
        const currentLevel = userData.level || 1;
        
        const experienceNeeded = currentLevel * 100;
        
        if (experience >= experienceNeeded) {
            const newLevel = currentLevel + 1;
            this.updateUserData({
                level: newLevel,
                experience: experience - experienceNeeded
            });
            
            this.showNotification(`🎊 Поздравляем! Вы достигли ${newLevel} уровня!`, 'success', 5000);
            return true;
        }
        return false;
    }

    // Метод для сохранения настроек
    saveSettings(settings) {
        const currentSettings = this.getUserData()?.settings || {};
        return this.updateUserData({
            settings: { ...currentSettings, ...settings }
        });
    }

    // Метод для получения настроек
    getSettings() {
        return this.getUserData()?.settings || {};
    }
}

// Создаем глобальный экземпляр системы
window.gameSystem = new GameSystem();

// Функции для использования в HTML
function showDailyReward() {
    window.gameSystem.showDailyReward();
}

function checkAchievement(achievementId, condition) {
    window.gameSystem.checkAchievement(achievementId, condition);
}

function showNotification(message, type = 'info') {
    window.gameSystem.showNotification(message, type);
}

function updateGameStats(gameType, stats) {
    window.gameSystem.updateGameStats(gameType, stats);
}

function addCoins(amount) {
    return window.gameSystem.addCoins(amount);
}

function addExperience(amount) {
    return window.gameSystem.addExperience(amount);
}

function checkLevelUp() {
    return window.gameSystem.checkLevelUp();
}