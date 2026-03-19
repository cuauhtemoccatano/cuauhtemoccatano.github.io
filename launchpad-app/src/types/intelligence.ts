export interface ScrapeContext {
  url: string;
  title: string;
  description: string;
  headings: string[];
  colors: string[];
  fonts: string[];
  techStack: string[];
  bodyText: string;
  screenshot?: string;
  robots?: boolean;
  siteMap?: boolean;
  ogTags?: Record<string, string>;
}

export interface ScrapeMetrics {
  score: number;
  ttfb: string;
  pageCount: number;
  brokenLinks: number;
  seo: string;
  securityScore: number;
}

export interface ScrapeResult {
  metrics: ScrapeMetrics;
  context: ScrapeContext;
}

export interface VisualDNA {
  colors: string[];
  fonts: string[];
  graphic_style: string;
  visual_rating: number;
}

export interface SWOTMatrix {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface TechnicalDebt {
  issue: string;
  severity: "High" | "Medium" | "Low";
}

export interface GrowthRoadmap {
  conversion: string[];
  seo: string[];
  infrastructure: string[];
  viral_loop: string;
}

export interface AgencyBrief {
  technical_debt: TechnicalDebt[];
  growth_roadmap: GrowthRoadmap;
  suggested_fulfillment: string[];
}

export interface TechnicalAudit {
  healthScore: number;
  criticalCount: number;
  categories: string[];
  topIssues: {
    title: string;
    severity: "error" | "warning";
    description: string;
  }[];
}

export interface MoodboardData {
  original: {
    colors: string[];
    fonts: string[];
  };
  modernized: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      gradient: string;
    };
    typography: {
      heading: string;
      body: string;
    };
    ui_style: string;
    concept_pitch: string;
  };
}

export interface MigrationData {
  prisma_schema: string;
  execution_plan: {
    steps: {
      task: string;
      status: "pending" | "progress" | "done";
    }[];
  };
  component_map: {
    legacy: string;
    modern: string;
    description: string;
    complexity: "Simple" | "Medium" | "Complex";
  }[];
  technical_checklist: string[];
}
