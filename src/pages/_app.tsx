import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app"
import "@/styles/globals.css";
import FcmTokenComp from "@/components/firebaseForeground";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUIStore } from "@/lib/store";
export default function App({
  Component,
   pageProps: { session, ...pageProps },
}:AppProps) 
{
  const queryClient=new QueryClient()
  const { setAllVoices,setVoice,selectedVoice } = useUIStore(state => ({
    setAllVoices: state.setAllVoices,
    setVoice: state.setVoice,
    selectedVoice: state.selectedVoice,
  }));
  useEffect(() => {
    
    const allVoicesObtained = new Promise(function(resolve, reject) {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length !== 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.addEventListener("voiceschanged", function() {
          voices = window.speechSynthesis.getVoices();
  
          resolve(voices);
        });
      }
    });
    const getVoices=async()=>{
      let Mvoice:any= await allVoicesObtained
      if(Mvoice)
      {setAllVoices(Mvoice)
        const googleUkEnglishMaleVoice = Mvoice.find((vc:any) => vc.name === 'Google UK English Male');
        console.log(googleUkEnglishMaleVoice);
        if(!selectedVoice)
        setVoice(googleUkEnglishMaleVoice)
      }
    }
  
    if (global?.window){
      try {
        getVoices()
      } catch (error) {
        console.log(error)
      }
    }
  
    
  }, [])
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