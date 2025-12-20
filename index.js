const express = require('express')
const cors = require('cors')
const toDo_router = require('./toDo_router')
const board_router = require('./board_router')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/todo', toDo_router)
app.use('/board', board_router)

app.listen(PORT, ()=>{
    console.log('server running on port: ', PORT)
})