import { create } from 'zustand'

interface BearState {
  bears: number;
  TrsForm:boolean;
  historyModel:boolean;
  showTrsForm:()=>void;
  openHistoryModal:()=>void;
  closeHistoryModal:()=>void;
  increase: () => void;
  selectedVoice: SpeechSynthesisVoice | null;
  allVoices: SpeechSynthesisVoice[] | null;
  setVoice: (voice: SpeechSynthesisVoice | null) => void;
  setAllVoices: (voices: SpeechSynthesisVoice[]) => void;

}

export const useUIStore = create<BearState>()((set) => ({
  bears: 0,
  TrsForm:false,
  historyModel:false,
  selectedVoice:null,
  allVoices:null,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  showTrsForm: () => set((state) => ({ TrsForm: !state.TrsForm })),
  openHistoryModal: () => set((state) => ({ historyModel: true })),
  closeHistoryModal: () => set((state) => ({ historyModel: false })),
  setVoice: (voice: SpeechSynthesisVoice | null) => set({ selectedVoice: voice }),
  setAllVoices: (voices: SpeechSynthesisVoice[]) => set({ allVoices: voices }), // Implementation of setAllVoices



}))