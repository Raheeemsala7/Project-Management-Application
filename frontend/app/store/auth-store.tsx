import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  is2FAEnabled: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  __v: number;
}

interface AuthState {
  isAuthenticated: boolean;
  isChecking: boolean;
  user: User | null;
  initialized: boolean; 
  checkAuth: () => void;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isChecking: true,
      user: null,
      initialized: false,

      setUser: (user) => set({ user }),
      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),

      checkAuth: () => {
        if (get().initialized) return;

        set({ isChecking: true });

        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          set({
            isAuthenticated: false,
            isChecking: false,
            initialized: true,
          });
          return;
        }

        try {
          const payloadBase64 = token.split(".")[1];
          const payload = JSON.parse(atob(payloadBase64));
          const now = Math.floor(Date.now() / 1000);

          if (payload.exp && payload.exp < now) {
            document.cookie = "token=; Max-Age=0; path=/";
            set({
              isAuthenticated: false,
              isChecking: false,
              initialized: true,
            });
          } else {
            set({
              isAuthenticated: true,
              isChecking: false,
              initialized: true,
            });
          }
        } catch (error) {
          console.error("Invalid token format:", error);
          set({
            isAuthenticated: false,
            isChecking: false,
            initialized: true,
          });
        }
      },

      login: (user) => {
        set({
          isAuthenticated: true,
          user,
          isChecking: false,
          initialized: true,
        });
      },

      logout: () => {
        Cookies.remove("token");
        set({
          isAuthenticated: false,
          user: null,
          initialized: true,
          isChecking: false,
        });
      },
    }),
    {
      name: "auth-storage", // المفتاح في localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
