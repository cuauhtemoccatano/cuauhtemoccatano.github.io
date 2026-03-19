"use client";

import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProps } from "@/types/builder";

export function CommunicationStep({ config, updateConfig, onNext, onBack, t }: StepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 pb-12">
      <div className="space-y-6">
        {/* Target Audience */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.targetAudience}</label>
          <input 
            type="text" 
            placeholder="e.g. Gen Z Creators, Enterprise CMOs..."
            className="w-full input-field py-4 text-lg"
            value={config.targetAudience}
            onChange={(e) => updateConfig({ targetAudience: e.target.value })}
          />
        </div>

        {/* Core Message */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.coreNarrative}</label>
          <textarea 
            placeholder={t.messagePlaceholder}
            className="w-full input-field py-4 text-base min-h-[100px] resize-none"
            value={config.coreMessage}
            onChange={(e) => updateConfig({ coreMessage: e.target.value })}
          />
        </div>

        {/* Tone of Voice */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
             <MessageSquare className="h-3 w-3 text-brand-400" /> {t.toneOfVoice}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {([
              { id: "professional", label: t.tones.professional },
              { id: "casual", label: t.tones.casual },
              { id: "authoritative", label: t.tones.authoritative },
              { id: "empathetic", label: t.tones.empathetic }
            ] as const).map(tone => (
              <button
                key={tone.id}
                onClick={() => updateConfig({ toneOfVoice: tone.label })}
                className={cn(
                  "p-4 rounded-2xl border text-center transition-all space-y-2",
                  config.toneOfVoice === tone.label
                    ? "bg-brand-500/10 border-brand-500 text-white ring-1 ring-brand-500" 
                    : "bg-white/5 border-white/5 text-zinc-400 hover:text-white"
                )}
              >
                <div className="text-[12px] font-bold tracking-tight">{tone.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-between">
         <button onClick={onBack} className="btn-secondary">{t.back}</button>
         <button onClick={onNext} className="btn-primary">{t.defineArch}</button>
      </div>
    </div>
  );
}
