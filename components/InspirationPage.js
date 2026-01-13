function InspirationPage({ isOpen, onClose }) {
    try {
        const [selectedScene, setSelectedScene] = React.useState(null);

        const globalRetreats = [
            {
                title: 'Bali Sunrise Meditation',
                location: 'Ubud, Bali',
                duration: '3 days',
                price: '$680',
                description: 'Sacred temple meditation with traditional Balinese healing',
                image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                title: 'Swiss Alps Flow Retreat',
                location: 'Zermatt, Switzerland',
                duration: '5 days',
                price: '$1,480',
                description: 'High altitude meditation with mountain energy healing',
                image: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                title: 'Maldives Ocean Flow',
                location: 'Maldives',
                duration: '4 days',
                price: '$1,280',
                description: 'Overwater meditation with dolphin energy connection',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                title: 'Sedona Vortex Experience',
                location: 'Arizona, USA',
                duration: '3 days',
                price: '$850',
                description: 'Energy vortex healing in red rock formations',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [selectedScene]);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold gradient-text">Find Inspiration</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <AudioPlayer soundKey="inspiration" />
                        </div>
                        
                        <div className="text-center mb-8">
                            <p className="text-lg text-gray-700 italic mb-2">"I am my own temple"</p>
                            <p className="text-lg text-gray-700 italic">"When I'm in a bad mood, it's the best opportunity to surpass myself"</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {globalRetreats.map((retreat, index) => (
                                <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl overflow-hidden">
                                    <img src={retreat.image} alt={retreat.title} className="w-full h-48 object-cover"/>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold mb-2">{retreat.title}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{retreat.location} • {retreat.duration}</p>
                                        <p className="text-sm text-gray-700 mb-3">{retreat.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-yellow-600">{retreat.price}</span>
                                            <button 
                                                onClick={() => setSelectedScene(retreat)}
                                                className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm hover:bg-yellow-700 transition-colors">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Exit</span>
                    </button>
                </div>

                {selectedScene && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">{selectedScene.title}</h3>
                                <button onClick={() => setSelectedScene(null)} className="text-gray-500 hover:text-gray-700">
                                    <i data-lucide="x" className="w-6 h-6"></i>
                                </button>
                            </div>
                                <p className="text-gray-700 mb-6 leading-relaxed">{selectedScene.description}</p>
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <p className="text-gray-700 mb-4">To learn more about JEC flow services, scan the WeChat Enterprise QR code to join the SURGEON JACK Meaning of Life Training Camp Global Ecological Cooperation Program.</p>
                                <div className="flex flex-col items-center">
                                    <img 
                                        src="https://app.trickle.so/storage/public/images/usr_0ead469e10000001/ac9ec6a8-dbf8-4676-b901-cfb74cb43ca8.jpeg" 
                                        alt="WeChat QR Code" 
                                        className="w-32 h-32 object-contain mb-2"
                                    />
                                    <div className="text-gray-600 text-sm mb-2 text-center">
                                        <p className="mb-1">Or send email to:</p>
                                        <p className="mb-1">aiaging001@gmail.com (Recipient: Surgeon Jack)</p>
                                        <p className="text-xs bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent font-bold">Confirm ecological cooperation number with Surgeon Jack</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('InspirationPage component error:', error);
        reportError(error);
    }
}
