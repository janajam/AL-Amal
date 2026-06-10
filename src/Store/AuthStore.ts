
import { create } from "zustand";
import { removeToken, setToken } from "../apiServices/cookie";
import type { UserRole } from "../Entities/SidebarItems";


interface AuthState {
  fullName:string| null;
  token: string | null;
  role: UserRole| null;
  setAuth: (data: {fullName:string; token: string; role: UserRole }) => void;
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
    set({ fullName: null, token: null, role: null });
  },
}));
