function AchievementModal({ isOpen, onClose, user }) {
    try {
        const [achievements, setAchievements] = React.useState([]);
        const [totalPoints, setTotalPoints] = React.useState(0);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [achievements]);

        React.useEffect(() => {
            if (isOpen && user) {
                loadAchievements();
            }
        }, [isOpen, user]);

        const loadAchievements = async () => {
            try {
                setLoading(true);
                const userAchievements = await AchievementService.getUserAchievements(user.phone);
                const points = await AchievementService.getUserPoints(user.phone);
                setAchievements(userAchievements);
                setTotalPoints(points);
            } catch (error) {
                console.error('Failed to load achievements:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">My Achievements</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-orange-600">{totalPoints}</h3>
                                    <p className="text-orange-700">Total Points Earned</p>
                                </div>
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                    <i data-lucide="star" className="w-8 h-8 text-orange-600"></i>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="loading-spinner mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading achievements...</p>
                            </div>
                        ) : achievements.length === 0 ? (
                            <div className="text-center py-8">
                                <i data-lucide="award" className="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                                <p className="text-gray-600">Start journaling to earn your first achievement!</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {achievements.map((achievement, index) => (
                                    <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-l-4 border-purple-500">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                                <i data-lucide={achievement.icon} className="w-6 h-6 text-purple-600"></i>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{achievement.name}</h3>
                                                <p className="text-gray-600 text-sm">{achievement.description}</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                                                        {achievement.points} points
                                                    </span>
                                                    <span className="text-gray-500 text-xs">
                                                        {new Date(achievement.earnedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AchievementModal component error:', error);
        reportError(error);
    }
}