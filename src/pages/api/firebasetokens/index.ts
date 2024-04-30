import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from '@/lib/fetchuser'
import AccountBalance from '@/models/accountSchema'
import FirebaseToken from '@/models/firebaseTokenSchema'

export default async function balance(req: NextApiRequest, res: NextApiResponse) {
    
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})
    const userId=userData.user._id
    try {
        const {token}=req.body;

        const existingToken = await FirebaseToken.findOne({ user: userId });

        if (existingToken) {
            // If a token exists, update it with the current token
            existingToken.token = token;
            await existingToken.save();
        } else {
            // If no token exists, create a new entry
            const newToken = new FirebaseToken({
                user: userId,
                token: token
            });
            await newToken.save();
        }
        
       
        res.status(200).json({response:true,message:"Token saved successfully"})
        
        return
    } catch (error) {
        return res.status(500).json({response:false,message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}
