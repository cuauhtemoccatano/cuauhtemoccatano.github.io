"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileHeader } from "@/components/layout/mobile-header";
import { AiCopilot } from "@/components/builder/ai-copilot";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState("wp-midnight");

  useEffect(() => {
    const savedWallpaper = localStorage.getItem("app-wallpaper") || "wp-midnight";
    setWallpaper(savedWallpaper);

    const handleUpdate = () => {
      setWallpaper(localStorage.getItem("app-wallpaper") || "wp-midnight");
    };

    window.addEventListener("app-settings-updated", handleUpdate);
    return () => window.removeEventListener("app-settings-updated", handleUpdate);
  }, []);

  return (
    <div className={cn("flex h-screen overflow-hidden antialiased font-sans transition-all duration-700", wallpaper)}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative bg-black/40 backdrop-blur-sm">
        <MobileHeader 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <main className="flex-1 overflow-auto bg-[var(--surface-color)]/30 backdrop-blur-md border-l-0 lg:border-l-2 border-white/5 transition-all duration-300">
          {children}
        </main>
        <AiCopilot />
      </div>
    </div>
  );
}
