import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  login: (token: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (token: string) => set({ token, isAuthenticated: true }),

      logout: () => set({ token: null, isAuthenticated: false }),

      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
