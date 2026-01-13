function UserDashboard({ user, isOpen, onClose, onStartVoiceChat, onViewOrders }) {
    try {
        const [showAchievements, setShowAchievements] = React.useState(false);
        const [showCommunity, setShowCommunity] = React.useState(false);
        const [showDataExport, setShowDataExport] = React.useState(false);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">My Flow Space</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                        <i data-lucide="user" className="w-6 h-6 text-purple-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Personal Info</h3>
                                        <p className="text-sm text-gray-600">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setShowAchievements(true)}>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                                        <i data-lucide="award" className="w-6 h-6 text-yellow-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Achievements</h3>
                                        <p className="text-sm text-gray-600">View your milestones</p>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setShowCommunity(true)}>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <i data-lucide="users" className="w-6 h-6 text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Community</h3>
                                        <p className="text-sm text-gray-600">Share your stories</p>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setShowDataExport(true)}>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                        <i data-lucide="download" className="w-6 h-6 text-green-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Export Data</h3>
                                        <p className="text-sm text-gray-600">Download your reports</p>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all"
                                onClick={onStartVoiceChat}>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                        <i data-lucide="mic" className="w-6 h-6 text-orange-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Jack Voice Companion</h3>
                                        <p className="text-sm text-gray-600">AI conversation</p>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all"
                                onClick={onViewOrders}>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                                        <i data-lucide="shopping-bag" className="w-6 h-6 text-pink-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">My Orders</h3>
                                        <p className="text-sm text-gray-600">Purchase history</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Exit</span>
                    </button>
                </div>

                {showAchievements && (
                    React.createElement(AchievementModal, {
                        isOpen: showAchievements,
                        onClose: () => setShowAchievements(false),
                        user: user
                    })
                )}

                {showCommunity && (
                    React.createElement(CommunityModal, {
                        isOpen: showCommunity,
                        onClose: () => setShowCommunity(false),
                        user: user
                    })
                )}

                {showDataExport && (
                    React.createElement(DataExportModal, {
                        isOpen: showDataExport,
                        onClose: () => setShowDataExport(false),
                        user: user
                    })
                )}
            </div>
        );
    } catch (error) {
        console.error('UserDashboard component error:', error);
        reportError(error);
    }
}
