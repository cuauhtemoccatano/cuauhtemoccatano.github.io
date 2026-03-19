import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { headers: corsHeaders, status: 400 });
    }

    // Read Founder Context for "DNA"
    const contextPath = path.join(process.cwd(), '../FOUNDER_CONTEXT.md');
    let founderContext = "";
    try {
      founderContext = fs.readFileSync(contextPath, 'utf8');
    } catch (e) {
      founderContext = "Founder: Cuauhtémoc Cataño. Focus: Digital Engineering & Branding.";
    }

    let response = "";
    const msg = message.toLowerCase();

    if (msg.includes("hola") || msg.includes("hello")) {
      response = "Hola. Soy el Oráculo de Cuauhtémoc. Estoy aquí para architectar tu presencia digital. ¿En qué área de tu marca nos enfocamos hoy?";
    } else if (msg.includes("monetizar") || msg.includes("dinero") || msg.includes("money")) {
      response = "La monetización de élite se basa en la claridad. Te recomiendo empezar con nuestra 'Elite Brand Intelligence Audit' para identificar fugas de ROI.";
    } else if (msg.includes("branding") || msg.includes("marca")) {
      response = "El branding no es solo un logo, es la arquitectura de la confianza. Usamos el sistema 'Liquid Glass' para asegurar que tu marca se sienta premium y poderosa.";
    } else if (msg.includes("launchpad")) {
      response = "El Launchpad es nuestro centro de inteligencia. Es donde la ingeniería de datos se encuentra con la estrategia de negocio.";
    } else {
      response = "Entiendo. Desde la perspectiva de ingeniería de Cuauhtémoc, cada detalle cuenta. ¿Te gustaría que analicemos tu URL actual para darte un score de vitalidad?";
    }

    return NextResponse.json({ response }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Oracle linkage failed' }, { headers: corsHeaders, status: 500 });
  }
}
