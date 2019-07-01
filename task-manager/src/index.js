const express = require('express')
require('./db/mongoose') // just by initiatingthrough require, connection to db initiates 
const User = require('./models/users')
const Task = require('./models/tasks')

const app= express()

const Port = process.env.port || 3000
// parses input json i.e parse input data received from request so that we can acess them as object
app.use(express.json())

app.post('/users',async (req,res)=>{
    // req.body = {"name":"Prasad","email":"prasad@gmail.com","password":"pass123"}
    const user = new User(req.body)
    try {
      const result = await user.save()
      res.status(201).send(result)
    } catch (error) {
      res.status(400).send(error)
    }
    // user.save().then((result)=>{
    //     res.status(201).send(result)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
    
})

app.post('/tasks',(req,res)=>{
    const inputTask= req.body
    const task = new Task(inputTask)
    task.save().then((result)=>{
        // 201 -- Created
        // 400 -- client error
        // 500 -- server side error (i.e db etc)
        res.status(201).send(result)
    }).catch((error)=>{
        res.status(400).send(error)
    })
    
})


app.get('/users', async (req,res)=>{
    // can access methods of mongoose directly from Models
    try {
        const users =await  User.find({})
        res.status(200).send(users)
    } catch(e) {
        res.status(400).send(error)
    }
    // User.find({}).then((users)=>{
    //     res.status(200).send(users)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
    
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        res.status(200).send(user)
    }).catch((error)=>{
        res.status(400).send(error)
    })    
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.status(200).send(tasks)
    }).catch((error)=>{
        res.status(500).send(error)
    })    
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    // const _id = req.query.id
    console.log(_id)
    Task.findById(_id).then((task)=>{
        res.status(200).send(task)
    }).catch((error)=>{
        res.status(500).send(error)
    })    
})

app.listen(Port, ()=>{
    console.log(`server listens on port ${Port}`)
})