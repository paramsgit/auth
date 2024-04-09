import { useQuery, useQueryClient } from '@tanstack/react-query';
import react, { useEffect, useState } from 'react';
import ComboBoxFile from './comboBoxFile';

const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');
interface ITransactionFormProps {
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

const TransactionForm: React.FunctionComponent<ITransactionFormProps> = (props) => {
    const [ReceiverId,setReceiverId]=useState("")
    const [amount,setamount]=useState("")
    const [amountInWords,setamountInWords]=useState("")
    
    const queryClient=useQueryClient()
    const usersQuery=useQuery({queryKey:['allUsers'],queryFn:getAllUsers})
    console.log(usersQuery)
    
    
    
    useEffect(() => {
      if(amount){
        setamountInWords(numberToText.convertToText(amount,{case:"upperCase"}))
      }else{setamountInWords("")}

      // const 
    
    }, [amount])

    const checkAndSetAmount=(am:string)=>{
        const trueString=/^\d+$/.test(am)
        if(am=="" || trueString)
        setamount(am)
    }
  return <>
  

<form className="transactionForm max-w-sm my-4 md:my-8 p-8 rounded-xl bg-stone-100 dark:bg-zinc-900">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id of Receiver</label>
    {/* <input type="email" id="email" className="userIdInput bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" value={ReceiverId} onChange={(e)=>{setReceiverId(e.target.value)}} role="presentation" autoComplete='off' required /> */}
  


  </div>
  <div className="mb-5">
    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
    <input type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={amount} onChange={(e)=>{checkAndSetAmount(e.target.value)}} autoComplete='off' required />
  </div>
  
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  required />
    </div>
    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agree to Send {amountInWords ? `${amountInWords} Rupees`:""}</label>
  </div>
  <div className='flex justify-center'>
  <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </div>
</form>

  </>;
};

export default TransactionForm;
