"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Code2, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Cpu,
  Workflow,
  Download,
  Copy,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MigrationData } from "@/types/intelligence";

interface MigrationBlueprintProps {
  data: MigrationData;
}

const IconMap: Record<string, LucideIcon> = {
  Database,
  Code2,
  Layers,
  Cpu,
  Workflow,
  Layout: Layers,
  Grid: Layers,
  Zap: Cpu,
  Shield: CheckCircle2,
};

export function MigrationBlueprint({ data }: MigrationBlueprintProps) {
  const handleCopySchema = () => {
    navigator.clipboard.writeText(data.prisma_schema);
    // Could add a toast here
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `migration-blueprint-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Terminal className="h-3 w-3" /> Technical Roadmap
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Migration<br/>Blueprint
          </h2>
          <p className="text-zinc-400 font-medium max-w-md text-sm">
            Automated technical induction for transitioning legacy infrastructure to a modern Next.js + Prisma stack.
          </p>
        </div>
        <div className="flex gap-4">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 text-center space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Est. Build Time</span>
                <p className="text-2xl font-black">2.5w</p>
            </div>
            <div className="p-6 bg-emerald-500 text-white rounded-[2rem] text-center space-y-1 shadow-xl shadow-emerald-500/20">
                <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Complexity</span>
                <p className="text-2xl font-black">Medium</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Step-by-Step Checklist */}
        <div className="lg:col-span-1 space-y-8">
          <div className="flex items-center gap-3">
             <Workflow className="h-5 w-5 text-brand-500" />
             <h3 className="font-black uppercase tracking-tight">01. Execution Plan</h3>
          </div>
          <div className="space-y-4">
            {(data.execution_plan?.steps || []).map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-brand-500 transition-all"
              >
                 <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        {i + 1}
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-bold text-sm leading-tight">{step.task}</h4>
                       <div className="flex items-center gap-2 mt-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                            step.status === "done" ? "bg-emerald-500/10 text-emerald-500" :
                            step.status === "progress" ? "bg-amber-500/10 text-amber-500" :
                            "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                          )}>
                            {step.status}
                          </span>
                       </div>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Database Schema & Component Inventory */}
        <div className="lg:col-span-2 space-y-12">
          {/* Prisma Schema */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-brand-500" />
                    <h3 className="font-black uppercase tracking-tight">02. Prisma Schema Induction</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                      PostgreSQL / Prisma
                  </div>
                  <button 
                    onClick={handleCopySchema}
                    className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
            </div>
            
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-[2rem] opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-zinc-950 rounded-[2rem] p-8 border border-white/10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-purple-500" />
                    <pre className="text-zinc-300 font-mono text-xs leading-relaxed overflow-x-auto custom-scrollbar pt-2">
                        {data.prisma_schema}
                    </pre>
                </div>
            </div>
          </div>

          {/* Component Mapping */}
          <div className="space-y-6 pt-6">
             <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-brand-500" />
                <h3 className="font-black uppercase tracking-tight">03. Antigravity Component Mapping</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.component_map || []).map((comp, i) => {
                    return (
                        <div key={i} className="flex items-start gap-4 p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-brand-500">
                                <Layers className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-black uppercase tracking-tighter text-sm italic">{comp.modern}</h4>
                                <div className="text-[8px] font-black text-zinc-400 uppercase mb-1">Legacy: {comp.legacy}</div>
                                <p className="text-[11px] font-medium text-zinc-400 leading-tight">{comp.description}</p>
                                <div className={cn(
                                  "mt-2 inline-block px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border",
                                  comp.complexity === "Complex" ? "bg-red-500/10 border-red-500/20 text-red-500" :
                                  comp.complexity === "Medium" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                                  "bg-brand-500/10 border-brand-500/20 text-brand-500"
                                )}>
                                  {comp.complexity}
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
          </div>
        </div>
      </div>

      {/* Footer / Call to Action */}
      <div className="bg-zinc-900 rounded-[3rem] p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent opacity-50" />
         <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
                Blueprint Ready for Execution.
            </h3>
            <p className="text-zinc-400 font-medium text-sm md:text-base">
                Your legacy stack is mapped. Every model, every component, and every technical step is defined. 
                Deploy this architecture and begin the digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={handleExportJSON}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <Download className="h-4 w-4" /> Export Technical JSON
                </button>
                <button 
                  onClick={handleCopySchema}
                  className="w-full sm:w-auto px-10 py-5 bg-zinc-800 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
                >
                    <Copy className="h-4 w-4" /> Copy Prisma Schema
                </button>
            </div>
         </div>
      </div>
    </div>
  );
}
