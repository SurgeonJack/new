const CommunityService = {
    async shareStory(userId, storyData) {
        try {
            const story = {
                userId,
                title: storyData.title,
                content: storyData.content,
                journalType: storyData.journalType,
                dayCount: storyData.dayCount,
                isAnonymous: storyData.isAnonymous,
                likes: 0,
                shares: 0,
                createdAt: new Date().toISOString()
            };

            const newStory = await trickleCreateObject('community_story', story);
            return newStory.objectData;
        } catch (error) {
            console.error('Failed to share story:', error);
            throw error;
        }
    },

    async getStories(limit = 20) {
        try {
            const stories = await trickleListObjects('community_story', limit, true);
            return stories.items.map(item => ({
                ...item.objectData,
                id: item.objectId
            }));
        } catch (error) {
            console.error('Failed to load stories:', error);
            return [];
        }
    },

    async likeStory(storyId, userId) {
        try {
            // Check if already liked
            const likes = await trickleListObjects(`story_like:${storyId}`, 100, true);
            const hasLiked = likes.items.some(item => item.objectData.userId === userId);
            
            if (!hasLiked) {
                await trickleCreateObject(`story_like:${storyId}`, {
                    storyId,
                    userId,
                    likedAt: new Date().toISOString()
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to like story:', error);
            return false;
        }
    },

    formatTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return `${Math.floor(diffInHours / 168)}w ago`;
    }
};