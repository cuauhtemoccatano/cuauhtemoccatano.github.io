"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { ArrowLeft, Check, Plus, Trash2, Database, Layout, Save, Rocket, Palette, Type, ShieldCheck, Layers, Sparkles, Briefcase, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LivePreview } from "@/components/builder/live-preview";
import { AiCopilot } from "@/components/builder/ai-copilot";
import { translations, Language } from "@/lib/translations";
import { useSearchParams } from "next/navigation";

// Modular Types and Components
import { ProjectConfig, BuilderStep, DataModel, PageDefinition } from "@/types/builder";
import { StrategyStep } from "@/components/builder/steps/strategy-step";
import { IdentityStep } from "@/components/builder/steps/identity-step";
import { CommunicationStep } from "@/components/builder/steps/communication-step";
import { ArchitectureStep } from "@/components/builder/steps/architecture-step";
import { PlatformStep } from "@/components/builder/steps/platform-step";
import { FinalizeStep } from "@/components/builder/steps/finalize-step";

export default function NewProject() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-zinc-400 font-mono italic animate-pulse">Initializing Neural Builder...</div>}>
      <NewProjectContent />
    </Suspense>
  );
}

function NewProjectContent() {
  const [step, setStep] = useState<BuilderStep>("basics");
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  // Centralized Project State
  const [config, setConfig] = useState<ProjectConfig>({
    name: "",
    language: lang,
    primaryColor: "#6366f1",
    secondaryColor: "#4f46e5",
    accentColor: "#f43f5e",
    font: "Inter",
    tierName: "Premium",
    pricingStrategy: "subscription",
    radius: "md",
    buttonStyle: "solid",
    useGradient: true,
    useGrain: true,
    gradientDirection: "to-br",
    brandKeywords: [],
    layoutArchetype: "minimal",
    toneOfVoice: "Professional",
    targetAudience: "",
    coreMessage: "",
    models: [{ id: "1", name: "User", description: "Standard account" }],
    pages: [
      { id: "1", name: "Landing", path: "/", template: "Landing Page", modelId: null },
      { id: "2", name: "User Directory", path: "/users", template: "List View", modelId: "1" }
    ]
  });

  const updateConfig = (updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  // Sync language with config
  useEffect(() => {
    updateConfig({ language: lang });
  }, [lang]);

  // Handle template selection from query params
  useEffect(() => {
    const tplId = searchParams.get("template");
    if (!tplId) return;

    if (tplId === "saas-starter") {
      setConfig(prev => ({
        ...prev,
        name: "SaaS Platform",
        primaryColor: "#6366f1",
        models: [
          { id: "mod-u", name: "User", description: "Customer accounts" },
          { id: "mod-o", name: "Organization", description: "B2B Teams" },
          { id: "mod-s", name: "Subscription", description: "Billing plans" }
        ],
        pages: [
          { id: "p-1", name: "Home", path: "/", template: "Landing Page", modelId: null },
          { id: "p-2", name: "Dashboard", path: "/dashboard", template: "Dashboard", modelId: null },
          { id: "p-3", name: "Organizations", path: "/orgs", template: "List View", modelId: "mod-o" },
          { id: "p-4", name: "Pricing", path: "/pricing", template: "Pricing Page", modelId: null }
        ]
      }));
    } else if (tplId === "e-commerce") {
      setConfig(prev => ({
        ...prev,
        name: "E-Store",
        primaryColor: "#10b981",
        models: [
          { id: "mod-p", name: "Product", description: "Inventory items" },
          { id: "mod-c", name: "Category", description: "Product grouping" },
          { id: "mod-o", name: "Order", description: "Customer purchases" }
        ],
        pages: [
          { id: "p-1", name: "Shop", path: "/", template: "Landing Page", modelId: null },
          { id: "p-2", name: "Inventory", path: "/products", template: "List View", modelId: "mod-p" },
          { id: "p-3", name: "Checkout", path: "/checkout", template: "Auth Page", modelId: null }
        ]
      }));
    }
  }, [searchParams]);

  const steps = [
    { id: "basics", icon: Briefcase, label: "Strategy" },
    { id: "branding", icon: Palette, label: "Identity" },
    { id: "communication", icon: MessageSquare, label: "Communication" },
    { id: "schema", icon: Database, label: "Architecture" },
    { id: "pages", icon: Layout, label: "Platform" },
    { id: "finalize", icon: Check, label: "Finalize" },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);
  const handleNext = () => setStep(steps[currentStepIndex + 1].id as BuilderStep);
  const handleBack = () => setStep(steps[currentStepIndex - 1].id as BuilderStep);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-zinc-950">
      {/* Sidebar Controls */}
      <div className="w-[450px] xl:w-[500px] flex-shrink-0 overflow-auto p-8 border-r border-white/10 z-10 relative bg-zinc-950/80 backdrop-blur-3xl custom-scrollbar">
        <div className="w-full space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <p className="text-zinc-400 text-xs">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
              {(["en", "es"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold rounded-md transition-all uppercase",
                    lang === l ? "bg-brand-500 text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
            {steps.map((s) => {
              const isActive = step === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id as BuilderStep)}
                  className={cn(
                    "relative flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-brand-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] flex-grow" 
                      : "text-zinc-400 hover:text-zinc-300 hover:bg-white/5 flex-shrink-0"
                  )}
                >
                  <s.icon className={cn("h-4 w-4 transition-transform", isActive && "scale-110")} />
                  
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
                      {(t as any)[s.id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Render Active Step */}
          <div className="min-h-[400px]">
            {step === "basics" && <StrategyStep config={config} updateConfig={updateConfig} onNext={handleNext} t={t} />}
            {step === "branding" && <IdentityStep config={config} updateConfig={updateConfig} onNext={handleNext} onBack={handleBack} t={t} />}
            {step === "communication" && <CommunicationStep config={config} updateConfig={updateConfig} onNext={handleNext} onBack={handleBack} t={t} />}
            {step === "schema" && <ArchitectureStep config={config} updateConfig={updateConfig} onNext={handleNext} onBack={handleBack} t={t} />}
            {step === "pages" && <PlatformStep config={config} updateConfig={updateConfig} onNext={handleNext} onBack={handleBack} t={t} />}
            {step === "finalize" && <FinalizeStep config={config} updateConfig={updateConfig} onNext={handleNext} onBack={handleBack} t={t} />}
          </div>
        </div>
      </div>

      {/* Enhanced Live Preview Side Pane */}
      <div className="flex-1 hidden lg:block overflow-hidden relative z-0 bg-black">
         <LivePreview config={config} />
      </div>

      {/* AI Strategy Copilot */}
      <AiCopilot 
        language={lang} 
        onApplyPalette={(p, s, a) => {
          updateConfig({ primaryColor: p, secondaryColor: s, accentColor: a });
        }}
        onApplyBlueprint={(blueprint) => {
          const newModels = blueprint.models.map((m: any, i: number) => ({
            id: `ai-mod-${i}-${Date.now()}`,
            name: m.name,
            fields: m.fields || [{ name: "name", type: "String" }]
          }));

          const newPages = blueprint.pages.map((p: any, i: number) => {
            const modelForPage = blueprint.models.find((mod: any) => mod.name === p.model);
            const modelId = modelForPage 
              ? newModels[blueprint.models.indexOf(modelForPage)].id 
              : null;

            return {
              id: `ai-pg-${i}-${Date.now()}`,
              name: p.name,
              path: p.path,
              template: p.template,
              modelId: modelId
            };
          });

          updateConfig({ models: newModels, pages: newPages });
          setStep("pages");
        }}
        onApplySchema={(schema) => {
          const newModel = {
            id: `ai-mod-single-${Date.now()}`,
            name: schema.name,
            description: "Suggested by Architect",
            fields: schema.fields
          };
          updateConfig({ models: [...config.models, newModel] });
          setStep("schema");
        }}
        onApplyCopy={(copy) => {
          updateConfig({ coreMessage: `${copy.headline}\n\n${copy.subheadline}\n\nKey Focus: ${copy.features.join(", ")}` });
          setStep("communication");
        }}
      />
    </div>
  );
}
