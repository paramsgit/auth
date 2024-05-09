import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import TransactionQueue from '@/models/queueSchema'
export default async function balance(req: NextApiRequest, res: NextApiResponse) {
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})

    try {
        const {id}=req.body;
        if(!id){
            return res.status(400).json({response:false,message:"No id found. Please retry"})

        }
        const item=await TransactionQueue.findById(id).populate('receiver');
        if(!item){
            return res.status(400).json({response:false,message:"No item found. Please retry"})
        }
       return res.status(200).json({response:true,item:item})
    } catch (error) {
        return res.status(500).json({response:false,message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
