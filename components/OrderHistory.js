function OrderHistory({ isOpen, onClose, user, onPayOrder }) {
    try {
        const [orders, setOrders] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        React.useEffect(() => {
            if (isOpen && user) {
                loadOrders();
            }
        }, [isOpen, user]);

        const loadOrders = async () => {
            try {
                setLoading(true);
                const userOrders = await OrderService.getUserOrders(user.phone);
                setOrders(userOrders);
            } catch (error) {
                console.error('Failed to load orders:', error);
            } finally {
                setLoading(false);
            }
        };

        const handlePayOrder = (order) => {
            if (onPayOrder) {
                onPayOrder(order);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">My Orders</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="loading-spinner mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading orders...</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-8">
                                <i data-lucide="shopping-bag" className="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                                <p className="text-gray-600">No orders yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-lg">{order.productName}</h3>
                                                <p className="text-sm text-gray-600">Order Number: {order.orderNumber}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {OrderService.getStatusText(order.status)}
                                                </span>
                                                {order.status === 'pending' && (
                                                    <button
                                                        onClick={() => handlePayOrder(order)}
                                                        className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700 transition-colors">
                                                        Pay Now
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p><span className="font-medium">Quantity:</span> {order.quantity}</p>
                                                <p><span className="font-medium">Contact:</span> {order.contactName}</p>
                                            </div>
                                            <div>
                                                <p><span className="font-medium">Total Amount:</span> ${order.totalAmount}</p>
                                                <p><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        
                                        {order.notes && (
                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                <p className="text-sm"><span className="font-medium">Notes:</span> {order.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
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
        console.error('OrderHistory component error:', error);
        reportError(error);
    }
}
