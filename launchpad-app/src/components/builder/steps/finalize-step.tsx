"use client";

import { Rocket } from "lucide-react";
import { StepProps } from "@/types/builder";

export function FinalizeStep({ config, onBack, t }: StepProps) {
  const handleProvision = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          ...config,
          schema: config.models,
          pages: config.pages
        })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${config.name.toLowerCase().replace(/\s+/g, "-")}-whitelabel.zip`;
      a.click();
    } catch (err) { 
      alert(t.provisionFailed || "Provisioning failed."); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-full bg-brand-500/10 flex items-center justify-center animate-pulse">
        <Rocket className="h-10 w-10 text-brand-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{t.readyToProvision}</h2>
        <p className="text-zinc-400 text-sm max-w-xs mx-auto">
          {t.provisionHelp} &quot;{config.name || (config.language === "es" ? "Nuevo Cliente" : "New Client")}&quot;.
        </p>
      </div>
      <button 
        onClick={handleProvision}
        className="btn-primary px-12 py-4 text-lg flex items-center gap-3 w-full max-w-xs"
      >
        <Rocket className="h-5 w-5" />
        {t.generate}
      </button>
      <button 
        onClick={onBack} 
        className="text-zinc-400 hover:text-white transition-colors text-xs"
      >
        {t.revisitDatabase}
      </button>
    </div>
  );
}
