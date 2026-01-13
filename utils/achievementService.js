const AchievementService = {
    achievements: [
        { id: 'first_day', name: 'First Step', description: 'Complete your first day journal', icon: 'star', points: 10 },
        { id: 'week_one', name: 'Week Warrior', description: 'Complete 7 consecutive days', icon: 'calendar', points: 50 },
        { id: 'half_way', name: 'Halfway Hero', description: 'Reach day 11 of your journey', icon: 'flag', points: 75 },
        { id: 'final_stretch', name: 'Final Stretch', description: 'Reach day 18 of your journey', icon: 'trending-up', points: 100 },
        { id: 'champion', name: 'Flow Champion', description: 'Complete all 21 days', icon: 'trophy', points: 200 },
        { id: 'high_scorer', name: 'High Achiever', description: 'Maintain 8+ rating for 5 days', icon: 'award', points: 80 },
        { id: 'consistent', name: 'Consistency Master', description: 'Journal for 10 consecutive days', icon: 'check-circle', points: 120 }
    ],

    async getUserAchievements(userId) {
        try {
            const achievements = await trickleListObjects(`achievement:${userId}`, 50, true);
            return achievements.items.map(item => item.objectData);
        } catch (error) {
            console.error('Failed to load achievements:', error);
            return [];
        }
    },

    async checkAndAwardAchievements(userId, journalType, dayCount, logs) {
        try {
            const userAchievements = await this.getUserAchievements(userId);
            const earnedIds = userAchievements.map(a => a.achievementId);
            const newAchievements = [];

            // Check day-based achievements
            if (dayCount >= 1 && !earnedIds.includes('first_day')) {
                newAchievements.push(this.achievements.find(a => a.id === 'first_day'));
            }
            if (dayCount >= 7 && !earnedIds.includes('week_one')) {
                newAchievements.push(this.achievements.find(a => a.id === 'week_one'));
            }
            if (dayCount >= 11 && !earnedIds.includes('half_way')) {
                newAchievements.push(this.achievements.find(a => a.id === 'half_way'));
            }
            if (dayCount >= 18 && !earnedIds.includes('final_stretch')) {
                newAchievements.push(this.achievements.find(a => a.id === 'final_stretch'));
            }
            if (dayCount >= 21 && !earnedIds.includes('champion')) {
                newAchievements.push(this.achievements.find(a => a.id === 'champion'));
            }

            // Check rating-based achievements
            const highRatingDays = logs.filter(log => 
                (log.moodRating >= 8 || log.skillRating >= 8 || log.sleepQuality >= 8)
            ).length;
            
            if (highRatingDays >= 5 && !earnedIds.includes('high_scorer')) {
                newAchievements.push(this.achievements.find(a => a.id === 'high_scorer'));
            }

            if (dayCount >= 10 && !earnedIds.includes('consistent')) {
                newAchievements.push(this.achievements.find(a => a.id === 'consistent'));
            }

            // Award new achievements
            for (const achievement of newAchievements) {
                await trickleCreateObject(`achievement:${userId}`, {
                    userId,
                    achievementId: achievement.id,
                    name: achievement.name,
                    description: achievement.description,
                    icon: achievement.icon,
                    points: achievement.points,
                    journalType,
                    earnedAt: new Date().toISOString()
                });
            }

            return newAchievements;
        } catch (error) {
            console.error('Failed to check achievements:', error);
            return [];
        }
    },

    async getUserPoints(userId) {
        try {
            const achievements = await this.getUserAchievements(userId);
            return achievements.reduce((total, achievement) => total + (achievement.points || 0), 0);
        } catch (error) {
            console.error('Failed to calculate points:', error);
            return 0;
        }
    }
};