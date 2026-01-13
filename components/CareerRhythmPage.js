function CareerRhythmPage({ isOpen, onClose, user }) {
    try {
        const [energyTimeline, setEnergyTimeline] = React.useState(50);
        const [workMode, setWorkMode] = React.useState('');
        const [syncScore, setSyncScore] = React.useState(0);
        const [focusPhase, setFocusPhase] = React.useState(0);
        const [workInvestment, setWorkInvestment] = React.useState(5);
        const [recoveryQuality, setRecoveryQuality] = React.useState(5);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        React.useEffect(() => {
            const interval = setInterval(() => {
                setFocusPhase(prev => (prev + 1) % 100);
            }, 150);
            return () => clearInterval(interval);
        }, []);

        React.useEffect(() => {
            const score = (workInvestment * recoveryQuality * energyTimeline) / 125;
            setSyncScore(Math.round(score));
        }, [workInvestment, recoveryQuality, energyTimeline]);

        const handleWorkModeSelection = (mode) => {
            setWorkMode(mode);
            const responses = {
                reactive: "⚠️ Reactive Work Mode: Creativity probability 35%, burnout risk 70%. Recommended: Shift to rhythmic work, establish wave patterns of focus and recovery.",
                rhythmic: "✨ Rhythmic Work Mode: Creativity probability 85%, burnout risk 20%. You've mastered the wave nature of work, continue optimizing your rhythm."
            };
            alert(responses[mode]);
        };

        const generateRhythmChart = () => {
            const hours = Array.from({length: 24}, (_, i) => i);
            return hours.map(hour => {
                const focusLevel = Math.sin((hour - 6) * Math.PI / 12) * 50 + 50;
                const recoveryLevel = 100 - focusLevel;
                return { hour, focus: Math.max(0, focusLevel), recovery: Math.max(0, recoveryLevel) };
            });
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Career Rhythm</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 mb-8">
                            <h3 className="text-4xl font-bold text-center mb-4 text-green-800">Make Work Like Waves, Not Walls</h3>
                            <div className="relative h-32 mb-6 bg-white rounded-2xl overflow-hidden">
                                <svg width="100%" height="100%" viewBox="0 0 800 128">
                                    <path
                                        d={`M 0,64 Q 200,${64 + Math.sin(focusPhase * 0.1) * 30} 400,64 T 800,64`}
                                        stroke="#10b981"
                                        strokeWidth="3"
                                        fill="none"
                                    />
                                    <text x="50" y="30" className="text-sm fill-green-600">Focus</text>
                                    <text x="50" y="110" className="text-sm fill-blue-600">Recovery</text>
                                </svg>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleWorkModeSelection('reactive')}
                                    className={`p-4 rounded-2xl border-2 transition-all ${
                                        workMode === 'reactive' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
                                    }`}>
                                    <h4 className="font-semibold text-red-600">Reactive Work</h4>
                                    <p className="text-sm text-gray-600">Continuous high intensity, lacks rhythm</p>
                                </button>
                                <button
                                    onClick={() => handleWorkModeSelection('rhythmic')}
                                    className={`p-4 rounded-2xl border-2 transition-all ${
                                        workMode === 'rhythmic' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                                    }`}>
                                    <h4 className="font-semibold text-green-600">Rhythmic Work</h4>
                                    <p className="text-sm text-gray-600">Alternating focus and recovery</p>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                                <i data-lucide="trending-up" className="w-6 h-6 mr-2 text-green-600"></i>
                                Energy Timeline Controller
                            </h4>
                            <div className="mb-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={energyTimeline}
                                    onChange={(e) => setEnergyTimeline(e.target.value)}
                                    className="w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="text-center mb-4">
                                <p className="text-lg font-medium mb-2">Current Energy Level: {energyTimeline}%</p>
                                <p className="text-sm text-gray-600">
                                    {energyTimeline < 30 ? '🔴 Low Energy: Ideal for emails, organizing documents' :
                                     energyTimeline < 70 ? '🟡 Medium Energy: Perfect for meetings, communication' :
                                     '🟢 High Energy: Best for creative work, important decisions'}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => alert('💡 Energy Optimization Tips:\n• Schedule deep work during peak hours\n• Use low-energy times for admin tasks\n• Take breaks before energy drops below 20%')}
                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600">
                                    Optimize Schedule
                                </button>
                                <button 
                                    onClick={() => alert('🎯 Focus Techniques:\n• Pomodoro: 25min work + 5min break\n• Ultradian rhythm: 90min cycles\n• Deep work blocks: 2-4 hours')}
                                    className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-600">
                                    Focus Methods
                                </button>
                                <button 
                                    onClick={() => alert('⚡ Energy Boosters:\n• 10-minute walk\n• Deep breathing (4-7-8)\n• Cold water on face/wrists\n• Protein snack')}
                                    className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600">
                                    Boost Energy
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6">
                                <h4 className="text-lg font-semibold mb-4">Weekly Investment & Recovery Quality</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Work Investment (1-10)</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={workInvestment}
                                            onChange={(e) => setWorkInvestment(e.target.value)}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-600">Current: {workInvestment}/10</span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Recovery Quality (1-10)</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={recoveryQuality}
                                            onChange={(e) => setRecoveryQuality(e.target.value)}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-600">Current: {recoveryQuality}/10</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => alert('🔄 Recovery Strategies:\n• Micro-breaks every 25-50 minutes\n• Weekly digital detox periods\n• Boundary setting between work/personal\n• Sleep optimization for neural recovery')}
                                    className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                                    Improve Recovery
                                </button>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                                <h4 className="text-lg font-semibold mb-4 text-center">Work-Life Sync Index</h4>
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-blue-600 mb-2">{syncScore}</div>
                                    <div className="text-sm text-gray-600 mb-4">Rhythm Synchronization Index</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${syncScore}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {syncScore < 40 ? 'Need to adjust work rhythm' :
                                         syncScore < 70 ? 'Good rhythm coordination' :
                                         'Excellent work-life synchronization'}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => alert(`📊 Your Rhythm Analysis:\n• Sync Score: ${syncScore}/100\n• Investment × Recovery Balance: ${(workInvestment * recoveryQuality / 10).toFixed(1)}/10\n• Optimal Range: 70-85 for sustained performance\n• Recommendation: ${syncScore < 40 ? 'Focus on recovery practices' : syncScore < 70 ? 'Fine-tune your rhythm' : 'Maintain current balance'}`)}
                                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Detailed Analysis
                                </button>
                            </div>
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
        console.error('CareerRhythmPage component error:', error);
        reportError(error);
    }
}