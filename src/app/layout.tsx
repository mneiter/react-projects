import { ReactNode } from "react";
import "./../styles/globals.css";

export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks with Next.js 13",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <main className="max-w-xl mx-auto py-10 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
