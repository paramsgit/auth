import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import react, { useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');
interface ITransactionFormProps {
  fnss:()=>Promise<void>
}
interface userTemplate{
  
    "_id": string,
    "name": string,
    "email": string,
    "image": string,
    "emailVerified"?: boolean,
    "phone"?: string,
    "role"?: string,
    "__v"?: number

}

const getAllUsers=async()=>{
return (await fetch("http://localhost:3000/api/getUsers")).json()
}

const TransactionForm: React.FunctionComponent<ITransactionFormProps> = ({fnss}) => {

    const [ReceiverId,setReceiverId]=useState("")
    const [amount,setamount]=useState("")
    const [inputFocused,setinputFocused]=useState(false)
    const [inputFocused2,setinputFocused2]=useState(false)
    const [agreedCheck,setagreedCheck]=useState(false)
    const [isSubmitted,setisSubmitted]=useState(false)
    const [isCameraOn,setisCameraOn]=useState(false)
    const [amountInWords,setamountInWords]=useState("")
    const router=useRouter();
    const queryClient=useQueryClient()
    const usersQuery=useQuery({queryKey:['allUsers'],queryFn:getAllUsers})
    const filteredData = usersQuery?.data?.allUsers?.filter((item:userTemplate) =>
      item.name.toLowerCase().includes(ReceiverId.toLowerCase()) ||
      item.email.toLowerCase().includes(ReceiverId.toLowerCase())
    );
    
    const handleFocus=()=>{setinputFocused(true);setinputFocused2(true)}
    const handleBlur=()=>{
      
      setTimeout(() => { setinputFocused(false) }, 400);
      setTimeout(() => { setinputFocused2(false) }, 100);
  }
    
    
    useEffect(() => {
      setisSubmitted(false)
      if(amount){
        setamountInWords(numberToText.convertToText(amount,{case:"upperCase"}))
      }else{setamountInWords("")}

      // const 
    
    }, [amount])

    const transferMoney=async()=>{
      try {
        const response=await fetch('/api/createtransaction',{
          method:'POST',
          headers:{
          Accept:'application.json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({to:ReceiverId,amount:amount})
      })
      const result=await response.json()
      console.log(result)
      if(response.ok){
        if(result.queueItem){
        router.push(`/payment/${result.queueItem?._id}`)
        }
      }
      return result;
      } catch (error) {
        return error
      }
     
    }
    const handleSubmit=async(e:react.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      setisSubmitted(true)
      setagreedCheck(false)
      const transfer=await transferMoney();
      console.log(transfer)
      
    }

   

    const checkAndSetAmount=(am:string)=>{
        const trueString=/^\d+$/.test(am)
        if(am=="" || trueString)
        setamount(am)
    }
    function isEmail(text:string) {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(text);
  }
    const handleScan=(text?:string)=>{
      if(text){
        console.log(text)
        if(isEmail(text)){
          setReceiverId(text);
          setisCameraOn(false)
        }else{
          console.log("Not valid text")

        }
      }
    }

  return <>
  

<form className="transactionForm max-w-sm my-4 md:my-8 p-8 rounded-xl bg-stone-100 dark:bg-zinc-900" onSubmit={(e)=>handleSubmit(e)}>
  <div className="mb-5 max-w-full relative">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id of Receiver</label>
    <input type="email" id="email" className="userIdInput bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" value={ReceiverId} onChange={(e)=>{setReceiverId(e.target.value)}} onFocus={handleFocus} onBlur={handleBlur} role="presentation" autoComplete='off' required />
  
    <div className={`z-10 w-full p-1 mt-1 rounded-xl absolute text-white ${!inputFocused && 'pointer-events-none'} ${!inputFocused2 && 'opacity-0'} bigSugg bg-white dark:bg-[#212121] shadow dark:shadow-md`} >
<ul className='userSuggestionsDiv bg-white dark:bg-[#212121] p-1  overflow-auto max-h-[210px] ' >
  {filteredData?.map((u:userTemplate)=>{
    return <li key={u._id} className='m-1 cursor-pointer' onClick={()=>setReceiverId(u.email)}>
    <div className='accountDiv m-4 rounded-full bg-white dark:bg-zinc-900 px-1 py-1 lg:border border-gray-200 dark:border-transparent'>
          <div className='flex items-center'>
            <div>
              <img className='w-10 min-w-6 h-19 rounded-full' src={u.image} alt="" />
              
            </div>
            <div className='flex flex-col mx-3'>
              <h1 className='text-gray-800 dark:text-gray-300 text-sm font-[Ubuntu]'>{u.name}</h1>
              <h2 className='text-gray-500 text-xs'>{u.email}</h2>
            </div>
          </div>
        </div>
  </li>})}
</ul>
</div>
<div className='flex justify-center w-full my-4'>
  <div className='w-[80%] bg-white dark:bg-gray-950/60 rounded-[1rem]'>
  <div className='flex justify-center h-[80%] items-center absolute w-[80%]'>
          {!isCameraOn
          ?
          <button type='button' onClick={()=>{setisCameraOn(true)}} className='z-[8] absolute text-gray-400 dark:text-gray-500 flex flex-col items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
</svg>
            Turn On</button>
         :
          <button type='button' onClick={()=>{setisCameraOn(false)}} className='z-[8] absolute top-[8px] right-[8px] w-7 h-7 rounded-full border-[1px] text-gray-200 border-gray-300 dark:text-gray-600 dark:border-gray-600'>x</button>
          }
        </div>
      <Scanner styles={{ container:{width:"100%",opacity:`${isCameraOn?"1":"0"}`,borderRadius:"1rem"}}} enabled={isCameraOn} components={ {tracker: true}} options={{delayBetweenScanSuccess:1000}}
                  onResult={(text, result) => {handleScan(text)}}
                  onError={(error) => console.log(error?.message)}
              />
       
</div>
</div>
  </div>
  <div className="mb-5">
    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
    <input type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={amount} onChange={(e)=>{checkAndSetAmount(e.target.value)}} autoComplete='off' required />
  </div>
  

  <div className='flex justify-center'>
  <button type="submit" className={`${( !ReceiverId || !amount) && "disabled"} mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>{isSubmitted?"Proceeding":"Proceed"} <span className={`mx-1 text-yellow-300 hidden`}> 4</span>
  </button>
  </div>
</form>

  </>;
};

export default TransactionForm;
