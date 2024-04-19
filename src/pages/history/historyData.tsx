import  React, { useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUIStore } from '@/lib/store';
interface IHistoryDataProps {
}

const HistoryData: React.FunctionComponent<IHistoryDataProps> = (props) => {
    const queryClient=useQueryClient()
    const getAllTransactions=async()=>{ return (await fetch('/api/transactions')).json() }
    const transactionQuery=useQuery({queryKey:['getAllTransactions'],queryFn:getAllTransactions})
    const [modalData,setmodalData]=useState({
      name:'',email:'',img:'',amount:'',date:'',desc:''
    })
    const { historyModel, openHistoryModal,closeHistoryModal } = useUIStore(state => ({
      historyModel: state.historyModel,
      openHistoryModal: state.openHistoryModal,
      closeHistoryModal: state.closeHistoryModal,
    }));

    const formatDate=(date:string)=>{
      const currentDate = new Date(date);
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
      });
          return formattedDate;  }
    const trimmer=(str:string, maxLength:number)=> {
        if (str.length <= maxLength) { return str }
        else { return str.substring(0, maxLength - 3) + '...'; }
      }

  return <>


  <div className="tablediv w-full flex justify-center">
          <div className="py-4 px-2 w-full sm:w-auto rounded-lg max-w-2xl relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap py-4 bg-white dark:bg-gray-900 rounded-t-lg">
             
         <h1 className="text-gray-600 dark:text-white px-3 md:px-6">History</h1>
            </div>
            {/* for small devices */}
            <div className="sm:hidden w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <div className="text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <div className='w-full flex justify-between'>
                  
                  <div  className="px-2 py-3">
                    Name
                  </div>
                  <div  className="px-2 py-3">
                    Amount
                  </div>
                 
                </div>
              </div>
              <div>
               
                  {!(transactionQuery?.data?.transactions)?
                  <>
                  <div  className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                  <div
                    
                    className="flex items-center pl-3 xsm:pr-8 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div
                      className="h_skelton3 w-9 h-9 bg-[#eee] dark:bg-[#111827f2] rounded-full"
                    />
                    <div className="ps-3">
                      <div className="h_skelton3 text-xs mb-1 text-transparent bg-[#eeee] dark:bg-[#161e2ff2] rounded-lg w-[80%]">
        
                      Paramveer
                        </div>
                      <div className="h_skelton3 text-2xs text-transparent bg-[#e3e3e3] dark:bg-[#161e2ff2] rounded-lg ">
                      krish@flowbite.com
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-4 "> 
                    <div className={`flex flex-col font-bold
                    h_skelton3 text-transparent bg-[#e3e3e3] dark:bg-[#161e2ff2] rounded-lg 
                    `}>    
                    HelloSir        
                      </div>
                  </div>
                  
                </div>
                  
                  </>:
              (transactionQuery?.data?.transactions.length
                ?
                transactionQuery?.data?.transactions?.map((trsn:any)=>{
                  return <div key={trsn?._id} className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  onClick={()=>{setmodalData({
                    img: trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.image:trsn?.sender?.image,
                    name:trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.name:trsn?.sender?.name,
                    email:trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.email:trsn?.sender?.email,
                    amount:trsn?.sender?._id==transactionQuery?.data?.userId?`-${trsn.amount}`:`+${trsn.amount}`,
                    date:formatDate(trsn?.createdAt),
                    desc:trsn.description

                  });openHistoryModal()}}

                  >
                 
                  <div
                    
                    className="flex items-center pl-3 xsm:pr-8 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-9 h-9 rounded-full"
                      src=
                      {trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.image:trsn?.sender?.image}
                      alt="User"
                    />
                    <div className="ps-3">
                      <div className="text-sm font-semibold">
        
                      {trimmer(trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.name:trsn?.sender?.name,16)}
                        </div>
                      <div className="font-normal text-gray-500">
                      {trimmer(trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.email:trsn?.sender?.email,18)}
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-4 "> 
                    <div className={`flex flex-col font-bold ${trsn?.sender?._id==transactionQuery?.data?.userId?"text-red-600":"text-green-600"}`}>            
                      {trsn?.sender?._id==transactionQuery?.data?.userId?"-":"+"} 
                      {trsn.amount}
                      
                  <span className="font-normal text-xs text-gray-600">{formatDate(trsn?.createdAt)}</span></div>
                  </div>
                  
                </div>
                }) :
                <div className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50" >
               
                <div className="m-auto flex items-center pl-3 xsm:pr-8 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                 
                  <div className="ps-3 flex justify-center">
                    <div className="text-sm font-semibold text-gray-500">
      No record found
                    </div>
                    
                  </div>
                </div>
                <div className="px-2 py-4 "> 
                  <div className={`flex flex-col font-bold`}>            
                   
                    
                <span className="font-normal text-xs text-gray-600"></span></div>
                </div>
                
              </div>
              
              )
                
                }
               
              </div>
            </div>
            

          {/* for large devices */}
            <table className="hidden sm:block w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  
                  <th scope="col" className="px-10 py-3">
                    Name
                  </th>
                  <th scope="col" className="xl:px-16 lg:px-12 px-8 py-3">
                    Amount
                  </th>
                  <th scope="col" className="xl:px-16 lg:px-12 px-8 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>

                {/* Skelton for rows */}
                {!(transactionQuery?.data?.transactions)?
                <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                <th
                  scope="row"
                  className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className='h_skelton3 w-10 h-10 bg-[#eee] dark:bg-[#111827f2] rounded-full'></div>
                  <div className="ps-3">
                    <div className="h_skelton3 text-xs mb-1 text-transparent bg-[#eeee] dark:bg-[#161e2ff2] rounded-lg w-[80%]">Paramvee</div>
                    <div className="h_skelton3 text-2xs text-transparent bg-[#e3e3e3] dark:bg-[#161e2ff2] rounded-lg ">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="xl:px-16 px-12 py-4 text-transparent font-bold"> 
                <span className='h_skelton3 text-transparent bg-[#eee] dark:bg-[#161e2ff2] rounded-xl font-bold text-base'>_500</span></td>
                <td className="xl:px-16 px-12 py-4">
                <span className='h_skelton3 text-transparent bg-[#eee] dark:bg-[#161e2ff2] rounded-xl font-bold text-base'>12/11/24</span>
                </td>
                
              </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                <th
                  scope="row"
                  className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className='h_skelton3 w-10 h-10 bg-[#eee] dark:bg-[#111827f2] rounded-full'></div>
                  <div className="ps-3">
                    <div className="h_skelton3 text-xs mb-1 text-transparent bg-[#eeee] dark:bg-[#161e2ff2] rounded-lg w-[80%]">Paramvee</div>
                    <div className="h_skelton3 text-2xs text-transparent bg-[#e3e3e3] dark:bg-[#161e2ff2] rounded-lg ">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="xl:px-16 px-12 py-4 text-transparent font-bold"> 
                <span className='h_skelton3 text-transparent bg-[#eee] dark:bg-[#161e2ff2] rounded-xl font-bold text-base'>_500</span></td>
                <td className="xl:px-16 px-12 py-4">
                <span className='h_skelton3 text-transparent bg-[#eee] dark:bg-[#161e2ff2] rounded-xl font-bold text-base'>12/11/24</span>
                </td>
                
              </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                <th
                  scope="row"
                  className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className='h_skelton3 w-10 h-10 bg-[#eee] dark:bg-[#111827f2] rounded-full'></div>
                  <div className="ps-3">
                    <div className="h_skelton3 text-xs mb-1 text-transparent bg-[#eeee] dark:bg-[#161e2ff2] rounded-lg w-[80%]">Paramvee</div>
                    <div className="h_skelton3 text-2xs text-transparent bg-[#e3e3e3] dark:bg-[#161e2ff2] rounded-lg ">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="xl:px-16 px-12 py-4 text-transparent font-bold"> 
                <span className='h_skelton3 text-transparent bg-[#eee] dark:bg-[#161e2ff2] rounded-xl font-bold text-base'>_500</span></td>
                <td className="xl:px-16 px-12 py-4">
                <span className='h_skelton3 text-transparent bg-[#eee] dark:bg-[#161e2ff2] rounded-xl font-bold text-base'>12/11/24</span>
                </td>
                
              </tr>

              </>
                : 
                (   transactionQuery?.data?.transactions?.length?
                      transactionQuery?.data?.transactions?.map((trsn:any)=>{
                        return <tr key={`2${trsn?._id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50" 
                        
                        onClick={()=>{setmodalData({
                          img: trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.image:trsn?.sender?.image,
                          name:trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.name:trsn?.sender?.name,
                          email:trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.email:trsn?.sender?.email,
                          amount:trsn?.sender?._id==transactionQuery?.data?.userId?`-${trsn.amount}`:`+${trsn.amount}`,
                          date:formatDate(trsn?.createdAt),
                          desc:trsn.description

                        });openHistoryModal()}}

                        >
                      
                        <th
                          scope="row"
                          className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src=
                            {trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.image:trsn?.sender?.image}
                            alt="User"
                          />
                          <div className="ps-3">
                            <div className="text-base font-semibold">
              
                              {trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.name:trsn?.sender?.name}
                              </div>
                            <div className="font-normal text-gray-500">
                            {trsn?.sender?._id==transactionQuery?.data?.userId?trsn?.receiver?.email:trsn?.sender?.email}
                            </div>
                          </div>
                        </th>
                        
                        <td className={`xl:px-16 lg:px-12 px-8 py-4 text-green-600  font-bold ${trsn?.sender?._id==transactionQuery?.data?.userId?"text-red-600":"text-green-600"}`}> {trsn?.sender?._id==transactionQuery?.data?.userId?"-":"+"} 
                            {trsn.amount}</td>
                        <td className="xl:px-16 lg:px-12 px-8 py-4">
                        <span>{formatDate(trsn?.createdAt)}</span>
                        </td>
                        
                      </tr>
                      })
                      :

                      // No history
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                <th
                  scope="row"
                  className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className=' w-10 h-10 bg-transparent rounded-full'></div>
                  <div className="ps-3">
                    <div className=" text-xs mb-1 text-transparent bg-transparent rounded-lg w-[80%]"></div>
                    <div className=" text-2xs text-transparent bg-transparent  rounded-lg ">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="xl:px-8 px-8 py-4 text-transparent "> 
                <span className=' text-gray-600 dark:text-gray-300 bg-transparent rounded-xl text-sm'>No record found!</span></td>
                <td className="xl:px-16 px-12 py-4">
                <span className=' text-transparent bg-transparent rounded-xl font-bold text-base'>12/11/24</span>
                </td>
                
              </tr>
                )
                }
              </tbody>
            </table>









            {/* <!-- Edit user modal --> */}
            <div
              id="editUserModal"
              tabIndex={-1}
              aria-hidden="true"
              className={`fixed z-50 items-center justify-center w-screen h-screen md:h-auto top-0 left-0 md:w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${!historyModel && "hidden"} flex bg-[#000000c9]`}
            >
              <div className="relative md:w-full max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
    <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 flex justify-between">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">Transaction Details</h3>
        <button onClick={closeHistoryModal} className='text-gray-700 dark:text-gray-400'>X</button>
    </div>
    <div className="p-4">
      <div className='flex justify-between flex-wrap mb-4'>
        <div className="flex items-center space-x-4">
            <img className="h-10 w-10 rounded-full" src={modalData.img} alt="Profile Avatar" />
            <div>
                <h4 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200">{modalData.name}</h4>
                <p className="text-gray-600 text-sm md:text-basw dark:text-gray-300">{modalData.email}</p>
            </div>
                
            </div>
            <div className="px-2 my-2">
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Id:</p>
                <p className=" text-gray-800 dark:text-gray-200 text-xs md:text-sm">fnlkenfenfnaef</p>
           
                </div>
        </div>
        <div className="flex justify-between mt-4">
            <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm ">Amount:</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm ">{modalData.amount}</p>
            </div>
            <div>
                <p className="text-gray-600 dark:text-gray-400 t text-sm ">Date & Time:</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm ">{modalData.date}</p>
            </div>
        </div>
        <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm ">Description:</p>
            <p className="text-gray-800 dark:text-gray-200 text-sm ">{modalData.desc}</p>
        </div>
    </div>
</div>



              </div>
            </div>
          </div>
        </div>
  </>;
};

export default HistoryData;
