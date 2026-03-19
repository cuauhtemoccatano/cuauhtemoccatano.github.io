"use client";

import { Shield, FileStack } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelligenceHeaderProps {
  hasResult: boolean;
  activeTab: "public" | "agency" | "vs";
  setActiveTab: (tab: "public" | "agency" | "vs") => void;
  onGenerateBrief: () => void;
  hasVsResults: boolean;
}

export function IntelligenceHeader({ 
  hasResult, 
  activeTab, 
  setActiveTab, 
  onGenerateBrief,
  hasVsResults 
}: IntelligenceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12">
      <div className="space-y-3 md:space-y-4 text-center md:text-left w-full md:w-auto">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tightest leading-none">
          Deep <span className="text-zinc-400">Intelligence.</span>
        </h1>
        <p className="text-base md:text-lg font-bold text-zinc-400 max-w-xl mx-auto md:mx-0">
          Professional brand audit, technical SWOT, and agency-only growth strategies.
        </p>
      </div>
      
      {hasResult && (
        <div className="flex flex-col sm:flex-row bg-zinc-100 dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 gap-3 w-full md:w-auto">
           <div className="flex bg-white dark:bg-zinc-800/50 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700/50 w-full sm:w-auto">
              <button 
                  onClick={() => setActiveTab("public")}
                  className={cn(
                    "flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                    activeTab === "public" ? "bg-zinc-100 dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-950 dark:text-white" : "text-zinc-400 hover:text-zinc-800"
                  )}
              >
                Client
              </button>
              <button 
                  onClick={() => setActiveTab("agency")}
                  className={cn(
                    "flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                    activeTab === "agency" ? "bg-brand-500 shadow-md text-zinc-950 dark:text-white" : "text-zinc-400 hover:text-zinc-800"
                  )}
              >
                <Shield className="h-3 w-3" /> Agency
              </button>
              {hasVsResults && (
                 <button 
                    onClick={() => setActiveTab("vs")}
                    className={cn(
                      "flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                      activeTab === "vs" ? "bg-amber-500 shadow-md text-zinc-950 dark:text-white" : "text-zinc-400 hover:text-zinc-800"
                    )}
                >
                  VS Mode
                </button>
              )}
           </div>

           <button 
              onClick={onGenerateBrief}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-950 text-zinc-950 dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl"
           >
             <FileStack className="h-3.5 w-3.5" /> Generate Brief
           </button>
        </div>
      )}
    </div>
  );
}
