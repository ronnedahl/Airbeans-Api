import { Router } from 'express'
import { users } from  '../config/data.js'
import userSchema from '../models/userModel.js'
import orderSchema from '../models/orderModel.js';
import { createUser ,findUser, findUserById } from '../services/auth.js'
import { createOrder, findOrdersByUserId } from '../services/orderService.js';
import validate from '../middlewares/validate.js'


const router = Router()

//  REGISTER A NEW USER
router.post('/register',validate,async (req,res)=>{
    const user = await findUser(req.body.usermane)

    if(user) {
        return res.status(400).json({error: 'sorry user already exists'})
    }
    const newUser = await createUser(req.body)
    const response= {
        success : true,
        status : 201,
        message : 'user created successfully',
        data: newUser
    }
    res.json(response)
})

// LOGIN
router.post('/login', validate, async (req, res) => {
    const user = await findUser(req.body.username);
    if(!user) {
        return res.status(400).json({ error: 'User does not exist' }); 
    } else if(user.password !== req.body.password) {
        return res.status(400).json({ error: 'Invalid password' }); 
    }

    global.user = user;
    const response = {
        success : true,
        status : 200,
        message : 'User logged in successfully',
        data : user
    }

    res.json(response);
});

// CREATE ORDER AND LINK TO USER
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