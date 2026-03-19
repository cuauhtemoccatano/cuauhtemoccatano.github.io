"use client";

import { Globe, Search, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelligenceControlsProps {
  url: string;
  setUrl: (url: string) => void;
  type: "client" | "competitor";
  setType: (type: "client" | "competitor") => void;
  isVsMode: boolean;
  setIsVsMode: (val: boolean) => void;
  competitorUrls: string[];
  setCompetitorUrls: (urls: string[]) => void;
  isRecursive: boolean;
  setIsRecursive: (val: boolean) => void;
  maxPages: number;
  setMaxPages: (val: number) => void;
  loading: boolean;
  step: "idle" | "scraping" | "analyzing" | "finishing";
  onAnalyze: () => void;
}

export function IntelligenceControls({
  url,
  setUrl,
  type,
  setType,
  isVsMode,
  setIsVsMode,
  competitorUrls,
  setCompetitorUrls,
  isRecursive,
  setIsRecursive,
  maxPages,
  setMaxPages,
  loading,
  step,
  onAnalyze
}: IntelligenceControlsProps) {
  return (
    <div className="surface rounded-3xl p-6 md:p-10 border-2 border-zinc-100 dark:border-zinc-900 shadow-2xl space-y-8 md:space-y-10">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="flex-1 space-y-4">
          <div className="relative">
            <Globe className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Main Target (https://example.com)"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl py-4 md:py-5 pl-16 pr-6 text-base md:text-lg font-bold focus:outline-none focus:border-brand-500 transition-all shadow-inner"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          {isVsMode && competitorUrls.map((cUrl, idx) => (
             <div key={idx} className="relative animate-in slide-in-from-left-2 duration-300">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder={`Competitor ${idx + 1} URL`}
                  className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-xl py-3 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-brand-500 transition-all"
                  value={cUrl}
                  onChange={(e) => {
                     const newUrls = [...competitorUrls];
                     newUrls[idx] = e.target.value;
                     setCompetitorUrls(newUrls);
                  }}
                />
             </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
           <div className="flex p-1.5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800">
              <button 
                onClick={() => setType("client")} 
                className={cn(
                  "flex-1 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
                  type === "client" ? "bg-brand-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                )}
              >
                Client
              </button>
              <button 
                onClick={() => setType("competitor")} 
                className={cn(
                  "flex-1 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
                  type === "competitor" ? "bg-brand-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                )}
              >
                Competitor
              </button>
           </div>
           
           <button 
              onClick={() => {
                 const newVal = !isVsMode;
                 setIsVsMode(newVal);
                 if (newVal && competitorUrls.length === 0) setCompetitorUrls([""]);
              }}
              className={cn(
                  "w-full py-2.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  isVsMode ? "bg-amber-500/10 border-amber-500/50 text-amber-600" : "bg-zinc-50 border-zinc-100 text-zinc-400 hover:border-zinc-300"
              )}
           >
              {isVsMode ? "✓ Benchmarking Active" : "Add VS Benchmarking"}
           </button>
        </div>

        <button 
          onClick={onAnalyze} 
          disabled={loading || !url} 
          className="btn-primary w-full lg:min-w-[200px] py-4 md:py-5 text-base md:text-lg disabled:opacity-50 flex items-center justify-center gap-3 transition-all h-fit self-start"
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="animate-pulse">
                {step === "scraping" ? "Scraping..." : 
                 step === "analyzing" ? "Analyzing..." : 
                 "Finishing..."}
              </span>
            </>
          ) : "Start Analysis"}
        </button>
      </div>
      <div className="flex items-center gap-6 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-2">
         <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-amber-500 shrink-0" /> 
            {isVsMode ? "Competitive Mode: Sequential high-efficiency crawling enabled." : "Resource Optimized: Core Web Vitals + Technical Audit enabled."}
         </div>
         
         <div className="flex items-center gap-4 border-l border-zinc-200 dark:border-zinc-800 pl-6">
            <button 
              onClick={() => setIsRecursive(!isRecursive)}
              className={cn("flex items-center gap-2 transition-colors", isRecursive ? "text-brand-500" : "hover:text-zinc-800")}
            >
              <div className={cn("w-3 h-3 rounded-full border-2", isRecursive ? "bg-brand-500 border-brand-500" : "border-zinc-300")} />
              Recursive Deep Audit
            </button>
            
            {isRecursive && (
               <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 transition-all">
                  <span className="text-zinc-400">Limit:</span>
                  <select 
                      value={maxPages} 
                      onChange={(e) => setMaxPages(parseInt(e.target.value))}
                      className="bg-zinc-100 dark:bg-zinc-800 rounded px-2 py-0.5 outline-none focus:ring-1 ring-brand-500"
                  >
                      <option value={10}>10 Pages</option>
                      <option value={25}>25 Pages</option>
                      <option value={50}>50 Pages</option>
                  </select>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
