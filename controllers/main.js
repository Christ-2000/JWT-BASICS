
//check username,password in post(login)request
//if exist create new jwt
// send back to fron-end

//setup authentication so only the request with jwt can acess the dashboard
const jwt = require('jsonwebtoken')
const { Error } = require('mongoose')
const CustomAPIError = require('../errors/custom-error')
 const { BadRequestError } = require('../errors')
const login = async (req, res) => {
    const{username,password} = req.body

    
//mongoose validation
//joi
//check in the controller
if(!username ||!password){
throw new BadRequestError('please provide email and password')
}
//just for demo, normally provided by DB!!!
const id = new Date().getDate()


//try to keep payload better experience for user

// Just for demo, in production use long ,complex and unguessable string value!!!!!!!!!
const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    // console.log(username,password)
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req, res) => {
    // console.log(req.user);
//    const authHeader = req.headers.authorization;

//    if(!authHeader|| !authHeader.startswith('Bearer')){
//     throw new CustomAPIError('No token provided',401)
//    }
//    const token = authHeader.split('')[1]
//    try{
//     const decoded = jwt.verify(token,process.env.JWT_SECRET)
//     // console.log(decoded)
    const luckyNumber = Math.floor(Math.random()* 100)
    res.status(200).json({ msg: `Hello,${req.user.username}`, secret: `Here is your authorized data,your lucky number is ${luckyNumber}`,
 })
//    }catch(error){
//     throw new CustomAPIError('No authorized to acess this route',401)
//    }
//    next()
}
module.exports= {
    login, dashboard
}