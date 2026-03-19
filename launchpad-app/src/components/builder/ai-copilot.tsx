"use client";

import { useState, useEffect } from "react";
import { Bot, X, Send, Sparkles, MessageSquare, Shield, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language, translations } from "@/lib/translations";

interface AiCopilotProps {
  language?: Language;
  onApplyPalette?: (p: string, s: string, a: string) => void;
  onApplyBlueprint?: (blueprint: any) => void;
  onApplySchema?: (schema: any) => void;
  onApplyCopy?: (copy: any) => void;
}

export function AiCopilot({ 
  language = "en", 
  onApplyPalette, 
  onApplyBlueprint, 
  onApplySchema, 
  onApplyCopy 
}: AiCopilotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "tasks">("chat");
  const t = translations[language];

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Precision Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl group",
          isOpen ? "bg-zinc-950 text-white rotate-90" : "bg-brand-500 text-white hover:scale-110 active:scale-95"
        )}
        aria-label={isOpen ? "Close Copilot" : "Open AI Copilot"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7 group-hover:animate-pulse" />}
      </button>

      {/* Premium Copilot Panel */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[440px] h-[650px] rounded-[32px] overflow-hidden shadow-[0_24px_80px_-12px_rgba(0,0,0,0.5)] border border-white/10 bg-[var(--glass-panel-bg)] backdrop-blur-[40px] animate-in slide-in-from-bottom-5 duration-300 flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950/40 pointer-events-none" />
          {/* Neural Header */}
          <div className="p-8 bg-zinc-950/50 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-black tracking-tight">{language === "es" ? "Copiloto AI" : "AI Copilot"}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Neural v2.4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual Tabs */}
          <div className="flex p-2 bg-black/20 m-6 rounded-2xl border border-white/5">
             <button 
                onClick={() => setActiveTab("chat")}
                className={cn(
                  "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === "chat" ? "bg-white/10 text-white shadow-inner" : "text-zinc-400 hover:text-white"
                )}
             >
               {language === "es" ? "Estrategia" : "Strategy Chat"}
             </button>
             <button 
                onClick={() => setActiveTab("tasks")}
                className={cn(
                  "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === "tasks" ? "bg-white/10 text-white shadow-inner" : "text-zinc-400 hover:text-white"
                )}
             >
               {language === "es" ? "Tareas" : "Growth Tasks"}
             </button>
          </div>

          {/* Interactive Core */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-white/5 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-brand-400">
                <Shield className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest\">System Insights</span>
              </div>
              <p className="text-sm text-zinc-100 leading-relaxed font-bold tracking-tight">
                {language === "es" 
                  ? "Analizando el estado actual. He detectado 3 oportunidades de optimización." 
                  : "Analyzing current project status. I've detected 3 optimization opportunities."}
              </p>
            </div>
            
            <div className="flex gap-4 p-4 rounded-xl border border-dashed border-zinc-700 opacity-50">
               <Zap className="h-5 w-5 text-amber-500" />
               <p className="text-xs font-bold text-zinc-400">
                 {language === "es" ? "Listo para análisis de crecimiento..." : "Ready for Growth Analysis..."}
               </p>
            </div>
          </div>

          {/* Precision Input */}
          <div className="p-8 pt-0 mt-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder={language === "es" ? "Preguntar sobre estrategia..." : "Ask about strategy..."}
                className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm font-bold text-white focus:outline-none focus:border-brand-500 transition-all placeholder:text-zinc-400 shadow-inner"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-all">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
