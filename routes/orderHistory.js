import { Router } from 'express'
import { createOrder, findOrdersByUserId } from '../services/orderService.js';
import { findUserById } from '../services/auth.js'
import orderSchema from '../models/orderModel.js';

const router = Router()

// Get order history when you are logged in
router.post('/orders/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await findUserById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // const { error } = orderSchema.validate({ userId, ...req.body });
    // if (error) {
    //     return res.status(400).json({ error: error.details[0].message });
    // }

    try {
        const newOrder = await createOrder({ userId, ...req.body });
        const orders = await findOrdersByUserId(userId);

        res.json({
            message: 'Order created successfully',
            data: {
                user: userId,
                orders: orders
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

export default router