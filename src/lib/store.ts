import { create } from 'zustand'

interface BearState {
  bears: number;
  TrsForm:boolean;
  historyModel:boolean;
  showTrsForm:()=>void;
  openHistoryModal:()=>void;
  closeHistoryModal:()=>void;
  increase: () => void;

}

export const useUIStore = create<BearState>()((set) => ({
  bears: 0,
  TrsForm:false,
  historyModel:false,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  showTrsForm: () => set((state) => ({ TrsForm: !state.TrsForm })),
  openHistoryModal: () => set((state) => ({ historyModel: true })),
  closeHistoryModal: () => set((state) => ({ historyModel: false })),


}))