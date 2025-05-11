"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [name, setName] = useState("");
    const { login } = useAuthStore();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            login(name.trim());
            router.push("/tasks");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded px-2 py-1"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
