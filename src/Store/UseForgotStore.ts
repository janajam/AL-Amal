import { create } from "zustand";
import type { ForgotInfo } from "../Schema/ForgotSchema";

type ForgotState= {
  data: Partial<ForgotInfo>;
  setData: (values: Partial<ForgotInfo>) => void;
  reset: () => void;
};

export const useForgotStore = create<ForgotState>((set) => ({
  data: {},
  setData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  reset: () => set({ data: {} }),
}));
