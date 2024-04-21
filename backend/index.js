import express from "express"
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import cookiep from "cookie-parser";
import mongo from "mongoose"
import multer from "multer"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import bidRoutes from "./routes/bidder.js"
const app=express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(cookiep())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",}
))
const PORT=process.env.PORT||5001;
mongo.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("connected to mongo");
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  const upload = multer({ storage: storage })
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/bidders",bidRoutes)
app.use("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    console.log(file)
    res.status(200).json(file.filename)
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
