const User = require("../model/user");
const { generateToken } = require("../utils/generateToken");
const response = require("../utils/responseHandler");
const bcrypt = require('bcrypt');



const registerUser = async(req,res) =>{
    try {
         const {firstName,lastName,email,password} = req.body;
         
        //  check the existing user with email
        const existingUser = await User.findOne({email});
        if(existingUser){
            return response(res,400,'User with this email already exists')
        }
       
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            
        })

        await newUser.save();
        
        const accessToken = generateToken(newUser);

        res.cookie("auth_token",accessToken,{
            httpOnly: true,
            sameSite:"none",
            secure:true
        })


        return response(res,201,"User created successfully",{
             firstName:newUser.firstName,
             lastName:newUser.lastName,
             email:newUser.email,
             token: accessToken
        })

    } catch (error) {
        console.error(error)
        return response(res,500,"Internal Server Error",error.message)
    }
}



const loginUser = async(req,res) =>{
    try {
         const {email,password} = req.body;
         
        //  check the existing user with email
        const user = await User.findOne({email});
        if(!user){
            return response(res,404,'User not found with this email')
        }
       
        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword){
            return response(res,404,'Invalid Password')
        }
        
        const accessToken = generateToken(user);

        res.cookie("auth_token",accessToken,{
            httpOnly: true,
            sameSite:"none",
            secure:true
        })


        return response(res,201,"User logged in successfully",{
             username:user.username,
             email:user.email
        })

    } catch (error) {
        console.error(error)
        return response(res,500,"Internal Server Error",error.message)
    }
}





module.exports = {registerUser,loginUser}