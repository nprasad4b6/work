require('../src/db/mongoose')
const User = require('../src/models/users')
const Task = require('../src/models/tasks')

// promise chAINIG
User.findByIdAndUpdate('5d173cffb2aa3403741b1dc3',{ age:10 }).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})

