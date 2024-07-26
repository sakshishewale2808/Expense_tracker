import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app =express();
app.use(express.json());
app.use(cors());

import { postLogin,postSignup } from "./controllers/user.js";
import {postTransaction,getTransaction} from "./controllers/transaction.js";


const connectDB =async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URL)

    if (conn){
        console.log("mongodb connected")
    }
};
connectDB();

app.get("/",(req,res)=>{
    res.json({
        message:"welcome to expense tracker API"
    })
})
app.post("/signup",postSignup)
app.post("/login",postLogin)
app.post("/transaction",postTransaction)
app.get("/transaction",getTransaction)


const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})