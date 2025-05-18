"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated, login } = useAuth(); // добавим login

    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("1234");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/tasks");
        }
    }, [isAuthenticated, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Login failed");
            }

            login(data.access_token);
            router.push("/tasks");

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="w-full mb-3 px-4 py-2 border rounded"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="w-full mb-3 px-4 py-2 border rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
                <p className="text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
