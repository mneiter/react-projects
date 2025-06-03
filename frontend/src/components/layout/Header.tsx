"use client";

import { useAuth } from "../../context/AuthContext";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
    const pathname = usePathname();
    const { isAuthenticated, logout } = useAuth();

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
                <nav className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm text-gray-300">Logged in</span>
                            <button
                                onClick={logout}
                                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </nav>
            </nav>
        </header>
    );
};
