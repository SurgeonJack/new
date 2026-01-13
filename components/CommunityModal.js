function CommunityModal({ isOpen, onClose, user }) {
    try {
        const [activeTab, setActiveTab] = React.useState('browse');
        const [stories, setStories] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [shareForm, setShareForm] = React.useState({
            title: '', content: '', journalType: 'general', isAnonymous: true
        });

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [stories, activeTab]);

        React.useEffect(() => {
            if (isOpen && activeTab === 'browse') {
                loadStories();
            }
        }, [isOpen, activeTab]);

        const loadStories = async () => {
            try {
                setLoading(true);
                const communityStories = await CommunityService.getStories(20);
                setStories(communityStories);
            } catch (error) {
                console.error('Failed to load stories:', error);
            } finally {
                setLoading(false);
            }
        };

        const handleShare = async (e) => {
            e.preventDefault();
            if (!shareForm.title.trim() || !shareForm.content.trim()) return;

            try {
                setLoading(true);
                await CommunityService.shareStory(user.phone, {
                    ...shareForm,
                    dayCount: Math.floor(Math.random() * 21) + 1 // Simulated day count
                });
                
                setShareForm({ title: '', content: '', journalType: 'general', isAnonymous: true });
                setActiveTab('browse');
                loadStories();
                alert('Story shared successfully!');
            } catch (error) {
                console.error('Failed to share story:', error);
                alert('Failed to share story. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleLike = async (storyId) => {
            try {
                const success = await CommunityService.likeStory(storyId, user.phone);
                if (success) {
                    loadStories(); // Refresh to show updated likes
                }
            } catch (error) {
                console.error('Failed to like story:', error);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Community Stories</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div className="flex space-x-4 mb-8">
                            <button 
                                onClick={() => setActiveTab('browse')}
                                className={`px-6 py-2 rounded-full transition-colors ${
                                    activeTab === 'browse' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                }`}>
                                Browse Stories
                            </button>
                            <button 
                                onClick={() => setActiveTab('share')}
                                className={`px-6 py-2 rounded-full transition-colors ${
                                    activeTab === 'share' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                }`}>
                                Share Your Story
                            </button>
                        </div>

                        {activeTab === 'browse' && (
                            <div className="space-y-6">
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="loading-spinner mx-auto mb-4"></div>
                                        <p className="text-gray-600">Loading stories...</p>
                                    </div>
                                ) : stories.length === 0 ? (
                                    <div className="text-center py-8">
                                        <i data-lucide="users" className="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                                        <p className="text-gray-600">No stories shared yet. Be the first to share!</p>
                                    </div>
                                ) : (
                                    stories.map((story, index) => (
                                        <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                        <span>{story.isAnonymous ? 'Anonymous' : 'Community Member'}</span>
                                                        <span>•</span>
                                                        <span>{CommunityService.formatTimeAgo(story.createdAt)}</span>
                                                        <span>•</span>
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                            Day {story.dayCount}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mb-4">{story.content}</p>
                                            <div className="flex items-center space-x-4">
                                                <button 
                                                    onClick={() => handleLike(story.id)}
                                                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                                                    <i data-lucide="heart" className="w-4 h-4"></i>
                                                    <span>{story.likes}</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                                                    <i data-lucide="share" className="w-4 h-4"></i>
                                                    <span>{story.shares}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'share' && (
                            <form onSubmit={handleShare} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                                    <input
                                        type="text"
                                        value={shareForm.title}
                                        onChange={(e) => setShareForm({...shareForm, title: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Give your story a compelling title..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Story</label>
                                    <textarea
                                        value={shareForm.content}
                                        onChange={(e) => setShareForm({...shareForm, content: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        rows="6"
                                        placeholder="Share your journey, insights, and growth experiences..."
                                        required
                                    />
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={shareForm.isAnonymous}
                                            onChange={(e) => setShareForm({...shareForm, isAnonymous: e.target.checked})}
                                            className="rounded"
                                        />
                                        <span className="text-sm text-gray-700">Share anonymously</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !shareForm.title.trim() || !shareForm.content.trim()}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
                                    {loading ? 'Sharing...' : 'Share My Story'}
                                </button>
                            </form>
                        )}
                    </div>

                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CommunityModal component error:', error);
        reportError(error);
    }
}