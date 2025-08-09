import { useEffect, useMemo, useState } from "react";

export function useThemeHook() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  const mediaQuery = useMemo(() => window.matchMedia("(prefers-color-scheme: dark)"), []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const applyTheme = (currentTheme) => {
      const shouldUseDark =
        currentTheme === "dark" || (currentTheme === "system" && mediaQuery.matches);

      root.classList.toggle("dark", shouldUseDark);
      body.classList.toggle("dark", shouldUseDark);
      // Hint browsers for built-in UI theming
      root.style.colorScheme = shouldUseDark ? "dark" : "light";
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, mediaQuery]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : prev === "dark" ? "light" : "dark"));
  };

  return { theme, setTheme, toggleTheme };
}
