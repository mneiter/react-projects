import { useEffect, useState } from 'react';

const STORAGE_KEY = 'username';

// Simple auth hook using localStorage
export function useAuthStore() {
  const [username, setUsername] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // NEW: track client side

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUsername(saved);
    }
    setIsClient(true); // mark that we're on the client
  }, []);

  const login = (name: string) => {
    localStorage.setItem(STORAGE_KEY, name);
    setUsername(name);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUsername(null);
  };

  return {
    username,
    isLoggedIn: !!username,
    isClient, // NEW
    login,
    logout,
  };
}
