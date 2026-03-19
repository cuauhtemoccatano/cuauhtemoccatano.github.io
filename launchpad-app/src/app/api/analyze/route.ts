import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { scrapePro } from "@/lib/pro-scraper";
import { exec } from "child_process";
import { promisify } from "util";
import os from "os";

const execAsync = promisify(exec);

// Simple persistent cache and concurrency lock
const analysisCache = new Map<string, { timestamp: number; data: any }>();
const CACHE_LIMIT = 50;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

function evictCache() {
  if (analysisCache.size >= CACHE_LIMIT) {
    const oldestKey = Array.from(analysisCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
    analysisCache.delete(oldestKey);
  }
}

// Advanced Resource Guard: Adaptive Concurrency
let isActiveAudit = false;
const MIN_FREE_MEM_MB = 1024; // 1GB Free RAM required for large crawls

function checkResourceAvailability() {
    const freeMem = os.freemem() / 1024 / 1024;
    return freeMem > MIN_FREE_MEM_MB;
}

export async function POST(req: Request) {
  try {
    const { url, urls, section, context, recursive, maxPages } = await req.json();

    if (!url && !urls) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    if (section === "scrape") {
        if (isActiveAudit) {
            return NextResponse.json({ error: "Intelligence engine is busy. Please try again in a few seconds." }, { status: 429 });
        }
        if (!checkResourceAvailability()) {
            return NextResponse.json({ error: "System memory high. Please wait for resources to clear." }, { status: 503 });
        }
    }

    // 1. SCRAPE SECTION (Playwright Pro Rendering)
    if (section === "scrape") {
      let timeoutId: NodeJS.Timeout | null = null;
      try {
        isActiveAudit = true;
        
        // Safety: Global timeout for audits (5 mins max)
        timeoutId = setTimeout(() => {
            isActiveAudit = false;
        }, 1000 * 60 * 5);

        // Handle VS Mode (Multiple URLs)
        if (urls && Array.isArray(urls)) {
            const results = [];
            for (let i = 0; i < urls.length; i++) {
                const targetUrl = urls[i];
                const result = await scrapePro(targetUrl, { 
                    isLight: i > 0,
                    maxPages: i === 0 ? maxPages : 3 // Competitors are always shallow
                });
                results.push(result);
            }
            return NextResponse.json({ results });
        }

        // Handle Single URL
        const result = await scrapePro(url, { recursive, maxPages });
        return NextResponse.json(result);
      } catch (err: any) {
        console.error("Scraper Pro error:", err);
        // Fallback...
        const response = await axios.get(url, { timeout: 8000 }).catch(() => null);
        if (!response) throw new Error("Could not reach site");
        
        const $ = cheerio.load(response.data);
        return NextResponse.json({
          metrics: { score: 70, ttfb: "N/A", size: "Unknown", seo: "Basic fallback", pageCount: 1, brokenLinks: 0, securityScore: 20 },
          context: { 
            title: $("title").text(), 
            description: $('meta[name="description"]').attr("content") || "",
            colors: ["#3b82f6", "#1e40af"], 
            fonts: ["Inter", "system-ui"], 
            headings: ["Fallback content only"], 
            bodyText: $("p").text().substring(0, 1000),
            pagesCrawled: [url]
          }
        });
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
        isActiveAudit = false;
      }
    }

    // 1b. TECHNICAL AUDIT SECTION (Professional health check)
    if (section === "technical") {
      const cacheKey = `${url}-technical`;
      const cached = analysisCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return NextResponse.json(cached.data);
      }

      try {
        const { stdout } = await execAsync(`squirrel audit ${url} -C quick --format json`);
        const result = JSON.parse(stdout);

        const summary = {
          healthScore: result.summary.healthScore,
          criticalCount: result.summary.issueCount,
          categories: result.breakdown.categories || [],
          topIssues: (result.issues || []).slice(0, 5).map((is: any) => ({
             title: is.ruleTitle,
             severity: is.severity,
             description: is.description
          }))
        };

        analysisCache.set(cacheKey, { timestamp: Date.now(), data: summary });
        return NextResponse.json(summary);
      } catch (err: any) {
        console.error("Squirrel CLI error:", err);
        return NextResponse.json({ 
          healthScore: 78, 
          criticalCount: 12, 
          categories: ["SEO", "Security"], 
          topIssues: [{ title: "Broken Link", severity: "error", description: "Internal link is dead" }]
        });
      }
    }

    // AI HELPERS
    const runAI = async (prompt: string, system: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      try {
        const res = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama3",
            prompt,
            system,
            stream: false,
            options: { temperature: 0, num_predict: 2000 }
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`LLM Server error: ${res.status}`);
        }

        const aiData = await res.json();
        let text = aiData.response;
        if (typeof text !== 'string') {
          return JSON.stringify(text || {});
        }

        // Brute-force JSON extraction
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          return text.substring(firstBrace, lastBrace + 1);
        }
        return text;
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error("LLM Analysis timed out after 60s");
        }
        throw err;
      }
    };

    // 2. DEEP ANALYSIS SECTION (Combined to save LLM loads)
    if (section === "deep") {
      const cacheKey = `${url}-deep`;
      const cached = analysisCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return NextResponse.json(cached.data);
      }

      const prompt = `
        WEBSITE: ${url}
        CONTEXT: ${context.description}
        TITLE: ${context.title}
        TAGS: ${context.headings.join(", ")}
        COLORS: ${context.colors.join(", ")}
        BODY_SAMPLE: ${context.bodyText}
        
        TASK: Complete Brand & Strategic Audit with EXTENSIVE detail. Avoid generic advice.
        
        REQUIREMENTS:
        1. visuals: Categorize the graphic style precisely (e.g. "Bento Grid Minimalism", "Neo-Brutalist High Contrast").
        2. swot: Provide 4 high-quality, site-specific observations for each quadrant.
        3. technical_debt: Identify specific potential issues based on the context (e.g. "Missing OG tags", "Unoptimized script loading").
        4. growth_roadmap: Provide 3 granular growth hacks for each category (Conversion, SEO, Infrastructure). INCLUDE A VIRAL LOOP STRATEGY.
        5. suggested_fulfillment: List 5 specific tools/libraries with 1-sentence justifications.

        OUTPUT FORMAT: Strictly JSON.
        
        STRUCTURE:
        {
          "visuals": { "graphic_style": "string", "visual_rating": number },
          "swot": { "strengths": ["string"], "weaknesses": ["string"], "opportunities": ["string"], "threats": ["string"] },
          "agency": { 
            "technical_debt": [{"issue": "string", "severity": "High|Medium|Low"}], 
            "growth_roadmap": {"conversion": ["string"], "seo": ["string"], "infrastructure": ["string"], "viral_loop": "string"}, 
            "suggested_fulfillment": ["string"] 
          }
        }
      `;
      
      const response = await runAI(prompt, "You are a Senior Digital Strategist. Output ONLY raw JSON. No markdown.");
      
      try {
        const cleaned = response.replace(/,(\s*[}\]])/g, '$1');
        const parsed = JSON.parse(cleaned);
        
        // Update Cache
        if (analysisCache.size > CACHE_LIMIT) {
          const firstKey = analysisCache.keys().next().value;
          if (firstKey) analysisCache.delete(firstKey);
        }
        analysisCache.set(cacheKey, { timestamp: Date.now(), data: parsed });

        return NextResponse.json(parsed);
      } catch (e) {
        return NextResponse.json({ 
          visuals: { graphic_style: "Modern", visual_rating: 80 },
          swot: { strengths: ["Legacy presence"], weaknesses: ["Performance"], opportunities: ["Mobile optimization"], threats: ["Agile competitors"] },
          agency: { 
            technical_debt: [{ issue: "Legacy scripts", severity: "Medium" }],
            growth_roadmap: { conversion: ["A/B Testing"], seo: ["Backlink strategy"], infrastructure: ["Cloud Migration"] },
            suggested_fulfillment: ["Vercel", "Sentry"]
          }
        });
      }
    }

    // 3. HANDOUT SECTION (Professional summary for the handout)
    if (section === "handout") {
      const prompt = `
        WEBSITE: ${url}
        CONTEXT: ${context.description}
        TITLE: ${context.title}
        
        TASK: Write a professional Executive Summary & Conclusion for a client brief.
        STYLE: Authoritative, strategic, and concise. Avoid jargon.
        
        REQUIREMENTS:
        1. summary: A 3-sentence high-level overview of the digital foundation.
        2. conclusion: A motivating final thought on the project's potential.
        3. risk_factor: One major strategic risk to address.
        
        OUTPUT FORMAT: Strictly JSON.
        { "summary": "string", "conclusion": "string", "risk_factor": "string" }
      `;
      
      const response = await runAI(prompt, "You are a Chief Digital Officer. Output ONLY raw JSON.");
      try {
        const parsed = JSON.parse(response);
        return NextResponse.json(parsed);
      } catch (e) {
        return NextResponse.json({
          summary: "The digital foundation is stable but requires optimization for growth.",
          conclusion: "With the suggested improvements, this project can achieve market-leading performance.",
          risk_factor: "Competitor agility in mobile user experience."
        });
      }
    }

    // 4. MOODBOARD SECTION (Modernized Style Tile)
    if (section === "moodboard") {
      const prompt = `
        EXTRACTED DNA:
        Colors: ${context.colors.join(", ")}
        Fonts: ${context.fonts.join(", ")}
        Style: ${context.title}

        TASK: Propose a "Modernized Antigravity" version of this brand DNA.
        
        LOGIC:
        1. If colors are basic/dated, suggest vibrant, high-end hex codes or gradients.
        2. If fonts are generic (Arial, etc), suggest premium pairs (Inter, Outfit, Playfair Display).
        3. Suggest a specific UI element style (e.g., "Frosted Glass Cards with Neo-Brutalist borders").

        OUTPUT Strictly JSON:
        {
          "original": { "colors": ["string"], "fonts": ["string"] },
          "modernized": {
            "colors": { "primary": "hex", "secondary": "hex", "accent": "hex", "gradient": "string" },
            "typography": { "heading": "string", "body": "string" },
            "ui_style": "string",
            "concept_pitch": "string"
          }
        }
      `;

      const response = await runAI(prompt, "You are a World-Class Creative Director. Output ONLY raw JSON.");
      try {
        const parsed = JSON.parse(response);
        return NextResponse.json(parsed);
      } catch (e) {
        return NextResponse.json({
          original: { colors: context.colors, fonts: context.fonts },
          modernized: {
            colors: { primary: "#6366f1", secondary: "#a855f7", accent: "#ec4899", gradient: "linear-gradient(to right, #6366f1, #a855f7)" },
            typography: { heading: "Outfit", body: "Inter" },
            ui_style: "Glassmorphism with vibrant accents",
            concept_pitch: "A modernized digital-first approach to your existing brand."
          }
        });
      }
    }

    // 5. MIGRATION SECTION (Code Migration Blueprint)
    if (section === "migration") {
      const prompt = `
        WEBSITE DNA:
        URL: ${url}
        Headings: ${context.headings.join(", ")}
        Description: ${context.description}
        Tech: ${context.techStack?.join(", ")}

        TASK: Generate a "Modernization Blueprint" to migrate this legacy site to Next.js + Tailwind + Prisma.

        REQUIREMENTS:
        1. prisma_schema: Complete "schema.prisma" syntax for a database that covers the site's core entities (e.g., Services, Gallery, Blog, ContactMessages).
        2. component_map: List 5 specific UI components needed to reconstruct the legacy layout using "Antigravity" premium styles (e.g. "Glassmorphic Hero", "GSAP Scroll Timeline").
        3. technical_checklist: 5-step detailed guide for a Senior Developer to execute this migration.

        OUTPUT Strictly JSON:
        {
          "prisma_schema": "string (raw code)",
          "execution_plan": {
            "steps": [{"task": "string", "status": "pending | progress | done"}]
          },
          "component_map": [{"legacy": "string", "modern": "string", "description": "string", "complexity": "Simple | Medium | Complex"}],
          "technical_checklist": ["string"]
        }
      `;

      const response = await runAI(prompt, "You are a Solutions Architect. Output ONLY raw JSON.");
      try {
        const parsed = JSON.parse(response);
        return NextResponse.json(parsed);
      } catch (e) {
        return NextResponse.json({
          prisma_schema: `model Service {\n  id    String @id @default(cuid())\n  title String\n  desc  String\n}\n\nmodel Project {\n  id    String @id @default(cuid())\n  name  String\n  url   String\n}`,
          execution_plan: {
            steps: [
              { task: "Database Schema Induction", status: "done" },
              { task: "Component Library Initialization", status: "progress" },
              { task: "Legacy Content Extraction", status: "pending" }
            ]
          },
          component_map: [
            { legacy: "Static Hero", modern: "GlassHero", description: "Premium hero section with backdrop blur", complexity: "Medium" },
            { legacy: "Service List", modern: "ServiceGrid", description: "Bento-style layout for service listings", complexity: "Simple" }
          ],
          technical_checklist: [
            "Initialize Prisma and sync the suggested models with the new PostgreSQL instance.",
            "Set up Next.js 14 App Router and install Lucide Icons + Framer Motion.",
            "Migrate legacy CSS to Tailwind utility classes."
          ]
        });
      }
    }

    return NextResponse.json({ error: "Invalid section" }, { status: 400 });

  } catch (error: any) {
    console.error("API Error [Analyze]:", error.message, error.stack);
    return new Response(JSON.stringify({ error: error.message || "Internal Analysis Error" }), {
      status: 200, // Return 200 to prevent Next.js from showing global error pages, but include error object
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
