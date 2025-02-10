//importing modules
import express from "express";
import Dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todo.routes.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./lib/database.js";

//creating the server
const app=express();
Dotenv.config();
const port = process.env.PORT || 5000


//middlewares 
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth",authRouter);
app.use("/api/v2/todo",todoRouter);

//creating a simple server checking api

app.get("/", (req,res)=>{
    res.status(200).json({message:"SERVER IS WORKING FINE"})
})

 
//listening the server 
app.listen((port) , ()=>{
    console.log(`server started at port ${port}`)
    connectToDatabase();
})




