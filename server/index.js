import express from  'express';
import dotenv from  'dotenv'
import { UserRouter } from './routes/user.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { UserChat } from './routes/chats.js';
dotenv.config()

const  app=express();
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true

}))
app.use(cookieParser())

app.use('/auth',UserRouter)
app.use('/analyze',UserChat)
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
app.listen(process.env.PORT, ()=> {console.log(`Server started`)})

