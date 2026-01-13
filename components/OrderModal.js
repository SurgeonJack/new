function OrderModal({ isOpen, onClose, product, user, onOrderSuccess, onPayOrder }) {
    try {
        const [orderData, setOrderData] = React.useState({
            contactName: user?.name || '',
            contactPhone: user?.phone || '',
            notes: '',
            quantity: 1
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                const order = await OrderService.createOrder(user.phone, {
                    productName: product.title,
                    productPrice: product.price,
                    quantity: orderData.quantity,
                    totalAmount: parseFloat(product.price.replace(/[¥$,]/g, '')) * orderData.quantity,
                    contactName: orderData.contactName,
                    contactPhone: orderData.contactPhone,
                    notes: orderData.notes
                });

                onOrderSuccess && onOrderSuccess(order);
                
                const shouldPay = confirm('Order created successfully! Would you like to pay now?');
                if (shouldPay && onPayOrder) {
                    onPayOrder(order);
                }
                
                onClose();
            } catch (err) {
                setError('Order creation failed, please try again later');
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen || !product) return null;

        const totalPrice = parseFloat(product.price.replace(/[¥$,]/g, '')) * orderData.quantity;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold gradient-text">Confirm Order</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <i data-lucide="x" className="w-6 h-6"></i>
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold mb-2">{product.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        <p className="text-lg font-bold text-purple-600">{product.price}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                            <input
                                type="text"
                                value={orderData.contactName}
                                onChange={(e) => setOrderData({...orderData, contactName: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                            <input
                                type="tel"
                                value={orderData.contactPhone}
                                onChange={(e) => setOrderData({...orderData, contactPhone: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={orderData.quantity || 1}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value) || 1;
                                    setOrderData({...orderData, quantity: Math.max(value, 1)});
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea
                                value={orderData.notes}
                                onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows="3"
                                placeholder="Special requests or notes"
                            />
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-lg font-semibold">Total: ${totalPrice}</p>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                            {loading ? 'Creating Order...' : 'Create Order'}
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('OrderModal component error:', error);
        reportError(error);
    }
}
