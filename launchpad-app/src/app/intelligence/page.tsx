"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Search, 
  Zap, 
  Shield, 
  FileStack, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Activity, 
  Palette, 
  BarChart3, 
  Target, 
  MousePointer2 as Tools,
  Sparkles,
  Code2,
  Terminal 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ClientBrief } from "@/components/intelligence/client-brief";
import { VSComparison } from "@/components/intelligence/vs-comparison";
import { MoodboardStudio } from "@/components/intelligence/moodboard-studio";
import { AuditChat } from "@/components/intelligence/audit-chat";
import { MigrationBlueprint } from "@/components/intelligence/migration-blueprint";
import { IntelligenceHeader } from "@/components/intelligence/intelligence-header";
import { IntelligenceControls } from "@/components/intelligence/intelligence-controls";
import { ClientDashboard } from "@/components/intelligence/client-dashboard";
import { AgencyDashboard } from "@/components/intelligence/agency-dashboard";
import { NeuralTerminal } from "@/components/ui/neural-terminal";
import type { 
  ScrapeResult, 
  TechnicalAudit, 
  VisualDNA, 
  SWOTMatrix, 
  AgencyBrief,
  MoodboardData,
  MigrationData
} from "@/types/intelligence";

export default function Intelligence() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"client" | "competitor">("client");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"idle" | "scraping" | "analyzing" | "finishing">("idle");
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [techData, setTechData] = useState<TechnicalAudit | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBrief, setShowBrief] = useState(false);
  const [handoutData, setHandoutData] = useState<any>(null);

  const [parsedData, setParsedData] = useState<{
    visuals: VisualDNA | null;
    swot: SWOTMatrix | null;
    brief: AgencyBrief | null;
  }>({
    visuals: null,
    swot: null,
    brief: null
  });
  const [isVsMode, setIsVsMode] = useState(false);
  const [competitorUrls, setCompetitorUrls] = useState<string[]>([""]);
  const [vsResults, setVsResults] = useState<ScrapeResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<"public" | "agency" | "vs">("public");
  const [isRecursive, setIsRecursive] = useState(false);
  const [maxPages, setMaxPages] = useState(10);
  const [moodboardData, setMoodboardData] = useState<MoodboardData | null>(null);
  const [isGeneratingMoodboard, setIsGeneratingMoodboard] = useState(false);
  const [migrationData, setMigrationData] = useState<MigrationData | null>(null);
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false);
  const [terminalSteps, setTerminalSteps] = useState<string[]>([]);

  const handleAnalyze = async () => {
    if (!url) return;
    
    // Normalize URL
    let normalizedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    setTechData(null);
    setParsedData({ visuals: null, swot: null, brief: null });

    try {
      // 1. Technical Scrape
      setStep("scraping");
      setTerminalSteps(prev => [...prev, "Initializing Secure Neural Uplink...", `Targeting: ${normalizedUrl}`, "Establishing Scraper Tunnel...", "Bypassing Anti-Bot Protocols..."]);
      const scrapeRes = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ 
            url: normalizedUrl, 
            urls: isVsMode ? [normalizedUrl, ...competitorUrls.filter(u => u.trim())] : undefined,
            section: "scrape",
            recursive: isRecursive,
            maxPages: maxPages
        }),
        headers: { "Content-Type": "application/json" },
      });
      const scrapeData = await scrapeRes.json();
      if (scrapeData.error) throw new Error(scrapeData.error);
      
      setTerminalSteps(prev => [...prev, "DOM Snapshot Captured.", "Visual DNA Extraction Commenced...", "Metadata Indexing Complete."]);
      
      if (isVsMode && scrapeData.results) {
          setVsResults(scrapeData.results);
          setResult(scrapeData.results[0]);
          setActiveTab("vs");
      } else {
          setResult(scrapeData); // Populate metrics and title
          setVsResults(null);
      }
      const context = isVsMode ? scrapeData.results[0].context : scrapeData.context;

      // 2. Deep Analysis & Technical Audit (Parallel)
      setStep("analyzing");
      setTerminalSteps(prev => [...prev, "Entering Deep Analysis Phase...", "Uplinking to Strategist Brain...", "Calculating Market Gaps...", "SWOT Induction in progress..."]);
      
      const [analysisRes, techRes, handoutRes] = await Promise.all([
        fetch("/api/analyze", {
          method: "POST",
          body: JSON.stringify({ url: normalizedUrl, section: "deep", context }),
          headers: { "Content-Type": "application/json" },
        }),
        fetch("/api/analyze", {
          method: "POST",
          body: JSON.stringify({ url: normalizedUrl, section: "technical" }),
          headers: { "Content-Type": "application/json" },
        }),
        fetch("/api/analyze", {
          method: "POST",
          body: JSON.stringify({ url: normalizedUrl, section: "handout", context }),
          headers: { "Content-Type": "application/json" },
        })
      ]);

      const [deepData, techAuditData, handoutJson] = await Promise.all([
        analysisRes.json(),
        techRes.json(),
        handoutRes.json()
      ]);
      
      setHandoutData(handoutJson);
      
      setParsedData({
        visuals: deepData.visuals,
        swot: deepData.swot,
        brief: deepData.agency
      });
      
      setTechData(techAuditData);

      setStep("finishing");
      setTerminalSteps(prev => [...prev, "Brief Compiled.", "Strategic Recommendations Finalized.", "Uplink Secure. Analysis Complete."]);
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setError(err.message || "Failed to analyze website.");
      setTerminalSteps(prev => [...prev, `ERROR: Neural Link Interrupted. ${err.message}`]);
    } finally {
      setLoading(false);
      setStep("idle");
    }
  };

  const handleGenerateMoodboard = async () => {
    if (!result || !result.context) return;
    setIsGeneratingMoodboard(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ 
          url, 
          section: "moodboard", 
          context: result.context 
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setMoodboardData(data);
    } catch (err) {
      console.error("Moodboard generation error:", err);
    } finally {
      setIsGeneratingMoodboard(false);
    }
  };

  const handleGenerateBlueprint = async () => {
    if (!result || isGeneratingBlueprint) return;
    setIsGeneratingBlueprint(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ 
          url, 
          section: "migration", 
          context: result.context 
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setMigrationData(data);
    } catch (err) {
      console.error("Blueprint generation error:", err);
    } finally {
      setIsGeneratingBlueprint(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-zinc-950 dark:text-white p-6 md:p-16 max-w-7xl mx-auto space-y-12 md:space-y-16 transition-colors duration-500">
      <ErrorBoundary>
      {/* Header */}
      <IntelligenceHeader 
        hasResult={!!result}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onGenerateBrief={() => setShowBrief(true)}
        hasVsResults={!!vsResults}
      />

      <IntelligenceControls 
        url={url}
        setUrl={setUrl}
        type={type}
        setType={setType}
        isVsMode={isVsMode}
        setIsVsMode={setIsVsMode}
        competitorUrls={competitorUrls}
        setCompetitorUrls={setCompetitorUrls}
        isRecursive={isRecursive}
        setIsRecursive={setIsRecursive}
        maxPages={maxPages}
        setMaxPages={setMaxPages}
        loading={loading}
        step={step}
        onAnalyze={handleAnalyze}
      />

      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <NeuralTerminal 
              isProcessing={loading}
              steps={terminalSteps}
              className="max-w-4xl mx-auto border-brand-500/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="surface rounded-3xl p-6 md:p-8 border-2 border-red-500/20 bg-red-500/5 text-red-500 text-center font-bold animate-in zoom-in-95 duration-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      {result && activeTab === "public" && (
        <ClientDashboard 
          result={result}
          techData={techData}
          visuals={parsedData.visuals}
          swot={parsedData.swot}
        />
      )}

      {result && activeTab === "vs" && vsResults && (
         <VSComparison results={vsResults} />
      )}
      {result && activeTab === "agency" && (
        <AgencyDashboard 
          brief={parsedData.brief}
          result={result}
        />
      )}

           {/* Phase 3: Moodboard Studio Integration */}
           <div className="md:col-span-2 lg:col-span-3 space-y-8 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic">Visual Evolution Studio</h3>
                   <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 max-w-xl">
                     {"Transform legacy brand DNA into a modernized design proposal. Ideal for presenting a \"Vision for the Future\" to the client."}
                   </p>
                </div>
                {!moodboardData && (
                  <button 
                    onClick={handleGenerateMoodboard}
                    disabled={isGeneratingMoodboard}
                    className="group relative px-8 py-4 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      {isGeneratingMoodboard ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Modernizing DNA...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate Modern Moodboard
                        </>
                      )}
                    </span>
                  </button>
                )}
              </div>

              {moodboardData ? (
                <MoodboardStudio data={moodboardData} />
              ) : (
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] py-20 flex flex-col items-center justify-center text-center px-6">
                   <Palette className="h-12 w-12 text-zinc-300 mb-4" />
                   <h4 className="text-xl font-black uppercase tracking-tight text-zinc-400">Design Proposal Ready</h4>
                     <p className="text-sm font-medium text-zinc-400 max-w-xs mt-2 italic">
                       {"\"We've analyzed their current style. Now let's show them where they could go.\""}
                     </p>
                </div>
              )}
           </div>

           {/* Phase 5: Code Migration Blueprint Integration */}
           <div className="md:col-span-2 lg:col-span-3 space-y-12 mt-20 pt-20 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic">Migration Blueprint Engine</h3>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 max-w-xl">
                    Generate a technical roadmap for developers. Induces Prisma schemas, 
                    component inventories, and step-by-step execution plans from legacy site data.
                  </p>
                </div>
                {!migrationData && (
                  <button 
                    onClick={handleGenerateBlueprint}
                    disabled={isGeneratingBlueprint}
                    className="group relative px-8 py-4 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      {isGeneratingBlueprint ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Inducing Blueprint...
                        </>
                      ) : (
                        <>
                          <Code2 className="h-4 w-4" />
                          Generate Migration Blueprint
                        </>
                      )}
                    </span>
                  </button>
                )}
              </div>

              {migrationData ? (
                <MigrationBlueprint data={migrationData} />
              ) : (
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] py-20 flex flex-col items-center justify-center text-center px-6 bg-zinc-50/50 dark:bg-zinc-900/10">
                   <Terminal className="h-12 w-12 text-zinc-300 mb-4" />
                   <h4 className="text-xl font-black uppercase tracking-tight text-zinc-400">Technical Engine Ready</h4>
                    <p className="text-sm font-medium text-zinc-400 max-w-xs mt-2 italic">
                      {"\"We've analyzed their UX. Now let's map their infrastructure for a Next.js rebuild.\""}
                    </p>
                </div>
              )}
           </div>

      {/* Client Brief Modal Overlay */}
      <AnimatePresence>
        {showBrief && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
          >
            <ClientBrief 
              data={result!} 
              techData={techData!}
              parsedData={parsedData}
              handoutData={handoutData}
              vsResults={vsResults || undefined}
              onClose={() => setShowBrief(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      </ErrorBoundary>
    </div>
  );
}

// Basic Error Boundary for Dashboard Stability
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="surface rounded-3xl p-12 text-center space-y-6 border-2 border-red-500/20 bg-red-500/5">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-black">Dashboard Error</h2>
          <p className="text-zinc-400">Something went wrong while rendering the dashboard. Please refresh.</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold">Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
