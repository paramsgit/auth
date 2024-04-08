// var jwt = require('jsonwebtoken');
import { decode } from "next-auth/jwt";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";

export const verifyToken=async(props:string)=>{
    const JWT_SECRET=process.env.NEXTAUTH_SECRET
    if(!JWT_SECRET){
        return ({message:"System Error, 4561",status:500,user:null})
    }
    const userToken=props
    if(!userToken){
        return ({message:"please Login",status:401,user:null})
    }

    try {
        await connectDb()
       const data=await decode({token:userToken,secret:JWT_SECRET}) 
       if(!data?.email)
            return ({message:"please Login",status:401,user:null})
        const user=await User.findOne({email:data.email},{password:0})
        if(!user)
        return ({message:"please Login",status:401,user:null})
        return ({message:"User Found",status:200,user:user})
       
        
       
    } catch (error) {
        console.log(error)
        return ({message:(error as Error).message,status:500,user:null})
    }
}
// const fetchuser = async(req, res, next) => {}
//     const token2 = req.cookies.access_token;
//     console.log(token2)
//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).json({ error: "Please login",response:false })
//     }
//     try {const data =  jwt.verify(token, JWT_SECRET);
        
//         // if (data.id && !data.room){
//         //     const usera = await User.findById(data.id)
//         //     console.log(usera.room)
//         //     res.json({ error: "Please book room ",userkaname:usera.name,response:false })
//         // }
//         if(!data.id){
//             res.json({ error: "invalid Session",response:false})
//         }
//         else{
//             const usera = await User.findById(data.id)
//             if(!usera.room){
//                 res.json({ error: "Please book room ",userkaname:usera.name,response:false })
//             }else{
//                 let id=data.id
//                 req.user = id;
//                 const room = await Room.find({ user: req.user })
//                 req.room_no=room.room_no
//                 next();
//             }
           
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(401).json({ error: "invalid Session",response:false })
//     }

// }
// module.exports = fetchuser;