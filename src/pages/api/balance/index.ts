import { NextApiRequest,NextApiResponse } from "next"
import { decode } from "next-auth/jwt"
import { verifyToken } from "@/lib/fetchuser"
import User from "@/models/User"
export default async function profile(req:NextApiRequest,res:NextApiResponse){
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})

return res.json({"message":"Hello world"})
}