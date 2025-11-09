// src/hooks/useAuthInit.ts
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

/**
 * Hook to initialize auth state on app load.
 * It checks with the server if the user has a valid httpOnly token.
 */
export const useAuthInit = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        // تحقق من صلاحية التوكين عند أول تحميل للتطبيق
        checkAuth();
    }, [checkAuth]);
};
