import React,{useEffect, useState,useRef} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useUIStore } from '@/lib/store';
import TransactionForm from './transactionForm';

import Graph from './graph';
import SetUpPage from './setupPage';


interface IFrontProps {
}



const Front: React.FunctionComponent<IFrontProps> = (props) => {
  const { data: session } = useSession();
  const [sessionData,setsessionData]=useState(session)
  const getBalance=async()=>{ return (await fetch("/api/accountbalance")).json() }
  const queryClient=useQueryClient()
  const balanceQuery=useQuery({queryKey:['currentBalance'],queryFn:getBalance})
  const updateBalance=async ()=>{ await queryClient.invalidateQueries({queryKey: ['currentBalance']}); }
  
  const { TrsForm, showTrsForm } = useUIStore(state => ({
    TrsForm: state.TrsForm,
    showTrsForm: state.showTrsForm,
  }));


    
  
  
  return <>

  {!balanceQuery || !(balanceQuery.data)? "Loading..":
  balanceQuery.data?.response?
  <div className='flex items-start flex-col md:flex-row w-full '>
 {/* <button onClick={()=>updateBalance()}>data</button> */}
    <div className="flex justify-center left w-full md:w-1/2 p-2 md:p-10 lg:pl-24">
    <div className=''>
        <div className={`heading px-4 md:px-10 overflow-hidden`}>
          <div className={`transition-all duration-700 ease-linear ${TrsForm ? "animateMoveUp" :"my-4 md:my-10"}`}>
            <h1 className={`${TrsForm?"opacity-0":""} transition-all duration-300 ease-in-out Noto text-3xl font-bold text-gray-900 dark:text-white mb-1`}>Paytm</h1>
            <h1 className={`${TrsForm?"opacity-0":""} transition-all duration-500 ease-in-out Noto text-6xl font-bold text-gray-900 dark:text-white mb-2`}>Wallet</h1>
            <p className={`${TrsForm?"opacity-0":""} transition-all duration-700 text-gray-700 dark:text-gray-300 font-[Ubuntu] text-lg`}>Streamline your payments, empower your finances.</p>
        </div>
        </div>
        <div className='MoneyButtons px-4 md:px-10 flex '>
        <button onClick={showTrsForm} type="button" className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-[120px]">{!TrsForm? "Send Money":"Hide"}</button>
        <button type="button" className="mx-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10  focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Receive Money</button>

        </div>
        
        <div className={` transactionForm px-4 md:p-1 lg:px-10 py-4 ${!TrsForm && 'hidden'}`}>
            <TransactionForm fnss={updateBalance}/>
        </div>
        </div>
    </div>
    <div className="right w-full mb-8  md:w-1/2 flex justify-center items-center transition-all duration-500 ease-linear pt-10 md:pt-24">
      <div className='rounded-3xl bg-gray-50 dark:bg-zinc-900 max-w-sm sm:max-w-sm w-full p-6'>
        <div className='accountDiv m-4 rounded-full bg-white dark:bg-zinc-950 px-4 py-3 shadow-md'>
          <div className='flex items-center'>
            <div>
              <img className='w-10 h-19 rounded-full' src={session?.user?.image?session?.user?.image:""} alt="" />
              
            </div>
            <div className='flex flex-col mx-3'>
              <h1 className='text-gray-800 dark:text-gray-400 text-sm font-[Ubuntu]'>{session?.user?.name}</h1>
              <h2 className='text-gray-500 text-xs'>{session?.user?.email}</h2>
            </div>
          </div>
        </div>
        <div className="availablebalance px-4">
          <div>
          <p className='text-xs text-gray-700 Noto'>Balance:</p>
          <h1 className='text-3xl Noto py-1 font-bold text-gray-600'>₹{balanceQuery && balanceQuery?.data?.balance}</h1>
          </div>
        </div>
        <div className='graph'>
        <Graph/>
        </div>
      </div>
    </div>

  </div>
  :

  <div className='flex w-full justify-center '>
    <SetUpPage/>
 </div>

}
  </>;
};

export default Front;
