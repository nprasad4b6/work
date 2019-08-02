const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req,res,next) => {
    try {
        // to serch varibles on req.header
        // varibales set through Authorization section from postman also comes under
        // req.header('Authorization')
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify( token, 'thisismynewcourse')
        //tokens.token will serch for given token
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})
        if(!user) { //goes o catch block
            throw new Error()
        } 
        // adding user property to response so that no need to again fetch that user
        req.token = token
        req.user = user
        next()

    } catch(error) {
        res.status(401).send('error: Please authenticate properly')
    }
    
}


module.exports = auth