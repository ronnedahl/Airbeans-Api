import { Router } from 'express'
import { nanoid } from 'nanoid'
import {cart} from '../config/data.js'
import nedb from 'nedb-promises'
let totalprice = 0
const database = new nedb({filename: 'order.db', autoload: true})

const router = Router()


router.get('/', (req,res)=>{
    res.json(cart)
})

router.post('/',async(req,res) => {
    
    cart.forEach(item =>{
        totalprice = totalprice + item.price
        
    })
    const {name, quantity,userId,total,price} = req.body
    console.log(global.user)
    if(global.user){
    const userId = nanoid(5)
    console.log(userId)
    
    const addCoffee ={
        
        id: cart.length +1,
        name : name,
        quantity: quantity,
        userId : userId,
        price: price
        
        
    }   
    
    cart.push(addCoffee)
    database.insert(addCoffee)
    const userOrders = await database.find({ userId: userId });
    const totalQuantity = userOrders.reduce((acc, order) => acc + order.quantity, 0);
    
    
    
    res.json({
        success: true,
        message: 'coffee added successfully',
        name: name,
        quantity : quantity,
        userId : userId,
        total: totalQuantity,
        totalprice: totalprice
        })
        console.log(`total price is ${totalprice}`)
    }else{

        return res.status(400).json({ error: 'you must be logged in first' })
    }

    
})

export default router