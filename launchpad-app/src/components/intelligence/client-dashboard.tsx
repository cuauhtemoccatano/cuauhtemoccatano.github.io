"use client";

import { Palette, CheckCircle2, AlertTriangle, Zap, ShieldAlert, Globe, Activity, Shield, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ScrapeResult, TechnicalAudit, VisualDNA, SWOTMatrix } from "@/types/intelligence";

interface ClientDashboardProps {
  result: ScrapeResult;
  techData: TechnicalAudit | null;
  visuals: VisualDNA | null;
  swot: SWOTMatrix | null;
}

export function ClientDashboard({ result, techData, visuals, swot }: ClientDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 animate-in slide-in-from-bottom-10 duration-700">
      
      {/* Performance & Score */}
      <div className="surface rounded-3xl p-6 md:p-8 border-2 space-y-6 md:space-y-8 flex flex-col justify-between">
         <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Core Performance</h3>
            <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-100 dark:text-zinc-800" />
                  <motion.circle 
                    cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray="264" 
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * result.metrics.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className={cn("transition-all", result.metrics.score > 80 ? "text-emerald-500" : result.metrics.score > 50 ? "text-amber-500" : "text-red-500")} 
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl md:text-3xl font-black"
                  >
                    {result.metrics.score}
                  </motion.span>
                  <span className="text-[7px] md:text-[8px] font-black text-zinc-400 uppercase">Core</span>
               </div>
            </div>
         </div>
         
         <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase text-zinc-400"><span>Response</span> <span className="text-zinc-950 dark:text-zinc-950 dark:text-white">{result.metrics.ttfb}</span></div>
            <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase text-zinc-400"><span>Site Coverage</span> <span className="text-brand-500">{result.metrics.pageCount || 1} Pages Audited</span></div>
            <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase text-zinc-400"><span>Broken Links</span> <span className={result.metrics.brokenLinks > 0 ? "text-red-500 font-bold" : "text-emerald-500"}>{result.metrics.brokenLinks || 0} Found</span></div>
            <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase text-zinc-400"><span>SEO Health</span> <span className="text-emerald-500">{result.metrics.seo}</span></div>
         </div>
      </div>

       {/* Technical Compliance & Stack */}
       <div className="surface rounded-3xl p-6 md:p-8 border-2 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tech Artifacts</h3>
             <div className="grid grid-cols-2 gap-2">
                <div className={cn("p-2 rounded-xl text-center border font-black text-[9px] transition-all", result.context.robots ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-zinc-100 border-zinc-200 text-zinc-400")}>ROBOTS.TXT</div>
                <div className={cn("p-2 rounded-xl text-center border font-black text-[9px] transition-all", result.context.siteMap ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-zinc-100 border-zinc-200 text-zinc-400")}>SITEMAP.XML</div>
             </div>
          </div>
          <div className="space-y-3">
             <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-400">System Signatures</h4>
             <div className="flex flex-wrap gap-2">
                {result.context.techStack?.length > 0 ? result.context.techStack.map((tech: string) => (
                   <span key={tech} className="px-2 py-1 rounded-md bg-zinc-900 text-zinc-950 dark:text-white text-[8px] font-black uppercase tracking-widest">{tech}</span>
                )) : (
                   <span className="text-[10px] text-zinc-400 font-bold italic">No signatures found</span>
                )}
             </div>
          </div>
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
             <div className="flex justify-between text-[9px] font-black uppercase text-zinc-400"><span>Compliance Score</span> <span className="text-zinc-950 dark:text-zinc-950 dark:text-white">{result.metrics.securityScore}/100</span></div>
          </div>
       </div>

       {/* Site Preview Screenshot */}
       <div className="surface rounded-3xl p-4 md:p-6 border-2 space-y-4 flex flex-col justify-between overflow-hidden relative group">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Site Preview</h3>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-inner">
             {result.context.screenshot ? (
                <img 
                  src={result.context.screenshot} 
                  alt="Site Preview" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
             ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <Globe className="h-12 w-12" />
                </div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight text-center">Snapshot captured via Playwright Pro</p>
       </div>

       {/* Professional Technical Health Score */}
       <div className="surface rounded-3xl p-6 md:p-8 border-2 border-brand-500/20 bg-brand-500/5 space-y-6 md:space-y-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-4 right-4"><Shield className="h-4 w-4 text-brand-500/40" /></div>
          <div className="space-y-4">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-500">Professional Health</h3>
             <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-200/20" />
                   <motion.circle 
                     cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent" 
                     strokeDasharray="264" 
                     initial={{ strokeDashoffset: 264 }}
                     animate={{ strokeDashoffset: 264 - (264 * (techData?.healthScore || 0)) / 100 }}
                     transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                     className={cn("transition-all", (techData?.healthScore || 0) > 80 ? "text-emerald-500" : (techData?.healthScore || 0) > 50 ? "text-amber-500" : "text-red-500")} 
                   />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   {techData ? (
                      <>
                         <motion.span 
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="text-2xl md:text-3xl font-black"
                         >
                           {techData.healthScore}
                         </motion.span>
                         <span className="text-[7px] md:text-[8px] font-black text-brand-400 uppercase">Audit</span>
                      </>
                   ) : (
                      <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
                   )}
                </div>
             </div>
          </div>
          
          <div className="space-y-2 md:space-y-3">
             <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase text-zinc-400"><span>Critical</span> <span className={cn("font-bold", (techData?.criticalCount || 0) > 0 ? "text-red-400" : "text-emerald-500")}>{techData?.criticalCount || 0} Found</span></div>
             <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase text-zinc-400"><span>Audit</span> <span className="text-brand-400">SquirrelScan</span></div>
          </div>
       </div>

       {/* Professional Issues Log */}
       <div className="md:col-span-2 surface rounded-3xl p-6 md:p-8 border-2 space-y-4 md:space-y-6 overflow-hidden">
          <div className="flex items-center justify-between gap-4">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Issues Log</h3>
             <div className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[8px] font-black text-zinc-400 uppercase truncate">AUDIT REPORT</div>
          </div>
          <div className="space-y-3 max-h-[160px] md:max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
             {techData?.topIssues?.map((issue: any, i: number) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all">
                   <div className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", issue.severity === "error" ? "bg-red-500" : "bg-amber-500")} />
                   <div className="space-y-1">
                      <p className="text-[10px] md:text-[11px] font-black text-zinc-900 dark:text-zinc-100">{issue.title}</p>
                      <p className="text-[9px] md:text-[10px] text-zinc-400 leading-tight line-clamp-2 md:line-clamp-none">{issue.description}</p>
                   </div>
                </div>
             )) || (
                <div className="h-full py-12 flex flex-col items-center justify-center text-zinc-400 space-y-2 opacity-50">
                   <Activity className="h-8 w-8 animate-pulse" />
                   <p className="text-[9px] uppercase font-black tracking-widest">Diagnostics in progress...</p>
                </div>
             )}
          </div>
       </div>

      {/* Visual Identity Audit */}
      <div className="md:col-span-2 lg:col-span-3 surface rounded-3xl p-6 md:p-10 border-2 space-y-8 md:space-y-10">
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20"><Palette className="h-6 w-6" /></div>
            <div>
              <h3 className="text-xl md:text-2xl font-black">Visual Identity Audit</h3>
              <p className="text-[10px] md:text-xs font-bold text-zinc-400 tracking-tight">Consistency and design language analysis</p>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-4 md:space-y-6">
               <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Color DNA</h4>
               <div className="flex flex-wrap gap-3 md:gap-4">
                  {visuals?.colors?.map((c: string) => (
                    <div key={c} className="group relative">
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 shadow-lg transition-transform hover:scale-110" style={{ backgroundColor: c }} />
                       <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity uppercase whitespace-nowrap">{c}</span>
                    </div>
                  ))}
               </div>
               <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">Graphic style: <span className="text-zinc-950 dark:text-zinc-950 dark:text-white font-bold">{visuals?.graphic_style || "Dynamic Layout"}</span></p>
            </div>
            
            <div className="space-y-4 md:space-y-6">
               <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Typography Scale</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {visuals?.fonts?.map((f: string) => (
                     <div key={f} className="p-2.5 md:p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-dashed text-[10px] md:text-xs font-bold text-center truncate px-2">{f}</div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* SWOT Matrix (FODA) */}
      <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
         {[
           { id: 'strengths', label: 'Strengths', color: 'bg-emerald-500', icon: CheckCircle2, data: swot?.strengths },
           { id: 'weaknesses', label: 'Weaknesses', color: 'bg-red-500', icon: AlertTriangle, data: swot?.weaknesses },
           { id: 'opportunities', label: 'Opportunities', color: 'bg-brand-500', icon: Zap, data: swot?.opportunities },
           { id: 'threats', label: 'Threats', color: 'bg-amber-500', icon: ShieldAlert, data: swot?.threats },
         ].map(item => (
            <div key={item.id} className="surface rounded-3xl p-6 md:p-8 border-2 space-y-4 md:space-y-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
               <div className="flex items-center gap-3">
                  <div className={cn("p-1.5 md:p-2 rounded-lg text-zinc-950 dark:text-white shrink-0", item.color)}><item.icon className="h-3.5 w-3.5 md:h-4 md:w-4" /></div>
                  <h4 className="text-base md:text-lg font-black">{item.label}</h4>
               </div>
               <ul className="space-y-2 md:space-y-3">
                  {item.data?.map((point: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-[11px] md:text-sm text-zinc-400 dark:text-zinc-400 leading-tight font-medium">
                       <span className="text-brand-500 shrink-0">•</span> {point}
                    </li>
                  ))}
               </ul>
            </div>
         ))}
      </div>
    </div>
  );
}
