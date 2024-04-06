import { NextPageContext } from "next";
import { getSession, useSession,signIn,signOut } from "next-auth/react";
import Layout from "./layout";


export default function Home() {

const {data:session}=useSession();
console.log(session)

  return (
  <Layout/>
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