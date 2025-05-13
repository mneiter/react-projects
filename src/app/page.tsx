"use client";

import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";


export default function HomePage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome to the Task Manager</h1>
            <h1 className="text-2xl font-bold mb-4">Current theme: {theme}</h1>
            <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Toggle Theme
            </button>
            <p>This is a simple app to practice React, TypeScript, and Next.js 13 App Router.</p>
            <Link href="/tasks" className="text-blue-600 underline">
                Go to Tasks
            </Link>
        </div>
    );
}