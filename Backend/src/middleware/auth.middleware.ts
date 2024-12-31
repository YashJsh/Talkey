import jwt from "jsonwebtoken";
import UserModel from "../models/user.modals";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { connectDB } from "../lib/db";

interface JwtPayload {
    userId: string;
}

export const protectedRoute : RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    await connectDB();
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(403).json({message : "Unauthorized User"})
            return;
        }
        const token = authHeader.split(' ')[1];
        const JWT_SECRET = process.env.JWT_SECRET;
        if(JWT_SECRET === undefined){
            res.status(500).json({message: "JWT Secret is not defined"})
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if(!decoded){
            res.status(403).json({message: "Unauthorized User"})
            return;
        }

        const user = await UserModel.findById(decoded.userId);
        if(!user){
            res.status(404).json({message: "User not found"})
            return;
        }
        req.user = user;
        next();
    }catch(error : any){
        console.log("Error in protected route", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}