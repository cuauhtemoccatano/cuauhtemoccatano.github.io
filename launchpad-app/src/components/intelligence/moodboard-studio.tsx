"use client";

import { motion } from "framer-motion";
import { Palette, Type, Layout, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodboardStudioProps {
  data: {
    original: {
      colors: string[];
      fonts: string[];
    };
    modernized: {
      colors: {
        primary: string;
        secondary: string;
        accent: string;
        gradient: string;
      };
      typography: {
        heading: string;
        body: string;
      };
      ui_style: string;
      concept_pitch: string;
    };
  };
}

export function MoodboardStudio({ data }: MoodboardStudioProps) {
  const { original, modernized } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Concept Header */}
      <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden border border-zinc-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 blur-[100px] -mr-48 -mt-48 rounded-full" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-brand-400 font-bold uppercase tracking-widest text-[10px]">
            <Sparkles className="h-4 w-4" />
            Strategic Evolution
          </div>
          <h2 className="text-4xl font-black tracking-tighter max-w-2xl leading-[0.9]">
            {modernized.concept_pitch}
          </h2>
          <p className="text-zinc-400 font-medium max-w-xl">
            {"We've extracted your brand's core DNA and evolved it into a premium, digital-first aesthetic using"} {modernized.ui_style}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Evolution */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-brand-500" />
              <h3 className="font-black uppercase tracking-tight">01. Color Palette Evolution</h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Detected Legacy DNA</span>
              <div className="flex gap-2">
                {original.colors.slice(0, 5).map((color, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border border-zinc-100" 
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-zinc-300">
              <div className="h-px flex-1 bg-zinc-100" />
              <ArrowRight className="h-4 w-4" />
              <div className="h-px flex-1 bg-zinc-100" />
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                Modernized Antigravity Palette
              </span>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-24 rounded-2xl" style={{ backgroundColor: modernized.colors.primary }} />
                  <span className="text-[10px] font-bold block text-center">Primary</span>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-2xl" style={{ backgroundColor: modernized.colors.secondary }} />
                  <span className="text-[10px] font-bold block text-center">Secondary</span>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-2xl" style={{ backgroundColor: modernized.colors.accent }} />
                  <span className="text-[10px] font-bold block text-center">Accent</span>
                </div>
              </div>
              <div 
                className="h-16 rounded-2xl flex items-center justify-center text-white font-black text-xs tracking-widest uppercase"
                style={{ background: modernized.colors.gradient }}
              >
                Signature Brand Gradient
              </div>
            </div>
          </div>
        </section>

        {/* Typography Evolution */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 space-y-8">
          <div className="flex items-center gap-3">
            <Type className="h-5 w-5 text-brand-500" />
            <h3 className="font-black uppercase tracking-tight">02. Typography Pairing</h3>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Proposal Display Type</span>
              <div className="space-y-2">
                <h4 
                  className="text-5xl font-black border-b border-zinc-100 pb-4"
                  style={{ fontFamily: modernized.typography.heading }}
                >
                  {modernized.typography.heading}
                </h4>
                <p className="text-[10px] text-zinc-400 font-medium">Suggested for Headlines & Hero Sections</p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Proposal Content Type</span>
              <div className="space-y-2">
                <p 
                  className="text-lg font-medium leading-relaxed text-zinc-400"
                  style={{ fontFamily: modernized.typography.body }}
                >
                  {"This typeface offers superior readability for longer form content while maintaining a modern, professional character. Recommended for product descriptions, service details, and articles."}
                </p>
                <p className="text-[10px] text-zinc-400 font-medium">Suggested for Body Text & Interface Elements</p>
              </div>
            </div>
          </div>
        </section>

        {/* UI Component Previews */}
        <section className="lg:col-span-2 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-[2.5rem] p-10 border border-zinc-100 dark:border-zinc-800 space-y-10">
          <div className="flex items-center gap-3">
            <Layout className="h-5 w-5 text-brand-500" />
            <h3 className="font-black uppercase tracking-tight">03. UI Pattern Mockups ({modernized.ui_style})</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mock Card */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-2xl shadow-brand-500/5 space-y-4">
              <div className="w-12 h-12 rounded-xl" style={{ background: modernized.colors.gradient }} />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded" />
                <div className="h-2 w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded" />
              </div>
            </div>

            {/* Mock Button */}
            <div className="flex flex-col items-center justify-center p-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl gap-6">
              <button 
                className="px-8 py-3 rounded-full font-black text-sm text-white transition-transform hover:scale-105"
                style={{ backgroundColor: modernized.colors.primary }}
              >
                Lead Action
              </button>
              <button 
                className="px-8 py-3 rounded-full font-black text-sm border-2 transition-all hover:bg-zinc-900 hover:text-white"
                style={{ borderColor: modernized.colors.secondary, color: modernized.colors.secondary }}
              >
                Secondary
              </button>
            </div>

            {/* Analytics Mock */}
            <div className="bg-zinc-900 rounded-3xl p-6 relative overflow-hidden">
               <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${modernized.colors.accent}, transparent)` }} />
               <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Project Vitality</span>
                    <span className="text-xl font-black">98.4%</span>
                  </div>
                  <div className="flex gap-1 h-12 items-end">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t-sm" 
                        style={{ height: `${h}%`, backgroundColor: i === 3 ? modernized.colors.accent : modernized.colors.primary }} 
                      />
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
