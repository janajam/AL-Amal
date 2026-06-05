
import { create } from "zustand";
import { removeToken, setToken } from "../apiServices/cookie";


interface AuthState {
  fullName:string| null;
  token: string | null;
  role: string | null;
  setAuth: (data: {fullName:string; token: string; role: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  fullName:null,
  token: null,
  role: null,
  setAuth: ({fullName, token, role }) => {
    setToken(token);
    set({fullName, token, role });
  },
  logout: () => {
    removeToken();
    set({ token: null, role: null });
  },
}));
