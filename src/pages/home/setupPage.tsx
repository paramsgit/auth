import * as React from 'react';
import { OTPInput, SlotProps } from 'input-otp'
import { cn } from '@/utils/cn';
interface ISetUpPageProps {
}

const SetUpPage: React.FunctionComponent<ISetUpPageProps> = (props) => {

    function Slot(props: SlotProps) {
        return (
          <div
            className={cn(
              'relative w-10 h-14 md:w-16 md:h-[5.25rem] text-[2rem] md:text-[3rem]',
              'flex items-center justify-center',
              'transition-all duration-300',
              'border-border border-gray-400 border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
              'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
              'outline outline-0 outline-accent-foreground/20',
              { 'outline-4 outline-accent-foreground': props.isActive },
              'outline-blue-700 dark:outline-white'
            )}
          >
            {props.char !== null && <div>{props.char}</div>}
            {props.hasFakeCaret && <FakeCaret />}
          </div>
        )
      }
       
      // You can emulate a fake textbox caret!
      function FakeCaret() {
        return (
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
            <div className="w-px h-8 bg-white" />
          </div>
        )
      }
       
      // Inspired by Stripe's MFA input.
      function FakeDash() {
        return (
          <div className="flex w-10 justify-center items-center">
            <div className="w-3 h-1 rounded-full bg-border bg-gray-400" />
          </div>
        )
      }

  return <>
        <div className="w-full max-w-3xl mt-8 md:mt-16 p-4 text-center bg-gray-50 border dark:border-none border-gray-100 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Set up your Wallet</h5>
            <div className="inline-block md:px-10 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-900/40 dark:text-blue-400" role="alert">
            Claim your ₹500 bonus now by setting up your wallet!            </div>
            {/* <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            </p> */}
            <div className="items-center justify-center flex flex-col mt-6">

              
 
                <OTPInput
                maxLength={6}
                containerClassName="group flex flex-col items-center has-[:disabled]:opacity-30"
                render={({ slots }) => (
                    <>
                    <div className='w-full flex justify-start my-4'>
                <p className='text-base text-gray-500 dark:text-gray-400'>Create your 6-digit wallet PIN</p>
              </div>
                    <div className='flex items-center'>
                    <div className="flex">
                        {slots.slice(0, 3).map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                        ))}
                    </div>
                
                    <FakeDash />
                
                    <div className="flex">
                        {slots.slice(3).map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                        ))}
                    </div>
                    </div>
                    </>
                )}
                />

              <button type="button" className="my-10 max-w-xs w-full sm:max-w-sm flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 trc active:scale-[0.95]">
              Next
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
              </button>
            </div>
        </div>

  </>;
};

export default SetUpPage;
