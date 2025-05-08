import Link from "next/link";

export default function HomePage() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome to the Task Manager</h1>
            <p>This is a simple app to practice React, TypeScript, and Next.js 13 App Router.</p>
            <Link href="/tasks" className="text-blue-600 underline">
                Go to Tasks
            </Link>
        </div>
    );
}
