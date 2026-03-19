"use client";

import { Sparkles, Layout, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProps } from "@/types/builder";

export function StrategyStep({ config, updateConfig, onNext, t }: StepProps) {
  const brandKeywords = config.brandKeywords || [];
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 pb-12">
      <div className="space-y-6">
        {/* Project Identity */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.clientName}</label>
          <input 
            type="text" 
            placeholder="e.g. Acme Studio"
            className="w-full input-field py-4 text-lg"
            value={config.name}
            onChange={(e) => updateConfig({ name: e.target.value })}
          />
          <p className="text-[10px] text-zinc-400">{t.projectNameHelp}</p>
        </div>

        {/* Project Vision (Keywords) */}
        <div className="space-y-3 p-6 rounded-3xl bg-white/5 border border-white/5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
             <Sparkles className="h-3 w-3 text-brand-400" /> {t.projectVision}
          </label>
          <div className="flex flex-wrap gap-2">
            {["Modern", "Luxury", "Minimalist", "High-Tech", "Friendly", "Professional", "Bold", "Editorial"].map(word => (
              <button
                key={word}
                onClick={() => {
                  const nextKeywords = brandKeywords.includes(word) 
                    ? brandKeywords.filter(w => w !== word) 
                    : [...brandKeywords, word];
                  updateConfig({ brandKeywords: nextKeywords });
                }}
                className={cn(
                  "px-4 py-2 rounded-full border text-xs font-medium transition-all",
                  brandKeywords.includes(word) 
                    ? "bg-brand-500 border-brand-500 text-white shadow-lg" 
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                )}
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Strategy */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.pricingStrategy}</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => updateConfig({ pricingStrategy: "subscription" })}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                config.pricingStrategy === "subscription" ? "border-brand-500 bg-brand-500/10" : "border-white/10 hover:bg-white/5"
              )}
            >
               <span className="block font-bold">{t.subscription}</span>
               <span className={cn("text-[10px]", config.pricingStrategy === "subscription" ? "text-brand-400" : "text-zinc-400")}>{t.recurringRev}</span>
            </button>
            <button 
              onClick={() => updateConfig({ pricingStrategy: "one-time" })}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                config.pricingStrategy === "one-time" ? "border-brand-500 bg-brand-500/10" : "border-white/10 hover:bg-white/5"
              )}
            >
               <span className="block font-bold">{t.oneTime}</span>
               <span className={cn("text-[10px]", config.pricingStrategy === "one-time" ? "text-brand-400" : "text-zinc-400")}>{t.fixedFee}</span>
            </button>
          </div>
        </div>

        {/* Layout Archetype */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
             <Layout className="h-3 w-3 text-brand-400" /> {t.structuralArchetype}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["minimal", "bold", "editorial"] as const).map(style => (
              <button
                key={style}
                onClick={() => updateConfig({ layoutArchetype: style })}
                className={cn(
                  "p-4 rounded-2xl border text-center transition-all space-y-2",
                  config.layoutArchetype === style 
                    ? "bg-brand-500/10 border-brand-500 text-white ring-1 ring-brand-500" 
                    : "bg-white/5 border-white/5 text-zinc-400 hover:text-white"
                )}
              >
                <div className="h-1.5 w-full bg-current opacity-20 rounded-full" />
                <div className="text-[10px] font-bold uppercase tracking-tight">{t.archetypes[style]}</div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-400 italic text-center">{t.layoutHelp}</p>
        </div>
      </div>

      <div className="pt-8 flex justify-end">
         <button 
           onClick={onNext} 
           className="btn-primary"
           disabled={!config.name}
         >
           {t.continueBranding}
         </button>
      </div>
    </div>
  );
}
