import { NextApiRequest,NextApiResponse } from "next"
import { decode } from "next-auth/jwt"
import { verifyToken } from "@/lib/fetchuser"

import User from "@/models/User"
import connectDb from "@/utils/connectDb"
export default async function getUsers(req:NextApiRequest,res:NextApiResponse){
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})
    
    try {
        await connectDb()
        const {query}=req.query;
        if(!query)
        return res.json({allUsers:[],message:"NO user found"})  
        const allUsers= await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive regex match for name
                { email: { $regex: query, $options: 'i' } } // Case-insensitive regex match for email
            ]
        }).select("-password");
        return res.json({allUsers})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:(error as Error).message,})
    }
    
}