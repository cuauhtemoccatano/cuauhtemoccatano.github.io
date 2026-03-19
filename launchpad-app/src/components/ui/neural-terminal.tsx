"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  id: string;
  text: string;
  type: "info" | "success" | "warning" | "ai";
}

interface NeuralTerminalProps {
  className?: string;
  steps?: string[];
  isProcessing?: boolean;
}

export function NeuralTerminal({ className, steps = [], isProcessing }: NeuralTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isProcessing && steps.length > lines.length) {
      const nextStep = steps[lines.length];
      const newLine: TerminalLine = {
        id: Math.random().toString(36).substr(2, 9),
        text: nextStep,
        type: nextStep.toLowerCase().includes("ai") || nextStep.toLowerCase().includes("extraction") ? "ai" : "info",
      };
      setLines(prev => [...prev, newLine]);
    }
  }, [steps, isProcessing, lines.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className={cn(
      "bg-black border border-white/10 rounded-xl overflow-hidden font-mono text-[10px] md:text-sm shadow-2xl",
      className
    )}>
      {/* Terminal Header */}
      <div className="bg-zinc-900/50 px-4 py-2 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
          </div>
          <span className="text-zinc-400 text-[9px] uppercase tracking-widest font-black ml-2">Neural Link v4.0.2</span>
        </div>
        <div className="flex items-center gap-2 text-brand-500">
           {isProcessing && <Cpu className="h-3 w-3 animate-spin" />}
           <span className="text-[9px] font-black uppercase tracking-tighter">System {isProcessing ? "Processing" : "Ready"}</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="p-4 h-48 md:h-64 overflow-y-auto space-y-1.5 custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.05),_transparent)]"
      >
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2"
            >
              <ChevronRight className="h-3 w-3 mt-0.5 text-brand-500 shrink-0" />
              <span className={cn(
                "leading-relaxed",
                line.type === "ai" ? "text-brand-400 font-bold" : "text-zinc-400"
              )}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-4 bg-brand-500/50" />
          </motion.div>
        )}
        
        {lines.length === 0 && !isProcessing && (
          <div className="text-zinc-400 italic">Waiting for neural uplink...</div>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="px-4 py-1.5 bg-zinc-900/30 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em]">
        <span>Encrypted Tunnel: Est. 192.168.1.1</span>
        <div className="flex gap-4">
           <span>RAM: 8.2GB</span>
           <span>LAT: 12ms</span>
        </div>
      </div>
    </div>
  );
}
