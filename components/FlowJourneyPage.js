function FlowJourneyPage({ isOpen, onClose }) {
    try {
        const journeyItems = [
            {
                type: 'image',
                src: 'https://app.trickle.so/storage/public/images/usr_0ead469e10000001/5cd5a4d1-89d4-4cf9-89e9-31c4080e3202.png',
                title: 'Maldives Beach Retreat',
                description: 'Students practice meditation by crystal blue waters, feeling the rhythm of waves and inner peace'
            },
            {
                type: 'image', 
                src: 'https://app.trickle.so/storage/public/images/usr_0ead469e10000001/7f325a66-9f09-4ffb-b200-e4872eb2de23.png',
                title: 'Beachside Bonfire Retreat',
                description: 'Deep relaxation training by evening bonfire, finding inner warmth and strength in the firelight'
            },
            {
                type: 'image',
                src: 'https://app.trickle.so/storage/public/images/usr_0ead469e10000001/da97cafb-7e62-4359-ba5d-f2325cc02b26.png',
                title: 'Bali Sunrise Yoga',
                description: 'Flow yoga practice at sunrise, breathing in sync with nature'
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Start Your Flow Journey</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="media-grid">
                            {journeyItems.map((item, index) => (
                                <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                                    <img src={item.src} alt={item.title} className="w-full h-48 object-cover"/>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
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
        console.error('FlowJourneyPage component error:', error);
        reportError(error);
    }
}
