"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Zap, Shield, Globe, BarChart3, Palette, Layout, Search, Trophy, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VSComparisonProps {
  results: any[]; // Array of ScrapeResult
}

export function VSComparison({ results }: VSComparisonProps) {
  if (!results || results.length < 2) return null;

  const client = results[0];
  const competitors = results.slice(1);

  const metrics = [
    { label: "Core Performance", key: "score", unit: "/100", highIsGood: true },
    { label: "Response Time", key: "ttfb", isTime: true, highIsGood: false },
    { label: "Internal Health", key: "brokenLinks", suffix: " Broken Links", highIsGood: false },
    { label: "Compliance", key: "securityScore", unit: "/100", highIsGood: true },
    { label: "Page Depth", key: "pageCount", suffix: " Pages", highIsGood: true },
  ];

  const getComparisonColor = (val: any, metric: any, allVals: any[]) => {
    if (metric.isTime) {
        const num = parseInt(val);
        const best = Math.min(...allVals.map(v => parseInt(v)));
        return num === best ? "text-emerald-500" : "text-zinc-950 dark:text-white";
    }
    const num = typeof val === 'string' ? parseFloat(val) : val;
    const sorted = allVals.map(v => typeof v === 'string' ? parseFloat(v) : v).sort((a, b) => metric.highIsGood ? b - a : a - b);
    if (num === sorted[0]) return "text-emerald-500";
    if (num === sorted[sorted.length - 1]) return "text-red-500";
    return "text-zinc-950 dark:text-white";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-10">
         <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tightest">Competitive <span className="text-brand-500">Benchmarking.</span></h2>
            <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                <Trophy className="h-3 w-3 text-amber-500" /> Gap Analysis for {new URL(client.context.pagesCrawled[0]).hostname}
            </p>
         </div>
         <div className="flex gap-4">
             <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
                 <CheckCircle2 className="h-3 w-3" /> Market Leader
             </div>
             <div className="px-4 py-2 bg-red-500/10 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20 flex items-center gap-2">
                 <TrendingDown className="h-3 w-3" /> Critical Gap
             </div>
         </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50">
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-400 border-r border-zinc-100 dark:border-zinc-800">Growth Metrics</th>
              <th className="p-8 min-w-[200px] border-r border-zinc-100 dark:border-zinc-800">
                 <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-brand-500 text-white text-[8px] font-black uppercase rounded-md tracking-widest">Client</span>
                    <p className="text-sm font-black truncate max-w-[150px]">{new URL(client.context.pagesCrawled[0]).hostname}</p>
                 </div>
              </th>
              {competitors.map((comp, idx) => (
                <th key={idx} className="p-8 min-w-[200px] border-r last:border-none border-zinc-100 dark:border-zinc-800">
                    <div className="space-y-1">
                        <span className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-400 text-[8px] font-black uppercase rounded-md tracking-widest">Competitor {idx + 1}</span>
                        <p className="text-sm font-black text-zinc-400 truncate max-w-[150px]">{new URL(comp.context.pagesCrawled[0]).hostname}</p>
                    </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, mIdx) => {
              const allVals = results.map(r => r.metrics[m.key]);
              return (
                <tr key={m.key} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <td className="p-8 border-t border-r border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{m.label}</span>
                    </div>
                  </td>
                  <td className="p-8 border-t border-r border-zinc-100 dark:border-zinc-800">
                    <span className={cn("text-xl font-black", getComparisonColor(client.metrics[m.key], m, allVals))}>
                        {client.metrics[m.key]}{m.unit}{m.suffix}
                    </span>
                  </td>
                  {competitors.map((comp, cIdx) => (
                    <td key={cIdx} className="p-8 border-t border-r last:border-none border-zinc-100 dark:border-zinc-800">
                        <span className={cn("text-xl font-black opacity-60", getComparisonColor(comp.metrics[m.key], m, allVals))}>
                            {comp.metrics[m.key]}{m.unit}{m.suffix}
                        </span>
                    </td>
                  ))}
                </tr>
              );
            })}
            {/* Extended Data: Tech Stack */}
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/20">
              <td className="p-8 border-t border-r border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <Zap className="h-3.5 w-3.5 text-brand-500" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Tech Stack</span>
                    </div>
              </td>
              <td className="p-8 border-t border-r border-zinc-100 dark:border-zinc-800">
                 <div className="flex flex-wrap gap-1">
                    {client.context.techStack.slice(0, 3).map((t: string) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-zinc-900 text-white text-[8px] font-bold uppercase">{t}</span>
                    ))}
                 </div>
              </td>
              {competitors.map((comp, idx) => (
                <td key={idx} className="p-8 border-t border-r last:border-none border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-wrap gap-1 opacity-50">
                        {comp.context.techStack.slice(0, 2).map((t: string) => (
                            <span key={t} className="px-2 py-0.5 rounded-md bg-zinc-400 text-white text-[8px] font-bold uppercase">{t}</span>
                        ))}
                    </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="surface rounded-3xl p-8 border-2 space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
                <Search className="h-5 w-5 text-brand-500" /> Organic Advantage
            </h3>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                The client baseline demonstrates a <span className="text-brand-500 font-bold">{client.metrics.score > 80 ? "Superior" : "Competitive"}</span> performance architecture. 
                However, {competitors.find(c => c.metrics.score > client.metrics.score) ? "competitors are outperforming in rendering speed," : "none of the audited competitors match the client's current optimization level."}
            </p>
         </div>
         <div className="surface rounded-3xl p-8 border-2 border-brand-500/20 bg-brand-500/5 space-y-4">
            <h3 className="text-xl font-black flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-500" /> Strategic Recommendation
            </h3>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed italic">
                &quot;Apply the &apos;LaunchPad Next-Gen&apos; stack to widen the technical lead. Focus on eliminating the {client.metrics.brokenLinks} detected broken links to secure a 100% SEO health score against the field.&quot;
            </p>
         </div>
      </div>
    </motion.div>
  );
}
