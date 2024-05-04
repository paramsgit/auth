import  React, { useEffect, useState } from 'react';
import Layout from '../layout';
import { useUIStore } from '@/lib/store';
interface ISettingsProps {
}
interface Voice {
  name: string;
  lang: string;
  voiceURI: string;
  // Add other properties as needed
}

const Settings: React.FunctionComponent<ISettingsProps> = (props) => {

const allVoices = useUIStore((state) => state.allVoices);

useEffect(() => {
 allVoices?.forEach((al)=>{console.log(al?.name)})

 
}, [allVoices])





  return <>
   <Layout>

    <div className='flex justify-center py-8'>


    <div className="max-w-xl w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   
    <div className='flex flex-wrap items-center justify-between'>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex items-center">Notification Sound
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="hidden sm:block mx-2 text-gray-700 bi bi-volume-up" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
  <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
</svg>
        </h5>
        <label className="mb-2 inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" />
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
    </div>
    <br />
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Choose sound type from following options:</p>
    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
        See our guideline
        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>


    </div>
</Layout>
  </>;
};

export default Settings;
