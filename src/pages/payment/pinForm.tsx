import  React,{useEffect, useState} from 'react';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import { OTPInput,SlotProps } from 'input-otp'
import { Slot,FakeCaret,FakeDash } from '@/utils/helper';
import { useSession } from 'next-auth/react';
import ConfettiExplosion from 'react-confetti-explosion';
import { playSuccessSound } from '@/utils/audioPlayer';
import { cn } from '@/utils/cn';

const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');
interface IPinFormProps {
    qid:string
}
type TransactionDataType = {
  item: any; // Set the type of 'item' to any
};
const PinForm: React.FunctionComponent<IPinFormProps> = ({qid}) => {
  const [walletPin,setwalletPin]=useState("")
  const [pinError,setpinError]=useState("")
  const [trans,settrans]=useState(false)
  const [isSubmitting,setisSubmitting]=useState(false)
  const [queryError,setqueryError]=useState("")
  const [transactionData,settransactionData]=useState<TransactionDataType>({item:undefined})
  const [amountInWords,setamountInWords]=useState("")
  const [isExploding, setIsExploding] = useState(false);
  const { data: session } = useSession();
  const [sessionData,setsessionData]=useState(session)
  useEffect(() => {
    
    const getQueueItem=async()=>{
      try {
        const response=await fetch('/api/getqueueitem',{
          method:'POST',
          headers:{
          Accept:'application.json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:qid})
      })
      const result=await response.json()
      console.log(result)
      if(response.ok){
        if(result.item)
        settransactionData({item:result.item})
      else setqueryError("Oops! Something went wrong");
      }else{
        console.log(result)
      result.message?setqueryError(result.message):setqueryError("Oops Something went wrong")      }
      } catch (error) {
        console.log(error)
        setqueryError("Something went wrong")
      }
     
    }
    getQueueItem()
  }, [])

 


  
 

     
      const convertToWords=(e:number)=>{return numberToText.convertToText(e,{case:"upperCase"})
    }
      const reset=()=>{
        setwalletPin("");
        setpinError("")
      }

     
      const handleSubmit=async()=>{
        setpinError("")
        settrans(false)
        setisSubmitting(true)
        try {
          const response=await fetch('/api/transfer',{
            method:'POST',
            headers:{
            Accept:'application.json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({id:qid,pin:walletPin})
        })
        const result=await response.json()
        if(result.message){
          setpinError(result.message)
        }
        if(response.ok){
          settrans(true)
          setIsExploding(true)
          playSuccessSound();
        }
        console.log(result)
        
        } catch (error) {
          console.log(error)
        }

        setisSubmitting(false)
      }

       function Slot(props: SlotProps) {
        return (
          <div
            className={cn(
              'relative w-10 h-14 md:w-16 md:h-[5.25rem] text-[2rem] md:text-[3rem]',
              'flex items-center justify-center',
              'transition-all duration-300',
              'border-border border-gray-400 border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
              'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
              'outline outline-0 outline-accent-foreground/20',
              { 'outline-4 outline-accent-foreground': props.isActive },
              'outline-blue-700 dark:outline-white'
            )}
          >
            {props.char !== null && <div>{props.char}</div>}
            {props.hasFakeCaret && <FakeCaret />}
          </div>
        )
      }
       
      // You can emulate a fake textbox caret!
      function FakeCaret() {
        return (
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
            <div className="w-px h-8 bg-white" />
          </div>
        )
      }
       
      // Inspired by Stripe's MFA input.
      function FakeDash() {
        return (
          <div className="flex w-10 justify-center items-center">
            <div className="w-3 h-1 rounded-full bg-border bg-gray-400" />
          </div>
        )
      }

  return <>

         { queryError ?
         queryError
        :
        (!(transactionData.item )
        ?
        <div className="w-full max-w-3xl mt-8 md:mt-16 p-4 text-center bg-gray-50 border dark:border-none border-gray-100 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className=" text-md font-normal inline-block bg-[#eee] dark:bg-[#111827f2] rounded-2xl text-transparent text-xs h_skelton3"> 
        Send money to
        </h5>
        <div className="w-full flex justify-center md:px-10  text-sm  rounded-lg " role="alert">
        <div className='accountDiv max-w-sm m-2 rounded-full bg-white dark:bg-zinc-950 px-4 py-3 shadow-md'>
      <div className='flex items-center'>
        <div className='h_skelton3 w-10 h-10 bg-[#eee] dark:bg-[#111827f2] rounded-full'>
        </div>
        <div className='flex flex-col mx-3'>
          <div className='bg-[#eee] dark:bg-[#111827f2] rounded-2xl text-transparent text-sm h_skelton3 inline-block max-w-24'>ja</div>
          <h2 className='bg-[#eee] dark:bg-[#111827f2] rounded-2xl text-transparent text-xs h_skelton3 inline-block my-1'>Random text for skelton Loading</h2>
        </div>
      </div>
    </div>            </div>


    <div className='flex flex-col justify-center items-center w-full py-4'>
    <div className='flex items-center flex-wrap bg-[#eee] dark:bg-[#111827f2] rounded-3xl text-transparent text-xs h_skelton3'>
      <p className='text-xl md:text-2xl text-transparent'>Amount: </p>
      <p className='text-2xl md:text-3xl text-transparent mx-2'>₹500</p>
   
    </div>
  <div className='bg-[#eee] dark:bg-[#111827f2] rounded-2xl text-transparent text-xs h_skelton3 max-h-5 my-2'>
   {amountInWords}
  </div>
    </div>
       
        <div className="items-center justify-center flex flex-col mt-6">

          

            <div className='w-full max-w-sm flex justify-evenly'>
            <div className='h-14 w-1 bg-gray-200 dark:bg-gray-600 rounded-xl h_skelton3'></div>
            <div className='h-14 w-1 bg-gray-200 dark:bg-gray-600 rounded-xl h_skelton3'></div>
            <div className='h-14 w-1 bg-gray-200 dark:bg-gray-600 rounded-xl h_skelton3'></div>
            <div className='h-14 w-1 bg-gray-200 dark:bg-gray-600 rounded-xl h_skelton3'></div>
            <div className='h-14 w-1 bg-gray-200 dark:bg-gray-600 rounded-xl h_skelton3'></div>
            <div className='h-14 w-1 bg-gray-200 dark:bg-gray-600 rounded-xl h_skelton3'></div>
           
            </div>
           

            <div className='mt-6 w-full max-w-md flex flex-col items-center'>
            
            <div className='flex mt-4 flex-wrap w-full max-w-md justify-evenly'>
         
          <button  type="button" className="h_skelton3 w-full max-w-xs sm:max-w-sm flex justify-center text-transparent bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700  cursor-default">
         Submit
          </button>
          </div>
          </div>
        </div>
    </div>
          
          :<div className="w-full max-w-3xl mt-8 md:mt-16 p-4 text-center bg-gray-50 border dark:border-none border-gray-100 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className=" text-md font-normal text-gray-500 "> 
          Send money to
          </h5>
          <div className="w-full flex justify-center md:px-10  text-sm  rounded-lg " role="alert">
          <div className='accountDiv max-w-sm m-2 rounded-full bg-white dark:bg-zinc-950 px-4 py-3 shadow-md'>
        <div className='flex items-center'>
          <div>
            <img className='w-10 h-19 rounded-full' src={transactionData.item?.receiver?.image} alt="" />
            
          </div>
          <div className='flex flex-col mx-3'>
            <h1 className='text-gray-800 dark:text-gray-400 text-sm font-[Ubuntu]'>{transactionData.item?.receiver?.name}</h1>
            <h2 className='text-gray-500 text-xs'>{transactionData.item?.receiver?.email}</h2>
          </div>
        </div>
      </div>            </div>


      <div className='flex flex-col justify-center items-center w-full py-4'>
      <div className='flex items-center flex-wrap'>
        <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-400'>Amount: </p>
        <p className='text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mx-2'>₹{transactionData.item?.amount}</p>
     
      </div>
    <div className='text-gray-500 text-sm'>
{convertToWords(transactionData.item?.amount)}
    </div>
      </div>
          
          <div className="items-center justify-center flex flex-col mt-6">

            

              <OTPInput onComplete={(e)=>{}}
              value={walletPin} onChange={(e)=>setwalletPin(e)}
              maxLength={6}
              containerClassName={`  group flex flex-col items-center has-[:disabled]:opacity-30`}
              render={({ slots }) => (
                  <>
                  <div className='w-full flex justify-start my-4'>
              <p className='text-base text-gray-500 dark:text-gray-400'>Enter your PIN</p>
            </div>
                  <div className='flex items-center'>
                  <div className="flex">
                      {slots.slice(0, 3).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                      ))}
                  </div>
              
                  <FakeDash />
              
                  <div className="flex">
                      {slots.slice(3).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                      ))}
                  </div>
                  </div>
                  </>
              )}
              />
             

              <div className='mt-6 w-full max-w-md flex flex-col items-center'>
              
              <div className={`${pinError.length ? "opacity-100":"text-transparent"} trc max-w-xs w-full opacity-0 px-4 py-2 text-xs text-green-800 rounded-lg ${!trans && "bg-red-50 text-red-800 dark:text-red-400"} bg-green-50 dark:bg-gray-900/40 dark:text-green-400 select-none`} role="alert">
                  {pinError}
                 
                  <span className='text-transparent'>_</span>
                </div>

              <div className='flex mt-4 flex-wrap w-full max-w-md justify-evenly'>
           
            <button onClick={()=>handleSubmit()} type="button" className={`${isSubmitting && "disabled"} w-full max-w-xs sm:max-w-sm flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 trc active:scale-[0.95]`}>
           {isSubmitting?"Submitting":"Submit"}
           {isExploding && <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={1600} onComplete={()=>setIsExploding(false)}/>}
            </button>
           
            </div>
            </div>
          </div>
      </div>)}
        

        

  </>;
};

export default PinForm;
