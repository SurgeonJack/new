function LearnMorePage({ isOpen, onClose }) {
    try {
        const sections = [
            {
                title: 'Founder Dr. Jack',
                content: 'Dr. Jack is a surgeon at a top-tier hospital in China (left in photo), once featured in European newspapers as China\'s most innovative surgeon. Dr. Jack combines medical expertise with flow science to create the JEC platform, dedicated to helping people achieve better mental health through scientific methods.',
                image: 'https://app.trickle.so/storage/public/images/usr_0ead469e10000001/4c2155be-c8c5-4826-9546-54c27c1a9b10.jpeg'
            },
            {
                title: 'Flow Theory',
                content: 'Flow theory was proposed by psychologist Mihaly Csikszentmihalyi, describing a mental state of complete immersion in activities. JEC platform combines this theory with modern neuroscience to develop unique training methods.',
                image: 'https://app.trickle.so/storage/public/images/usr_0ead469e10000001/128c7ad2-860e-4052-81fa-3eb2b37e7782.jpeg'
            },
            {
                title: 'Neuroscience Research',
                content: 'Latest neuroimaging research shows that during flow states, prefrontal cortex activity decreases, entering "transient hypofrontality" - this is the scientific foundation of JEC training methods.',
                image: 'https://app.trickle.so/storage/public/images/usr_0ead469e10000001/57b3f01e-7b24-4a2d-a919-9f0b3e9c75a4.jpeg'
            }
        ];

        const comparisonData = [
            {
                category: 'Core Logic',
                meditation: 'Static audio guidance',
                emr: 'Dynamic rhythm tracking with neuroscience × metabolic principles'
            },
            {
                category: 'Key Metrics',
                meditation: 'Meditation duration & daily check-ins',
                emr: 'ΔEmotion/Δt (Emotional Metabolism Rate), Recovery curves, Metabolic acceleration'
            },
            {
                category: 'Data Tracking',
                meditation: 'Basic time logs',
                emr: 'Real-time data tracking + visualization charts forming growth evidence'
            },
            {
                category: 'Personalization',
                meditation: 'Generic content library scripts',
                emr: 'Combined with Notion templates for personalized experience'
            },
            {
                category: 'Application Scenarios',
                meditation: 'Limited to bedtime, relaxation, focus practice',
                emr: 'Workplace, parenting, sports recovery, decision optimization - multi-scenario integration'
            },
            {
                category: 'User Engagement',
                meditation: 'Subscription content based, high churn, no identity',
                emr: 'Social currency system with identity building and community stickiness'
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Learn More</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl overflow-hidden">
                                    <div className="md:flex">
                                        <img 
                                            src={section.image} 
                                            alt={section.title} 
                                            className="w-full md:w-1/3 h-48 md:h-auto object-contain"
                                        />
                                        <div className="p-6 md:w-2/3">
                                            <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                                            <p className="text-gray-700 leading-relaxed">{section.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* EMR vs Meditation Apps Comparison */}
                            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-semibold mb-6 text-center">EMR vs Traditional Meditation Apps</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Aspect</th>
                                                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-orange-600">Traditional Meditation Apps</th>
                                                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">EMR (JEC Platform)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparisonData.map((row, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row.category}</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">{row.meditation}</td>
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 font-medium bg-green-50">{row.emr}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <strong>Key Innovation:</strong> EMR treats emotions as trackable metabolic processes, using neuroscience principles to create 
                                        a dynamic, data-driven approach to emotional wellness that goes far beyond traditional static meditation practices.
                                    </p>
                                </div>
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
            </div>
        );
    } catch (error) {
        console.error('LearnMorePage component error:', error);
        reportError(error);
    }
}
