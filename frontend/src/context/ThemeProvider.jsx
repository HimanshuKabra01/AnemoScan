import React, { createContext, useContext } from "react";
import { useThemeHook } from "../hooks/useTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme, setTheme, toggleTheme } = useThemeHook();
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// This is the hook you import everywhere
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
