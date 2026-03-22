import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route'

const app = express()
dotenv.config()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/api/auth',authRoutes)

app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`)
})
