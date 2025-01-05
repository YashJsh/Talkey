import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const databaseUrl = process.env.DATABASE_URI;
        if(!databaseUrl){
            throw new Error("DATABASE_URI is not defined");
        }
        await mongoose.connect(databaseUrl);
    }catch(error){
        console.log("MongoDB connection error:", error);
    }
}