import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userroute from "./routes/user.route.js"
dotenv.config({});

const app=express();
const PORT=5050;

app.get("/",(_,res)=>{
    return res.status(200).json({
        message:"I m Coming from backend",
        success:true
    })
})

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const corsOption ={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOption));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/user',userroute);
app.listen(PORT,()=>{
    connectDB();
    console.log(`Listening to server ${PORT}`);
})

//INsert code here