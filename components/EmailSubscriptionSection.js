function EmailSubscriptionSection() {
    try {
        const [email, setEmail] = React.useState('');
        const [subscribed, setSubscribed] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [showPaymentModal, setShowPaymentModal] = React.useState(false);
        const [selectedPlan, setSelectedPlan] = React.useState(null);
        const [showFreeEmailModal, setShowFreeEmailModal] = React.useState(false);
        const [freeUserEmail, setFreeUserEmail] = React.useState('');
        const [emailSubmitting, setEmailSubmitting] = React.useState(false);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const handleEmailSubscribe = async (e) => {
            e.preventDefault();
            setLoading(true);
            
            try {
                const subscriberData = {
                    email: email,
                    subscriptionType: 'free',
                    subscribedAt: new Date().toISOString(),
                    preferences: ['rhythm_calendar', 'action_cards']
                };

                await trickleCreateObject('email_subscriber', subscriberData);
                setSubscribed(true);
                setEmail('');
                alert('Successfully subscribed! You\'ll receive rhythm calendars and action cards.');
            } catch (error) {
                console.error('Subscription failed:', error);
                alert('Subscription failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleSubscription = (plan) => {
            if (plan.name === 'Rhythm Healing (Free)') {
                setShowFreeEmailModal(true);
            } else {
                setSelectedPlan(plan);
                setShowPaymentModal(true);
            }
        };

        const handleFreeEmailSubmit = async (e) => {
            e.preventDefault();
            if (!freeUserEmail.trim()) return;
            
            setEmailSubmitting(true);
            try {
                const subscriberData = {
                    email: freeUserEmail,
                    subscriptionType: 'free',
                    subscribedAt: new Date().toISOString(),
                    preferences: ['rhythm_calendar', 'action_cards', 'basic_templates']
                };

                await trickleCreateObject('email_subscriber', subscriberData);
                
                alert(`🎉 Welcome to JEC Rhythm Healing!\n\nWe've sent you:\n✉️ Personalized rhythm calendar template\n📋 Daily action cards guide\n🎯 Getting started resources\n\nCheck your email: ${freeUserEmail}\n\nStart your rhythm journey today!`);
                
                setShowFreeEmailModal(false);
                setFreeUserEmail('');
            } catch (error) {
                console.error('Free subscription failed:', error);
                alert('Subscription failed. Please try again.');
            } finally {
                setEmailSubmitting(false);
            }
        };

        const subscriptionPlans = [
            {
                name: 'Rhythm Healing (Free)',
                price: '$0',
                period: '/month',
                features: [
                    'Basic EMR dashboard access',
                    'Daily rhythm tracking',
                    'Community shared experiences',
                    'Weekly rhythm insights',
                    'Basic meditation audio library'
                ],
                buttonText: 'Get Started',
                popular: false
            },
            {
                name: 'Work-Life Flywheel (Pro)',
                price: '$29.9',
                period: '/month',
                features: [
                    'All Free features included',
                    'Advanced EMR analytics & charts',
                    'Personalized rhythm protocols',
                    'AI-powered EMR predictions',
                    'Work-Life Flywheel dashboard (Notion + Framer)',
                    'Weekly meaning insight reports',
                    'Group coaching + Flow Community Access',
                    'Priority access to new templates'
                ],
                buttonText: 'Subscribe Now',
                quote: 'Upgrade from effort to effortless alignment.',
                popular: true
            },
            {
                name: 'Life Meaning Assets (Master)',
                price: '$99.9',
                period: '/month',
                features: [
                    'All Pro features included',
                    '1-V-1 Sessions with Dr. Jack',
                    'Retreat priority booking',
                    'Advanced biometric integration',
                    'Exclusive Master Circle',
                    'Lifetime knowledge base access',
                    'Work rhythm transformation roadmap',
                    'Meaning Assets NFT Access Card'
                ],
                buttonText: 'Subscribe Now',
                quote: 'When your meaning field deepens, life starts flying itself.',
                popular: false,
                buttonColor: 'green'
            }
        ];

        return (
            <section data-name="email-subscription" data-file="components/EmailSubscriptionSection.js" 
                     className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Rebuild your confidence</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {subscriptionPlans.map((plan, index) => (
                            <div key={index} className={`bg-white rounded-2xl p-8 relative ${
                                plan.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
                            }`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                    <div className="text-3xl font-bold text-purple-600">
                                        {plan.price}<span className="text-lg text-gray-500">{plan.period}</span>
                                    </div>
                                    {plan.description && (
                                        <p className="text-sm text-gray-600 mt-3 italic">{plan.description}</p>
                                    )}
                                </div>
                                
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                            <i data-lucide="check" className="w-5 h-5 text-green-500"></i>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                {plan.quote && (
                                    <div className="mb-8 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                        <p className="text-sm text-purple-800 italic">"{plan.quote}"</p>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={() => handleSubscription(plan)}
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                        plan.popular 
                                            ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                            : plan.name === 'Rhythm Healing (Free)'
                                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                                            : plan.buttonColor === 'green'
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-700 font-medium mb-2">
                        © 2025 Surgeon Jack · EMR Rhythm Science
                    </p>
                    <p className="text-gray-600 text-sm">
                        A paradigm shift from "willpower-driven" to "meaning-driven" 🌍
                    </p>
                </footer>

                {showPaymentModal && selectedPlan && (
                    <CreditCardPaymentModal 
                        plan={selectedPlan}
                        onClose={() => setShowPaymentModal(false)}
                        onPaymentSuccess={() => {
                            setShowPaymentModal(false);
                            alert(`Successfully subscribed to ${selectedPlan.name}!`);
                        }}
                    />
                )}

                {showFreeEmailModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold gradient-text">Start Your Free Journey</h2>
                                <button 
                                    onClick={() => setShowFreeEmailModal(false)} 
                                    className="text-gray-500 hover:text-gray-700"
                                    type="button">
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                            </div>
                            
                            <p className="text-gray-700 mb-6">
                                Enter your email to receive your personalized rhythm calendar, action cards, and getting started guide.
                            </p>
                            
                            <form onSubmit={handleFreeEmailSubmit} className="space-y-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={freeUserEmail}
                                        onChange={(e) => setFreeUserEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={emailSubmitting}
                                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50">
                                    {emailSubmitting ? 'Sending...' : 'Get My Free Resources'}
                                </button>
                                
                                <p className="text-xs text-gray-500 text-center">
                                    By subscribing, you'll receive rhythm calendars, action cards, and wellness tips.
                                </p>
                            </form>
                            
                            <button 
                                onClick={() => setShowFreeEmailModal(false)}
                                type="button"
                                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                                <i data-lucide="arrow-left" className="w-4 h-4"></i>
                                <span>Back</span>
                            </button>
                        </div>
                    </div>
                )}
            </section>
        );
    } catch (error) {
        console.error('EmailSubscriptionSection component error:', error);
        reportError(error);
    }
}
