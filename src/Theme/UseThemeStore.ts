import { create } from "zustand";

interface ThemeState {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  }
  return "light";
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return { mode: newMode };
    }),
}));

