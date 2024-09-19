const User = require("../model/user.model")
const bcrypt = require("bcryptjs")
const { use } = require("../router/user.route")
exports.register = async(req,res)=>{
    try {
        let {
            firstName,
            lastName,
            email,
            password,
            role
        } = req.body
        let hashPassword = bcrypt.hashSync(password,10)
        const userExist = await User.findOne({where:{email,role}})
        if(userExist)
            return res.status(400).json({status:400,message:"User already exist."})
        
        await User.create({
            firstName,
            lastName,
            email,
            password : hashPassword,
            role
        })
        return res.status(200).json({status:200,message:"Registered Successfully."})
    } catch (error) {
        return res.status(400).json({status:400,message:error.message,data:error})
    }
}

exports.login = async(req,res)=>{
    try {
        const {email,password,role} = req.body
        const user = await User.findOne({ where: { email } });
        if(!user)
            return res.status(400).json({status:400,message:"User does not exist."})

        if(user.role !== role)
            return res.status(400).json({status:400,message:"You are not allowed to login."})


        console.log(password,user.password)
        if(!bcrypt.compareSync(password,user.password))
            return res.status(400).json({status:400,message:"Incorrect Password."})

        return res.status(200).json({status:200,message:"Login Successfully."})
    } catch (error) {
        return res.status(400).json({status:400,message:error.message,data:error})
    }
}