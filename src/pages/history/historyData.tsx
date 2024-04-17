import * as React from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface IHistoryDataProps {
}

const HistoryData: React.FunctionComponent<IHistoryDataProps> = (props) => {
    const queryClient=useQueryClient()
    const getAllTransactions=async()=>{ return (await fetch('/api/transactions')).json() }
    const transactionQuery=useQuery({queryKey:['getAllTransactions'],queryFn:getAllTransactions})
  
  return <>
  <div className="tablediv w-full flex justify-center">
          <div className="py-4 px-2 rounded-lg max-w-2xl relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap py-4 bg-white dark:bg-gray-900 rounded-t-lg">
             
         <h1 className="text-gray-600 dark:text-white px-3 md:px-6">History</h1>
            </div>
            {/* for small devices */}
            <table className="md:hidden  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  
                  <th scope="col" className="px-2 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Amount
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                  <th
                    scope="row"
                    className="flex items-center pl-3 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://lh3.googleusercontent.com/a/ACg8ocJsM6TU7-XEn_fHcEvBo3GkE4Z33szEPM7tE48P5Tj17hv6r0w=s96-c"
                      alt="User_Image"
                    />
                    <div className="ps-3">
                      <div className="text-sm font-semibold">Paramveer Singh</div>
                      <div className="font-normal text-gray-500">
                        neil.sims@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td className="px-2 py-4 "> 
<div className="flex flex-col text-green-600 font-bold ">
                  +500
                  <span className="font-normal text-xs text-gray-600">12/04/03</span></div>
                  </td>
                  
                </tr>
                {transactionQuery && transactionQuery?.data?.transactions.map((trsn:any)=>{
                  return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                  <th
                    scope="row"
                    className="flex items-center pl-3 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://lh3.googleusercontent.com/a/ACg8ocJsM6TU7-XEn_fHcEvBo3GkE4Z33szEPM7tE48P5Tj17hv6r0w=s96-c"
                      alt="User_Image"
                    />
                    <div className="ps-3">
                      <div className="text-sm font-semibold">Paramveer Singh</div>
                      <div className="font-normal text-gray-500">
                        neil.sims@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td className="px-2 py-4 "> 
<div className="flex flex-col text-green-600 font-bold ">
                  +{trsn.amount}
                  <span className="font-normal text-xs text-gray-600">12/04/03</span></div>
                  </td>
                  
                </tr>
                })}
               
              </tbody>
            </table>

          {/* for large devices */}
            <table className="hidden md:block w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  
                  <th scope="col" className="px-10 py-3">
                    Name
                  </th>
                  <th scope="col" className="xl:px-16 px-12 py-3">
                    Amount
                  </th>
                  <th scope="col" className="xl:px-16 px-12 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                 
                  <th
                    scope="row"
                    className="flex items-center px-10 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://lh3.googleusercontent.com/a/ACg8ocJsM6TU7-XEn_fHcEvBo3GkE4Z33szEPM7tE48P5Tj17hv6r0w=s96-c"
                      alt="User_Image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">Paramveer Singh</div>
                      <div className="font-normal text-gray-500">
                        neil.sims@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td className="xl:px-16 px-12 py-4 text-green-600  font-bold"> +500</td>
                  <td className="xl:px-16 px-12 py-4">
                  <span>Date</span>
                  </td>
                  
                </tr>
               
              </tbody>
            </table>

            {/* <!-- Edit user modal --> */}
            <div
              id="editUserModal"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
            >
              <div className="relative md:w-full max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
    <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">Transaction Details</h3>
    </div>
    <div className="p-4">
        <div className="flex items-center space-x-4">
            <img className="h-10 w-10 rounded-full" src="profile-avatar.jpg" alt="Profile Avatar" />
            <div>
                <h4 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200">John Doe</h4>
                <p className="text-gray-600 text-sm md:text-basw dark:text-gray-300">john.doe@example.com</p>
            </div>
        </div>
        <div className="flex justify-between mt-4">
            <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Amount:</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">$100</p>
            </div>
            <div>
                <p className="text-gray-600 dark:text-gray-400 t text-sm md:text-base">Date & Time:</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs md:text-base">April 17, 2024 10:30 AM</p>
            </div>
        </div>
        <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Description:</p>
            <p className="text-gray-800 dark:text-gray-200 text-xs md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
