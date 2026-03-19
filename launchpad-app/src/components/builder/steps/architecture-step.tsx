"use client";

import { Plus, ShieldCheck, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProps } from "@/types/builder";

export function ArchitectureStep({ config, updateConfig, onNext, onBack, t }: StepProps) {
  const addModel = () => {
    const newModel = { 
      id: Date.now().toString(), 
      name: "NewResource", 
      description: "Custom entity" 
    };
    updateConfig({ models: [...config.models, newModel] });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.dataArchitecture}</h2>
        <button 
          onClick={addModel}
          className="text-[10px] font-bold uppercase tracking-widest text-brand-400 flex items-center gap-2 px-3 py-1 bg-brand-500/10 rounded-full"
        >
          <Plus className="h-3 w-3" /> {t.addModel}
        </button>
      </div>

      <div className="space-y-4">
        {config.models.map((model) => (
          <div key={model.id} className="glass p-4 rounded-2xl flex items-center justify-between group border-transparent hover:border-brand-500/30 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-xs">
                 {model.name.charAt(0)}
               </div>
               <div>
                 <p className="text-sm font-bold">{model.name}</p>
                 <p className="text-[10px] text-zinc-400">{model.description || t.standardSchema}</p>
               </div>
            </div>
            {model.name === "User" ? (
              <ShieldCheck className="h-4 w-4 text-green-500" />
            ) : (
              <Database className="h-4 w-4 text-zinc-400" />
            )}
          </div>
        ))}
        
        <div 
          onClick={addModel}
          className="h-32 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-brand-400 hover:border-brand-500/30 transition-all cursor-pointer"
        >
           <Plus className="h-5 w-5" />
           <span className="text-xs font-medium">{t.createResource}</span>
        </div>
      </div>

      <div className="pt-8 flex justify-between">
         <button onClick={onBack} className="btn-secondary">{t.back}</button>
         <button onClick={onNext} className="btn-primary">{t.designPages}</button>
      </div>
    </div>
  );
}
