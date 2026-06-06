import { create } from "zustand";
import type { OtpInput } from "../Schema/OTPSchema";
import { setToken } from "../apiServices/cookie";

type OTPState= {
  data: Partial<OtpInput>;
  token:string | null;
  setData: (values: Partial<OtpInput>) => void;
  resetToken:(token:string)=>void;
  reset: () => void;
};

export const useOtpStore = create<OTPState>((set) => ({
  data: {},
  token:null,
  setData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  resetToken:(token)=>{
    setToken(token)
  },
  reset: () => set({ data: {} }),
}));
