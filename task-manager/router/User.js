const express = require('express')
const User = require('./models/users')

const router = express.Router();

router.post('/users', async (req, res) => {
    // req.body = {"name":"Prasad","email":"prasad@gmail.com","password":"pass123"}
    const user = new User(req.body)
    try {
        const result = await user.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/users', async (req, res) => {
    // can access methods of mongoose directly from Models
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(error)
    }
})

router.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        res.status(200).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})


router.patch('/users/:id', async (req, res) => {
    try {
        const inputUpdates = Object.keys(req.body) // retruns object properties and methods as arry of stings
        const validUpdates = ["name", "email", "age", "password"]
        // returns true if all inputUpdates are valid, returns false even one of them is not includes in validlist
        const isValidUpdate = inputUpdates.every((inputUpdate) => {
            return validUpdates.includes(inputUpdate)
        })
        if (!isValidUpdate) {
            res.status(400).send({ error: 'Have some improper updates to update in User' })
        }
        const _id = req.params.id
        // By setting new to True , we are telling returns updated object not the old object before updated
        // runValidators: true , runs validations on Object fields, i.e to cehck improper data
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        // returns deleted user
        const user = await User.findByIdAndDelete(_id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router