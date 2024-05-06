import { useUIStore } from "@/lib/store";

// const { setAllVoices } = useUIStore(state => ({
//     setAllVoices: state.setAllVoices,
//   }));

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
  export const getVoices=async()=>{
    console.log("this is allvoices being called")
    if (global?.window){
        try {
        let Mvoice:any= await allVoicesObtained
        if(Mvoice){
            // setAllVoices(Mvoice)
        }

        } catch (error) {
          console.log(error)
        }
      }
  }
 getVoices()