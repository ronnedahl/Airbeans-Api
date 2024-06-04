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

export default router