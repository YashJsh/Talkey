import  { Request, Response, RequestHandler } from "express";
import UserModel from "../models/user.modals";
import bcrypt from "bcryptjs"
import { connectDB } from "../lib/db";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary";


export const signUp: RequestHandler = async (req: Request, res: Response) => {
    await connectDB();
    const {name, email, password} = req.body;
    try {
        if(password.length< 6){
            res.status(400).json({message: "Password must be at least 6 characters long"});
            return;
        }
        const user = await UserModel.findOne({email});
        if(user){
            res.status(400).json({success : false, message: "Email already exists"});
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            fullName : name,
            email, 
            password : hashPassword
        })
        if(!newUser){
            res.status(400).json({sucess : false, message: "Unable to create User"})
            return;
        }
        const userId = newUser._id;
        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret){
            res.status(500).json({message: "JWT Secret is not defined"})
            return;
        }
        const token = jwt.sign({userId}, jwtSecret, {expiresIn: "2h"});
        res.status(201).json({
            success : true,
            message: "User created successfully",
            token : token
        });
        return;
    } catch (error : any) {
        console.log("Error in sign up of user", error.message);
        res.status(500).json({message: "Internal Server Error"});
        return;
    }
};

export const signIn : RequestHandler = async (req : Request, res : Response) => {
    await connectDB();
    const {email, password} = req.body;
    
    if(!email || !password){
        res.status(400).json({message: "Email and Password are required"});
        return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        res.status(500).json({message: "JWT Secret is not defined"})
        return;
    } 
    try {
        const user = await UserModel.findOne({
            email : email
        })
        if(!user){
            res.status(400).json({message: "Invalid Credentials"});
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.status(400).json({message: "Invalid Credentials"});
            return;
        }
        const userId = user._id;
        const token = jwt.sign({userId}, jwtSecret, {expiresIn: "2h"});
            res.status(201).json({
                success : true,
                message: "User created successfully",
                token : token
            });
        return;
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const signOut = (req : Request, res : Response) => {
    res.send('Signout route');
};

export const updateProfile : RequestHandler = async (req : Request, res : Response) => {
    await connectDB();
    try{
        const { profilePic } = req.body;
        const userId = req.user.id;
        if(!profilePic){
            res.status(400).json({message : "Profile not found"});
            return;
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            profilepic : uploadResponse.secure_url
        }, {new : true});
        res.status(200).json({message: "UserUpdatedSuccessfully" , data : updateUser})
    }catch(error){
        console.log("Error in updating profile:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const checkAuth = (req : Request, res : Response) => {
    try {
        res.status(200).json(req.user);
    } catch (error : any) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};