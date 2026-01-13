function ServicesPage({ isOpen, onClose, user, onOrder }) {
    try {
        const services = [
            {
                title: 'One-on-One Online Flow Guidance',
                price: '$128',
                description: 'Personalized guidance from experienced flow mentors',
                features: ['Professional flow assessment', 'Personalized training plan', 'Real-time feedback guidance', '7-day follow-up service'],
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Flow Group Workshop',
                price: '$398',
                description: '8-12 person small group deep experience',
                features: ['Group flow practice', 'Interactive sharing sessions', 'Professional mentor guidance', 'Ongoing community support'],
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Corporate Flow Training',
                price: '$2,688',
                description: 'Enhance team efficiency and creativity',
                features: ['Team flow building', 'Leadership enhancement', 'Innovation thinking training', 'Long-term effect tracking'],
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const handleOrder = (service) => {
            if (!user) {
                alert('Please login first to place an order');
                return;
            }
            onOrder && onOrder(service);
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Professional Services</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                            {services.map((service, index) => (
                                <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl overflow-hidden border-2 border-transparent hover:border-purple-200 transition-all">
                                    <img src={service.image} alt={service.title} className="w-full h-48 object-cover"/>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                        <p className="text-2xl font-bold text-purple-600 mb-2">{service.price}</p>
                                        <p className="text-gray-600 mb-4">{service.description}</p>
                                        
                                        <div className="mb-6">
                                            <h4 className="font-semibold mb-2">Service Content:</h4>
                                            <ul className="space-y-1">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center space-x-2">
                                                        <i data-lucide="check" className="w-4 h-4 text-green-500"></i>
                                                        <span className="text-gray-700 text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleOrder(service)}
                                            className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-colors font-semibold">
                                            {user ? 'Order Now' : 'Login to Order'}
                                        </button>
                                    </div>
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
        console.error('ServicesPage component error:', error);
        reportError(error);
    }
}
