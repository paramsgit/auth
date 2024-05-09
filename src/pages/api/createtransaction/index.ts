import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import TransactionHistory from '@/models/transactionHistory'
import mongoose from 'mongoose'
import User from '@/models/User'
import TransactionQueue from '@/models/queueSchema'
export default async function transfer(req: NextApiRequest, res: NextApiResponse) {
    if(req.method!==("POST" || "post")){
        return res.status(400).json({message:"Invalid request",response:false})
    }
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login",response:false})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message,response:false})
    const userId=userData.user._id

    try {
        const {amount,to}=req.body;
        if(!amount || !to || typeof to !== 'string'){
            return res.status(400).json({message:"Insufficient Data",response:false})
        }
        const toUser =await User.findOne({email:to})
        if(!toUser){
            return res.status(400).json({message:"Recipient not found",response:false}) 
        }
        if((toUser._id).equals(userId)){
            return res.status(400).json({message:"Can't transfer to your own account",response:false}) 
 
        }

        const queueItem= new TransactionQueue({
            receiver:toUser,
            amount:amount
        })
        await queueItem.save();

        
          
       return res.status(200).json({message:"Added to queue",queueItem,response:true})
    } catch (error) {
        return res.status(500).json({message:(error as Error).message,response:false})
    }

return res.json({"message":"Hello world"})
}
