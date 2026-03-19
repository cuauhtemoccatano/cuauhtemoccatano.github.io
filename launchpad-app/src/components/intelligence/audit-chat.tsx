"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MessageSquare, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "strategist";
  content: string;
}

interface AuditChatProps {
  context: any;
}

export function AuditChat({ context }: AuditChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "strategist", content: "I've analyzed the digital footprint. What specific strategic insight or sales pitch do you need for this project?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickQueries = [
    { label: "Draft a Sales Pitch", query: "Write a high-converting 2-paragraph sales pitch for this client based on their SWOT strengths." },
    { label: "Identify SEO Gaps", query: "What are the top 3 SEO improvements I should propose to this client immediately?" },
    { label: "Content Strategy", query: "Suggest a 1-month content strategy based on their current typography and visual style." },
    { label: "Technical Roadmap", query: "What is the most critical technical debt item we should fix first?" }
  ];

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/analyze/chat", {
        method: "POST",
        body: JSON.stringify({ 
          message: text, 
          context, 
          history: messages.slice(-5) 
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "strategist", content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "strategist", content: "Apologies, the strategist engine is currently under maintenance. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-900 rounded-[2.5rem] overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-purple-500/5 pointer-events-none" />
      
      {/* Chat Header */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between relative z-10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black uppercase tracking-tight text-sm">AI Strategist Engine</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Consultation
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[9px] font-black text-zinc-400 uppercase tracking-widest">
           Context: Deep Audit v2.1
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-fit max-w-[85%] flex-col gap-2",
                msg.role === "user" ? "ml-auto items-end" : "items-start"
              )}
            >
              <div 
                className={cn(
                  "p-4 rounded-2xl text-sm font-medium leading-relaxed",
                  msg.role === "user" 
                    ? "bg-zinc-900 text-white rounded-br-none" 
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-800"
                )}
              >
                {msg.content}
              </div>
              <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">
                {msg.role === "user" ? "You" : "Strategist"}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex items-center gap-3 text-brand-500 animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest">Extracting Strategic Insights...</span>
          </div>
        )}
      </div>

      {/* Footer / Input */}
      <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md relative z-10 space-y-4">
        {messages.length === 1 && !loading && (
           <div className="grid grid-cols-2 gap-2 pb-2">
             {quickQueries.map((q, i) => (
               <button
                 key={i}
                 onClick={() => handleSend(q.query)}
                 className="text-left p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-brand-500 transition-all text-[10px] font-bold group"
               >
                 <span className="text-zinc-400 group-hover:text-brand-500 transition-colors block mb-1">{q.label}</span>
                 <ArrowRight className="h-3 w-3 inline-block ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
               </button>
             ))}
           </div>
        )}

        <form 
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
        >
          <input 
            type="text" 
            placeholder="Ask the strategist anything about this audit..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl py-4 pl-6 pr-16 text-sm font-medium focus:outline-none focus:border-brand-500 transition-all shadow-inner disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-zinc-900 text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
