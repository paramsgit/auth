import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'

export default async function balance(req: NextApiRequest, res: NextApiResponse) {
    
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})

    try {
        const accountData=await AccountBalance.findOne({userId:userData.user._id})
        if(!accountData){
            return res.status(200).json({response:false})
        }
       
        res.status(200).json({response:true,balance:accountData.balance})
        
        

        return
    } catch (error) {
        return res.status(500).json({response:false,message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
