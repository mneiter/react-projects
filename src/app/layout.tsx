import { Header } from "@/components/layout/Header";
import { ReactNode } from "react";
import { ThemeProvider } from "./../context/ThemeContext"; // Import the ThemeProvider from context
import "./../styles/globals.css"; // Import global styles


export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks with Next.js",
};

// This is the root layout that wraps all pages
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        {/* Navigation header displayed on all pages */}
        <Header />

        {/* Main content container */}
        <main className="max-w-2xl mx-auto py-8 px-4">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
