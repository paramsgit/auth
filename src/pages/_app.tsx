import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app"
import "@/styles/globals.css";
import FcmTokenComp from "@/components/firebaseForeground";
export default function App({
  Component,
   pageProps: { session, ...pageProps },
}:AppProps) {
  return (
    <SessionProvider session={session}>
       <ThemeProvider attribute="class">
        <FcmTokenComp/>

      <Component {...pageProps}/>
      </ThemeProvider>
    </SessionProvider>
  )
}