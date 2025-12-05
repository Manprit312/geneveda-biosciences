"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      // Remove both 'dark' and 'light' classes first
      root.classList.remove("dark", "light");
      // Add the appropriate class
      if (newTheme === "dark") {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
      // Also set data-theme attribute for better compatibility
      root.setAttribute("data-theme", newTheme);
      // Force reflow to ensure styles apply
      root.offsetHeight;
    }
  };

  useEffect(() => {
    setMounted(true);
    // Check localStorage, default to light (ignore system preference)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      const initialTheme = savedTheme || "light"; // Always default to light
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
      // Force a re-render by dispatching a custom event
      window.dispatchEvent(new Event("themechange"));
    }
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    applyTheme(newTheme);
  };

  // Always provide context with valid functions
  const contextValue = {
    theme: mounted ? theme : ("light" as Theme),
    toggleTheme: mounted ? toggleTheme : () => {
      // Fallback that will be replaced once mounted
      if (typeof window !== "undefined") {
        const root = document.documentElement;
        const isDark = root.classList.contains("dark");
        if (isDark) {
          root.classList.remove("dark");
          localStorage.setItem("theme", "light");
        } else {
          root.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }
      }
    },
    setTheme: mounted ? handleSetTheme : (newTheme: Theme) => {
      if (typeof window !== "undefined") {
        const root = document.documentElement;
        if (newTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme);
      }
    },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

