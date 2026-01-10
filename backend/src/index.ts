import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import ToDoRoutes from './routes/ToDoRoutes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', ToDoRoutes)

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server running on port ${process.env.SERVER_PORT}`)
})