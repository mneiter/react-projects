"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
    const pathname = usePathname();

    // Utility to determine if the current link is active
    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <nav className="max-w-4xl mx-auto px-6 py-4 flex gap-6">
                {/* Home Link */}
                <Link
                    href="/"
                    className={`px-2 py-1 rounded ${isActive("/")
                            ? "bg-white text-blue-600 font-semibold shadow"
                            : "hover:underline"
                        }`}
                >
                    Home
                </Link>

                {/* Tasks Link */}
                <Link
                    href="/tasks"
                    className={`px-2 py-1 rounded ${isActive("/tasks")
                            ? "bg-white text-blue-600 font-semibold shadow"
                            : "hover:underline"
                        }`}
                >
                    Tasks
                </Link>
            </nav>
        </header>
    );
};
