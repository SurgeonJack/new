function BenefitsList({ onBenefitClick }) {
    try {
        const benefits = [
            {
                id: 'sports',
                icon: 'activity',
                title: 'Movement rhythm',
                description: 'Reshape your work status with sports and social networking'
            },
            {
                id: 'career',
                icon: 'trending-up',
                title: 'Career Rhythm',
                description: 'Regaining life satisfaction through career achievement'
            },
            {
                id: 'emotion',
                icon: 'heart',
                title: 'Nutritional rhythm',
                description: 'Reshape your nutritional rhythm with a high-quality lifestyle'
            },
            {
                id: 'sleep',
                icon: 'moon',
                title: 'Sleep Rhythm',
                description: 'Maintaining a healthy body with sleep rhythm'
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        return (
            <section data-name="benefits-list" data-file="components/BenefitsList.js" 
                     className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="mb-12">
                            <h1 className="surgeon-jack-title mb-4 gradient-text">
                                Accessibility（future）≠ ∅
                            </h1>
                            <div className="text-center mb-8 px-4">
                                <div className="max-w-4xl mx-auto space-y-3">
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                        <span className="font-semibold">In the industrial age:</span> Value = Scarcity of supply
                                    </p>
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                        <span className="font-semibold">In the information age:</span> Value = Scarcity of attention
                                    </p>
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                        <span className="font-semibold">In the AI-accelerated era:</span> Value = Accessibility density
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 max-w-3xl mx-auto" style={{ marginTop: '-1cm' }}>
                                <p className="text-xl font-semibold mt-0 mb-4" style={{
                                    background: 'linear-gradient(90deg, #dc2626 0%, #f59e0b 50%, #8b5cf6 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    Get your first life meaning test for free.
                                </p>
                                <a 
                                    href="https://www.aiaging001.com" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors mb-4">
                                    🧠 Start Your EMR Rhythm Test
                                </a>
                                <p className="text-3xl mb-3 font-bold" style={{
                                    background: 'linear-gradient(90deg, #dc2626 0%, #f59e0b 50%, #8b5cf6 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    🌊 Rhythm flows where Accessibility aligns.
                                </p>
                                <p className="text-base text-gray-600 mb-4">
                                    EMR (Emotional Metabolic Rate) = the metabolic efficiency of your emotional system.
                                </p>
                                <p className="text-2xl font-bold mt-4" style={{
                                    background: 'linear-gradient(90deg, #dc2626 0%, #f59e0b 50%, #8b5cf6 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    EMR redefines how you interact with the world.
                                </p>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{
                                background: 'linear-gradient(90deg, #dc2626 0%, #facc15 50%, #2563eb 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                SURGEON JACK
                            </h2>
                            <div className="text-2xl md:text-4xl font-bold leading-relaxed">
                                <span className="block mb-3" style={{
                                    background: 'linear-gradient(90deg, #dc2626 0%, #facc15 50%, #2563eb 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Accessibility of Life Training Camp</span>
                                <span className="block text-yellow-600 ml-12">Global Ecological Cooperation Program</span>
                            </div>
                            <div className="mt-6 mb-8 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-3 rounded-full inline-block font-bold text-lg shadow-lg ml-8">
                                First 100 registered users get immediate Ecological Cooperation Opportunities
                            </div>
                        </div>
                        
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 max-w-2xl mx-auto mb-12" style={{ marginTop: '-1.5cm' }}>
                            <div className="flex flex-col items-center">
                                <img 
                                    src="https://app.trickle.so/storage/public/images/usr_0ead469e10000001/ac9ec6a8-dbf8-4676-b901-cfb74cb43ca8.jpeg" 
                                    alt="WeChat QR Code" 
                                    className="w-40 h-40 object-contain mb-4"
                                />
                                <div className="text-gray-600 text-sm mb-2 text-center">
                                    <p className="mb-1">Or send email to:</p>
                                    <p className="mb-1">aiaging001@gmail.com (Recipient: Surgeon Jack)</p>
                                    <p className="text-xs bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent font-bold">Confirm ecological cooperation number with Surgeon Jack</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
                        Finding Your Life Accessibility
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-700">
                        Start the energy flywheel that reinforces your work and life through the four major rhythms
                    </h3>
                    
                    <div className="flex justify-center mb-16">
                        <img 
                            src="https://app.trickle.so/storage/public/images/usr_0ead469e10000001/51df1ce6-c0c6-45da-a8ba-d418fae1b837.png?w=1794&h=1754" 
                            alt="Work-Life Flywheel" 
                            className="w-full max-w-md h-auto rounded-2xl shadow-lg"
                        />
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} 
                                 className="benefit-card rounded-2xl p-8 text-center"
                                 onClick={() => onBenefitClick(benefit.id)}>
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i data-lucide={benefit.icon} className="w-8 h-8 text-purple-600"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('BenefitsList component error:', error);
        reportError(error);
    }
}
