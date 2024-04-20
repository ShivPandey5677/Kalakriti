import R1 from "../models/product.js"
import jwt from "jsonwebtoken";
export async function getProducts(req,res){
    const token=req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In")
    jwt.verify(token,"secretkey",async(err,userInfo)=>{
      const RR1=await R1.find({
        userid:userInfo.id
      })
      if(RR1){
        return res.status(200).json(RR1);
      }
      return res.status(404).json("not found!!")
    } )
}
export async function addProducts(req,res){
 const token=req.cookies.accessToken;
 if(!token) return res.status(401).json("Not Logged In")
 jwt.verify(token,"secretkey",(err,userInfo)=>{
if(err) return res.status(403).json("Token is invalid");
const products=req.body;
products.property.forEach(async(product)=>{
    const RR2=await R1.findOneAndUpdate({
        userid:userInfo.id,
        product_name:product.name
    },{
        
    })
})

})
}