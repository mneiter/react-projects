"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex gap-4">
                    <Link href="/" className={pathname === "/" ? "font-bold underline" : ""}>
                        Home
                    </Link>
                    <Link
                        href="/tasks"
                        className={pathname.startsWith("/tasks") ? "font-bold underline" : ""}
                    >
                        Tasks
                    </Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="hover:underline">
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="hover:underline">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};
