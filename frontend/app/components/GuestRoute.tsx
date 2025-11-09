import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Navigate } from "react-router";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, checkAuth ,isChecking } = useAuthStore();

    console.log(isAuthenticated , isChecking)
    
    
    useEffect(() => {
        checkAuth();
    }, []);
    console.log(isAuthenticated , isChecking )

    if (isChecking) return <div>Loading...</div>; // أو Loader


    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
};

export default GuestRoute;
