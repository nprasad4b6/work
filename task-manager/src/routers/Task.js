const express = require('express')
const Task = require('../models/tasks')
const User = require('../models/users')
const auth = require('../middleware/auth')

const router =new express.Router();

router.post('/tasks',auth,(req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    task.save().then((result)=>{
        res.status(201).send(result)
    }).catch((error)=>{
        res.status(400).send(error)
    })    
})


// router.post('/tasks',(req,res)=>{
//     const inputTask= req.body
//     const task = new Task(inputTask)
//     task.save().then((result)=>{
//         res.status(201).send(result)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
    
// })
// Get /tasks?completed=true
// Get /tasks?limit=10&&skip=0 
// Get /tasks?sortBy=completed:desc  --desc = -1 , asc:1
router.get('/tasks', auth, async (req,res)=>{
    try {
        const match = {}
        const sort = {}
        if (req.query.completed) { //sets true if completed is true else sets false
            match.completed = req.query.completed === 'true'
        }
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
    // const tasks =await Task.findOne({owner:req.user._id})
        //populates tasks on user
        // await req.user.populate('tasks').execPopulate()
        // match provieds for filetering
        await req.user.populate({
                        path:'tasks',
                        match,
                        options: {
                            limit : parseInt(req.query.limit),
                            skip : parseInt(req.query.skip),
                         },
                        sort })
                        .execPopulate()
        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.get('/tasks',(req,res)=>{
//     Task.find({}).then((tasks)=>{
//         res.status(200).send(tasks)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })    
// })

router.get('/tasks/:id', auth, async (req,res)=>{
    try {
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        // const task = await Task.findOne({_id:"5d20ecf253312f087078d8b2", owner:"5d20ec9753312f087078d8af"})
        console.log('task',task)
        if (!task) {
            return  res.status(404).send()
        }
        res.status(200).send(task)
    } catch(error) {
        res.status(500).send(error)
    }  
})

// router.get('/tasks/:id',(req,res)=>{
//     const _id = req.params.id
//     // const _id = req.query.id
//     console.log(_id)
//     Task.findById(_id).then((task)=>{
//         res.status(200).send(task)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })    
// })


router.patch('/tasks/:id', auth, async (req,res)=>{
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
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        if (!task) {
            return  res.status(404).send()
        }
        inputUpdates.every((inputUpdate)=>{
            task[inputUpdate] = req.body[inputUpdate]
        })
        await task.save()
        res.status(200).send(task)
    } catch(error) {
        res.status(500).send(error)
    }
})

// router.patch('/tasks/:id', async (req,res)=>{
//     try {
//         const inputUpdates = Object.keys(req.body) // retruns object properties and methods as arry of stings
//         const validUpdates = ["description","completed"]
//         // returns true if all inputUpdates are valid, returns false even one of them is not includes in validlist
//         const isValidUpdate = inputUpdates.every((inputUpdate)=>{
//                 return validUpdates.includes(inputUpdate)
//         })
//         if (!isValidUpdate) {
//             res.status(400).send({error:'Have some improper updates to update in Task'})
//         }
//         const _id = req.params.id
//         // By setting new to True , we are telling returns updated object not the old object before updated
//         // runValidators: true , runs validations on Object fields, i.e to cehck improper data
//         // const user =await  Task.findByIdAndUpdate(_id, req.body, {new:true,runValidators:true,useFindAndModify:false})
//         // findByIdAndUpdate is not supports middleware functionality so modified as below
//         const task = await Task.findById(_id)
//         inputUpdates.every((inputUpdate)=>{
//             task[inputUpdate] = req.body[inputUpdate]
//         })
//         await task.save()
        
//         res.status(200).send(task)
//     } catch(error) {
//         res.status(500).send(error)
//     }
// })


router.delete('/tasks/:id', auth, async (req,res)=>{
    try {
        // returns deleted Task
        const task =await  Task.findOneAndDelete({_id: req.params.id,owner:req.user._id})
        res.status(200).send(task)
    } catch(error) {
        res.status(500).send(error)
    }  
})

// router.delete('/tasks/:id', async (req,res)=>{
//     try {
//         const _id = req.params.id
//         // returns deleted Task
//         const user =await  Task.findByIdAndDelete(_id)
//         res.status(200).send(user)
//     } catch(error) {
//         res.status(500).send(error)
//     }  
// })

module.exports = router