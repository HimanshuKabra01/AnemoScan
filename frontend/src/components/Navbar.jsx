import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
      <h1 className="text-lg font-bold dark:text-white">AnemoScan</h1>
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-3 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </nav>
  );
}
