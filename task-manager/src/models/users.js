// mongoosejs.com
const mongoose = require('mongoose')
const validator = require('validator')
const chalk = require('chalk')

// creating model of User, first letter should be capital (i.e User)
// here we can mention types for fileds, i.e we have more cotrol on fields
const User = new mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter proper Email')
            }
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                // !validator.isByteLength(value,{min:6})
                throw new Error(chalk.red.inverse('Make sure password shouldnot contain password'))
            }
            // else if(validator.contains(value,'password')) {
            //     throw new Error(chalk.red.inverse('Make sure password shouldnot contain password'))
            // }
        }

    },
    age: {
        type: Number,
        default: 1,
        validate(value) {
            if (value <= 0) {
                throw new Error('Age should be positive')
            }
        }
    }
})
module.exports = User
//  const me = new User({
//      name: 'Lokesh',
//      email:'lokesh@gmail.com  ',
//      password:'1password',
//      age: 10})



// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })