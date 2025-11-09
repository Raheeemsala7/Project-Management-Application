// src/store/auth-store.ts
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isChecking: boolean; // حالة التحقق
  checkAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isChecking: true, // نبدأ بالتحقق

  checkAuth: () => {
    set({ isChecking: true }); // نبدأ التحقق

    // نتحقق من وجود التوكين في الكوكيز
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    set({
      isAuthenticated: !!token,
      isChecking: false, // انتهى التحقق
    });
  },

  logout: () => {
    // نقدر نضيف كمان مسح الكوكيز عن طريق الباك اند لو عايز
    set({ isAuthenticated: false });
  },
}));
