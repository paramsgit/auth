import  React,{useEffect, useState} from 'react';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import { OTPInput } from 'input-otp'
import { Slot,FakeCaret,FakeDash } from '@/utils/helper';
import { useSession } from 'next-auth/react';
const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');
interface IPinFormProps {
    qid:string
}

const PinForm: React.FunctionComponent<IPinFormProps> = ({qid}) => {
  const [walletPin,setwalletPin]=useState("")
  const [pinError,setpinError]=useState("")
  const [amountInWords,setamountInWords]=useState("")
  const { data: session } = useSession();
  const [sessionData,setsessionData]=useState(session)
  useEffect(() => {
    setamountInWords(numberToText.convertToText(6666))

  }, [])
  
  const getQueueItem=async()=>{ return (await fetch("/api/accountbalance")).json() }
  const queryClient=useQueryClient()
  const balanceQuery=useQuery({queryKey:['queueItem'],queryFn:getQueueItem})
  

     

      const reset=()=>{
        setwalletPin("");
        setpinError("")
      }

     
      const handleSubmit=async()=>{
      
      }

  return <>
        <div className="w-full max-w-3xl mt-8 md:mt-16 p-4 text-center bg-gray-50 border dark:border-none border-gray-100 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className=" text-md font-normal text-gray-500 "> 
            Send money to
            </h5>
            <div className="w-full flex justify-center md:px-10  text-sm  rounded-lg " role="alert">
            <div className='accountDiv max-w-sm m-2 rounded-full bg-white dark:bg-zinc-950 px-4 py-3 shadow-md'>
          <div className='flex items-center'>
            <div>
              <img className='w-10 h-19 rounded-full' src={session?.user?.image?session?.user?.image:""} alt="" />
              
            </div>
            <div className='flex flex-col mx-3'>
              <h1 className='text-gray-800 dark:text-gray-400 text-sm font-[Ubuntu]'>{session?.user?.name}</h1>
              <h2 className='text-gray-500 text-xs'>{session?.user?.email}</h2>
            </div>
          </div>
        </div>            </div>


        <div className='flex flex-col justify-center items-center w-full py-4'>
        <div className='flex items-center flex-wrap'>
          <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-400'>Amount: </p>
          <p className='text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mx-2'>₹500</p>
       
        </div>
      <div className='text-gray-500 text-sm'>
       {amountInWords}
      </div>
        </div>
            {/* <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            </p> */}
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
                
                <div className='flex mt-4 flex-wrap w-full max-w-md justify-evenly'>
             
              <button onClick={()=>handleSubmit()} type="button" className="w-full max-w-xs sm:max-w-sm flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 trc active:scale-[0.95]">
             Submit
              </button>
              </div>
              </div>
            </div>
        </div>
        {/* <div className="w-full max-w-3xl mt-8 md:mt-16 p-4 text-center bg-gray-50 border dark:border-none border-gray-100 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className=" text-md font-normal text-gray-500 "> 
            Send money to
            </h5>
            <div className="w-full flex justify-center md:px-10  text-sm  rounded-lg " role="alert">
            <div className='accountDiv max-w-sm m-2 rounded-full bg-white dark:bg-zinc-950 px-4 py-3 shadow-md'>
          <div className='flex items-center'>
            <div>
              <img className='w-10 h-19 rounded-full' src={session?.user?.image?session?.user?.image:""} alt="" />
              
            </div>
            <div className='flex flex-col mx-3'>
              <h1 className='text-gray-800 dark:text-gray-400 text-sm font-[Ubuntu]'>{session?.user?.name}</h1>
              <h2 className='text-gray-500 text-xs'>{session?.user?.email}</h2>
            </div>
          </div>
        </div>            </div>


        <div className='flex flex-col justify-center items-center w-full py-4'>
        <div className='flex items-center flex-wrap'>
          <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-400'>Amount: </p>
          <p className='text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mx-2'>₹500</p>
       
        </div>
      <div className='text-gray-500 text-sm'>
{amountInWords}
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
                
                <div className='flex mt-4 flex-wrap w-full max-w-md justify-evenly'>
             
              <button onClick={()=>handleSubmit()} type="button" className="w-full max-w-xs sm:max-w-sm flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 trc active:scale-[0.95]">
             Submit
              </button>
              </div>
              </div>
            </div>
        </div> */}

  </>;
};

export default PinForm;
