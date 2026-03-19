"use client";

import { ArrowRight, Plus, ExternalLink, ShieldCheck, Clock, Layers, LayoutGrid, Search, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const instances = [
  {
    id: "1",
    name: "Yoguis Studio",
    status: "Live",
    url: "yoguis.launchpad.com",
    tier: "Elite",
    updated: "2h ago",
    models: 6,
    color: "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950"
  },
  {
    id: "2",
    name: "Bloom Fitness",
    status: "Staging",
    url: "bloom.launchpad.com",
    tier: "Standard",
    updated: "Just now",
    models: 4,
    color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
  },
  {
    id: "3",
    name: "Onyx Coaching",
    status: "Draft",
    url: "-",
    tier: "Pro",
    updated: "1d ago",
    models: 8,
    color: "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950"
  }
];

export default function ProjectsDashboard() {
  return (
    <div className="p-16 max-w-7xl mx-auto space-y-24 pb-48">
      <header className="space-y-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center shadow-xl">
                  <LayoutGrid className="h-8 w-8 text-zinc-50 dark:text-zinc-950" />
               </div>
               <h1 className="heading-display">Instance Hub</h1>
            </div>
            <p className="body-readable">Manage your provisioned architectures with industry-standard precision and granular control.</p>
          </div>
          <Link href="/projects/new" className="btn-primary py-4 px-10 self-start lg:self-auto">
            <Plus className="h-5 w-5" />
            Provision New Site
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 pt-16 border-t-2 border-zinc-100 dark:border-zinc-900">
           <div className="flex-1 relative w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-zinc-950 dark:group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder="Search instances by name or URL..." 
                className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl py-5 pl-16 pr-6 text-sm font-black focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-500 outline-none transition-all"
              />
           </div>
           <button className="btn-secondary h-[60px] px-8 shrink-0 flex items-center gap-3">
              <Filter className="h-5 w-5" /> Filter Hub
           </button>
        </div>
      </header>

      {/* Instance List - Maximum Readability */}
      <div className="space-y-8" role="list">
        {instances.map((instance) => (
          <div 
            key={instance.id} 
            role="listitem"
            className="surface rounded-3xl p-10 flex flex-col lg:flex-row lg:items-center justify-between group hover:border-zinc-950 dark:hover:border-zinc-50 transition-all duration-300 shadow-sm border-2"
          >
            <div className="flex flex-col sm:flex-row items-center gap-12">
              <div 
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black shadow-2xl ring-4 ring-black/5 dark:ring-white/5",
                  instance.color
                )}
                aria-hidden="true"
              >
                {instance.name.charAt(0)}
              </div>
              
              <div className="space-y-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <h3 className="font-black text-3xl tracking-tight">
                    {instance.name}
                  </h3>
                  <div className={cn(
                    "badge",
                    instance.status === "Live" ? "border-emerald-500 text-emerald-600 bg-emerald-500/5 px-4" :
                    instance.status === "Staging" ? "border-amber-500 text-amber-600 bg-amber-500/5 animate-pulse" :
                    "border-zinc-400 text-zinc-400 bg-zinc-100"
                  )}>
                    {instance.status}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-10">
                  <span className="flex items-center gap-2.5 text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] leading-none">
                    <Layers className="h-4 w-4 text-zinc-950 dark:text-zinc-50" /> {instance.models} MODELS
                  </span>
                  <span className="flex items-center gap-2.5 text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] leading-none">
                    <ShieldCheck className="h-4 w-4 text-zinc-900 dark:text-zinc-100" /> {instance.tier} TIER
                  </span>
                  <span className="flex items-center gap-2.5 text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] leading-none">
                    <Clock className="h-4 w-4 text-zinc-400" /> {instance.updated}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-10 mt-12 lg:mt-0 pt-12 lg:pt-0 border-t-2 lg:border-t-0 border-zinc-100 dark:border-zinc-900">
              <div className="hidden xl:block text-right">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 leading-none">LIVE GATEWAY</p>
                <p className="text-sm font-black text-zinc-950 dark:text-zinc-50 font-mono tracking-tight flex items-center justify-end gap-2">
                  {instance.url} <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                </p>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  className="btn-secondary h-14 w-full sm:w-auto px-10 text-xs font-black uppercase tracking-widest"
                  aria-label={`Configure ${instance.name}`}
                >
                  Configure
                </button>
                <button 
                  className="btn-primary h-14 w-full sm:w-auto px-10 text-xs font-black uppercase tracking-widest"
                  aria-label={`Architect and deploy ${instance.name}`}
                >
                  Architect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Info Section - High Contrast Readability */}
      <section className="bg-zinc-950 dark:bg-zinc-50 rounded-[var(--radius-xl)] p-20 flex flex-col xl:flex-row items-center justify-between mt-48 gap-16 group overflow-hidden border-4 border-zinc-900 dark:border-zinc-200 shadow-2xl">
        <div className="space-y-6 relative z-10 text-center xl:text-left">
          <h3 className="heading-section text-white dark:text-zinc-950 text-4xl">Scale without friction.</h3>
          <p className="text-zinc-400 dark:text-zinc-400 text-xl font-bold max-w-2xl leading-relaxed">
             LaunchPad provides a unified architectural control plane for high-volume agencies to provision and maintain hundreds of isolated white-label environments.
          </p>
        </div>
        <button className="btn-secondary !bg-zinc-800 dark:!bg-zinc-200 !text-white dark:!text-black !border-none px-12 py-5 font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
          Launch Documentation <ArrowRight className="h-5 w-5" />
        </button>
      </section>
    </div>
  );
}
