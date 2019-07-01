require('../src/db/mongoose')
const User = require('../src/models/users')
const Task = require('../src/models/tasks')

// promise chAINIG
Task.findByIdAndDelete('5d172b9e13bca413980518cd').then((deletedOne)=>{
    console.log(deletedOne)
    return Task.countDocuments({completed:false})
}).then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})
