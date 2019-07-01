const express = require('express')
const Task = require('./models/tasks')

const router = express.Router();

app.post('/tasks',(req,res)=>{
    const inputTask= req.body
    const task = new Task(inputTask)
    task.save().then((result)=>{
        res.status(201).send(result)
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

app.patch('/tasks/:id', async (req,res)=>{
    try {
        const inputUpdates = Object.keys(req.body) // retruns object properties and methods as arry of stings
        const validUpdates = ["description","completed"]
        // returns true if all inputUpdates are valid, returns false even one of them is not includes in validlist
        const isValidUpdate = inputUpdates.every((inputUpdate)=>{
                return validUpdates.includes(inputUpdate)
        })
        if (!isValidUpdate) {
            res.status(400).send({error:'Have some improper updates to update in Task'})
        }
        const _id = req.params.id
        // By setting new to True , we are telling returns updated object not the old object before updated
        // runValidators: true , runs validations on Object fields, i.e to cehck improper data
        const user =await  Task.findByIdAndUpdate(_id, req.body, {new:true,runValidators:true})
        res.status(200).send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.delete('/tasks/:id', async (req,res)=>{
    try {
        const _id = req.params.id
        // returns deleted Task
        const user =await  Task.findByIdAndDelete(_id)
        res.status(200).send(user)
    } catch(error) {
        res.status(500).send(error)
    }  
})

module.exports = router