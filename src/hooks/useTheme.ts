import { useEffect, useState } from "react";

export default function useTheme(bodyElement: HTMLElement) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true; // default = dark
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!bodyElement) return;

    bodyElement.setAttribute("data-theme", darkMode ? "dark" : "light");

    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch (err) {
      console.error(err);
    }
  }, [bodyElement, darkMode]);

  return { darkMode, setDarkMode };
}
