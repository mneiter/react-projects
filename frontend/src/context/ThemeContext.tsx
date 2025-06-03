"use client";

import { createContext, useContext, useState } from "react";

// Define type of the context
type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | null>(null);

// Hook to use the context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

// Provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme === "light" ? "bg-white text-black" : "bg-black text-white"}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
