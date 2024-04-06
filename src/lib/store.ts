import { create } from 'zustand'

interface BearState {
  bears: number;
  TrsForm:boolean;
  showTrsForm:()=>void;
  increase: () => void;

}

export const useUIStore = create<BearState>()((set) => ({
  bears: 0,
  TrsForm:false,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  showTrsForm: () => set((state) => ({ TrsForm: !state.TrsForm })),


}))