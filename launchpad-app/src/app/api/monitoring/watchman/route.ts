import { NextResponse } from 'next/server';

// Mock database for monitoring history
const monitoringHistory = [
  { id: '1', url: 'google.com', score: 85, status: 'stable', timestamp: '2026-03-17T10:00:00Z' },
  { id: '2', url: 'google.com', score: 84, status: 'warning', timestamp: '2026-03-18T10:00:00Z' },
  { id: '3', url: 'google.com', score: 88, status: 'stable', timestamp: '2026-03-19T10:00:00Z' },
];

export async function GET() {
  return NextResponse.json({ history: monitoringHistory, status: 'active' });
}

export async function POST(req: Request) {
  try {
    const { url, interval } = await req.json();
    
    // Simulate setting up a "Watchman" monitor
    return NextResponse.json({ 
      message: `The Watchman is now monitoring ${url} every ${interval}.`,
      monitorId: Math.random().toString(36).substring(7),
      active: true 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Monitoring setup failed' }, { status: 500 });
  }
}
