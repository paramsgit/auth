import { NextPageContext } from "next";
import { getSession, useSession,signIn,signOut } from "next-auth/react";
import Layout from "./layout";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
const queryClient=new QueryClient()
export default function Home() {

const {data:session}=useSession();


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