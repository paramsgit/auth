import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import mongoose from 'mongoose'
export default async function transfer(req: NextApiRequest, res: NextApiResponse) {
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    console.log(userData.user._id)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})

    try {
        const {amount,to}=req.body;
        if(!amount || !to){
        }
       const session=await mongoose.startSession();
        session.startTransaction();

       return res.status(200).json({})
    } catch (error) {
        return res.status(500).json({message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
