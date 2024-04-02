import connectDb from "@/utils/connectDb";
import type { NextApiRequest,NextApiResponse } from "next";
import validator from 'validator'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    await connectDb();
    const {first_name,last_name,email,phone_number,password}=req.body;

    if(!first_name || !last_name || !email || !phone_number || !password){
        return res.status(400).json({message:'Please fill up all the details'})
    }
    if(!validator){}
}