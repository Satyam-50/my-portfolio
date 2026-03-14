/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored) return stored === "dark";
  } catch {
    // Ignore storage access errors and fallback to system preference
  }

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      window.localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Ignore storage access errors
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
