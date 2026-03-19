"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "dark";
    const isDark = savedTheme === "dark" || (savedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "dark" : "light");
    setMounted(true);

    // Initial class application
    document.documentElement.classList.toggle("dark", isDark);
    
    if (savedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      };
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  useEffect(() => {
    const handleThemeUpdate = () => {
      const savedTheme = localStorage.getItem("app-theme") || "dark";
      const isDark = savedTheme === "dark" || (savedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setTheme(isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    };

    window.addEventListener("storage", handleThemeUpdate);
    window.addEventListener("app-settings-updated", handleThemeUpdate);
    return () => {
      window.removeEventListener("storage", handleThemeUpdate);
      window.removeEventListener("app-settings-updated", handleThemeUpdate);
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}
