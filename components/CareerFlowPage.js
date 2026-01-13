function CareerFlowPage({ isOpen, onClose }) {
    try {
        const [isPlaying, setIsPlaying] = React.useState(false);
        const [selectedArea, setSelectedArea] = React.useState(null);

        const flowAreas = [
            {
                title: 'Deep Focus Neuroscience',
                description: 'Attention training through prefrontal cortex optimization',
                icon: 'focus',
                image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                guidance: 'Enter the zone of laser focus. Feel your prefrontal cortex optimizing, filtering distractions, and creating crystal-clear concentration.',
                techniques: ['Attention network strengthening', 'Distraction inhibition training', 'Cognitive load management', 'Flow state maintenance']
            },
            {
                title: 'Creative Neural Activation',
                description: 'Scientific development of right-brain innovation networks',
                icon: 'lightbulb',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                guidance: 'Unleash your creative potential. Feel your right brain lighting up with innovative connections and breakthrough insights.',
                techniques: ['Divergent thinking activation', 'Creative neural pathways', 'Insight breakthrough training', 'Innovation thinking patterns']
            },
            {
                title: 'Decision-Making Cognitive Science',
                description: 'Systematic optimization of executive functions',
                icon: 'target',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                guidance: 'Trust your enhanced decision-making abilities. Your executive functions are now optimized for clear, confident choices.',
                techniques: ['Cognitive flexibility training', 'Working memory enhancement', 'Impulse control optimization', 'Decision tree thinking']
            },
            {
                title: 'Leadership Social Neuroscience',
                description: 'Influence development through social brain research',
                icon: 'users',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                guidance: 'Embody natural leadership. Feel your social brain activating, creating authentic connections and inspiring influence.',
                techniques: ['Emotional intelligence neural training', 'Social cognition optimization', 'Team synchronization building', 'Influence neural mechanisms']
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [isPlaying]);

        const playFlowGuidance = async (area) => {
            try {
                setSelectedArea(area);
                setIsPlaying(true);
                await ElevenLabsService.speak(area.guidance);
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
                            <h2 className="text-3xl font-bold gradient-text">Career Flow Neuroscience</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {flowAreas.map((area, index) => (
                                <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl overflow-hidden">
                                    <img src={area.image} alt={area.title} className="w-full h-32 object-cover"/>
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                                <i data-lucide={area.icon} className="w-6 h-6 text-green-600"></i>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">{area.title}</h3>
                                                <p className="text-sm text-gray-600">{area.description}</p>
                                            </div>
                                        </div>
                                        
                                        {isPlaying && selectedArea === area && (
                                            <div className="bg-yellow-100 rounded-lg p-3 mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <i data-lucide="volume-2" className="w-4 h-4 text-yellow-600"></i>
                                                    <span className="text-yellow-800 text-sm">Playing flow guidance...</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="space-y-2 mb-4">
                                            {area.techniques.map((technique, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    <span className="w-6 h-6 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">{idx + 1}</span>
                                                    <span className="text-gray-700 text-sm">{technique}</span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <button 
                                            onClick={() => playFlowGuidance(area)}
                                            disabled={isPlaying}
                                            className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                                            <i data-lucide="play" className="w-5 h-5"></i>
                                            <span>Play Flow Guidance</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Exit</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CareerFlowPage component error:', error);
        reportError(error);
    }
}
