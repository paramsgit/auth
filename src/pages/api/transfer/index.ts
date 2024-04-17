import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import TransactionHistory from '@/models/transactionHistory'
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
        if(!amount || !to || typeof to !== 'string'){
            return res.status(400).json({message:"Insufficient Data"})
        }
        const toUser =await User.findOne({email:to})
        if(!toUser){
            return res.status(400).json({message:"Recipient not found"}) 
        }

        const session=await mongoose.startSession();
        session.startTransaction();

        const transaction= new TransactionHistory({
            sender:userId,
            receiver:toUser,
            amount:amount
        })
        await transaction.save()
        console.log(transaction)

        const account =await AccountBalance.findOne({userId:userId}).session(session);

        if(!account || account.balance <amount){
            await session.abortTransaction();
            const updatedTransaction = await TransactionHistory.findOneAndUpdate(
                { _id: transaction._id }, // Filter by the transaction ID
                { $set: { description: "Insufficient Balance" } }, // Update the description field
                { new: true } // Return the updated document
            );
            return res.status(400).json({message:"Insufficient Balance"})
        }

       
        const toAccount =await AccountBalance.findOne({userId:toUser}).session(session);
        if(!toAccount){
            await session.abortTransaction();
            const updatedTransaction = await TransactionHistory.findOneAndUpdate(
                { _id: transaction._id }, // Filter by the transaction ID
                { $set: { description: "Recipient's wallet was not found" } }, // Update the description field
                { new: true } // Return the updated document
            );
            return res.status(400).json({message:"Recipient was unable to receive money"})
        }

        await AccountBalance.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
        await AccountBalance.updateOne({ userId: toUser }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction(); 
        const updatedTransaction = await TransactionHistory.findOneAndUpdate(
            { _id: transaction._id }, // Filter by the transaction ID
            { $set: { description: `Successfully transferred ${amount} to ${to}.`,completed:true } }, // Update the description field
            { new: true } // Return the updated document
        );       
       return res.status(200).json({message:"success"})
    } catch (error) {
        console.log(error,"we came here")
        return res.status(500).json({message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
