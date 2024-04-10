import type { NextApiRequest, NextApiResponse } from 'next'
 import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
export default async function balance(req: NextApiRequest, res: NextApiResponse) {
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    console.log(userData.user._id)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})

    try {
        const accountData=await AccountBalance.findOne({userId:userData.user._id})
       return res.status(200).json({balance:accountData.balance})
    } catch (error) {
        return res.status(500).json({message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
