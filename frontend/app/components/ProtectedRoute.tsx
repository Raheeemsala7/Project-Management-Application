import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, checkAuth  , isChecking} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isChecking) return <div>Loading...</div>; 

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default ProtectedRoute;
