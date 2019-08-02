const express = require('express')
const sharp = require('sharp')
const User = require('../models/users')
const auth= require('../middleware/auth')
const multer = require('multer')

const router =new express.Router();

router.post('/users', async (req, res) => {
    // req.body = {"name":"Prasad","email":"prasad@gmail.com","password":"pass123"}
    const user = new User(req.body)
    try {
        const result = await user.save()
        const token = await result.generateAuthToken()
        res.status(201).send({result,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        // By using getPublicProfile() , removes password and tokens from exposing to public
        // res.status(200).send({ user: user.getPublicProfile(),token})
        res.status(200).send({user,token}) 
        /* user will cals toJSON() method bydefault,
        so no need to call getPublicProfile() method for each time when ever we rrequire,
        just implement toJSON() method for required purpose */
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth , async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((obj)=> obj.token !== req.token)
        await req.user.save()
        res.send('logout successfully')
    } catch {
        res.status(500).send('error in logout')
    }   
})

router.post('/users/logoutAll', auth , async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('logout All Users successfully')
    } catch {
        res.status(500).send('error in logout all Users')
    }   
})

router.get('/users/me', auth, async (req, res) => {
    // can access methods of mongoose directly from Models
    res.send(req.user)
    // try { 
    //     const users = await User.find({})
    //     res.status(200).send(users)
    // } catch (e) {
    //     res.status(400).send(error)
    // }
})

// router.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         res.status(200).send(user)
//     }).catch((error) => {
//         res.status(400).send(error)
//     })
// })


// router.patch('/users/:id', async (req, res) => {
//     try {
//         const inputUpdates = Object.keys(req.body) // retruns object properties and methods as arry of stings
//         const validUpdates = ['name', 'email', 'age', 'password']
//         // returns true if all inputUpdates are valid, returns false even one of them is not includes in validlist
//         const isValidUpdate = inputUpdates.every((inputUpdate)=>{
//             return validUpdates.includes(inputUpdate)
//     })
//         if (!isValidUpdate) {
//             return res.status(400).send({ error: 'Have some improper updates to update in User' })
//         }
//         const _id = req.params.id
//         // By setting new to True , we are telling returns updated object not the old object before updated
//         // runValidators: true , runs validations on Object fields, i.e to cehck improper data
//         // useFindAndModify : false means we can use findByIdAndUpdate without getting deprecated warnig message for that method
//         // const user = await User.findOneAndUpdate(_id, req.body, { new: true, runValidators: true,useFindAndModify: false })
//        // findByIdAndUpdate is not supports middleware functionality so modified as below
//         const user = await User.findById(_id)
//         inputUpdates.every((inputUpdate)=>{
//             return user[inputUpdate] = req.body[inputUpdate]
//          })

//         // inputUpdates.every((inputUpdate)=>{
//         //     console.log(inputUpdate)
//         //     user[inputUpdate] = req.body[inputUpdate]
//         // })
//         await user.save()

//         res.status(200).send(user)
//     } catch (error) {
//         res.status(500).send('error',error)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    try {
        const inputUpdates = Object.keys(req.body)
        const validUpdates = ['name', 'email', 'age', 'password']
        const isValidUpdate = inputUpdates.every((inputUpdate)=>{
            return validUpdates.includes(inputUpdate)
         })
        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Have some improper updates to update in User' })
        }
        inputUpdates.every((inputUpdate)=>{
            return req.user[inputUpdate] = req.body[inputUpdate]
         })
        await req.user.save()

        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send('error',error)
    }
})


// router.delete('/users/:id', async (req, res) => {
//     try {
//         const _id = req.params.id
//         // returns deleted user
//         const user = await User.findByIdAndDelete(_id)
//         res.status(200).send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.delete('/users/me',auth , async (req, res) => {
    try {// removes from db
        await req.user.remove()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

const upload = multer({
   // dest : 'avatars', if we dont mention dest here then we can access uploaded file in router 
   // through req.file.buffer
    limits : {
        fileSize : 1000000 // 1000000 means 1mb
    },
    fileFilter(req,file,cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload proper format of avatar'))
        }
        cb(undefined,true)
    }
})

// Express not supports file upload so using multer for that
router.post('/users/me/avatar',auth, upload.single('avatar') , async (req, res) => {
    // req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250})
                                                .png()
                                                .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


// Deleting the Profile pic i.e avatar
router.delete('/users/me/avatar',auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send()
})


// http://localhost:3000/users/5d223c280e64850594fd7773/avatar
router.get('/users/:id/avatar', async (req,res)=>{
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
        return res.status(401).send("error : user/image not found")
    }
    res.set('Content-Type','image/jpg') //application/json
    res.send(user.avatar)
})


module.exports = router