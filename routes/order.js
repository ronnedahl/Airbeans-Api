import { Router } from 'express'
import { nanoid } from 'nanoid'
import {cart} from '../config/data.js'
import nedb from 'nedb-promises'

let totalyprice = 0
const database = new nedb({filename: 'order.db', autoload: true})
const userDatabase = new nedb({filename: 'register.db', autoload: true });

const router = Router()

function totalPrice(){
    totalyprice = cart.reduce((sum, item)=> sum+item.price,0)

    }
router.get('/', (req,res)=>{
    totalPrice()
    res.json({cart,totalyprice})
})
// ORDER COFFEE
router.post('/',async(req,res) => {
    totalPrice()
    const {name, quantity,userId,total,price} = req.body
        
    
    
    
    if(global.user) {
    const loggedInUser = await userDatabase.findOne({username: global.user.username})
    const userId = loggedInUser
    
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
    
    function getDeliveringTime(min,max){
        return Math.floor(Math.random()* (max-min +1)) +min
    }

    const randomNumber = getDeliveringTime(10,60)
    console.log(`Your coffee will be delivering in about ${randomNumber} of minutes`)
    
    totalPrice()
    
    res.json({
        success: true,
        message: 'coffee added successfully',
        name: name,
        quantity : quantity,
        userId : userId,
        total: totalQuantity,
        totalprice: totalyprice
        })
        console.log(`total price is ${totalyprice}`)
    }else{

        return res.status(400).json({ error: 'you must be logged in first' })
    }

    
})

export default router