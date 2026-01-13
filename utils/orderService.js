const OrderService = {
    async createOrder(userId, orderData) {
        try {
            const order = {
                userId: userId,
                orderNumber: this.generateOrderNumber(),
                ...orderData,
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const newOrder = await trickleCreateObject('order', order);
            return newOrder.objectData;
        } catch (error) {
            console.error('Order creation failed:', error);
            throw error;
        }
    },

    async getUserOrders(userId) {
        try {
            const orders = await trickleListObjects(`order:${userId}`, 50, true);
            return orders.items.map(item => item.objectData);
        } catch (error) {
            console.error('Failed to get orders:', error);
            return [];
        }
    },

    async updateOrderStatus(orderId, status) {
        try {
            const updatedOrder = await trickleUpdateObject('order', orderId, {
                status: status,
                updatedAt: new Date().toISOString()
            });
            return updatedOrder.objectData;
        } catch (error) {
            console.error('Failed to update order status:', error);
            throw error;
        }
    },

    generateOrderNumber() {
        const date = new Date();
        const timestamp = date.getTime().toString().slice(-8);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `JEC${timestamp}${random}`;
    },

    getStatusText(status) {
        const statusMap = {
            'pending': 'Pending Payment',
            'paid': 'Paid',
            'confirmed': 'Confirmed',
            'completed': 'Completed',
            'cancelled': 'Cancelled'
        };
        return statusMap[status] || 'Unknown Status';
    }
};
