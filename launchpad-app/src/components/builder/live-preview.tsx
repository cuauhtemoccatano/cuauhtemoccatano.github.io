import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Bell, 
  User, 
  MessageSquare, 
  Zap, 
  Target, 
  Smartphone, 
  Tablet as TabletIcon, 
  Monitor, 
  Sparkles 
} from "lucide-react";

interface PreviewConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  radius: "none" | "sm" | "md" | "lg" | "full";
  buttonStyle: "solid" | "outline" | "glass";
  useGradient: boolean;
  useGrain: boolean;
  gradientDirection: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";

export function LivePreview({ config }: { config: PreviewConfig }) {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  const radiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-2xl",
    full: "rounded-full"
  };

  const viewportMap = {
    desktop: "max-w-4xl aspect-[16/10]",
    tablet: "max-w-2xl aspect-[3/4]",
    mobile: "max-w-[340px] aspect-[9/16]"
  };

  const gradientStyles = config.useGradient 
    ? { background: `linear-gradient(${config.gradientDirection.replace("to-", "to ")}, ${config.primaryColor}, ${config.secondaryColor})` }
    : { backgroundColor: config.primaryColor };

  return (
    <div className="w-full h-full p-8 md:p-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Top bar with Device Toggles */}
        <div className="w-full max-w-4xl flex items-center justify-between mb-8">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-3">
            <Target className="h-3 w-3" />
            Neural Real-Time Rendering
          </div>

          <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-xl border border-white/5 backdrop-blur-md">
            {(["desktop", "tablet", "mobile"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === mode 
                    ? "bg-white/10 text-white shadow-lg" 
                    : "text-zinc-400 hover:text-zinc-300"
                )}
              >
                {mode === "desktop" && <Monitor className="h-4 w-4" />}
                {mode === "tablet" && <TabletIcon className="h-4 w-4" />}
                {mode === "mobile" && <Smartphone className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          initial={false}
          animate={{
            width: viewMode === "desktop" ? "100%" : viewMode === "tablet" ? "650px" : "340px",
            height: viewMode === "desktop" ? "auto" : viewMode === "tablet" ? "800px" : "600px"
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={cn(
            "bg-white shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative border border-black/5 ring-1 ring-white/10",
            viewportMap[viewMode],
            radiusMap[config.radius]
          )}
          style={{ fontFamily: config.font }}
        >
          {/* Mock Header */}
          <header className={cn(
            "px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-white relative z-10",
            viewMode === "mobile" ? "px-4" : "px-8 py-6"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg" style={gradientStyles} />
              <span className="font-bold tracking-tight text-zinc-950 text-sm">{config.name || "Project"}</span>
            </div>
            
            {viewMode !== "mobile" ? (
              <div className="flex items-center gap-6">
                <div className="flex gap-4">
                  <span className="text-[10px] font-bold text-zinc-400">Products</span>
                  <span className="text-[10px] font-bold text-zinc-400">Features</span>
                </div>
                <div className="flex items-center gap-3 pl-6 border-l border-zinc-100">
                   <Bell className="h-4 w-4 text-zinc-400" />
                   <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-zinc-400" />
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-4 w-4 flex flex-col justify-between">
                <div className="h-0.5 w-full bg-zinc-900 rounded-full" />
                <div className="h-0.5 w-full bg-zinc-900 rounded-full" />
                <div className="h-0.5 w-1/2 bg-zinc-900 rounded-full ml-auto" />
              </div>
            )}
          </header>

          {/* Mock Hero */}
          <div className="flex-1 overflow-auto bg-zinc-50 relative custom-scrollbar">
            {config.useGrain && (
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-100 grayscale mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
            )}

            <div className={cn(
              "p-16 space-y-12",
              viewMode === "mobile" ? "p-8 space-y-8" : "p-16"
            )}>
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={config.accentColor}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/5 text-[10px] font-black uppercase tracking-widest text-zinc-400"
                >
                  <Sparkles className="h-3 w-3" style={{ color: config.accentColor }} />
                  Next-Gen Deployment
                </motion.div>

                <h2 className={cn(
                  "font-black tracking-tight text-zinc-950 leading-[0.9]",
                  viewMode === "mobile" ? "text-3xl" : "text-5xl lg:text-6xl"
                )}>
                  Design for the <br/>
                  <span className="italic" style={{ color: config.accentColor }}>next scale.</span>
                </h2>
                <p className={cn(
                  "text-zinc-400 font-medium leading-relaxed",
                  viewMode === "mobile" ? "text-sm" : "text-lg max-w-xl"
                )}>
                  Empowering teams with high-performance infrastructure and stunning visuals that convert.
                </p>
                
                <div className={cn(
                  "flex items-center gap-4 pt-4",
                  viewMode === "mobile" && "flex-col items-stretch"
                )}>
                   <button 
                    className={cn(
                      "px-8 py-4 text-sm font-bold transition-all shadow-xl hover:scale-105 active:scale-95",
                      config.buttonStyle === "glass" ? "bg-white/40 backdrop-blur-xl border border-white/20" : "",
                      config.buttonStyle === "outline" ? "border-2" : "text-white",
                      radiusMap[config.radius]
                    )}
                    style={{ 
                      backgroundColor: config.buttonStyle !== "outline" ? config.primaryColor : "transparent",
                      borderColor: config.buttonStyle === "outline" ? config.primaryColor : "transparent",
                      color: config.buttonStyle === "outline" ? config.primaryColor : "white"
                    }}
                   >
                     Launch Platform
                   </button>
                   <button className="px-8 py-4 text-sm font-bold text-zinc-400 hover:text-zinc-950 transition-colors">
                     View Docs
                   </button>
                </div>
              </div>

              {/* Feature Cards */}
              <div className={cn(
                "grid gap-6 pt-12",
                viewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"
              )}>
                 {[1,2].map(i => (
                   <div key={i} className={cn("p-8 bg-white border border-zinc-100 shadow-sm space-y-4", radiusMap[config.radius])}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}>
                         {i === 1 ? <Zap className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                      </div>
                      <h4 className="font-bold text-zinc-900">
                        {i === 1 ? "High Speed Engine" : "Strategic Targets"}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                        {i === 1 
                          ? "Automatic performance orchestration for global reach."
                          : "Precision-engineered metrics for deep conversion analysis."}
                      </p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
