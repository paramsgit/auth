import { NextPageContext } from "next";
import { getSession, useSession,signIn,signOut } from "next-auth/react";
import Layout from "./layout";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient=new QueryClient()
export default function Home() {

const {data:session}=useSession();
console.log(session)

  return (
    <QueryClientProvider client={queryClient}>
  <Layout/>

  {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
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