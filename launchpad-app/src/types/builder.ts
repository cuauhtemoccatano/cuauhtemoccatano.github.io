import { Language } from "@/lib/translations";

export type BuilderStep = "basics" | "branding" | "communication" | "schema" | "pages" | "finalize";

export interface DataModel {
  id: string;
  name: string;
  description: string;
  fields?: { name: string; type: string }[];
}

export interface PageDefinition {
  id: string;
  name: string;
  path: string;
  template: string;
  modelId: string | null;
}

export interface ProjectConfig {
  name: string;
  language: Language;
  
  // Branding
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  tierName: string;
  radius: "none" | "sm" | "md" | "lg" | "full";
  buttonStyle: "solid" | "outline" | "glass";
  useGradient: boolean;
  useGrain: boolean;
  gradientDirection: string;

  // Strategy & Communication
  brandKeywords: string[];
  layoutArchetype: "minimal" | "bold" | "editorial";
  pricingStrategy: "subscription" | "one-time";
  toneOfVoice: string;
  targetAudience: string;
  coreMessage: string;

  // Architecture & Platform
  models: DataModel[];
  pages: PageDefinition[];
}

export interface StepProps {
  config: ProjectConfig;
  updateConfig: (updates: Partial<ProjectConfig>) => void;
  onNext: () => void;
  onBack?: () => void;
  t: any; // Translations object
}
