import AccountBalance from "@/models/accountSchema";
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import bcrypt from 'bcryptjs';
import type { NextApiRequest,NextApiResponse } from "next";
// import validator from 'validator'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {
        await connectDb();
    const {first_name,last_name,email,phone_number,password}=req.body;

    if(!first_name || !last_name || !email || !phone_number || !password){
        return res.status(400).json({message:'Please fill up all the details'})
    }
    
    const user=await User.findOne({
        email:email,
    });
    if(user){
        return res.status(400).json({message:"Email already exists"})
    }
    if(password.length<8){
        return res.status(400).json({message:"Password length should be more than 8"}) 
    }

    const cryptedPassword=await bcrypt.hash(password,12)
    const newuser=new User({
        name:`${first_name} ${last_name}`,
        email,
        phone:phone_number,
        password:cryptedPassword
    });
    await newuser.save()
    const userId=newuser._id;
    await AccountBalance.create({
        userId,
        balance:500
    })

    return res.json({
        message:"Register success!"
    })
    } catch (error) {
        return res.status(500).json({message:(error as Error).message})
    }

}