function EmotionTrackingPage({ isOpen, onClose, user }) {
    try {
        const [activeTab, setActiveTab] = React.useState('overview');
        const [currentDay, setCurrentDay] = React.useState(1);
        const [dailyEmotion, setDailyEmotion] = React.useState('');
        const [highlightMoment, setHighlightMoment] = React.useState('');
        const [moodRating, setMoodRating] = React.useState(5);
        const [energyLevel, setEnergyLevel] = React.useState(5);
        const [loading, setLoading] = React.useState(false);
        const [emotionLogs, setEmotionLogs] = React.useState([]);
        const chartRef = React.useRef(null);
        const chartInstance = React.useRef(null);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        React.useEffect(() => {
            if (user) {
                loadEmotionLogs();
            }
        }, [user]);

        const loadEmotionLogs = async () => {
            try {
                const logs = await trickleListObjects(`highlight_emotion:${user.phone}`, 21, true);
                setEmotionLogs(logs.items.map(item => item.objectData));
            } catch (error) {
                console.error('Failed to load emotion logs:', error);
            }
        };

        const saveEmotionEntry = async () => {
            if (!dailyEmotion.trim() || !highlightMoment.trim() || !user) return;
            
            setLoading(true);
            try {
                const entryData = {
                    userId: user.phone,
                    day: currentDay,
                    emotion: dailyEmotion,
                    highlightMoment: highlightMoment,
                    moodRating: moodRating,
                    energyLevel: energyLevel,
                    timestamp: new Date().toISOString(),
                    type: 'highlight_emotion'
                };

                await trickleCreateObject(`highlight_emotion:${user.phone}`, entryData);
                setDailyEmotion('');
                setHighlightMoment('');
                setMoodRating(5);
                setEnergyLevel(5);
                loadEmotionLogs();
                alert(`Day ${currentDay} highlight moment saved successfully!`);
            } catch (error) {
                console.error('Failed to save emotion entry:', error);
                alert('Save failed, please try again');
            } finally {
                setLoading(false);
            }
        };

        const createProgressChart = () => {
            if (!chartRef.current || emotionLogs.length === 0) return;

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const sortedLogs = emotionLogs.sort((a, b) => a.day - b.day);
            const days = sortedLogs.map(log => `Day ${log.day}`);
            const moodData = sortedLogs.map(log => log.moodRating || 5);
            const energyData = sortedLogs.map(log => log.energyLevel || 5);

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [{
                        label: 'Highlight Mood',
                        data: moodData,
                        borderColor: 'rgb(147, 51, 234)',
                        backgroundColor: 'rgba(147, 51, 234, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'Positive Energy',
                        data: energyData,
                        borderColor: 'rgb(236, 72, 153)',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        };

        React.useEffect(() => {
            if (activeTab === 'progress' && emotionLogs.length > 0) {
                setTimeout(createProgressChart, 100);
            }
            return () => {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
            };
        }, [activeTab, emotionLogs]);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold gradient-text">21-Day Highlight Moments Tracking</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex space-x-4">
                                <button 
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-6 py-2 rounded-full transition-colors ${
                                        activeTab === 'overview' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    Overview
                                </button>
                                <button 
                                    onClick={() => setActiveTab('daily')}
                                    className={`px-6 py-2 rounded-full transition-colors ${
                                        activeTab === 'daily' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    Daily Record
                                </button>
                                <button 
                                    onClick={() => setActiveTab('progress')}
                                    className={`px-6 py-2 rounded-full transition-colors ${
                                        activeTab === 'progress' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    Progress
                                </button>
                            </div>
                        </div>

                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                                    <h3 className="text-2xl font-bold mb-4">Rewire Neural Networks Through Highlight Moments</h3>
                                    <p className="text-gray-700 mb-4">
                                        Through 21 days of self-emotion tracking and recording daily highlight moments, these positive experiences 
                                        will help you reshape your brain's neural connections, strengthen positive emotional pathways, and enhance overall mental health.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-white rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Days 1-7: Awareness</h4>
                                            <p className="text-sm text-gray-600">Start noticing positive moments in daily life</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Days 8-14: Deep Discovery</h4>
                                            <p className="text-sm text-gray-600">Explore emotional patterns behind highlight moments</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Days 15-21: Neural Rewiring</h4>
                                            <p className="text-sm text-gray-600">Strengthen positive pathways, form new habits</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'daily' && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <h3 className="text-xl font-semibold mb-4">Day {currentDay} Highlight Moments Journal</h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Day (1-21)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="21"
                                            value={currentDay || 1}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 1;
                                                setCurrentDay(Math.min(Math.max(value, 1), 21));
                                            }}
                                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Highlight Mood (1-10)
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={moodRating}
                                                onChange={(e) => setMoodRating(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                            <span className="text-sm text-gray-600">Current: {moodRating}/10</span>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Positive Energy (1-10)
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={energyLevel}
                                                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                            <span className="text-sm text-gray-600">Current: {energyLevel}/10</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Today's Emotional State
                                        </label>
                                        <textarea
                                            value={dailyEmotion}
                                            onChange={(e) => setDailyEmotion(e.target.value)}
                                            placeholder="Describe your overall emotional state and feelings today..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Today's Highlight Moment & Neural Rewiring
                                        </label>
                                        <textarea
                                            value={highlightMoment}
                                            onChange={(e) => setHighlightMoment(e.target.value)}
                                            placeholder="Record today's most celebratory moment and how it's rewiring your neural networks for positivity..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                            rows="4"
                                        />
                                    </div>
                                    <button
                                        onClick={saveEmotionEntry}
                                        disabled={loading || !dailyEmotion.trim() || !highlightMoment.trim()}
                                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50">
                                        {loading ? 'Saving...' : 'Save Highlight Journal'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'progress' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold">My 21-Day Highlight Moments Progress</h3>
                                
                                {emotionLogs.length > 0 && (
                                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                                        <h4 className="text-lg font-semibold mb-4">Neural Rewiring Progress Chart</h4>
                                        <canvas ref={chartRef} width="400" height="200"></canvas>
                                    </div>
                                )}
                                
                                <div className="grid gap-4">
                                    {Array.from({length: 21}, (_, i) => {
                                        const day = i + 1;
                                        const logEntry = emotionLogs.find(log => log.day === day);
                                        const hasEntry = !!logEntry;
                                        return (
                                            <div key={day} className={`p-4 rounded-lg border-2 ${
                                                hasEntry ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'
                                            }`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">Day {day}</span>
                                                    {hasEntry && (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                                                Mood: {logEntry.moodRating}/10
                                                            </span>
                                                            <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                                                                Energy: {logEntry.energyLevel}/10
                                                            </span>
                                                            <i data-lucide="star" className="w-5 h-5 text-purple-600"></i>
                                                        </div>
                                                    )}
                                                </div>
                                                {hasEntry && (
                                                    <div className="text-sm text-gray-600">
                                                        <p><strong>Highlight Moment:</strong> {logEntry.highlightMoment?.slice(0, 120)}...</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
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
        console.error('EmotionTrackingPage component error:', error);
        reportError(error);
    }
}
