import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { env } from '@/lib/config/env.server';
import { adminClient } from '@/lib/supabase/admin';
import { apiResponse } from '@/lib/api/responses';
export async function POST(req: Request) {
  try {
    const body = await req.text();
    const hList = await headers();
    const signature = hList.get('x-signature') || '';

    // 1. SEC-1: Verify Webhook Signature
    const hmac = crypto.createHmac('sha256', env.LEMON_SQUEEZY_WEBHOOK_SECRET);
    const digest = Buffer.from(hmac.update(body).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta.event_name;

    // 2. BUG-3: Handle logic inside the function
    if (eventName === 'order_created') {
      const { data: order } = payload.data.attributes;
      
      // Upsert purchase to prevent duplicates (IDEMPOTENCY)
      const { error } = await adminClient
        .from('purchases')
        .upsert({
          user_id: payload.meta.custom_data.user_id,
          product_id: payload.meta.custom_data.product_id,
          lemon_squeezy_order_id: order.id.toString(),
          status: 'completed',
          purchase_date: new Date().toISOString(),
        }, { onConflict: 'lemon_squeezy_order_id' });

      if (error) throw error;
    }

    return apiResponse.success({ received: true });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return new apiResponse.error(err.message, 400);
  }
}
