import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app"
import "@/styles/globals.css";
import FcmTokenComp from "@/components/firebaseForeground";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

export default function App({
  Component,
   pageProps: { session, ...pageProps },
}:AppProps) 
{
  const queryClient=new QueryClient()
  return (
    <SessionProvider session={session}>
       <ThemeProvider attribute="class">
       <QueryClientProvider client={queryClient}>
        <FcmTokenComp/>

      <Component {...pageProps}/>
      </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}