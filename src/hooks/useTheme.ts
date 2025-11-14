import { useState, useEffect } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1];

    if (saved === "dark") setDarkMode(true);
    if (saved === "light") setDarkMode(false);
  }, []);

  useEffect(() => {
    document.cookie = `theme=${darkMode ? "dark" : "light"}; path=/; max-age=31536000`;

    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return { darkMode, setDarkMode };
}