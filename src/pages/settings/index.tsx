import  React, { useEffect, useState } from 'react';
import Layout from '../layout';
import Select from 'react-select';
import { useUIStore } from '@/lib/store';
interface ISettingsProps {
}


const Settings: React.FunctionComponent<ISettingsProps> = (props) => {
const [selectedVoice,setselectedVoice]=useState<any>()
const [soundPlaying,setsoundPlaying]=useState(false)
const { allVoices,setVoice,voice,onSound,offSound,isNotificationSound } = useUIStore(state => ({
  allVoices: state.allVoices,
  setVoice: state.setVoice,
  voice: state.selectedVoice,
  onSound: state.onSound,
  offSound: state.offSound,
  isNotificationSound: state.isNotificationSound,
}));
// const allVoices = useUIStore((state) => state.allVoices);
// const setVoice = useUIStore((state) => state.setVoice);
// const voice = useUIStore((state) => state.selectedVoice);
const options = allVoices?.map((voice, index) => ({ value: index, label: voice.name }));

const handleSelectChange =async (selectedOption:any) => {
  
  if(allVoices)
  {
    setselectedVoice(allVoices[selectedOption.value])}
};
const testVoice=async()=> {
  return new Promise((resolve, reject) => {
      const msg = new SpeechSynthesisUtterance();
      if(selectedVoice)
      msg.voice =selectedVoice;
      msg.volume=1
      msg.text = `Have a nice day`;
      msg.onend = resolve;
      window.speechSynthesis.speak(msg);
  });
}
const vv=async()=>{
  if(!soundPlaying)
  {setsoundPlaying(true)
  await testVoice()
  setsoundPlaying(false)}
  
}

const saveVoice=()=>{
  if(selectedVoice)
  setVoice(selectedVoice)
console.log(selectedVoice)
}

const handleSoundChange=(e:any)=>{

// (e.target.checked)?onSound():offSound()
if(e.target.checked){
  onSound()
  console.log("On sound")

}else{
  offSound()
  console.log("Offing sound")
}

}

  return <>
   <Layout>

    <div className='flex justify-center py-8'>


    <div className="max-w-xl w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   
    <div className='flex flex-wrap items-center justify-between'>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex items-center">Notification Sound
      
        </h5>
        <label className="mb-2 inline-flex items-center cursor-pointer">
  <input type="checkbox" onChange={(e)=>{handleSoundChange(e)}} checked={isNotificationSound} className="sr-only peer" />
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
    </div>
    <br />
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Choose sound type from following options:</p>
   
   <div className={`${!isNotificationSound && "disabled2"} flex flex-wrap text-gray-800`}>
    <Select
    className='mb-4 w-[80%] max-w-sm'
        options={options}
        placeholder={"Select voice"}
        onChange={handleSelectChange}
      />
      {/* bg-slate-100  dark:bg-slate-900 */}

      <div className='mb-3 flex justify-evenly items-center'>
      <button className='flex justify-center items-center transition-all ease-in-out duration-300 active:scale-[0.9] mx-4 rounded-full w-[35px] h-[35px] bg-[#FF9119] hover:bg-[#FF9119]/80' onClick={()=>vv()}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-900 bi bi-volume-up" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
  <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
</svg>
      </button>

      <button onClick={()=>{saveVoice()}} type="button" className="px-5 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

Save
</button>
      </div>
      </div>
   
   
</div>

    </div>
</Layout>
  </>;
};

export default Settings;
