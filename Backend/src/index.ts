import express from "express";
import authrouter from "./routes/auth.route";
import messagerouter from "./routes/messages.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket";

require("dotenv").config();


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://talkey-kappa.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authrouter);
app.use("/api/messages", messagerouter);


server.listen(5001, () => {
  console.log("Server is running on port 5001");
});
