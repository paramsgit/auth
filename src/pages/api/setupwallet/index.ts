import { NextApiRequest,NextApiResponse } from "next"
import { decode } from "next-auth/jwt"
import { verifyToken } from "@/lib/fetchuser"
import bcrypt from 'bcryptjs';
import AccountBalance from "@/models/accountSchema";
import User from "@/models/User"
export default async function profile(req:NextApiRequest,res:NextApiResponse){
    const userToken=req.cookies['next-auth.session-token']
    if(!userToken){
        return res.status(401).json({error: "Please login"})
    }
    const userData=await verifyToken(userToken)
    if(!userData.user)
    return res.status(userData.status?userData.status:500).json({message:userData.message})
    const userId=userData.user._id;
    try {
        if(req.method!=("POST" || "post")){ return res.status(400).json({message:"Bad request",response:false})}

        const account =await AccountBalance.findOne({userId:userId})
        if(account){ return res.status(400).json({message:"Wallet is already active.",response:false})}

        const {walletPin}=req.body
        if(walletPin.length!=6 || !(/^\d+$/.test(walletPin))){ return res.status(400).json({message:"Retry with some new PIN",response:false})}
        const cryptedwalletPin=await bcrypt.hash(walletPin,12)

        const newAccount=new AccountBalance({
            userId:userId,
            balance:500,
            pin:cryptedwalletPin
        });
        
        await newAccount.save()

        return res.status(200).json({message:"Wallet created Successfully",response:true})

        
    } catch (error) {
        return res.status(500).json({response:false,message:(error as Error).message})
    }

return res.json({"message":"Hello world"})
}