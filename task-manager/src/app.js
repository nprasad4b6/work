const express = require('express')
require('./db/mongoose') // just by initiatingthrough require, connection to db initiates 
const userRouter = require('./routers/User')
const taskRouter = require('./routers/Task')

const app= express()

// Registerning Routers with express

// parses input json i.e parse input data received from request so that we can acess them as object
app.use(express.json())

// use this after express.json() only, otherwaie we didnt catch req.bosy in proepr format
app.use(userRouter)
app.use(taskRouter)

module.exports = app