const PaymentService = {
    async wechatPay(orderData) {
        try {
            const paymentData = {
                orderNumber: orderData.orderNumber,
                amount: orderData.totalAmount,
                productName: orderData.productName,
                userId: orderData.userId,
                paymentMethod: 'wechat'
            };

            console.log('Initiating WeChat payment:', paymentData);
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            return {
                success: true,
                paymentId: `wx_${Date.now()}`,
                message: 'WeChat payment successful'
            };
        } catch (error) {
            console.error('WeChat payment failed:', error);
            throw new Error('WeChat payment failed, please try again');
        }
    },

    async alipay(orderData) {
        try {
            const paymentData = {
                orderNumber: orderData.orderNumber,
                amount: orderData.totalAmount,
                productName: orderData.productName,
                userId: orderData.userId,
                paymentMethod: 'alipay'
            };

            console.log('Initiating Alipay payment:', paymentData);
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            return {
                success: true,
                paymentId: `ali_${Date.now()}`,
                message: 'Alipay payment successful'
            };
        } catch (error) {
            console.error('Alipay payment failed:', error);
            throw new Error('Alipay payment failed, please try again');
        }
    },

    async bankCardPay(orderData, cardInfo) {
        try {
            const paymentData = {
                orderNumber: orderData.orderNumber,
                amount: orderData.totalAmount,
                productName: orderData.productName,
                userId: orderData.userId,
                paymentMethod: 'bankcard',
                cardNumber: cardInfo.cardNumber.slice(-4)
            };

            console.log('Initiating bank card payment:', paymentData);
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            return {
                success: true,
                paymentId: `bank_${Date.now()}`,
                message: 'Bank card payment successful'
            };
        } catch (error) {
            console.error('Bank card payment failed:', error);
            throw new Error('Bank card payment failed, please try again');
        }
    },

    async queryPaymentStatus(paymentId) {
        try {
            console.log('Querying payment status:', paymentId);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
                status: 'success',
                paymentId: paymentId,
                paidAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Failed to query payment status:', error);
            throw new Error('Failed to query payment status');
        }
    }
};
