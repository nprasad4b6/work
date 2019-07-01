const express = require('express')
require('./db/mongoose') // just by initiatingthrough require, connection to db initiates 
const userRouter = require('./models/tasks')
const taskRouter = require('./models/tasks')
const app= express()

const Port = process.env.Port || 3000

// Registerning Routers with express
app.use(userRouter)
app.use(taskRouter)
// parses input json i.e parse input data received from request so that we can acess them as object
app.use(express.json())

app.listen(Port, ()=>{
    console.log(`server listens on port ${Port}`)
})