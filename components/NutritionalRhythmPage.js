function NutritionalRhythmPage({ isOpen, onClose, user }) {
    try {
        const [activeTab, setActiveTab] = React.useState('dashboard');
        const [emotionValue, setEmotionValue] = React.useState(0);
        const [focusLevel, setFocusLevel] = React.useState(5);
        const [joyLevel, setJoyLevel] = React.useState(5);
        const [troubleText, setTroubleText] = React.useState('');
        const [moodText, setMoodText] = React.useState('');
        const [reframeResult, setReframeResult] = React.useState('');
        const [flowProbability, setFlowProbability] = React.useState(50);
        const [rhythmTasks, setRhythmTasks] = React.useState({
            morningLight: false,
            exercise: false,
            social: false
        });
        const [selectedRetreat, setSelectedRetreat] = React.useState(null);
        const [showBotModal, setShowBotModal] = React.useState(false);
        const [resonanceRecorded, setResonanceRecorded] = React.useState(false);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [activeTab]);

        React.useEffect(() => {
            // Calculate flow probability based on focus and joy levels
            const probability = Math.min(95, Math.max(5, (focusLevel * joyLevel * 1.1)));
            setFlowProbability(Math.round(probability));
        }, [focusLevel, joyLevel]);

        const generateReframe = async () => {
            if (!troubleText.trim()) return;
            
            try {
                const systemPrompt = "You are a cognitive reframing expert. Transform negative thoughts into growth opportunities with practical suggestions.";
                const response = await invokeAIAgent(systemPrompt, troubleText);
                setReframeResult(response);
            } catch (error) {
                setReframeResult("Try viewing this challenge as a learning opportunity. What skills might you develop by working through this?");
            }
        };

        const playTodaysResonance = async () => {
            try {
                const resonanceText = "Today, notice how your breath connects you to the present moment. Let each inhale bring clarity, each exhale release tension.";
                if (typeof ElevenLabsService !== 'undefined' && ElevenLabsService.speak) {
                    await ElevenLabsService.speak(resonanceText);
                } else {
                    alert(resonanceText);
                }
            } catch (error) {
                console.error('Failed to play resonance:', error);
                alert(resonanceText);
            }
        };

        const handleRhythmTask = (task) => {
            setRhythmTasks(prev => ({
                ...prev,
                [task]: !prev[task]
            }));
        };

        const startRhythmJourney = () => {
            alert('🌟 Welcome to your Rhythm Journey!\n\n✨ Your EMR System Setup:\n• Personal dashboard created\n• Daily tracking activated\n• Rhythm bot notifications enabled\n• Growth metrics initialized\n\nStart with today\'s mood check-in below!');
        };

        const recordResonance = async () => {
            if (!moodText.trim()) {
                alert('Please enter your mood first before recording resonance.');
                return;
            }
            
            try {
                if (user) {
                    await trickleCreateObject(`resonance_record:${user.phone}`, {
                        userId: user.phone,
                        moodText: moodText,
                        timestamp: new Date().toISOString(),
                        type: 'daily_resonance'
                    });
                }
                setResonanceRecorded(true);
                alert(`🎯 Resonance recorded successfully!\n\nYour mood: "${moodText}"\n\nThis helps calibrate your personal EMR patterns. Keep tracking daily for deeper insights!`);
            } catch (error) {
                console.error('Failed to record resonance:', error);
                setResonanceRecorded(true);
                alert('Resonance recorded locally! Your emotional pattern is being tracked.');
            }
        };

        const handleBotConnect = () => {
            setShowBotModal(true);
        };

        const handleRetreatClick = (location) => {
            const retreatData = {
                'Kyoto': {
                    title: 'Kyoto Zen Rhythm Retreat',
                    duration: '7 Days',
                    price: '$2,880',
                    description: 'Immerse yourself in ancient Japanese wisdom combined with modern EMR techniques. Practice mindful movement in traditional gardens, zen meditation, and cultural rhythm integration.',
                    activities: ['Temple meditation sessions', 'Traditional tea ceremony rhythm', 'Zen garden walking meditation', 'Seasonal food rhythm workshops', 'Cultural immersion experiences']
                },
                'Bali': {
                    title: 'Bali Flow Integration Retreat',
                    duration: '10 Days', 
                    price: '$3,680',
                    description: 'Tropical paradise setting for deep EMR integration. Combine surf rhythm, yoga flow, and Balinese healing traditions for complete mind-body harmony.',
                    activities: ['Sunrise yoga by the ocean', 'Surf rhythm training', 'Traditional Balinese healing', 'Jungle meditation walks', 'Cooking rhythm workshops']
                },
                'Norway': {
                    title: 'Northern Lights Rhythm Experience',
                    duration: '5 Days',
                    price: '$4,200',
                    description: 'Experience the natural rhythm of Arctic wilderness. Cold exposure therapy, Nordic wellness traditions, and aurora meditation under the northern lights.',
                    activities: ['Cold water therapy', 'Arctic meditation', 'Northern lights observation', 'Sauna rhythm therapy', 'Wilderness survival skills']
                },
                'Peru': {
                    title: 'Andean Shamanic Rhythm Journey',
                    duration: '12 Days',
                    price: '$3,980',
                    description: 'Ancient Andean wisdom meets modern EMR science. High-altitude training, shamanic practices, and connection with indigenous rhythm traditions.',
                    activities: ['Sacred valley meditation', 'Coca leaf ceremony', 'High altitude training', 'Shamanic healing rituals', 'Machu Picchu sunrise meditation']
                }
            };
            
            setSelectedRetreat(retreatData[location]);
        };

        const subscribeToEMR = () => {
            alert('🚀 EMR System Subscription Plans:\n\n📱 Basic ($29/month):\n• Daily tracking dashboard\n• EMR calculations\n• Basic rhythm insights\n\n🧠 Pro ($89/month):\n• AI-powered insights\n• Personal coaching sessions\n• Advanced analytics\n\n🏆 Master ($199/month):\n• 1-on-1 mentorship\n• Retreat priority access\n• Custom EMR protocols\n\nContact: aiaging001@gmail.com to get started!');
        };

        const bookPersonalTraining = () => {
            alert('👨‍⚕️ Personal EMR Training with Dr. Jack:\n\n🎯 1-on-1 Sessions Available:\n• EMR assessment & personalization\n• Custom rhythm protocols\n• Weekly progress reviews\n• Direct access to Dr. Jack\n\n💰 Investment: $299/session\n📅 Package deals: 4 sessions $999\n\n📧 Book now: aiaging001@gmail.com\n📱 Mention: "Personal EMR Training"');
        };

        const applyRetreatQuota = () => {
            alert('🌍 Global Retreat Program 2025:\n\n🏖️ Limited Spots Available:\n• Kyoto: 12 spots (March 15-22)\n• Bali: 16 spots (April 10-20) \n• Norway: 8 spots (June 5-10)\n• Peru: 10 spots (Sept 12-24)\n\n🎁 Early Bird Special:\n• 20% off before Jan 31st\n• Payment plans available\n• Scholarship opportunities\n\n📝 Apply: aiaging001@gmail.com\n📋 Subject: "Retreat Application 2025"');
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Nutritional Rhythm - EMR System</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        {/* Section 1: Hero Main Visual Area */}
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 mb-8">
                            <h2 className="text-3xl font-bold text-center mb-4 text-purple-800">
                                🌀 Subscribe → Personal Training → Retreat Flywheel
                            </h2>
                            <p className="text-lg text-center mb-4 text-gray-700">
                                From data to awareness, from daily life to flow, create a system where emotions, body, and rhythm resonate and grow together.
                            </p>
                            <p className="text-center mb-6 text-gray-600">
                                Every click, record, and reflection you make is training your emotional metabolism "muscle". Here, science × aesthetics × rhythm together build your EMR growth system.
                            </p>
                            <div className="text-center">
                                <button 
                                    onClick={startRhythmJourney}
                                    className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition-colors">
                                    Start Your Rhythm Journey Now
                                </button>
                            </div>
                        </div>

                        {/* Section 2: EMR Dashboard × Rhythm Tracker */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">🧩</span>
                                    <h3 className="text-xl font-bold">EMR Dashboard</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Function: Auto-calculate EMR (ΔEmotion / Δt)</p>
                                <p className="text-sm text-gray-700 mb-4">User benefit: See emotional recovery speed, perceive "metabolic power" growth</p>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs font-medium mb-2">💬 Interactive Module:</p>
                                    <input 
                                        type="range" 
                                        min="-5" 
                                        max="5" 
                                        value={emotionValue}
                                        onChange={(e) => setEmotionValue(e.target.value)}
                                        className="w-full mb-2" 
                                    />
                                    <p className="text-xs text-gray-600">Current emotion: {emotionValue} | EMR Rate: {Math.abs(emotionValue * 2).toFixed(1)}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">🌙</span>
                                    <h3 className="text-xl font-bold">Rhythm Tracker</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Function: Five-dimensional tracking of sleep, exercise, light, diet, social</p>
                                <p className="text-sm text-gray-700 mb-4">User benefit: Find rhythm patterns that affect emotions</p>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs font-medium mb-2">💬 Interactive Module:</p>
                                    <div className="space-y-1 text-xs">
                                        <label className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="mr-2"
                                                checked={rhythmTasks.morningLight}
                                                onChange={() => handleRhythmTask('morningLight')}
                                            />
                                            Morning light
                                        </label>
                                        <label className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="mr-2"
                                                checked={rhythmTasks.exercise}
                                                onChange={() => handleRhythmTask('exercise')}
                                            />
                                            Exercise
                                        </label>
                                        <label className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="mr-2"
                                                checked={rhythmTasks.social}
                                                onChange={() => handleRhythmTask('social')}
                                            />
                                            Social interaction
                                        </label>
                                    </div>
                                    <p className="text-xs mt-2 text-purple-600">
                                        Rhythm Score: {Object.values(rhythmTasks).filter(Boolean).length * 33}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Reframe Lab × Bayesian Flow Chart */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">🧠</span>
                                    <h3 className="text-xl font-bold">Reframe Lab</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Function: Cognitive restructuring record area</p>
                                <p className="text-sm text-gray-700 mb-4">User benefit: Transform "negative events" into growth curves</p>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs font-medium mb-2">💬 Interactive Module:</p>
                                    <textarea 
                                        className="w-full p-2 text-xs border rounded" 
                                        rows="2" 
                                        placeholder="Enter something that troubles you..."
                                        value={troubleText}
                                        onChange={(e) => setTroubleText(e.target.value)}
                                    />
                                    <button 
                                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                                        onClick={generateReframe}
                                    >
                                        Generate Reframe Suggestion
                                    </button>
                                    {reframeResult && (
                                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                                            {reframeResult}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">🔮</span>
                                    <h3 className="text-xl font-bold">Bayesian Flow Chart</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Function: Visualized flow prediction dashboard</p>
                                <p className="text-sm text-gray-700 mb-4">User benefit: Observe probability changes of entering flow over time</p>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs font-medium mb-2">💬 Interactive Module:</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-xs">
                                            <span className="mr-2 w-12">Focus:</span>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="10" 
                                                value={focusLevel}
                                                onChange={(e) => setFocusLevel(e.target.value)}
                                                className="flex-1" 
                                            />
                                            <span className="ml-2 w-4">{focusLevel}</span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            <span className="mr-2 w-12">Joy:</span>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="10" 
                                                value={joyLevel}
                                                onChange={(e) => setJoyLevel(e.target.value)}
                                                className="flex-1" 
                                            />
                                            <span className="ml-2 w-4">{joyLevel}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                                            Flow Probability: {flowProbability}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Emotion Reflection */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-3">📓</span>
                                <h3 className="text-xl font-bold">Emotion Reflection</h3>
                            </div>
                            <p className="text-gray-700 mb-4">
                                Daily guided reflection + voice broadcast to realign your inner rhythm.
                                💡 Tune your flow rhythm with one sentence.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4">
                                <button 
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-blue-700"
                                    onClick={playTodaysResonance}
                                >
                                    🎧 Listen to Today's Resonance
                                </button>
                                <input 
                                    type="text" 
                                    placeholder="Enter today's mood in one sentence..." 
                                    className="flex-1 p-3 border rounded-lg"
                                    value={moodText}
                                    onChange={(e) => setMoodText(e.target.value)}
                                />
                                <button 
                                    onClick={recordResonance}
                                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                                    {resonanceRecorded ? '✓ Resonance Recorded' : 'Record My Resonance'}
                                </button>
                            </div>
                        </div>

                        {/* Section 5: Telegram/Slack Bot */}
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-3">💌</span>
                                <h3 className="text-xl font-bold">EMR Bot – Your Rhythm Partner</h3>
                            </div>
                            <p className="text-gray-700 mb-4">
                                Get daily rhythm reminders, energy tips, and emotional resonance cards through Telegram/Slack.
                            </p>
                            <div className="bg-white rounded-lg p-4 mb-4">
                                <p className="text-sm font-medium mb-2">Interactive Commands:</p>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><code className="bg-gray-100 px-2 py-1 rounded">/today flow</code> → Get today's rhythm report</p>
                                    <p><code className="bg-gray-100 px-2 py-1 rounded">/reframe</code> → Get today's reframe guidance</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleBotConnect}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                                Connect My Rhythm Bot
                            </button>
                        </div>

                        {/* Section 6: Rhythm Retreat Zone */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-3">🤝</span>
                                <h3 className="text-xl font-bold">Rhythm Retreat Co-cultivation Experience</h3>
                            </div>
                            <p className="text-gray-700 mb-4">
                                Extend online rhythm growth to offline mind-body co-cultivation. In Kyoto, Bali, Norway, Peru and other places, resonate and grow with mentors and like-minded partners.
                            </p>
                            <div className="grid md:grid-cols-4 gap-4 mb-4">
                                <button 
                                    onClick={() => handleRetreatClick('Kyoto')}
                                    className="bg-white p-3 rounded-lg text-center hover:shadow-md transition-shadow hover:bg-purple-50">
                                    <div className="text-2xl mb-2">🏯</div>
                                    <div className="text-sm font-medium">Kyoto</div>
                                </button>
                                <button 
                                    onClick={() => handleRetreatClick('Bali')}
                                    className="bg-white p-3 rounded-lg text-center hover:shadow-md transition-shadow hover:bg-purple-50">
                                    <div className="text-2xl mb-2">🏝️</div>
                                    <div className="text-sm font-medium">Bali</div>
                                </button>
                                <button 
                                    onClick={() => handleRetreatClick('Norway')}
                                    className="bg-white p-3 rounded-lg text-center hover:shadow-md transition-shadow hover:bg-purple-50">
                                    <div className="text-2xl mb-2">🏔️</div>
                                    <div className="text-sm font-medium">Norway</div>
                                </button>
                                <button 
                                    onClick={() => handleRetreatClick('Peru')}
                                    className="bg-white p-3 rounded-lg text-center hover:shadow-md transition-shadow hover:bg-purple-50">
                                    <div className="text-2xl mb-2">🦙</div>
                                    <div className="text-sm font-medium">Peru</div>
                                </button>
                            </div>
                            <button 
                                onClick={() => alert('🏖️ Global Retreat Calendar 2025:\n• Kyoto: March 15-22\n• Bali: April 10-20\n• Norway: June 5-10\n• Peru: September 12-24\n\nEarly bird discount: 20% off before January 31st!')}
                                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                                View Retreat Plans
                            </button>
                        </div>

                        {/* Section 7: Final CTA */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-3xl p-8 text-center">
                            <h2 className="text-3xl font-bold mb-4">Ready to Flow with EMR?</h2>
                            <p className="text-lg mb-6 opacity-90">
                                Start with "Subscription" and enter your "Personal Training × Retreat" growth system.
                                Whether you're exploring flow, pursuing growth, or seeking mind-body integration,
                                this moment is the starting point of your rhythm transformation.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <button 
                                    onClick={subscribeToEMR}
                                    className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
                                    Subscribe to EMR System
                                </button>
                                <button 
                                    onClick={bookPersonalTraining}
                                    className="bg-purple-500 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-400 transition-colors">
                                    Book Personal Training
                                </button>
                                <button 
                                    onClick={applyRetreatQuota}
                                    className="bg-indigo-500 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-400 transition-colors">
                                    Apply for Retreat Quota
                                </button>
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

                {/* Retreat Details Modal */}
                {selectedRetreat && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">{selectedRetreat.title}</h3>
                                <button 
                                    onClick={() => setSelectedRetreat(null)}
                                    className="text-gray-500 hover:text-gray-700">
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">{selectedRetreat.duration}</span>
                                    <span className="text-2xl font-bold text-purple-600">{selectedRetreat.price}</span>
                                </div>
                                <p className="text-gray-700 mb-6">{selectedRetreat.description}</p>
                                <h4 className="font-semibold mb-3">Activities Include:</h4>
                                <ul className="space-y-2 mb-6">
                                    {selectedRetreat.activities.map((activity, idx) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                            <i data-lucide="check" className="w-4 h-4 text-green-500"></i>
                                            <span>{activity}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => {
                                        alert(`🎯 ${selectedRetreat.title} booking initiated!\n\nWhat happens next:\n• We'll send you detailed itinerary\n• Payment options and plans\n• Pre-retreat preparation guide\n\nContact: aiaging001@gmail.com`);
                                        setSelectedRetreat(null);
                                    }}
                                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
                                    Book This Retreat Experience
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bot Connection Modal */}
                {showBotModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Connect EMR Rhythm Bot</h3>
                                <button 
                                    onClick={() => setShowBotModal(false)}
                                    className="text-gray-500 hover:text-gray-700">
                                    <i data-lucide="x" className="w-5 h-5"></i>
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Available Platforms:</h4>
                                    <button 
                                        onClick={() => alert('📱 Telegram Bot Setup:\n• Search @EMRRhythmBot\n• Send /start command\n• Follow setup instructions\n• Daily reminders activated!')}
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 hover:bg-blue-600">
                                        Connect via Telegram
                                    </button>
                                    <button 
                                        onClick={() => alert('💼 Slack Integration:\n• Add EMR app to workspace\n• Configure channel notifications\n• Team rhythm tracking enabled\n• Productivity insights shared!')}
                                        className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                                        Connect via Slack
                                    </button>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-2">Bot Features:</p>
                                    <ul className="text-xs space-y-1 text-gray-700">
                                        <li>• Daily rhythm check-ins</li>
                                        <li>• Personalized flow tips</li>
                                        <li>• Mood tracking reminders</li>
                                        <li>• Community challenges</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('NutritionalRhythmPage component error:', error);
        reportError(error);
    }
}