import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { headers: corsHeaders, status: 400 });
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple deterministic score
    const seed = url.length % 10;
    const score = 65 + seed * 3;
    
    const analysis = {
      score,
      metrics: {
        performance: Math.min(score + 5, 100),
        identity: Math.min(score - 2, 100),
        seo: Math.min(score + 8, 100)
      },
      message: score > 85 ? "Tu marca tiene un desempeño de élite, pero hay fugas de conversión." : "Se identificaron cuellos de botella críticos en tu identidad digital."
    };

    return NextResponse.json(analysis, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze' }, { headers: corsHeaders, status: 500 });
  }
}
