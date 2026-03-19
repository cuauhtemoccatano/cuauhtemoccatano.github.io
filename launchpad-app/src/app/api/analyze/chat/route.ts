import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context, history = [] } = await req.json();

    if (!message || !context) {
      return NextResponse.json({ error: "Message and context are required" }, { status: 400 });
    }

    // AI HELPERS (Redefined for this route, or we could extract to @/lib/ai)
    const runStrategistAI = async (prompt: string, contextData: any, historyData: any[]) => {
      const systemPrompt = `
        YOU ARE A WORLD-CLASS SENIOR AGENCY STRATEGIST & SEO EXPERT.
        
        GOAL: Provide high-value, actionable strategic advice based on the provided website audit data.
        STYLE: Professional, authoritative, slightly bold, and extremely concise. 
        AUDIENCE: An agency looking to sell a high-ticket digital transformation or SEO retainer to the client.

        ### AUDIT CONTEXT:
        Site: ${contextData.url}
        Title: ${contextData.title}
        DNA: ${contextData.colors?.join(", ")} | ${contextData.fonts?.join(", ")}
        SWOT Strengths: ${contextData.swot?.strengths?.join(", ")}
        SWOT Weaknesses: ${contextData.swot?.weaknesses?.join(", ")}
        Strategic Hacks: ${JSON.stringify(contextData.brief?.growth_roadmap || {})}

        ### GUIDELINES:
        - Reference specific data points from the audit.
        - suggest specific services the agency should pitch (e.g. "Conversion Rate Optimization", "Technical SEO Cleanup").
        - If asked for a pitch or email, make it persuasive and "Antigravity" premium style.
        - Avoid generic AI fluff like "I hope this helps".
      `;

      // Construct history string
      const historyStr = historyData.map(m => `${m.role === 'user' ? 'User' : 'Strategist'}: ${m.content}`).join("\n");
      const fullPrompt = historyStr ? `${historyStr}\nUser: ${prompt}` : prompt;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      try {
        const res = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama3",
            prompt: fullPrompt,
            system: systemPrompt,
            stream: false,
            options: { temperature: 0.7, num_predict: 1000 }
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`LLM Error: ${res.status}`);
        
        const data = await res.json();
        return data.response; // Return the actual response string
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          // Re-throw or handle as a specific error type that POST can catch
          // For now, let's re-throw to be caught by the outer POST try/catch
          throw new Error("Analysis strategist timed out. Please try again.");
        }
        throw err; // Re-throw other errors
      }
    };

    const response = await runStrategistAI(message, context, history);
    return NextResponse.json({ response });

  } catch (error: any) {
    console.error("Strategist API Error:", error);
    if (error.message === "Analysis strategist timed out. Please try again.") {
      return NextResponse.json({ error: error.message }, { status: 504 });
    }
    return NextResponse.json({ error: "Failed to connect to Strategist Engine" }, { status: 500 });
  }
}
