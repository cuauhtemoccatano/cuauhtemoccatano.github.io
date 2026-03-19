"use client";

import { Plus, Trash2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProps } from "@/types/builder";

export function PlatformStep({ config, updateConfig, onNext, onBack, t }: StepProps) {
  const addPage = () => {
    const newPage = { 
      id: Date.now().toString(), 
      name: t.addPage || "New Page", 
      path: "/new-page", 
      template: "List View", 
      modelId: config.models[0]?.id || null 
    };
    updateConfig({ pages: [...config.pages, newPage] });
  };

  const removePage = (id: string) => {
    updateConfig({ pages: config.pages.filter(p => p.id !== id) });
  };

  const updatePage = (id: string, updates: any) => {
    updateConfig({
      pages: config.pages.map(p => p.id === id ? { ...p, ...updates } : p)
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.appArchitecture}</h2>
        <button 
          onClick={addPage}
          className="text-[10px] font-bold uppercase tracking-widest text-brand-400 flex items-center gap-2 px-3 py-1 bg-brand-500/10 rounded-full"
        >
          <Plus className="h-3 w-3" /> {t.addPage}
        </button>
      </div>

      <div className="space-y-4">
        {config.pages.map((page) => (
          <div key={page.id} className="glass p-5 rounded-2xl space-y-4 border-transparent hover:border-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                   <Layers className="h-4 w-4" />
                </div>
                <input 
                  value={page.name}
                  onChange={(e) => updatePage(page.id, { name: e.target.value })}
                  className="bg-transparent border-none text-sm font-bold focus:ring-0 p-0 w-32 placeholder:text-zinc-700 font-sans"
                  placeholder={t.pageName}
                />
              </div>
              <button 
                onClick={() => removePage(page.id)} 
                className="text-zinc-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{t.routePath}</label>
                <input 
                  value={page.path}
                  onChange={(e) => updatePage(page.id, { path: e.target.value })}
                  className="w-full input-field text-xs py-2"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{t.template}</label>
                <select 
                  value={page.template}
                  onChange={(e) => updatePage(page.id, { template: e.target.value })}
                  className="w-full input-field text-xs py-2 bg-zinc-900 border-white/5 font-sans"
                >
                  <option>Landing Page</option>
                  <option>List View</option>
                  <option>Detail View</option>
                  <option>Settings Page</option>
                  <option>Dashboard</option>
                  <option>Pricing Page</option>
                  <option>Auth Page</option>
                  <option>404 Page</option>
                </select>
              </div>
            </div>

            {page.template !== "Landing Page" && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{t.dataMapping}</label>
                <select 
                  value={page.modelId || ""}
                  onChange={(e) => updatePage(page.id, { modelId: e.target.value })}
                  className="w-full input-field text-xs py-2 bg-zinc-900 border-white/5 font-sans"
                >
                  <option value="">{t.selectModel}</option>
                  {config.models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
            )}
          </div>
        ))}
        {config.pages.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
           <p className="text-zinc-400 text-sm italic">{t.noPages}</p>
          </div>
        )}
      </div>

      <div className="pt-8 flex justify-between">
         <button onClick={onBack} className="btn-secondary">{t.back}</button>
         <button onClick={onNext} className="btn-primary">{t.reviewLaunch}</button>
      </div>
    </div>
  );
}
