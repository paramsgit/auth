import { NextPageContext } from "next";
import { getSession, useSession,signIn,signOut } from "next-auth/react";


export default function Home() {

const {data:session}=useSession();
console.log(session)

  return (
   <h1 className="text-red-500">
    Hello world

    <button onClick={()=>signIn()}>Signin</button>
    <button onClick={()=>signOut()}>signOut</button>
   </h1>
  );
}

export async function getServerSideProps(ctx:NextPageContext) {
  const session=await getSession(ctx);
  return{
    props:{
      session
    }
  }
}