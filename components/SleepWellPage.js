function SleepWellPage({ isOpen, onClose, user }) {
    try {
        const [selectedRituals, setSelectedRituals] = React.useState([]);
        const [sleepTime, setSleepTime] = React.useState(22);
        const [dreamKeywords, setDreamKeywords] = React.useState('');
        const [skyBrightness, setSkyBrightness] = React.useState(20);
        const [remPhase, setRemPhase] = React.useState(25);
        const [nremPhase, setNremPhase] = React.useState(75);

        const sleepRituals = [
            { id: 'light', label: 'Light Adjustment', icon: 'lightbulb', feedback: 'Blue light reduced, your melatonin curve is realigning for optimal sleep.' },
            { id: 'temp', label: 'Temperature Control', icon: 'thermometer', feedback: 'Optimal sleep temperature set, brain preparing for deep sleep mode.' },
            { id: 'digital', label: 'Digital Detox', icon: 'smartphone-x', feedback: 'Electronic devices shutdown, nervous system recovering from overstimulation.' },
            { id: 'reflect', label: 'Bedtime Reflection', icon: 'book-open', feedback: 'Brain organizing daily information, preparing for REM sleep processing.' }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        React.useEffect(() => {
            const currentHour = new Date().getHours();
            const brightness = currentHour >= 6 && currentHour <= 18 ? 80 : 20;
            setSkyBrightness(brightness);
        }, []);

        React.useEffect(() => {
            const totalSleep = sleepTime <= 6 ? (6 - sleepTime + 24) : (6 - sleepTime + 24);
            const remRatio = Math.max(20, Math.min(30, totalSleep * 3));
            setRemPhase(remRatio);
            setNremPhase(100 - remRatio);
        }, [sleepTime]);

        const handleRitualClick = (ritual) => {
            if (selectedRituals.includes(ritual.id)) {
                setSelectedRituals(prev => prev.filter(id => id !== ritual.id));
            } else {
                setSelectedRituals(prev => [...prev, ritual.id]);
                alert(ritual.feedback);
            }
        };

        const analyzeDreamKeywords = async () => {
            if (!dreamKeywords.trim()) return;
            
            try {
                const systemPrompt = "Analyze the user's dream keywords and generate emotional metabolism trend analysis in concise English.";
                const response = await invokeAIAgent(systemPrompt, `Dream keywords: ${dreamKeywords}`);
                alert(`🧠 Dream Analysis Results:\n${response}`);
            } catch (error) {
                alert('🌙 Dream Analysis: Your subconscious is processing daily emotions. These keywords reflect your inner emotional metabolism patterns and healing journey.');
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Sleep Rhythm</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div 
                            className="rounded-3xl p-8 mb-8 relative overflow-hidden"
                            style={{
                                background: `linear-gradient(180deg, 
                                    rgba(15, 23, 42, ${1 - skyBrightness / 100}) 0%, 
                                    rgba(30, 41, 59, ${1 - skyBrightness / 100}) 50%, 
                                    rgba(51, 65, 85, ${1 - skyBrightness / 100}) 100%)`
                            }}>
                            <div className="absolute inset-0">
                                {Array.from({length: 20}, (_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute bg-white rounded-full opacity-80"
                                        style={{
                                            width: Math.random() * 3 + 1 + 'px',
                                            height: Math.random() * 3 + 1 + 'px',
                                            top: Math.random() * 100 + '%',
                                            left: Math.random() * 100 + '%',
                                            animation: `twinkle ${Math.random() * 3 + 2}s infinite`
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="relative z-10 text-center">
                                <h3 className="text-4xl font-bold text-white mb-4">Sleep: The Brain's Most Important Board Meeting</h3>
                                <p className="text-xl text-white opacity-90 mb-6">Deep sleep reconstructs neural networks</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
                            <h4 className="text-xl font-semibold mb-4 text-center">Sleep Ritual Cards</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {sleepRituals.map((ritual) => (
                                    <button
                                        key={ritual.id}
                                        onClick={() => handleRitualClick(ritual)}
                                        className={`p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                                            selectedRituals.includes(ritual.id) 
                                                ? 'border-indigo-500 bg-indigo-100' 
                                                : 'border-gray-200 bg-white hover:border-indigo-300'
                                        }`}>
                                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <i data-lucide={ritual.icon} className="w-6 h-6 text-indigo-600"></i>
                                        </div>
                                        <div className="font-semibold text-sm">{ritual.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                                <i data-lucide="clock" className="w-6 h-6 mr-2 text-blue-600"></i>
                                24-Hour Circadian Rhythm Chart
                            </h4>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Sleep Time: {sleepTime}:00</label>
                                <input
                                    type="range"
                                    min="20"
                                    max="24"
                                    value={sleepTime}
                                    onChange={(e) => setSleepTime(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h5 className="font-semibold mb-2 text-blue-700">REM Sleep Phase</h5>
                                    <div className="w-full bg-blue-200 rounded-full h-4 mb-2">
                                        <div 
                                            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                                            style={{ width: `${remPhase}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-blue-600">{remPhase}% - Dreams & Memory Consolidation</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h5 className="font-semibold mb-2 text-green-700">NREM Deep Sleep</h5>
                                    <div className="w-full bg-green-200 rounded-full h-4 mb-2">
                                        <div 
                                            className="bg-green-600 h-4 rounded-full transition-all duration-500"
                                            style={{ width: `${nremPhase}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-green-600">{nremPhase}% - Physical Restoration & Recovery</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => alert('💤 Sleep Optimization Tips:\n• Keep bedroom 65-68°F (18-20°C)\n• No screens 1 hour before sleep\n• Consistent sleep schedule ±30 minutes\n• Morning light exposure within 1 hour of waking')}
                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600">
                                    Sleep Science
                                </button>
                                <button 
                                    onClick={() => alert('🧠 Sleep Phases Guide:\n• Stage 1-2: Light sleep (5-10min)\n• Stage 3: Deep sleep (15-30min)\n• REM: Dream sleep (10-30min)\n• Full cycle: 90-110 minutes\n• Optimal: 4-6 complete cycles')}
                                    className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-600">
                                    Phase Guide
                                </button>
                                <button 
                                    onClick={() => alert('⚡ Wake Up Fresh:\n• Time wake-up to end of sleep cycle\n• Use gradual light alarm\n• Avoid snooze button\n• Get sunlight within 30 minutes')}
                                    className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600">
                                    Wake Tips
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                                <i data-lucide="brain" className="w-6 h-6 mr-2 text-purple-600"></i>
                                Dream Analysis & Emotional Metabolism
                            </h4>
                            <div className="flex space-x-4 mb-4">
                                <input
                                    type="text"
                                    value={dreamKeywords}
                                    onChange={(e) => setDreamKeywords(e.target.value)}
                                    placeholder="Enter keywords from your dreams..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    onClick={analyzeDreamKeywords}
                                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                    Analyze Dreams
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                                Enter dream keywords for AI-powered emotional metabolism analysis connecting to your EMR system.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => alert('🌙 Dream Pattern Recognition:\n• Recurring symbols indicate unresolved emotions\n• Vivid dreams suggest active memory processing\n• Nightmares may reflect stress accumulation\n• Peaceful dreams indicate emotional balance')}
                                    className="bg-indigo-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-600">
                                    Dream Patterns
                                </button>
                                <button 
                                    onClick={() => alert('📊 Emotional Metabolism Tracking:\n• Dream frequency correlates with stress levels\n• Symbol analysis reveals subconscious processing\n• Sleep quality affects emotional regulation\n• REM patterns show healing progress')}
                                    className="bg-pink-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-pink-600">
                                    EMR Insights
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
        console.error('SleepWellPage component error:', error);
        reportError(error);
    }
}