"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const publicRoutes = ["/login", "/register"];

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated && !publicRoutes.includes(pathname)) {
            router.push("/login");
        }
    }, [isAuthenticated, pathname, router]);

    // Пока редиректим — ничего не рендерим
    if (!isAuthenticated && !publicRoutes.includes(pathname)) return null;

    return <>{children}</>;
};
