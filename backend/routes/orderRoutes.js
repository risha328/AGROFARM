const express = require('express');
const router = express.Router();
const Order = require('../models/Order');  // Assuming the Order model is in the "models" folder
const authMiddleware = require('../middleware/authToken');  // Assuming you have an authentication middleware

// Get all orders for the logged-in user
router.get('/user/orders', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the auth middleware (JWT or session)

        // Fetch all orders where the userId matches and payment is successful (isPaid is true)
        const orders = await Order.find({ userId, isPaid: true }).sort({ createdAt: -1 }); // Sort by latest order

        if (!orders.length) {
            return res.status(404).json({ success: false, message: 'No paid orders found' });
        }

        return res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
});

// Get a single order by ID (for more detailed order view)
router.get('/order/:orderId', authMiddleware, async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;  // Get user ID from auth middleware

        // Find the order by orderId and check if it belongs to the logged-in user
        const order = await Order.findOne({ _id: orderId, userId, isPaid: true });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found or not paid' });
        }

        return res.json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({ success: false, message: 'Error fetching order' });
    }
});

module.exports = router;
