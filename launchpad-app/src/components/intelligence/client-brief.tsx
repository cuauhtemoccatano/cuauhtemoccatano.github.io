"use client";

import { Shield, Globe, Zap, BarChart3, CheckCircle2, AlertTriangle, ShieldAlert, Target, Wrench as Tools, FileText, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { APP_VERSION, AGENCY_NAME } from "@/lib/constants";

interface ClientBriefProps {
  data: {
    metrics: any;
    context: any;
  };
  techData: any;
  parsedData: {
    visuals: any;
    swot: any;
    brief: any;
  };
  handoutData: any;
  vsResults?: any[];
  onClose: () => void;
}

export function ClientBrief({ data, techData, parsedData, handoutData, vsResults, onClose }: ClientBriefProps) {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-white text-zinc-950 overflow-y-auto print:relative print:inset-0 print:bg-white print:p-0">
      {/* Handout Header - Hidden in Print */}
      <div className="sticky top-0 z-10 bg-zinc-50 border-b border-zinc-200 px-8 py-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-900 text-white rounded-lg">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black text-sm uppercase tracking-tight">Professional Client Brief</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">Ready for PDF Export</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.print()}
            className="px-6 py-2 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-lg"
          >
            Export as PDF
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-zinc-100 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all"
          >
            Close Preview
          </button>
        </div>
      </div>

      {/* Actual Brief Content */}
      <div className="max-w-[800px] mx-auto bg-white p-12 md:p-20 space-y-16 print:p-0">
        
        {/* Cover Section */}
        <header className="space-y-12 border-b-4 border-zinc-900 pb-16">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Intelligence Report</span>
              <h1 className="text-6xl font-black tracking-tighter leading-none">
                DIGITAL <br />
                <span className="text-zinc-400">FOUNDATION</span> <br />
                BRIEF.
              </h1>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 justify-end text-zinc-900">
                <Shield className="h-5 w-5 fill-current" />
                <span className="font-black text-lg tracking-tighter">LaunchPad Hub</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{today}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Project Domain</h3>
              <p className="text-xl font-bold tracking-tight">{data.context?.title || "Project Analysis"}</p>
              <div className="flex items-center gap-2 text-zinc-400">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{data.context?.url || "Internal Simulation"}</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Report Status</h3>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest rounded-md">Verified</div>
                <div className="px-3 py-1 bg-zinc-100 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-md border">Confidential</div>
              </div>
            </div>
          </div>

          {/* Visual Canvas Insight (Screenshot) */}
          {data.context?.screenshot && (
            <div className="pt-8">
               <div className="relative aspect-video rounded-[32px] overflow-hidden border-[6px] border-zinc-900 shadow-2xl">
                 <img 
                    src={data.context.screenshot} 
                    alt="Visual Canvas Snapshot" 
                    className="w-full h-full object-cover"
                 />
               </div>
            </div>
          )}
        </header>

        {/* Executive Health Overview */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-zinc-900"></div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">01. Executive Health</h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="p-8 border-2 border-zinc-900 rounded-3xl space-y-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Core Performance</span>
              <div className="text-6xl font-black leading-none">{data.metrics.score}</div>
              <p className="text-[9px] font-bold text-zinc-400 uppercase leading-tight">Optimization <br />Score</p>
            </div>
            <div className="p-8 border-2 border-zinc-100 rounded-3xl space-y-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Technical Audit</span>
              <div className="text-6xl font-black leading-none text-zinc-400">{techData?.healthScore || "--"}</div>
              <p className="text-[9px] font-bold text-zinc-400 uppercase leading-tight">Stability <br />Index</p>
            </div>
            <div className="p-8 bg-zinc-900 text-white rounded-3xl space-y-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400/50">Issue density</span>
              <div className="text-6xl font-black leading-none">{techData?.criticalCount || 0}</div>
              <p className="text-[9px] font-bold text-zinc-400 uppercase leading-tight">Action Items <br />Found</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-8">
             {[
               { label: 'Robots.txt', status: data.context.robots },
               { label: 'Sitemap.xml', status: data.context.siteMap },
               { label: 'OG Tags', status: Object.keys(data.context.ogTags || {}).length > 0 },
               { label: 'Broken Links', status: data.metrics.brokenLinks === 0, count: data.metrics.brokenLinks }
             ].map(item => (
                <div key={item.label} className="p-4 border rounded-2xl flex flex-col items-center justify-center gap-2">
                   <div className={cn("w-2 h-2 rounded-full", item.status ? "bg-emerald-500" : "bg-red-500")} />
                   <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
                </div>
             ))}
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
            Based on our deep crawl across <span className="text-zinc-900 font-bold">{data.metrics.pageCount || 1} distinct pages</span>, the project demonstrates a <span className="text-zinc-900 font-bold">{data.metrics.score > 80 ? "Premium" : "Stable"}</span> baseline. 
            We detected <span className="text-zinc-900 font-bold">{data.metrics.brokenLinks || 0} broken internal links</span> and a technical compliance score of <span className="text-zinc-900 font-bold">{data.metrics.securityScore}/100</span>.
          </p>
        </section>

        {/* Benchmarking Section (Only in VS Mode) */}
        {vsResults && vsResults.length > 1 && (
           <section className="space-y-10 break-before-page pt-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-zinc-900"></div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">02. Competitive Benchmarking</h2>
              </div>
              
              <div className="border border-zinc-200 rounded-3xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-zinc-50">
                      <tr>
                         <th className="p-6 text-[8px] font-black uppercase tracking-widest text-zinc-400">Metric</th>
                         {vsResults.map((r, i) => (
                            <th key={i} className="p-6 text-[8px] font-black uppercase tracking-widest">
                                {i === 0 ? "Client" : `Competitor ${i}`}
                            </th>
                         ))}
                      </tr>
                   </thead>
                   <tbody>
                      {[
                        { label: "Performance Score", key: "score", unit: "/100" },
                        { label: "Response Time", key: "ttfb" },
                        { label: "Broken Links", key: "brokenLinks" },
                        { label: "Compliance Score", key: "securityScore", unit: "/100" },
                      ].map(m => (
                         <tr key={m.key} className="border-t border-zinc-100">
                            <td className="p-6 text-[10px] font-bold text-zinc-400 uppercase">{m.label}</td>
                            {vsResults.map((r, i) => (
                               <td key={i} className="p-6 text-sm font-black">
                                  {r.metrics[m.key]}{m.unit}
                               </td>
                            ))}
                         </tr>
                      ))}
                   </tbody>
                </table>
              </div>
              <p className="text-sm text-zinc-400 font-medium italic">
                 Strategic Note: Detailed benchmarking reveals {vsResults[0].metrics.score > vsResults[1].metrics.score ? "a clear technical advantage for the client" : "significant opportunities for backend optimization to match market leaders"}.
              </p>
           </section>
        )}

        {/* Strategic Analysis */}
        <section className="space-y-10 break-before-page pt-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-zinc-900"></div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{vsResults ? "03" : "02"}. Strategic Analysis (SWOT)</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-zinc-50 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-zinc-900" />
                <h4 className="font-black text-lg">Strengths</h4>
              </div>
              <ul className="space-y-3">
                {parsedData.swot?.strengths?.map((item: string, i: number) => (
                  <li key={i} className="text-xs font-medium text-zinc-400 leading-snug flex gap-3">
                    <span className="text-zinc-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 border-2 border-zinc-100 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-zinc-400" />
                <h4 className="font-black text-lg">Weaknesses</h4>
              </div>
              <ul className="space-y-3">
                {parsedData.swot?.weaknesses?.map((item: string, i: number) => (
                  <li key={i} className="text-xs font-medium text-zinc-400 leading-snug flex gap-3">
                    <span className="text-zinc-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 border-2 border-zinc-100 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-zinc-400" />
                <h4 className="font-black text-lg">Opportunities</h4>
              </div>
              <ul className="space-y-3">
                {parsedData.swot?.opportunities?.map((item: string, i: number) => (
                  <li key={i} className="text-xs font-medium text-zinc-400 leading-snug flex gap-3">
                    <span className="text-zinc-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-zinc-50 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-zinc-900" />
                <h4 className="font-black text-lg">Threats</h4>
              </div>
              <ul className="space-y-3">
                {parsedData.swot?.threats?.map((item: string, i: number) => (
                  <li key={i} className="text-xs font-medium text-zinc-400 leading-snug flex gap-3">
                    <span className="text-zinc-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Growth Roadmap */}
        <section className="space-y-10 break-before-page print:pt-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-zinc-900"></div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{vsResults ? "04" : "03"}. Growth Roadmap</h2>
          </div>

          <div className="space-y-6">
            <div className="p-10 bg-zinc-900 text-white rounded-[40px] relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-widest">
                  <Target className="h-3 w-3" /> Core Growth Loop
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter">&quot;{parsedData.brief?.growth_roadmap?.viral_loop || "Market Expansion Strategy"}&quot;</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl font-medium">
                  We suggest immediate implementation of this viral mechanic to lower CAC and drive organic platform growth.
                </p>
              </div>
              <BarChart3 className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 border-2 border-zinc-100 rounded-3xl space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Conversion Plan</h4>
                <ul className="space-y-4">
                  {parsedData.brief?.growth_roadmap?.conversion?.map((item: string, i: number) => (
                    <li key={i} className="text-xs font-bold leading-tight flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[8px] flex-shrink-0">{i+1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 border-2 border-zinc-100 rounded-3xl space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Scale Strategy</h4>
                <ul className="space-y-4">
                  {parsedData.brief?.growth_roadmap?.infrastructure?.map((item: string, i: number) => (
                    <li key={i} className="text-xs font-bold leading-tight flex gap-3 items-start text-zinc-400">
                      <span className="w-5 h-5 rounded-full bg-zinc-50 flex items-center justify-center text-[8px] flex-shrink-0 text-zinc-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Conclusion */}
        <section className="space-y-10 pt-10 border-t border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-zinc-900"></div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{vsResults ? "05" : "04"}. Strategic Conclusion</h2>
          </div>
          <p className="text-xl font-medium text-zinc-900 leading-relaxed italic tracking-tight">
            &quot;{handoutData?.conclusion || "Effective digital transformation depends not just on technology, but on strategic positioning."}&quot;
          </p>
          <div className="p-8 bg-zinc-50 rounded-3xl space-y-4">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Primary Risk Factor</h4>
             <p className="text-sm font-bold text-red-500">{handoutData?.risk_factor || "Market fragmentation."}</p>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="pt-16 border-t border-zinc-100 flex justify-between items-end pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-900">
              <Shield className="h-4 w-4 fill-current" />
              <span className="font-black text-sm tracking-tighter uppercase">{AGENCY_NAME}</span>
            </div>
            <p className="text-[8px] text-zinc-400 max-w-[200px] leading-relaxed uppercase tracking-widest font-bold">
              Automated Intelligence Report. <br />
              Digital Strategy Engine v{APP_VERSION}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-[0.3em]">Confidential Handout</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
