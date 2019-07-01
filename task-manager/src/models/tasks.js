// mongoosejs.com
const mongoose = require('mongoose')
const validator = require('validator')
const chalk = require('chalk')


const Task = new mongoose.model('Task', {
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})
module.exports = Task
// const task = new Task({
//     description: 'Read nodejs',
//     completed: false
// })