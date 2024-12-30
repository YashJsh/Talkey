import express from "express";
import authrouter from "./routes/auth.route"
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authrouter);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
}); 
