import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { planId, customerEmail } = await req.json();

    const planMap = {
      'discovery': { name: 'Elite Audit Report', price: 97 },
      'pro': { name: 'Launchpad Pro (Monthly)', price: 297 },
      'master': { name: 'Full Brand Architect Package', price: 997 }
    };

    const plan = planMap[planId as keyof typeof planMap] || planMap['discovery'];

    // Simulate Stripe Checkout Session URL
    const checkoutUrl = `https://checkout.stripe.test/pay/${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({ 
      url: checkoutUrl,
      planName: plan.name,
      amount: plan.price
    });
  } catch (error) {
    return NextResponse.json({ error: 'Payment link generation failed' }, { status: 500 });
  }
}
