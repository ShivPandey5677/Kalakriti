import express from "express"
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import cookiep from "cookie-parser";
import mongo from "mongoose"
import multer from "multer"
import authRoutes from "./routes/auth.js"

const app=express();
app.use(cookiep())
app.use(express.json())
const PORT=process.env.PORT||5001;
mongo.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("connected to mongo");
})
app.use("/api/auth",authRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
