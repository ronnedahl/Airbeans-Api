import { Router } from 'express'
import { users } from  '../config/data.js'
import userSchema from '../models/userModel.js'
import { createUser ,findUser } from '../services/auth.js'
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

// Login

router.post('/login', (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const response = {
            success: false,
            message: error.details[0].message,
            status: 400
        };
        return res.status(400).json(response);
    }

    const user = users.find(u => u.username === req.body.username);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    } else if (user.password !== req.body.password) {
        return res.status(400).json({ error: 'Invalid password' }); 
    } else {
        return res.json({ message: "User logged in successfully", data: user });
    }
});

router.post('/orders/:id', (req,res) => {

})

export default router