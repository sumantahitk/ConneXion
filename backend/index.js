import express, { urlencoded } from "express";
import cors from "cors";
import cookeiParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import messageRoute from "./routes/message.js";
import bodyParser from "body-parser";

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
app.use(bodyParser.json());
app.use(cookeiParser());
app.use(urlencoded({extended:true}));

const corsOption={
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOption));

//route api
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/post",postRoute); 
app.use("/api/v1/message",messageRoute);

app.get("/abc",(req,res)=>{
    res.send(" hello I am root you contacted the root path");
});
app.listen(port,()=>{
    connectDB();
    console.log(`server listen at port ${port}`);
})