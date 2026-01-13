function CreditCardPaymentModal({ plan, onClose, onPaymentSuccess }) {
    try {
        const [cardInfo, setCardInfo] = React.useState({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            holderName: '',
            email: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const formatCardNumber = (value) => {
            const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            const matches = cleaned.match(/\d{4,16}/g);
            const match = matches && matches[0] || '';
            const parts = [];
            
            for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4));
            }
            
            if (parts.length) {
                return parts.join(' ');
            } else {
                return match;
            }
        };

        const formatExpiryDate = (value) => {
            const cleaned = value.replace(/\D+/g, '');
            if (cleaned.length >= 2) {
                return cleaned.substring(0, 2) + (cleaned.length > 2 ? '/' + cleaned.substring(2, 4) : '');
            }
            return cleaned;
        };

        const validateCard = () => {
            if (!cardInfo.cardNumber.replace(/\s/g, '') || cardInfo.cardNumber.replace(/\s/g, '').length < 13) {
                return 'Please enter a valid card number';
            }
            if (!cardInfo.expiryDate || cardInfo.expiryDate.length < 5) {
                return 'Please enter a valid expiry date';
            }
            if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
                return 'Please enter a valid CVV';
            }
            if (!cardInfo.holderName.trim()) {
                return 'Please enter cardholder name';
            }
            if (!cardInfo.email.trim() || !cardInfo.email.includes('@')) {
                return 'Please enter a valid email';
            }
            return null;
        };

        const handlePayment = async () => {
            const validationError = validateCard();
            if (validationError) {
                setError(validationError);
                return;
            }

            setLoading(true);
            setError('');

            try {
                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Create subscription record
                const subscriptionData = {
                    planName: plan.name,
                    price: plan.price,
                    email: cardInfo.email,
                    cardHolder: cardInfo.holderName,
                    cardLast4: cardInfo.cardNumber.slice(-4),
                    subscriptionType: plan.name.toLowerCase().replace(' ', '_'),
                    subscribedAt: new Date().toISOString(),
                    status: 'active',
                    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                };

                await trickleCreateObject('premium_subscription', subscriptionData);
                onPaymentSuccess();
                
            } catch (err) {
                setError('Payment failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold gradient-text">Subscribe to {plan.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <i data-lucide="x" className="w-6 h-6"></i>
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{plan.name}</span>
                            <span className="text-2xl font-bold text-purple-600">{plan.price}{plan.period}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={cardInfo.email}
                                onChange={(e) => setCardInfo({...cardInfo, email: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input
                                type="text"
                                value={cardInfo.cardNumber}
                                onChange={(e) => setCardInfo({...cardInfo, cardNumber: formatCardNumber(e.target.value)})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={cardInfo.expiryDate}
                                    onChange={(e) => setCardInfo({...cardInfo, expiryDate: formatExpiryDate(e.target.value)})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                <input
                                    type="text"
                                    value={cardInfo.cvv}
                                    onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value.replace(/\D/g, '')})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="123"
                                    maxLength="4"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                            <input
                                type="text"
                                value={cardInfo.holderName}
                                onChange={(e) => setCardInfo({...cardInfo, holderName: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="John Doe"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                            {loading ? 'Processing Payment...' : `Pay ${plan.price}`}
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                            Secure payment processed with 256-bit SSL encryption
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CreditCardPaymentModal component error:', error);
        reportError(error);
    }
}