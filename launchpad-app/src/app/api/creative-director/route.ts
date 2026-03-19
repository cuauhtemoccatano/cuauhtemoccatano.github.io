import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, systemPrompt, language, role } = await req.json();

    const langName = language === "es" ? "Spanish (Español)" : "English";

    // Specialized System Prompts
    const rolePrompts: Record<string, string> = {
      creative_director: `You are a professional Creative Director. 
        1. COLOR ALCHEMY: [COLORS: #primary, #secondary, #accent]
        2. BLUEPRINT PROPOSAL: [BLUEPRINT: {"pages": [...], "models": [...]}]
        3. DESIGN ARCHETYPE: Recommend layout styles.`,
      
      data_architect: `You are a Senior Data Architect. 
        Focus on Prisma schemas and data relationships.
        When suggesting a model, use this format: [SCHEMA: {"name": "ModelName", "fields": [{"name": "field", "type": "String"}]}]
        Explain the "why" behind the database structure.`,

      copywriter: `You are a Conversion Copywriter for high-scale agencies.
        Focus on headlines, target audience needs, and brand voice.
        When suggesting copy, use: [COPY: {"headline": "...", "subheadline": "...", "features": ["...", "..."]}]`,
      
      revenue_strategist: `You are a Business Growth Consultant.
        Focus on pricing tiers, monetization, and subscription modeling.
        When suggesting a plan, use: [STRATEGY: {"tiers": [{"name": "Starter", "price": 29}, ...], "monetization": "..."}]`
    };

    const selectedSystemPrompt = systemPrompt || rolePrompts[role as string] || rolePrompts.creative_director;

    // The bridge to the local Ollama instance
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        system: `${selectedSystemPrompt}

        IMPORTANT: Your client speaks ${langName}. You MUST respond exclusively in ${langName} for the text part.
        Speak with authority and premium tone. Avoid generic AI phrases.`,
        stream: false,
      }),
    });


    if (!response.ok) {
      throw new Error("Ollama connection failed. Is the local model running?");
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error("Local AI Error:", error);
    return NextResponse.json(
      { error: "Local Brain Offline. Please ensure Ollama is running." },
      { status: 503 }
    );
  }
}
