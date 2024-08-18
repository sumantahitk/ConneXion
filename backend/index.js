import express, { urlencoded } from "express";
import cors from "cors";
import cookeiParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import messageRoute from "./routes/message.js";
import bodyParser from "body-parser";
import { app,server } from "./socket/socket.js";
import path from "path";


dotenv.config({});

// const app=express();
const port=process.env.PORT || 8000;

const __dirname = path.resolve();


// app.get("/",(req,res)=>{
//     return res.status(200).json({
//         message:"I'm coming from backend",
//         success:true,
//     })
// })

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cookeiParser());
app.use(urlencoded({extended:true}));

const corsOption={
    // origin:'http://localhost:5173',
    origin:process.env.URL,
    credentials:true,
}
app.use(cors(corsOption));

//route api
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/post",postRoute); 
app.use("/api/v1/message",messageRoute);




//for deployment
app.use(express.static(path.join(__dirname,"frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})


app.get("/abc",(req,res)=>{
    res.send(" hello I am root you contacted the root path");
});
server.listen(port,()=>{
    connectDB();
    console.log(`server listen at port ${port}`);
})