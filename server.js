import express from 'express'
import cors from 'cors'
import aboutRouter from './routes/about.js'

const app = express()
const PORT = 8000

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/about', aboutRouter)

app.listen(PORT, (req,res)=>{
console.log(`server is running on port ${PORT}`)

})