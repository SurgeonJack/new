function HeroSection({ onStartJourney, onLearnMore }) {
    try {
        const handleFindRhythm = () => {
            if (typeof window.EMRPanel !== 'undefined' && window.EMRPanel.open) {
                window.EMRPanel.open();
            } else {
                onStartJourney();
            }
        };

        return (
            <section data-name="hero-section" data-file="components/HeroSection.js" 
                     className="hero-background relative min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="glass-effect rounded-3xl p-12 mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Rhythm healing
                        </h1>
                        <p className="text-xl text-white mb-8 opacity-90">
                            It is not meditation, not inspirational quotes, and not psychological counseling—it focuses on adapting to world operators, breaking cycles, using brand power to build an individual's future accessibility.
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                            <button 
                                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all transform hover:scale-105"
                                onClick={handleFindRhythm}>
                                Rebuild your confidence
                            </button>
                            <button 
                                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all"
                                onClick={onLearnMore}>
                                Learn More
                            </button>
                        </div>
                        
                        <div className="text-right mt-6">
                            <p className="text-white text-sm md:text-base italic opacity-80">
                                "A New Psychology Adapted to Musk's Interstellar Civilization"
                            </p>
                            <p className="text-white text-xs md:text-sm font-semibold mt-1 opacity-90">
                                ——SURGEON JACK
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('HeroSection component error:', error);
    }
}