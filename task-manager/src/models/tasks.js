// mongoosejs.com
const mongoose = require('mongoose')
const bcryptJS = require('bcryptjs')

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'USER' // tels the owner of this fieled
    }
}, {
        timestamps: true
    })

const Task = new mongoose.model('Task', taskSchema)
module.exports = Task
// const task = new Task({
//     description: 'Read nodejs',
//     completed: false
// })