import mongoose from "mongoose";

export const connectDB = async () =>{
    
    try {
        const databaseUrl = process.env.DATABASE_URI;
        if(!databaseUrl){
            throw new Error("DATABASE_URI is not defined");
        }
        const conn = await mongoose.connect(databaseUrl);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log("MongoDB connection error:", error);
    }
}