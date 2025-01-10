import express from "express";
import authrouter from "./routes/auth.route"
import messagerouter from "./routes/messages.route"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"
import { app, server } from "./lib/socket";
import path from "path";

require('dotenv').config();

const __dirname = path.resolve();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin : "http://localhost:5173",
    credentials : true
}))

app.use("/api/auth", authrouter);
app.use("/api/messages", messagerouter);

if(process.env.NODE_ENV !== "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
    })
}

server.listen(3000, ()=>{
    console.log("Server is running on port 3000");
}); 
