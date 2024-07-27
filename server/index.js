import express  from 'express';
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { PostSignup,PostLogin } from './controllers/user.js';
import { PostTransaction,getTransactions ,deleteTransaction} from './controllers/transaction.js';

const app = express ();
app.use(express.json());
app.use(cors());

//connect mongodb
 const connectDB =async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    if(conn){
        console.log(`mongodb is connected sucessfully`);
    }
 }
 connectDB();

 app.get('/',(req,res)=>{
    res.json({
     message:`welcome to expense tracker API`
    })
 })
 app.post("/signup", PostSignup )
app.post("/login",PostLogin)
app.post("/transaction",PostTransaction)
app.get("/transactions",getTransactions )
app.delete("/transaction/:id",deleteTransaction)



const PORT = process.env.PORT || 5000;
  app.listen (PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
  })