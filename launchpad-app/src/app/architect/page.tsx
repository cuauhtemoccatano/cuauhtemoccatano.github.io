"use client";

import React, { useState } from 'react';
import { Palette, Share2, FileText, Download, Sparkles, Wand2, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ArchitectPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const generateAssets = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowAssets(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-zinc-950 dark:text-white p-8 transition-colors duration-500">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-950 dark:text-white">Brand Architect Studio</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Transform Data into Elite Marketing Assets</p>
      </header>

      {!showAssets ? (
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="w-24 h-24 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
            <Wand2 className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-zinc-950 dark:text-white">Ready to Build Your Brand Assets?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
            Our AI engine uses your latest audit data to generate custom brand boards, 
            social media playbooks, and strategic visual guidelines.
          </p>
          <button 
            onClick={generateAssets}
            disabled={isGenerating}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 mx-auto"
          >
            {isGenerating ? (
              <><Sparkles className="w-5 h-5 animate-spin" /> Architecting...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate Asset Package</>
            )}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Brand Identity Board */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Palette className="w-6 h-6 text-pink-500 dark:text-pink-400" />
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Identity Board</h2>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-widest mb-3">Color Palette</p>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-500" />
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10" />
                  <div className="w-12 h-12 rounded-lg bg-white" />
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-widest mb-3">Typography</p>
                <p className="font-archivo text-xl font-black">ARCHIVO BLACK</p>
                <p className="font-space text-lg">Space Grotesk (Regular)</p>
              </div>
            </div>
          </div>

          {/* Marketing Playbook */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Share2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Social Playbook</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">Target Hooks:</p>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs italic text-gray-400">
                &quot;Why your brand scores high on performance but low on identity...&quot;
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs italic text-gray-400">
                &quot;The engineering secret to a holistic digital presence.&quot;
              </div>

            </div>
          </div>

          {/* High-End Reports */}
          <div className="relative overflow-hidden glass-card p-8 rounded-3xl group">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Strategic Assets</h2>
            </div>
            
            {/* Paywall Overlay */}
            {!isPro && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-10 animate-in fade-in duration-500">
                <Shield className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-bold mb-2 text-white">Architect Master Needed</h3>
                <p className="text-xs text-zinc-300 mb-6">Unlock deep strategic guidelines and vector assets.</p>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20">
                  Upgrade to Master
                </button>
              </div>
            )}

            <div className="space-y-4 filter blur-[2px] pointer-events-none">
              <button className="w-full p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-between">
                <span className="text-sm font-medium">Brand Guidelines (PDF)</span>
                <Download className="w-4 h-4" />
              </button>
              <button className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                <span className="text-sm font-medium">Investor Pitch Deck</span>
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
