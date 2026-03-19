import { ArrowRight, Plus, Layers, Database, Globe, Zap, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP_VERSION, APP_STATUS } from "@/lib/constants";

export default function Dashboard() {
  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-20 md:space-y-32">
      {/* Hero Section - Maximum Readability & Professionalism */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
            <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            ENGINE V{APP_VERSION} {APP_STATUS}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tightest leading-[1.1] text-zinc-950 dark:text-zinc-50">
            Architecting the future of <br className="hidden md:block" />
            <span className="text-zinc-400 dark:text-zinc-300">white-label software.</span>
          </h1>
          
          <p className="text-lg md:text-xl font-bold text-zinc-700 dark:text-zinc-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            The specialized builder platform for high-scale marketing agencies. 
            Design, provision, and deploy custom instances with enterprise precision.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
            <Link href="/projects/new" className="btn-primary py-4 px-12 w-full sm:w-auto text-center justify-center">
              <Plus className="h-5 w-5" />
              Initialize Project
            </Link>
            <Link href="/templates" className="btn-secondary py-4 px-10 w-full sm:w-auto text-center justify-center">Explore Blueprints</Link>
          </div>
        </div>

        <div className="flex-1 w-full aspect-[4/3] relative rounded-3xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl group">
          <Image
            src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop"
            alt="Product architecture visualization"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-6 md:p-8 bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 md:space-y-2 text-center sm:text-left">
              <p className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Status Hub</p>
              <p className="text-lg md:text-xl font-black text-white">Yoguis Studio v2.5</p>
            </div>
            <div className="px-4 py-2 rounded-lg border-2 border-emerald-500 text-emerald-400 bg-emerald-500/10 text-[9px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              Live Production
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid - Clear & High Contrast */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {[
          { icon: Database, title: "Visual Schema", desc: "Enterprise-grade database relationship mapping with zero SQL required. Built for rapid architectural expansion." },
          { icon: Layers, title: "UI Scaffolding", desc: "High-performance interface systems that automatically bind to your underlying data models." },
          { icon: Globe, title: "Instance Gateways", desc: "Full codebase generation with total IP sovereignty. Deploy anywhere with one-click provisioning." }
        ].map((feature, i) => (
          <div key={i} className="bento-card bento-hover space-y-6 md:space-y-8 border-2">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center border-2 border-zinc-800 dark:border-zinc-200 shadow-xl">
              <feature.icon className="h-7 w-7 md:h-8 md:w-8 text-white dark:text-zinc-950" />
            </div>
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-2xl font-black tracking-tightest text-zinc-950 dark:text-zinc-50">{feature.title}</h3>
              <p className="text-zinc-700 dark:text-zinc-200 font-bold leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activity - Professional List */}
      <section className="space-y-12 md:space-y-16 pb-20 md:pb-32">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b-4 border-zinc-100 dark:border-zinc-900 pb-10 md:pb-12">
          <div className="space-y-3">
             <h2 className="text-3xl md:text-4xl font-black tracking-tightest text-zinc-950 dark:text-zinc-50">Active Hubs</h2>
             <p className="text-zinc-300 dark:text-zinc-100 font-bold text-base md:text-lg tracking-tight">Real-time monitoring of your agency cloud environments.</p>
          </div>
          <Link href="/projects" className="w-full md:w-auto text-sm font-black text-zinc-950 dark:text-zinc-50 border-b-4 border-zinc-950 dark:border-zinc-50 hover:bg-zinc-950 dark:hover:bg-zinc-50 hover:text-white dark:hover:text-zinc-950 transition-all flex items-center justify-center gap-3 px-6 py-2 tracking-[0.2em] uppercase">
            MANAGE PROJECTS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {[
            { name: "Yoguis Studio", meta: "Elite Architecture • 6 Models", status: "Live" },
            { name: "Bloom Fitness", meta: "Commerce Core • 4 Models", status: "Staging" }
          ].map((project, i) => (
            <div key={i} className="surface rounded-3xl p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-10 hover:shadow-2xl transition-all duration-300 border-2 active:scale-[0.99]">
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-950 dark:bg-zinc-100 flex items-center justify-center text-zinc-50 dark:text-zinc-950 text-2xl md:text-3xl font-black shadow-2xl">
                  {project.name.charAt(0)}
                </div>
                <div className="space-y-2 md:space-y-3 text-center sm:text-left">
                   <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50">{project.name}</h3>
                   <p className="text-[10px] md:text-xs font-black text-zinc-400 dark:text-zinc-200 uppercase tracking-[0.2em]">{project.meta}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className={cn(
                  "badge border-2 text-[10px] md:text-[11px] font-black tracking-widest px-4 md:px-5 py-2",
                  project.status === "Live" ? "border-emerald-600 text-emerald-600 bg-emerald-500/5" : "border-amber-600 text-amber-600 bg-amber-500/5"
                )}>
                  {project.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
