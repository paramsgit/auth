import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import TransactionHistory from '@/models/transactionHistory'
export default async function balance(req: NextApiRequest, res: NextApiResponse) {
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){ return res.status(401).json({error: "Please login"}) }
    const userData=await verifyToken(userToken)
    
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})
    const userId=userData.user._id

    try {
        const transactions=await TransactionHistory.find({
            $or: [
                { "sender": userId },
                { "receiver": userId, "completed": true }
            ]
        }).sort({ "createdAt": 1 }).populate('sender receiver');

        const reversedTransactions=transactions.reverse();
        
            
       
        return res.status(200).json({transactions:reversedTransactions,userId:userId})
   
    } catch (error) {
        return res.status(500).json({message:(error as Error).message})
    }

// return res.json({"message":"Hello world"})
}
