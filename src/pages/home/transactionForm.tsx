import { useQuery, useQueryClient } from '@tanstack/react-query';
import react, { useEffect, useState } from 'react';

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
    const [inputFocused,setinputFocused]=useState(false)
    const [inputFocused2,setinputFocused2]=useState(false)
    const [amountInWords,setamountInWords]=useState("")
    
    const queryClient=useQueryClient()
    const usersQuery=useQuery({queryKey:['allUsers'],queryFn:getAllUsers})
    const filteredData = usersQuery?.data?.allUsers.filter((item:userTemplate) =>
      item.name.toLowerCase().includes(ReceiverId.toLowerCase()) ||
      item.email.toLowerCase().includes(ReceiverId.toLowerCase())
    );
    
    const handleFocus=()=>{setinputFocused(true);setinputFocused2(true)}
    const handleBlur=()=>{
      
      setTimeout(() => { setinputFocused(false) }, 400);
      setTimeout(() => { setinputFocused2(false) }, 100);
  }
    
    
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
  <div className="mb-5 max-w-full relative">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id of Receiver</label>
    <input type="email" id="email" className="userIdInput bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" value={ReceiverId} onChange={(e)=>{setReceiverId(e.target.value)}} onFocus={handleFocus} onBlur={handleBlur} role="presentation" autoComplete='off' required />
  
    <div className={`p-1 mt-1 rounded-xl absolute text-white ${!inputFocused && 'pointer-events-none'} ${!inputFocused2 && 'opacity-0'} bigSugg bg-white`} style={{boxShadow:'1px 1px 5px #e0e0e0d9'}}>
<ul className='userSuggestionsDiv bg-white p-1  overflow-auto max-h-[270px] ' >
  {filteredData?.map((u:userTemplate)=>{
    return <li key={u._id} className='m-1 cursor-pointer' onClick={()=>setReceiverId(u.email)}>
    <div className='accountDiv m-4 rounded-full bg-white px-1 py-1 lg:border border-gray-200'>
          <div className='flex items-center'>
            <div>
              <img className='w-10 min-w-6 h-19 rounded-full' src={u.image} alt="" />
              
            </div>
            <div className='flex flex-col mx-3'>
              <h1 className='text-gray-800 text-sm font-[Ubuntu]'>{u.name}</h1>
              <h2 className='text-gray-500 text-xs'>{u.email}</h2>
            </div>
          </div>
        </div>
  </li>})}
</ul>
</div>

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
