const {MongoClient, ObjectID }= require('mongodb')
// const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('not connected to db')
    }
    // it will creates automatically task-manger db
    const db = client.db(dataBaseName)

    //=================== Inserrting  ===============================
    // db.collection('users').insertOne({
    //     name:'Prasad',
    //     age:29
    // })

    // db.collection('users').insertMany(
    //     [{
    //         name: 'Prasad',
    //         age: 29
    //     },
    //     {
    //         name: 'Nagireddi',
    //         age: 26
    //     }], (error, result) => {
    //         if (error) {
    //             return console.log('unable to insert data into users Collection')
    //         }
    //         console.log(result.ops)
    //     })


    // db.collection('tasks').insertMany(
    //     [{
    //         description: 'Bring Vegetables',
    //         completed: true
    //     },
    //     {
    //         description: 'Wash Clothes',
    //         completed: false
    //     },
    //     {
    //         description: 'Clean Room',
    //         completed: false
    //     }],
    //     (error, result) => {
    //         if (error) {
    //             return console.log('unable to insert data into tasks Collection')
    //         }
    //         console.log(result.ops)
    //     })

   //=================== Reading  ===============================

    // // returns promise
    // db.collection('users').findOne({_id:ObjectID("5d16fcc609f76e1b80af11bc")},(error,result)=>{
    //     if (error){
    //         console.log('error while fetching results from db')
    //     }

    //     console.log(result)
    // })

    // // no callback for find method, it returns cursor we have to call methods on that cursor as per our requirement
    // db.collection('users').find({age:29}).toArray((error,users)=>{
    //     if (error){
    //         console.log('error while fetching results from db')
    //     }

    //     console.log(users)
    // })


//    // returns promise
//    db.collection('tasks').findOne({_id:ObjectID("5d16fcc609f76e1b80af11be")},(error,result)=>{
//     if (error){
//         console.log('error while fetching results from db')
//     }

//     console.log(result)
//     })

//     // no callback for find method, it returns cursor we have to call methods on that cursor as per our requirement
//     db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
//         if (error){
//             console.log('error while fetching results from tasks')
//         }

//         console.log(tasks)
//     })


// ==================== UPdatig =============================


//  db.collection('users').updateOne({
//         _id:ObjectID("5d16fcc609f76e1b80af11bb")
//      },{ // $set  is atomic operator, to update shld use that operator
//          $set: {
//            age:28
//          }
//     }).then((users)=>{
//     console.log(` ${users}`)
//     }).catch((error)=>{
//     console.log(`error in updatiing users is ${error}`)
//  })


//  db.collection('tasks').updateMany({
//     completed:false
//  },{ // $set  is atomic operator, to update shld use that operator
//      $set: {
//        completed:true
//      }
// }).then((tasks)=>{
// console.log(` ${tasks}`)
// }).catch((error)=>{
// console.log(`error in updatiing tasks is ${error}`)
// })


// ==================== Deleting =============================

 db.collection('users').deleteOne({
    _id:ObjectID("5d16fcc609f76e1b80af11bb")
 }).then((result)=>{
console.log(` ${result.deletedCount}`)
}).catch((error)=>{
console.log(`error in deleting users is ${error}`)
})

db.collection('tasks').deleteMany({
    _id : ObjectID("5d16fcc609f76e1b80af11bd"),
 }).then((result)=>{
console.log(` ${result.deletedCount}`)
}).catch((error)=>{
console.log(`error in deleting tasks is ${error}`)
})

})