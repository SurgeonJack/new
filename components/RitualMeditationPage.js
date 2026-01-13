function RitualMeditationPage({ isOpen, onClose, user, onOrder }) {
    try {
        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Ritual Meditation</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="text-center py-16">
                            <i data-lucide="clock" className="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                            <p className="text-gray-600 text-lg">Content coming soon...</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Exit</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RitualMeditationPage component error:', error);
        reportError(error);
    }
}
