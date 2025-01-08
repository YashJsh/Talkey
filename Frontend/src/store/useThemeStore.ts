import { create } from "zustand"

interface useThemeStore{
    theme : string,
    setTheme : (theme: string) => void
}

export const useTheme = create<useThemeStore>((set) => ({
    theme: localStorage.getItem("theme") || "dark",

    setTheme: (theme: string) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    }
}));