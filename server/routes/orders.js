const express = require('express');
const Order = require('../models/Order');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Get user's orders
router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId });
        res.json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// Create new order
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { items, total, shippingAddress } = req.body;

        const order = new Order({
            userId: req.user.userId,
            items,
            total,
            shippingAddress,
            status: 'pending'
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
});

// Get single order
router.get('/:orderId', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.orderId,
            userId: req.user.userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
});

module.exports = router;
