import { ReactNode } from "react";
import { RequireAuth } from "../components/auth/RequireAuth";
import { Header } from "../components/layout/Header";
import { AuthProvider } from "../context/AuthContext"; // Import the AuthProvider from context
import { ThemeProvider } from "../context/ThemeContext"; // Import the ThemeProvider from context

import "../styles/globals.css"; // Import global styles



export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks with Next.js",
};

// This is the root layout that wraps all pages
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">


        {/* Main content container */}
        <main className="max-w-2xl mx-auto py-8 px-4">
          <ThemeProvider>
            <AuthProvider>
              <Header />
              <RequireAuth>
                {children}
              </RequireAuth>
            </AuthProvider>
          </ThemeProvider>
        </main>
      </body>
    </html >
  );
}
