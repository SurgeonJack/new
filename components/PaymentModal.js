function PaymentModal({ isOpen, onClose, order, onPaymentSuccess }) {
    try {
        const [paymentMethod, setPaymentMethod] = React.useState('wechat');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [cardInfo, setCardInfo] = React.useState({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            holderName: ''
        });

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const handlePayment = async () => {
            setLoading(true);
            setError('');

            try {
                let result;
                switch (paymentMethod) {
                    case 'wechat':
                        result = await PaymentService.wechatPay(order);
                        break;
                    case 'alipay':
                        result = await PaymentService.alipay(order);
                        break;
                    case 'bankcard':
                        result = await PaymentService.bankCardPay(order, cardInfo);
                        break;
                    default:
                        throw new Error('Unsupported payment method');
                }

                if (result.success) {
                    await OrderService.updateOrderStatus(order.orderNumber, 'paid');
                    onPaymentSuccess && onPaymentSuccess(result);
                    onClose();
                }
            } catch (err) {
                setError(err.message || 'Payment failed, please try again');
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen || !order) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold gradient-text">Choose Payment Method</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <i data-lucide="x" className="w-6 h-6"></i>
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold mb-2">{order.productName}</h3>
                        <p className="text-sm text-gray-600">Order Number: {order.orderNumber}</p>
                        <p className="text-xl font-bold text-purple-600 mt-2">${order.totalAmount}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="wechat"
                                    checked={paymentMethod === 'wechat'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-purple-600"
                                />
                                <span className="flex items-center space-x-2">
                                    <i data-lucide="smartphone" className="w-5 h-5 text-green-600"></i>
                                    <span>WeChat Pay</span>
                                </span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="alipay"
                                    checked={paymentMethod === 'alipay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-purple-600"
                                />
                                <span className="flex items-center space-x-2">
                                    <i data-lucide="zap" className="w-5 h-5 text-blue-600"></i>
                                    <span>Alipay</span>
                                </span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bankcard"
                                    checked={paymentMethod === 'bankcard'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-purple-600"
                                />
                                <span className="flex items-center space-x-2">
                                    <i data-lucide="credit-card" className="w-5 h-5 text-purple-600"></i>
                                    <span>Bank Card</span>
                                </span>
                            </label>
                        </div>

                        {paymentMethod === 'bankcard' && (
                            <div className="space-y-3 mt-4 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    value={cardInfo.cardNumber}
                                    onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={cardInfo.expiryDate}
                                        onChange={(e) => setCardInfo({...cardInfo, expiryDate: e.target.value})}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        value={cardInfo.cvv}
                                        onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cardholder Name"
                                    value={cardInfo.holderName}
                                    onChange={(e) => setCardInfo({...cardInfo, holderName: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center mb-4">{error}</div>
                    )}

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                        {loading ? 'Processing Payment...' : `Pay $${order.totalAmount}`}
                    </button>

                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PaymentModal component error:', error);
        reportError(error);
    }
}
