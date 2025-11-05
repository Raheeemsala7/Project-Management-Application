// src/hooks/useAuthWatcher.ts
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useLocation, useNavigate } from "react-router";

function isTokenExpired(token: string): boolean {
    try {
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));
        if (!decoded.exp) return false;
        return decoded.exp < Date.now() / 1000;
    } catch {
        return true;
    }
}

// 🟢 المسارات العامة اللي ممكن أي حد يدخلها بدون تسجيل دخول
const publicRoutes = ["/", "login", "register"];
// const publicRoutesNotAuth = ["/", "login", "register"];
// const protcedRoutesNotAuth = ["/dashboard"];

export const useAuthWatcher = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useAuthStore.getState().logout;

    useEffect(() => {
        const currentPath = location.pathname;
        const isPublicRoute = publicRoutes.includes(currentPath);

        const checkToken = () => {
            const token = useAuthStore.getState().token;
            const expired = token ? isTokenExpired(token) : true;

            // لو مفيش توكن أو انتهى والتراك مش عام → روح sign-in
            if (expired && !isPublicRoute) {
                logout();
                navigate("/login", { replace: true });
            }
        };

        // 🧩 تحقق أول مرة لما الصفحة تفتح
        checkToken();

        // 🧠 راقب أي تغييرات على الـ token في Zustand مباشرة (بدون rerender)
        const unsub = useAuthStore.subscribe(
            (state: ReturnType<typeof useAuthStore.getState>) => {
                const token = state.token;
                const expired = token ? isTokenExpired(token) : true;

                if (expired && !isPublicRoute) {
                    logout();
                    navigate("/sign-in", { replace: true });
                }
            }
        );

        // 🧹 تنظيف الاشتراك لما المكون يتفك
        return () => unsub();
    }, [navigate, location.pathname, logout]);
};
