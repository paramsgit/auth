import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import mongoose from 'mongoose'
import User from '@/models/User'
export default async function transfer(req: NextApiRequest, res: NextApiResponse) {
    if(req.method!==("POST" || "post")){
        return res.status(400).json({message:"Invalid request"})
    }
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})
    const userId=userData.user._id

    try {
        const {amount,to}=req.body;
        if(!amount || !to){
            return res.status(400).json({message:"Insufficient Data"})
        }
        
        const session=await mongoose.startSession();
        session.startTransaction();
        const account =await AccountBalance.findOne({userId:userId}).session(session);

        if(!account || account.balance <amount){
            await session.abortTransaction();
            return res.status(400).json({message:"Insufficient Balance"})
        }

        const toUser =await User.findOne({email:to}).session(session);
        const toAccount =await AccountBalance.findOne({userId:toUser}).session(session);
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({message:"Recipient not found"})
        }

        await AccountBalance.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
        await AccountBalance.updateOne({ userId: toUser }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();        
       return res.status(200).json({message:"success"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
