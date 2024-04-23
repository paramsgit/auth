import { cn } from "./cn"
import { SlotProps } from "input-otp"

export function Slot(props: SlotProps) {
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
 export function FakeCaret() {
    return (
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
        <div className="w-px h-8 bg-white" />
      </div>
    )
  }
   
  // Inspired by Stripe's MFA input.
export  function FakeDash() {
    return (
      <div className="flex w-10 justify-center items-center">
        <div className="w-3 h-1 rounded-full bg-border bg-gray-400" />
      </div>
    )
  }