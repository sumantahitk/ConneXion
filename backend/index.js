import express, { urlencoded } from "express";
import cors from "cors";
import cookeiParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
dotenv.config({});

const app=express();
const port=process.env.port || 3000;
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"I'm coming from backend",
        success:true,
    })
})

//middlewares
app.use(express.json());
app.use(cookeiParser());
app.use(urlencoded({extended:true}));

const corsOption={
    origin:'http://localhost:5173',
    Credential:true
}
app.use(cors(corsOption));




app.listen(port,()=>{
    connectDB();
    console.log(`server listen at port ${port}`);
})