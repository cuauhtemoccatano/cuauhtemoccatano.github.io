"use client";

import { Home, FolderPlus, Settings, LayoutGrid, Rocket, X, Globe, BarChart3, Wand2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { APP_VERSION, APP_STATUS } from "@/lib/constants";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/", ariaLabel: "Dashboard" },
  { icon: BarChart3, label: "Executive Info", href: "/dashboard", ariaLabel: "Executive Info" },
  { icon: Wand2, label: "Brand Architect", href: "/architect", ariaLabel: "Brand Architect" },
  { icon: Rocket, label: "Intelligence", href: "/intelligence", ariaLabel: "Intelligence" },
  { icon: FolderPlus, label: "Projects", href: "/projects", ariaLabel: "Projects" },
  { icon: LayoutGrid, label: "Templates", href: "/templates", ariaLabel: "Templates" },
  { icon: Settings, label: "Settings", href: "/settings", ariaLabel: "Settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside 
        className={cn(
          "w-72 flex flex-col h-screen bg-white/80 dark:bg-black/20 backdrop-blur-xl border-r border-zinc-200 dark:border-white/5 transition-all duration-300 ease-in-out font-space",
          "fixed inset-y-0 left-0 z-[120] lg:static lg:z-50 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          !isOpen && "hidden lg:flex"
        )}
        aria-label="Sidebar Navigation"
      >
        <div className="p-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-lg bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center shadow-lg"
              aria-hidden="true"
            >
              <Rocket className="text-zinc-50 dark:text-zinc-950 h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-archivo font-black text-xl tracking-tighter text-zinc-950 dark:text-zinc-50">Launchpad</span>
              <span className="text-[9px] font-archivo font-black text-zinc-400 dark:text-zinc-200 uppercase tracking-widest mt-0.5">Brand Auditor</span>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2" role="navigation">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.ariaLabel}
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
                  isActive
                    ? "bg-zinc-950 dark:bg-zinc-800 text-white dark:text-white"
                    : "text-zinc-400 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                )}
              >
                {isActive && (
                  <div className="absolute left-1 top-4 bottom-4 w-1.5 bg-brand-600 rounded-full" />
                )}
                <item.icon className={cn("h-5 w-5 transition-transform", isActive ? "scale-110 text-white" : "group-hover:scale-110 text-zinc-400 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6">
          <Link
            href="/"
            className="flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-xs text-brand-600 dark:text-brand-500 border border-brand-500/10 hover:bg-brand-500/5 transition-all"
          >
            <Globe className="h-4 w-4" />
            <span>Public Website</span>
          </Link>
        </div>

        <div className="p-8 mt-auto">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-widest mb-2 leading-none">V{APP_VERSION} {APP_STATUS}</p>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
