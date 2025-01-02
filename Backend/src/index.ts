import express from "express";
import authrouter from "./routes/auth.route"
import messagerouter from "./routes/messages.route"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin : "http://localhost:5173",
    credentials : true
}))

app.use("/api/auth", authrouter);
app.use("/api/messages", messagerouter);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
}); 
