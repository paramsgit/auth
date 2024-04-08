import React,{useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import { useUIStore } from '@/lib/store';
import TransactionForm from './transactionForm';
import Graph from './graph';
interface IFrontProps {
}

const Front: React.FunctionComponent<IFrontProps> = (props) => {
  const { data: session } = useSession();
  const [sessionData,setsessionData]=useState(session)
  const { TrsForm, showTrsForm } = useUIStore(state => ({
    TrsForm: state.TrsForm,
    showTrsForm: state.showTrsForm,
  }));
  useEffect(() => {
    if(session){
      console.log("sess",session)
    }
  
   
  }, [])
  
  return <>
  <div className='flex flex-col-reverse md:flex-row w-full '>
    <div className="left w-full md:w-1/2 md:p-10">
        <div className={`heading px-4 md:px-10 overflow-hidden`}>
          <div className={`transition-all duration-700 ease-linear ${TrsForm ? "animateMoveUp" :"my-4 md:my-10"}`}>
            <h1 className={`${TrsForm?"opacity-0":""} transition-all duration-300 ease-in-out Noto text-3xl font-bold text-gray-900 dark:text-white mb-1`}>Paytm</h1>
            <h1 className={`${TrsForm?"opacity-0":""} transition-all duration-500 ease-in-out Noto text-6xl font-bold text-gray-900 dark:text-white mb-2`}>Wallet</h1>
            <p className={`${TrsForm?"opacity-0":""} transition-all duration-700 text-gray-700 dark:text-gray-300 font-[Ubuntu] text-lg`}>Streamline your payments, empower your finances.</p>
        </div>
        </div>
        <div className='MoneyButtons px-4 md:px-10 flex '>
        <button onClick={showTrsForm} type="button" className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send Money</button>
        <button type="button" className="mx-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Receive Money</button>

        </div>
        <div className={`transactionForm px-4 md:px-10 py-4 ${!TrsForm && 'hidden'}`}>
            <TransactionForm/>
        </div>
    </div>
    <div className="right w-full md:w-1/2 flex justify-center pt-10">
      <div className='rounded-3xl bg-gray-50 max-w-sm sm:max-w-sm w-full p-6'>
        <div className='m-4 rounded-full bg-white px-4 py-3' style={{boxShadow:'1px 1px 5px #e0e0e0d9'}}>
          <div className='flex items-center'>
            <div>
              <img className='w-10 h-19 rounded-full' src={session?.user?.image?session?.user?.image:""} alt="" />
              
            </div>
            <div className='flex flex-col mx-3'>
              <h1 className='text-gray-800 text-sm font-[Ubuntu]'>{session?.user?.name}</h1>
              <h2 className='text-gray-500 text-xs'>{session?.user?.email}</h2>
            </div>
          </div>
        </div>
        <div className="availablebalance px-4">
          <div>
          <p className='text-xs text-gray-700 Noto'>Balance:</p>
          <h1 className='text-3xl Noto py-1 font-bold text-gray-800'>₹500</h1>
          </div>
        </div>
        <div className='graph'>
        <Graph/>
        </div>
      </div>
    </div>
  </div>
  </>;
};

export default Front;
