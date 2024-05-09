import React,{useEffect, useRef, useState} from 'react';

import {QRCodeCanvas} from 'qrcode.react';

interface IGraphProps {
  email:string|undefined|null
}

const Graph: React.FunctionComponent<IGraphProps> = (props) => {
  const [qrValue,setqrValue]=useState<any>("")
    const email=props?.email
      useEffect(() => {
        console.log(email)
        setqrValue(email)
      }, [email])
      
  
  return <>
  <div id='o098' className='flex justify-center p-2'>
    <div className='pt-5 pb-2 px-6 border border-gray-300'>
    {qrValue &&
  <QRCodeCanvas
   value={qrValue}
   size={200}
    />
  }

  <p className='flex justify-center items-center mt-2 text-gray-500'>
  {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-blue-600 mx-2 bi bi-camera-fill" viewBox="0 0 16 16">
  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"/>
</svg> */}
Scan QR to pay 
</p>
   </div>
  </div>
  </>;
};

export default Graph;
