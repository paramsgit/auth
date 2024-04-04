import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){
const {pathname, origin} = req.nextUrl; 
const session = await getToken({
    req,
    secret:process.env.NEXTAUTH_SECRET,
    secureCookie:process.env.NODE_ENV==="production"
})

if(pathname == "/"){
    if(!session) return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth`)
    
}
if(pathname == "/auth"){
    if(session) return NextResponse.redirect(`${origin}`)
}

const userToken = req.cookies.get('next-auth.session-token')?.value;
console.log(userToken)
console.log(session)
console.log("here i am")
if(!userToken) {
   return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth`)
}

else {
//  const userData
}

}



export const config = {
  matcher:[ '/api/:path*','/']
}