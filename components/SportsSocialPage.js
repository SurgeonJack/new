function SportsSocialPage({ isOpen, onClose, user }) {
    try {
        const [selectedMovement, setSelectedMovement] = React.useState('');
        const [balanceSlider, setBalanceSlider] = React.useState(50);
        const [rhythmScore, setRhythmScore] = React.useState(0);
        const [gradientPhase, setGradientPhase] = React.useState(0);
        const [movementHistory, setMovementHistory] = React.useState([]);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        React.useEffect(() => {
            const interval = setInterval(() => {
                setGradientPhase(prev => (prev + 1) % 360);
            }, 100);
            return () => clearInterval(interval);
        }, []);

        React.useEffect(() => {
            if (user) {
                loadMovementHistory();
            }
        }, [user]);

        const loadMovementHistory = async () => {
            try {
                const logs = await trickleListObjects(`movement_rhythm:${user.phone}`, 7, true);
                setMovementHistory(logs.items.map(item => item.objectData));
                calculateRhythmScore(logs.items.map(item => item.objectData));
            } catch (error) {
                console.error('Failed to load movement history:', error);
            }
        };

        const calculateRhythmScore = (history) => {
            const score = history.reduce((total, day) => total + (day.duration || 0), 0) / 7 * 10;
            setRhythmScore(Math.min(100, Math.round(score)));
        };

        const handleMovementSelection = async (movement) => {
            setSelectedMovement(movement);
            
            const responses = {
                walking: "🌿 Parasympathetic Reset Unlocked! Your HPA axis is restoring rhythm. Walking activates the vagus nerve for deep mind-body relaxation.",
                stretching: "🌿 Parasympathetic Reset Unlocked! Your HPA axis is restoring rhythm. Stretching releases muscle tension while your nervous system recalibrates.",
                running: "🌿 Parasympathetic Reset Unlocked! Your HPA axis is restoring rhythm. Running elevates endorphin levels and builds new neural connections.",
                dancing: "🌿 Parasympathetic Reset Unlocked! Your HPA axis is restoring rhythm. Dancing integrates left-right brain function, activating creativity networks."
            };

            alert(responses[movement]);

            if (user) {
                try {
                    await trickleCreateObject(`movement_rhythm:${user.phone}`, {
                        userId: user.phone,
                        movement: movement,
                        date: new Date().toISOString().split('T')[0],
                        duration: Math.floor(Math.random() * 60) + 15,
                        timestamp: new Date().toISOString()
                    });
                    loadMovementHistory();
                } catch (error) {
                    console.error('Failed to save movement:', error);
                }
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Movement Rhythm</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div 
                            className="rounded-3xl p-8 mb-8 relative overflow-hidden"
                            style={{
                                background: `linear-gradient(${gradientPhase}deg, #3b82f6 0%, #f97316 50%, #3b82f6 100%)`,
                                transition: 'background 0.3s ease'
                            }}>
                            <div className="relative z-10 text-center">
                                <h3 className="text-4xl font-bold text-white mb-4">Reset Your System with Movement</h3>
                                <p className="text-xl text-white opacity-90 mb-6">Movement is the language of your nervous system</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { key: 'walking', label: 'Walk', icon: 'footprints', benefit: 'Activates parasympathetic reset' },
                                        { key: 'stretching', label: 'Stretch', icon: 'user', benefit: 'Releases muscle tension' },
                                        { key: 'running', label: 'Run', icon: 'zap', benefit: 'Boosts endorphin levels' },
                                        { key: 'dancing', label: 'Dance', icon: 'music', benefit: 'Integrates brain hemispheres' }
                                    ].map((movement) => (
                                        <button
                                            key={movement.key}
                                            onClick={() => handleMovementSelection(movement.key)}
                                            className={`bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-white hover:bg-opacity-30 transition-all transform hover:scale-105 ${
                                                selectedMovement === movement.key ? 'ring-4 ring-white' : ''
                                            }`}>
                                            <i data-lucide={movement.icon} className="w-8 h-8 mx-auto mb-2"></i>
                                            <div className="font-semibold">{movement.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 mb-8">
                            <h4 className="text-xl font-semibold mb-4 text-center">Movement-Stillness Balance Curve</h4>
                            <div className="mb-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={balanceSlider}
                                    onChange={(e) => setBalanceSlider(e.target.value)}
                                    className="w-full h-2 bg-gradient-to-r from-blue-400 to-orange-400 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-medium">
                                    Movement Intensity: {balanceSlider}% | Mental Tension: {100 - balanceSlider}%
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    {balanceSlider < 30 ? '🔵 Recovery Mode: Parasympathetic dominant, ideal for meditation and stretching' :
                                     balanceSlider < 70 ? '⚖️ Balance Mode: Sympathetic-parasympathetic harmony, optimal creativity state' :
                                     '🔴 Activation Mode: Sympathetic excited, perfect for high-intensity training'}
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => setBalanceSlider(20)}
                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600">
                                    Recovery
                                </button>
                                <button 
                                    onClick={() => setBalanceSlider(50)}
                                    className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600">
                                    Balance
                                </button>
                                <button 
                                    onClick={() => setBalanceSlider(80)}
                                    className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-600">
                                    Activate
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                                <i data-lucide="activity" className="w-6 h-6 mr-2 text-blue-600"></i>
                                Body Rhythm Tracker
                            </h4>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">{rhythmScore}</div>
                                    <div className="text-sm text-gray-600">Body Rhythm Score</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">{movementHistory.length}</div>
                                    <div className="text-sm text-gray-600">Active Days (Last 7)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">
                                        {movementHistory.reduce((total, day) => total + (day.duration || 0), 0)}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Minutes</div>
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h5 className="font-semibold">Movement Journal</h5>
                                    <button 
                                        onClick={() => alert('🧠 Neural Benefits:\n• Increased BDNF (brain-derived neurotrophic factor)\n• Enhanced neuroplasticity\n• Improved mood regulation\n• Reduced stress hormones')}
                                        className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600">
                                        View Benefits
                                    </button>
                                </div>
                                <textarea 
                                    placeholder="How did movement affect your mental state today? Notice any shifts in energy, mood, or clarity..."
                                    className="w-full p-3 border rounded-lg text-sm"
                                    rows="3"
                                />
                                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                                    Save Reflection
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Exit</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SportsSocialPage component error:', error);
        reportError(error);
    }
}