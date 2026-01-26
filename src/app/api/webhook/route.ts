import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const hList = await headers();
    const signature = hList.get('x-signature') || '';

    // 1. Verify Webhook Signature using process.env directly
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(body).digest('hex');

    // Timing-safe comparison to prevent side-channel attacks
    const digestBuffer = Buffer.from(digest, 'hex');
    const signatureBuffer = Buffer.from(signature, 'hex');

    if (digestBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta.event_name;
    const customData = payload.meta.custom_data;

    // 2. Handle Order Created
    if (eventName === 'order_created') {
      const attributes = payload.data.attributes;
      
      // Extract user_id and product_id from the custom data we sent in checkout.ts
      const userId = customData?.user_id;
      // Note: If product_id isn't in custom_data, we map it from variant_id
      const variantId = attributes.variant_id?.toString();

      const { error } = await adminClient
        .from('purchases')
        .upsert({
          user_id: userId,
          lemon_squeezy_order_id: payload.data.id.toString(),
          status: 'completed',
          purchase_date: new Date().toISOString(),
          // Ensure your DB has a way to map variantId to your internal product_id if needed
        }, { onConflict: 'lemon_squeezy_order_id' });

      if (error) {
        console.error('Supabase Upsert Error:', error.message);
        throw error;
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error('Webhook Runtime Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
