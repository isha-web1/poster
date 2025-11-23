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




module.exports = {registerUser}