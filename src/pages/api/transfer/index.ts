import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import mongoose from 'mongoose'
import User from '@/models/User'
export default async function transfer(req: NextApiRequest, res: NextApiResponse) {
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})
    const userId=userData.user._id

    try {
        // const {amount,to}=req.body;
        // if(!amount || !to){
        //     return res.status(400).json({message:"Insufficient Data"})
        // }
        
        const to="param11650@gmail.com"
       const session=await mongoose.startSession();
        session.startTransaction();
        console.log(userId)
        const account =await AccountBalance.findOne({userId:userId}).session(session);
        console.log("here")
        const toUser =await User.findOne({userId:userId}).session(session);
        console.log("there")
        const toAccount =await AccountBalance.findOne({userId:toUser}).session(session);
        console.log(toAccount)

        
       return res.status(200).json({mesage:"sucess"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
