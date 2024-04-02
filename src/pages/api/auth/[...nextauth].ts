import NextAuth from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import { Adapter } from 'next-auth/adapters'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    // OAuth authentication providers...
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
   ],
   secret:process.env.NEXTAUTH_SECRET,
   session:{
    strategy:"jwt",
   },
   callbacks:{
    async jwt({ token, user, account, profile }) {
      if(user){
        token.provider=account?.provider
      }
      return token
    },
    async session({ session, token }:{session:any; token:JWT}) {
      if(session.user){
        session.user.provider=token.provider
      }
      return session
    }
   }
})