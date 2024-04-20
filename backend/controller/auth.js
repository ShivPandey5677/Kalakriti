import R1 from "../models/auth.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function register(req,res){
    const username=req.body.username;
    const RR1=await R1.findOne({
        username
    })
    if(RR1)
    {
        return res.status(409).send("User already exists")
    }
      const salt=bcrypt.genSaltSync(10);
      const hashPassword=bcrypt.hashSync(req.body.password,salt)
        const RRR=await R1.findOneAndUpdate({
            username,
            email:req.body.email
        },{
            username,
            email:req.body.email,
            password:hashPassword,
            name:req.body.name
        },
    {new:true,
    upsert:true}).then((data)=>{
        console.log(data);
        return res.status(200).json(data)
    })
}
export async function login(req,res){
    const username=req.body.username;
    const RR1=await R1.findOne(
        {
            username
        }
    )
    if(!RR1){
        return res.status(404).send("User not found!");
    }
    else{
        console.log("User is available");
        console.log(await RR1);
        const checkPassword=bcrypt.compareSync(req.body.password,RR1.password)
        if(!checkPassword) return res.status(400).json("Wrong Password or Username!")
        console.log(RR1._id);
        const token=jwt.sign({id:RR1._id},"secretkey")
        const {password,...others}=RR1;
        res.cookie("accessToken",token,{
            httpOnly:true,
        }).status(200).json(others);
    }
}