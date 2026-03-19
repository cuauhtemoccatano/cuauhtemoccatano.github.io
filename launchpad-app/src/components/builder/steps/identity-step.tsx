"use client";

import { Palette, Layout, Sparkles, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProps } from "@/types/builder";

export function IdentityStep({ config, updateConfig, onNext, onBack, t }: StepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 pb-12">
      {/* Color System Section */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Palette className="h-3 w-3" /> {t.colorArch}
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">{t.primarySecondary}</span>
            <div className="flex gap-2">
              <input type="color" value={config.primaryColor} onChange={(e) => updateConfig({ primaryColor: e.target.value })} className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer" />
              <input type="color" value={config.secondaryColor} onChange={(e) => updateConfig({ secondaryColor: e.target.value })} className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer" />
              <div className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                 <span className="text-[10px] font-mono uppercase">{config.primaryColor}</span>
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.primaryColor }} />
              </div>
            </div>
          </div>
          
          <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">{t.accent}</span>
            <div className="flex gap-2">
              <input type="color" value={config.accentColor} onChange={(e) => updateConfig({ accentColor: e.target.value })} className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer" />
              <div className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                 <span className="text-[10px] font-mono uppercase">{config.accentColor}</span>
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.accentColor }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UI Archetype Section */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Layout className="h-3 w-3" /> {t.layoutArch}
        </label>
        
        <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/5">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">{t.cornerRadius}</span>
            <div className="flex gap-2">
              {(["none", "sm", "md", "lg", "full"] as const).map(r => (
                <button 
                  key={r}
                  onClick={() => updateConfig({ radius: r })}
                  className={cn(
                    "flex-1 py-2 rounded-lg border text-[10px] uppercase font-bold transition-all",
                    config.radius === r ? "border-brand-500 bg-brand-500/10 text-white" : "border-white/5 text-zinc-400"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">{t.buttonStyle}</span>
            <div className="grid grid-cols-3 gap-3">
              {(["solid", "outline", "glass"] as const).map(b => (
                <button 
                  key={b}
                  onClick={() => updateConfig({ buttonStyle: b })}
                  className={cn(
                    "py-3 rounded-xl border text-[10px] uppercase font-bold transition-all",
                    config.buttonStyle === b ? "border-brand-500 bg-brand-500 text-white shadow-lg" : "border-white/5 text-zinc-400 hover:text-white"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Engine Section */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-400" /> {t.gradientEngine}
        </label>
        
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block">{t.enableGradient}</span>
              <p className="text-[9px] text-zinc-400">{t.gradientHelp}</p>
            </div>
            <button 
              onClick={() => updateConfig({ useGradient: !config.useGradient })}
              className={cn(
                "w-12 h-6 rounded-full transition-all relative",
                config.useGradient ? "bg-brand-500" : "bg-zinc-700"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                config.useGradient ? "left-7" : "left-1"
              )} />
            </button>
          </div>

          {config.useGradient && (
            <div className="space-y-3 animate-in fade-in zoom-in-95">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Gradient Direction</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "to-r", icon: "→" },
                  { id: "to-b", icon: "↓" },
                  { id: "to-br", icon: "↘" },
                  { id: "to-tr", icon: "↗" }
                ].map(d => (
                  <button 
                    key={d.id}
                    onClick={() => updateConfig({ gradientDirection: d.id })}
                    className={cn(
                      "py-2 rounded-lg border text-xs font-bold transition-all",
                      config.gradientDirection === d.id ? "border-brand-500 bg-brand-500/10 text-white" : "border-white/5 text-zinc-400 hover:text-white"
                    )}
                  >
                    {d.icon}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block">{t.surfaceGrain}</span>
              <p className="text-[9px] text-zinc-400">{t.grainHelp}</p>
            </div>
            <button 
              onClick={() => updateConfig({ useGrain: !config.useGrain })}
              className={cn(
                "w-12 h-6 rounded-full transition-all relative",
                config.useGrain ? "bg-brand-500" : "bg-zinc-700"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                config.useGrain ? "left-7" : "left-1"
              )} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
         <div className="space-y-2">
           <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
             <Type className="h-3 w-3" /> {t.typography}
           </label>
           <div className="grid grid-cols-3 gap-2">
             {["Inter", "Montserrat", "Playfair"].map(f => (
               <button 
                 key={f}
                 onClick={() => updateConfig({ font: f })}
                 className={cn(
                   "py-2 rounded-lg text-xs font-medium border transition-all",
                   config.font === f ? "border-brand-500 bg-brand-500/10 text-white" : "border-white/5 text-zinc-400 hover:text-white"
                 )}
                 style={{ fontFamily: f }}
               >
                 {f}
               </button>
             ))}
           </div>
         </div>
      </div>

      <div className="pt-8 flex justify-between">
         <button onClick={onBack} className="btn-secondary">{t.back}</button>
         <button onClick={onNext} className="btn-primary">{t.defineComm}</button>
      </div>
    </div>
  );
}
