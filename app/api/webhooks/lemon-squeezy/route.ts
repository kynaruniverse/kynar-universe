import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { validatePriceMatch } from '@/lib/marketplace/pricing';

/**
 * KYNAR UNIVERSE: Transaction Webhook (v2.2)
 * Role: Secure fulfillment and pricing validation.
 */

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  // 1. Signature Verification (Security Perimeter)
  const rawBody = await req.text();
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
  const signature = Buffer.from((await headers()).get('x-signature') || '', 'utf8');

  if (signature.length !== digest.length || !crypto.timingSafeEqual(digest, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const data = payload.data.attributes;

  // 2. Filter for Successful Orders
  if (eventName !== 'order_created') {
    return NextResponse.json({ message: 'Event ignored' });
  }

  const {
    variant_id, // This is your price_id
    total,      // Amount in cents (e.g., 5000 = £50.00)
    user_email,
    custom_data, // Should contain product_id and user_id
  } = data;

  const productId = custom_data?.product_id;
  const userId = custom_data?.user_id;
  const priceId = variant_id.toString();
  const actualPriceInPounds = total / 100;

  // 3. Price Validation: Cross-reference with pricing.ts
  // This ensures the user paid the amount defined in our local registry.
  const isPriceValid = validatePriceMatch(priceId, actualPriceInPounds);

  if (!isPriceValid) {
    console.error(`[Webhook Alert] Price mismatch for Product ${productId}. Paid: ${actualPriceInPounds}, Expected: ID ${priceId}`);
    return NextResponse.json({ error: 'Price mismatch detected' }, { status: 400 });
  }

  // 4. Fulfillment: Update Supabase User Library
  const supabase = await createClient();

  const { error } = await supabase
    .from('user_library')
    .insert({
      user_id: userId,
      product_id: productId,
      purchase_price: actualPriceInPounds,
      price_id: priceId,
      purchased_at: new Date().toISOString()
    });

  if (error) {
    console.error('[Webhook Error] Library update failed:', error.message);
    return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
