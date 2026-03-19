"use client";

import { LayoutGrid, Rocket, CreditCard, Library, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    id: "saas-starter",
    name: "SaaS Enterprise",
    description: "Full-stack multi-tenant architecture with specialized billing and RBAC layers. Secure, scalable, and production-ready.",
    icon: Rocket,
    complexity: "High-End",
    tag: "Standard"
  },
  {
    id: "e-commerce",
    name: "Headless Commerce",
    description: "Highly performant product engine with integrated Stripe checkout flows and global state management.",
    icon: CreditCard,
    complexity: "Advanced",
    tag: "Optimized"
  },
  {
    id: "internal-tool",
    name: "Control Plane",
    description: "Sophisticated admin interface for complex data management, auditing, and deep visualization.",
    icon: Library,
    complexity: "Enterprise",
    tag: "Internal"
  },
  {
    id: "landing-page",
    name: "Marketing Core",
    description: "Conversion-first architecture optimized for performance, SEO, and top-tier lighthouse scores.",
    icon: Zap,
    complexity: "Balanced",
    tag: "Agile"
  }
];

export default function TemplatesPage() {
  return (
    <div className="p-16 max-w-7xl mx-auto space-y-32 pb-64">
      <header className="space-y-8">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[var(--radius-md)] bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center shadow-2xl">
             <LayoutGrid className="h-10 w-10 text-zinc-50 dark:text-zinc-950" />
          </div>
          <h1 className="heading-display">Starter Blueprints</h1>
        </div>
        <p className="body-readable italic">
          Initialize your production codebase with pre-architected blueprints tailored for high-scale agency business models.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {templates.map((tpl) => (
          <div 
            key={tpl.id}
            className="surface rounded-[var(--radius-xl)] p-12 flex flex-col h-full hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 border-2"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-20">
                <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                  <tpl.icon className="h-10 w-10 text-zinc-950 dark:text-zinc-50" />
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="badge border-zinc-200 dark:border-zinc-800 text-zinc-400 px-4 py-1.5 font-black uppercase text-[10px]">
                    {tpl.complexity}
                  </span>
                  {tpl.tag && (
                    <span className="badge border-zinc-950 text-zinc-50 bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 px-4 py-1.5 font-black uppercase text-[10px]">
                      {tpl.tag}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6 mb-20">
                <h3 className="heading-section text-3xl">{tpl.name}</h3>
                <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed font-bold">{tpl.description}</p>
              </div>

              <div className="mt-auto pt-10 border-t-2 border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-zinc-950 dark:text-zinc-50 font-black uppercase tracking-[0.2em]">
                   <ShieldCheck className="h-5 w-5 text-emerald-600" /> SECURE BASE
                </div>
                <Link 
                  href={`/projects/new?template=${tpl.id}`}
                  className="btn-primary py-4 px-10 text-xs uppercase tracking-widest"
                >
                  Adopt Blueprint <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
