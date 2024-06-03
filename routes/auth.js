import { Router } from 'express'
import { users } from  '../config/data.js'
import userSchema from '../models/userModel.js'

const router = Router()

//  REGISTER A NEW USER
router.post('/register',(req,res)=>{
const {error} = userSchema.validate(req.body)
if(error){
    const response = {
        success : false,
        message: error.details[0].message,
        status: 400
    }
    return res.status(400).json(response)
}
const {username , password} = req.body
const user = users.find(user => user.username === username)
if(user){
    res.status(400).json({
        message: 'user already exists'})
    }else{
        users.push({
        id: users[users.length -1].id +1,
        username : username,
        password: password
        
        })
        res.json({messge: "user was successfully added!"})
    }

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


export default router