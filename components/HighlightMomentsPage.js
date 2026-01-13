function HighlightMomentsPage({ isOpen, onClose }) {
    try {
        const [isPlaying, setIsPlaying] = React.useState(false);
        const [selectedMoment, setSelectedMoment] = React.useState(null);

        const momentTypes = [
            {
                title: 'Achievement Moment Neuroscience',
                description: 'Optimized activation of dopamine reward systems',
                icon: 'trophy',
                color: 'yellow',
                guidance: 'Celebrate your achievements with full awareness. Feel the dopamine flowing through your neural pathways, reinforcing positive patterns for future success.',
                methods: ['Reward anticipation regulation', 'Achievement neural reinforcement', 'Dopamine release optimization', 'Success memory consolidation']
            },
            {
                title: 'Emotional Moment Psychology',
                description: 'Deep research on oxytocin social connections',
                icon: 'heart',
                color: 'pink',
                guidance: 'Embrace your emotions fully. Each feeling is a gateway to deeper understanding and stronger connections with yourself and others.',
                methods: ['Emotional resonance activation', 'Oxytocin release triggers', 'Mirror neuron synchronization', 'Emotional memory encoding']
            },
            {
                title: 'Breakthrough Moment Cognitive Science',
                description: 'Breakthrough changes in neuroplasticity',
                icon: 'zap',
                color: 'purple',
                guidance: 'Feel your mind expanding beyond its previous limits. This breakthrough moment is rewiring your brain for greater possibilities.',
                methods: ['Cognitive restructuring techniques', 'Limiting belief breakthrough', 'Neural pathway remodeling', 'Self-efficacy enhancement']
            },
            {
                title: 'Connection Moment Social Neuroscience',
                description: 'Scientific mechanisms of interpersonal neural synchronization',
                icon: 'users',
                color: 'blue',
                guidance: 'Experience the profound connection between minds. Your mirror neurons are synchronizing, creating deeper empathy and understanding.',
                methods: ['Social brain activation', 'Empathy neural networks', 'Collective consciousness state', 'Interpersonal synchrony resonance']
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [isPlaying]);

        const playMomentGuidance = async (moment) => {
            try {
                setSelectedMoment(moment);
                setIsPlaying(true);
                await ElevenLabsService.speak(moment.guidance);
                setIsPlaying(false);
            } catch (error) {
                console.error('Failed to play guidance:', error);
                setIsPlaying(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Highlight Moments Neuroscience</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {momentTypes.map((moment, index) => (
                                <div key={index} className={`bg-gradient-to-br from-${moment.color}-50 to-${moment.color}-100 rounded-2xl p-6`}>
                                    <div className="flex items-center mb-4">
                                        <div className={`w-12 h-12 bg-${moment.color}-200 rounded-full flex items-center justify-center mr-4`}>
                                            <i data-lucide={moment.icon} className={`w-6 h-6 text-${moment.color}-600`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{moment.title}</h3>
                                            <p className="text-xs text-gray-600">{moment.description}</p>
                                        </div>
                                    </div>
                                    
                                    {isPlaying && selectedMoment === moment && (
                                        <div className="bg-yellow-100 rounded-lg p-3 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <i data-lucide="volume-2" className="w-4 h-4 text-yellow-600"></i>
                                                <span className="text-yellow-800 text-sm">Playing moment guidance...</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="space-y-2 mb-4">
                                        {moment.methods.map((method, idx) => (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <span className={`w-5 h-5 bg-${moment.color}-300 text-${moment.color}-700 rounded-full flex items-center justify-center text-xs font-semibold`}>{idx + 1}</span>
                                                <span className="text-gray-700 text-sm">{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <button 
                                        onClick={() => playMomentGuidance(moment)}
                                        disabled={isPlaying}
                                        className={`w-full bg-${moment.color}-600 text-white py-3 rounded-full hover:bg-${moment.color}-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2`}>
                                        <i data-lucide="play" className="w-5 h-5"></i>
                                        <span>Play Guidance</span>
                                    </button>
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
        console.error('HighlightMomentsPage component error:', error);
        reportError(error);
    }
}
