"use client";

import { Save, Palette, Cloud, Key, Monitor, Moon, Sun, Laptop, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");
  const [theme, setTheme] = useState("dark");
  const [wallpaper, setWallpaper] = useState("wp-midnight");

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "dark";
    setTheme(savedTheme);
    setWallpaper(localStorage.getItem("app-wallpaper") || "wp-midnight");
    
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    else if (savedTheme === "light") document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else if (theme === "light") document.documentElement.classList.remove("dark");
    else if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [theme]);


  const saveSetting = (key: string, value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event("app-settings-updated"));
  };

  const tabs = [
    { id: "appearance", label: "Appearance", icon: Monitor },
    { id: "branding", label: "Branding Defaults", icon: Palette },
    { id: "deployment", label: "Deployment", icon: Cloud },
    { id: "api", label: "API Keys", icon: Key },
  ];

  const wallpapers = [
    { id: "wp-midnight", name: "Midnight Deep", class: "wp-midnight" },
    { id: "wp-aurora", name: "Arctic Aurora", class: "wp-aurora" },
    { id: "wp-sunset", name: "Solar Dusk", class: "wp-sunset" },
    { id: "wp-mesh", name: "Cosmic Mesh", class: "wp-mesh" },
    { id: "wp-glass", name: "Industrial Glass", class: "wp-industrial" },
  ];

  return (
    <div className="p-12 max-w-6xl mx-auto space-y-12 h-full overflow-auto pb-32">
      <header className="space-y-2 border-b border-black/5 dark:border-white/5 pb-8">
        <h1 className="heading-section">Hub Settings</h1>
        <p className="text-zinc-400 font-medium">Fine-tune the LaunchPad engine and your personal workspace aesthetics.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Settings Navigation */}
        <aside className="w-full lg:w-72 space-y-2 flex-shrink-0" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-[var(--radius-md)] transition-all duration-300 group",
                  isActive
                    ? "bg-brand-600 text-white shadow-xl shadow-brand-600/20"
                    : "text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-4">
                  <tab.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-zinc-400 group-hover:text-brand-500")} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                </div>
                {isActive && <ArrowRight className="h-4 w-4 opacity-50" />}
              </button>
            );
          })}
        </aside>

        {/* Settings Content */}
        <section className="flex-1 min-w-0" aria-label="Settings Content">
          {activeTab === "appearance" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
              {/* Theme Selection */}
              <section className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black tracking-tight">System Theme</h3>
                  <p className="text-sm text-zinc-400 font-medium">Coordinate the application interface with your preferred environment.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "light", icon: Sun, label: "Studio Light" },
                    { id: "dark", icon: Moon, label: "Midnight Dark" },
                    { id: "system", icon: Laptop, label: "OS Dynamic" }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => { setTheme(mode.id); saveSetting("app-theme", mode.id); }}
                      className={cn(
                        "flex flex-col items-center gap-4 p-8 rounded-[var(--radius-lg)] border-2 transition-all duration-300",
                        theme === mode.id 
                          ? "border-brand-600 bg-brand-600/5 text-brand-600 ring-4 ring-brand-600/10" 
                          : "border-black/5 dark:border-white/5 bg-white/5 dark:bg-black/20 hover:border-black/10 dark:hover:border-white/20"
                      )}
                    >
                      <mode.icon className="h-8 w-8" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Wallpaper Selection */}
              <section className="space-y-6 pt-6 border-t border-black/5 dark:border-white/5">
                <div className="space-y-1">
                  <h3 className="text-xl font-black tracking-tight">Internal Wallpaper</h3>
                  <p className="text-sm text-zinc-400 font-medium">Select a cinematic gradient for your primary workspace background.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {wallpapers.map((wp) => (
                    <button
                      key={wp.id}
                      onClick={() => { setWallpaper(wp.id); saveSetting("app-wallpaper", wp.id); }}
                      className={cn(
                        "group relative aspect-video rounded-[var(--radius-lg)] overflow-hidden border-2 transition-all duration-500",
                        wallpaper === wp.id ? "border-brand-600 ring-4 ring-brand-600/20" : "border-transparent"
                      )}
                    >
                      <div className={cn("absolute inset-0 transition-transform duration-700 group-hover:scale-110", wp.class)} />
                      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">{wp.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl">
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight">Agency Presets</h3>
                <p className="text-sm text-zinc-400 font-medium">Pre-initialize all new project blueprints with these corporate identity standards.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Corporate Primary Color</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group">
                      <input type="color" className="w-16 h-16 rounded-2xl bg-transparent border-none cursor-pointer" defaultValue="#6366f1" />
                    </div>
                    <input type="text" className="input-system flex-1 w-full font-mono text-xs uppercase" defaultValue="#6366F1" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Preferred Font Architecture</label>
                  <select className="w-full input-system bg-white dark:bg-black/40 text-sm font-bold">
                    <option>Inter Dynamic (San-Serif)</option>
                    <option>Montserrat Geometric (San-Serif)</option>
                    <option>Playfair Display (Serif)</option>
                    <option>JetBrains Mono (Monospace)</option>
                  </select>
                </div>
              </div>

              <div className="pt-10 flex justify-end">
                <button className="btn-primary">
                  <Save className="h-5 w-5" />
                  Update Engine Defaults
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
