import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateToken = (userId : string, res : Response) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET){
        return;
    }
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};