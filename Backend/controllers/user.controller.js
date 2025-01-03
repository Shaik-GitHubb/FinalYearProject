import { farmerSch } from "../models/farmersTest.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {username,email,password,FirstName,LastName,Location} = req.body;
        if(!username || !password || !email || !FirstName || !LastName || !Location){
            return res.status(401).json({
                message:"Please Fill All fields",
                success:false,
            })
        }
        const user= await farmerSch.findOne({email:email});
        if(user){
            return res.status(401).json({
                message:"Try Different Account",
                success:false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await farmerSch.create({
            username:username,
            email:email,
            password:hashedPassword,
            FirstName:FirstName,
            LastName:LastName,
            Location:Location
        })
        return res.status(201).json({
            message:"Account Created Successfully",
            success:true,
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Please Fill All fields",
                success:false,
            })
        }
        let user = await farmerSch.findOne({email:email});
        if(!user){
            return res.status(401).json({
                message:"Incorrect Email or Password",
                success:false,
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect Email or Password",
                success:false,
            })
        };

        user = {
            _id:user._id,
            username:user.username,
            email:user.email,
            FirstName:user.FirstName,
            LastName:user.LastName,
            Location:user.Location
        }

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables");
        }

        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});

        return res.cookie('token',token,{httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
            message:`Welcome back ${user.username}`,
            success:true,
            user
        });
    } catch (error) {
        console.log(error);
    }
};
export const logout = async (req,res)=>{
    try {
        return res.cookie("token","",{maxAge:0}).json({
            message:"Logout Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}