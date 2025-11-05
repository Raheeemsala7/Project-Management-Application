// src/stores/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { queryClient } from "../provider/react-query-provider";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: { user: User; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: ({ user, token }) =>
        set({ user, token, isAuthenticated: true }),

      logout: () => {
        queryClient.clear();
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
