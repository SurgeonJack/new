function RitualMeditationPage({ isOpen, onClose, user, onOrder }) {
    try {
        const [activeTab, setActiveTab] = React.useState('rituals');

        const ritualTypes = [
            {
                title: 'Morning Rhythm Ritual',
                time: '8:00 AM',
                description: 'Start your day with intention and clarity',
                icon: 'sunrise',
                steps: ['Deep breathing for 5 minutes', 'Set daily intentions', 'Gratitude practice', 'Energy activation']
            },
            {
                title: 'Midday Reset Ritual', 
                time: '12:00 PM',
                description: 'Recharge and refocus your energy',
                icon: 'sun',
                steps: ['Mindful eating', 'Progress reflection', 'Energy check-in', 'Afternoon planning']
            },
            {
                title: 'Evening Flow Ritual',
                time: '8:00 PM', 
                description: 'Wind down and prepare for rest',
                icon: 'sunset',
                steps: ['Day review practice', 'Relaxation breathing', 'Tomorrow preparation', 'Gratitude reflection']
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [activeTab]);

        const setupRitualReminder = async (ritual) => {
            if (!user) {
                alert('Please login to set up ritual reminders');
                return;
            }

            try {
                const reminder = {
                    userId: user.phone,
                    ritualName: ritual.title,
                    reminderTime: ritual.time,
                    isActive: true,
                    createdAt: new Date().toISOString()
                };

                await trickleCreateObject(`ritual_notification:${user.phone}`, reminder);
                alert(`Ritual reminder set for ${ritual.time}! You'll receive daily notifications.`);
            } catch (error) {
                console.error('Failed to setup reminder:', error);
                alert('Failed to setup reminder. Please try again.');
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold gradient-text">Ritual Meditation</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <AudioPlayer soundKey="ritual" />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            {ritualTypes.map((ritual, index) => (
                                <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                            <i data-lucide={ritual.icon} className="w-6 h-6 text-purple-600"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{ritual.title}</h3>
                                            <p className="text-sm text-purple-600 font-medium">{ritual.time}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{ritual.description}</p>
                                    <div className="space-y-2 mb-4">
                                        {ritual.steps.map((step, idx) => (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <span className="w-5 h-5 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center text-xs font-semibold">{idx + 1}</span>
                                                <span className="text-gray-700 text-xs">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => setupRitualReminder(ritual)}
                                        className="w-full bg-purple-600 text-white py-2 rounded-full text-sm hover:bg-purple-700 transition-colors">
                                        Set Reminder
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
        console.error('RitualMeditationPage component error:', error);
        reportError(error);
    }
}
