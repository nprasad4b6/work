// mongoosejs.com
const mongoose = require('mongoose')
const validator = require('validator')
const chalk = require('chalk')
const bcryptJS = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/tasks')

// by mentioning schema in mongoose.schema instead of mongoose.model we can grab 
// middleware functionality of mangoose (i.e we can modfiy before data saves to db)
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }
    ],
    avatar: {
        type : Buffer
    }
},
    {
        timestamps: true
    }
)

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// occusrs before saving and use standard fucntion instead of arrowone
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        // by hashing 8 times is stable one by speed and security
        user.password = await bcryptJS.hash(user.password, 8)
        // if don't mention next() it will never goes from this function
    }
    next()
})


// removes taks before user deleted
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})
// userSchema.methods.getPublicProfile = function () {
userSchema.methods.toJSON = function () {
    const user = this
    // plain object removes unnecesary data
    const userObject = user.toObject()
    // console.log('userObject',userObject)
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    // console.log('userObject1',userObject)
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECREAT)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}



// BY registerning custom methods on userSchema.statics, we can access them anywhere 
// through that model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isValidUser = await bcryptJS.compare(password, user.password)
    if (!isValidUser) {
        throw new Error('Unable to login')
    }
    return user
};

// creating model of User, first letter should be capital (i.e User)
// here we can mention types for fileds, i.e we have more cotrol on fields
const User = new mongoose.model('User', userSchema)

module.exports = User
