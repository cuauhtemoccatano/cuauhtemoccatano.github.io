"use client";

import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileHeader({ isOpen, onToggle }: MobileHeaderProps) {
  return (
    <header className="lg:hidden sticky top-0 z-[100] w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center shadow-lg">
          <Rocket className="text-zinc-50 dark:text-zinc-950 h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-base tracking-tighter text-zinc-950 dark:text-zinc-50 leading-none">LaunchPad</span>
          <span className="text-[7px] font-black text-zinc-400 dark:text-zinc-400 uppercase tracking-widest leading-none mt-1">Agency Hub</span>
        </div>
      </div>
      
      <button 
        onClick={onToggle}
        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </header>
  );
}
