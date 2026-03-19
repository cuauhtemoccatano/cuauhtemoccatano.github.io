"use client";

import { Shield, BarChart3, Target, Globe, Zap, MousePointer2 as Tools, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuditChat } from "@/components/intelligence/audit-chat";
import type { AgencyBrief, ScrapeResult } from "@/types/intelligence";

interface AgencyDashboardProps {
  brief: AgencyBrief | null;
  result: ScrapeResult;
}

export function AgencyDashboard({ brief, result }: AgencyDashboardProps) {
  return (
    <div className="animate-in slide-in-from-right-10 duration-700 space-y-10 pb-20">
       {/* Agency Header - Mobile Optimized */}
       <div className="surface rounded-3xl p-6 md:p-10 bg-brand-600 shadow-2xl shadow-brand-500/20 text-white relative overflow-hidden text-center md:text-left">
          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 w-fit mx-auto md:mx-0 text-[9px] md:text-[10px] font-black uppercase tracking-tighter border border-white/20">
                <Shield className="h-3 w-3" /> Agency Confidential
             </div>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tightest leading-none">Strategic Roadmap</h2>
             <p className="text-brand-100 text-base md:text-lg max-w-2xl font-medium mx-auto md:mx-0">Internal briefing on technical debt and growth loops.</p>
          </div>
          <Shield className="absolute -right-10 -bottom-10 h-48 w-48 md:h-64 md:w-64 text-white/5 rotate-12" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
             {/* Technical Context */}
             <div className="surface rounded-3xl p-6 md:p-10 border-2 space-y-6 md:space-y-8">
                <h3 className="text-lg md:text-xl font-black flex items-center justify-center md:justify-start gap-2">
                   <BarChart3 className="h-5 w-5 text-brand-500" /> Technical Context
                </h3>
                <div className="grid grid-cols-1 gap-4">
                   {brief?.technical_debt?.map((debt, i: number) => (
                      <div key={i} className="p-5 md:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-start justify-between gap-4 transition-all hover:border-brand-500/30">
                         <div className="space-y-1 flex-1">
                            <p className="text-xs md:text-sm font-bold leading-relaxed">{debt.issue}</p>
                         </div>
                         <span className={cn(
                            "px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border shrink-0",
                            debt.severity === "High" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                            debt.severity === "Medium" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                            "bg-brand-500/10 text-brand-500 border-brand-500/20"
                         )}>
                            {debt.severity}
                         </span>
                      </div>
                   )) || (
                      <div className="py-12 text-center text-zinc-400 font-bold border-2 border-dashed rounded-3xl text-sm italic">
                         Collecting tech stack metadata...
                      </div>
                   )}
                </div>
             </div>
             
             {/* Growth Roadmap */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { key: 'conversion' as const, label: 'Conversion', icon: Target },
                  { key: 'seo' as const, label: 'Discovery', icon: Globe },
                  { key: 'infrastructure' as const, label: 'Tech Stack', icon: Zap },
                ].map(category => (
                   <div key={category.key} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 space-y-6 shadow-sm">
                      <div className="flex items-center gap-3">
                         <div className="p-1.5 md:p-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20 shadow-sm">
                            <category.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                         </div>
                         <h4 className="font-black text-xs md:text-sm uppercase tracking-tighter">{category.label}</h4>
                      </div>
                      <ul className="space-y-2 md:space-y-3">
                         {brief?.growth_roadmap?.[category.key]?.map((hack: string, i: number) => (
                            <li key={i} className="flex gap-2 text-[11px] md:text-xs font-medium text-zinc-400 leading-normal">
                               <span className="text-brand-500 shrink-0">•</span> 
                               <span className="line-clamp-3">{hack}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
                ))}
             </div>
              {/* Audit Strategist Chat */}
              <div className="space-y-6">
                 <h3 className="text-lg md:text-xl font-black flex items-center gap-2 px-2">
                    <Sparkles className="h-5 w-5 text-brand-500" /> AI Strategist
                 </h3>
                 <AuditChat context={result} />
              </div>
           </div>

          {/* Fulfillment Stack */}
          <div className="surface rounded-3xl p-6 md:p-10 border-2 border-brand-500/20 bg-brand-500/5 space-y-6 md:space-y-8 h-fit">
             <h3 className="text-lg md:text-xl font-black flex items-center justify-center md:justify-start gap-2">
                <Tools className="h-5 w-5 text-brand-500" /> Fulfillment
             </h3>
             <div className="space-y-3 md:space-y-4">
                {brief?.suggested_fulfillment?.map((tool: string, i: number) => (
                   <div key={i} className="p-4 md:p-5 rounded-2xl bg-white dark:bg-zinc-900 border shadow-sm flex items-start gap-4 transition-all hover:scale-[1.02] hover:shadow-lg">
                       <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[9px] md:text-[10px] font-black shrink-0">{i+1}</div>
                      <p className="text-[11px] md:text-xs font-bold leading-relaxed text-zinc-400 dark:text-zinc-300">{tool}</p>
                   </div>
                )) || (
                   <p className="text-[10px] text-zinc-400 font-bold italic text-center py-8">Mapping ecosystem...</p>
                )}
             </div>
          </div>

          {/* Conversion Goal: Strategy Call */}
          <div className="surface rounded-[2.5rem] p-8 md:p-12 bg-zinc-950 border-2 border-brand-500/30 text-center space-y-8 relative overflow-hidden mt-12">
             <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent pointer-events-none" />
             <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-400 text-[10px] font-black uppercase tracking-widest border border-brand-500/20">
                   <Target className="h-4 w-4" /> Conversion Goal
                </div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tightest">Shorten the Sales Cycle.</h3>
                <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">Use these insights to close the prospect. Present the roadmap and book the technical discovery call immediately.</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                   <a 
                     href="https://calendly.com/your-agency" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="btn-primary w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white border-none shadow-[0_0_20px_rgba(59,130,246,0.3)] px-10"
                   >
                     Book Strategy Call
                   </a>
                   <button className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-sm border-2 border-zinc-800 hover:border-zinc-600 transition-all">
                     Download PDF Brief
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
