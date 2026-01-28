import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; 
import crypto from 'crypto';

export async function POST(req: Request) {
  // 1. GET RAW BODY & SIGNATURE
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature') || '';
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    console.error('❌ LS_WEBHOOK_SECRET is missing');
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  // 2. VERIFY SIGNATURE (Security Guardrail)
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');

  if (digest !== signature) {
    console.warn('⚠️ Invalid Webhook Signature detected');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const attributes = payload.data.attributes;
  const customData = payload.meta.custom_data;

  // 3. FULFILLMENT LOGIC
  if (eventName === 'order_created' || eventName === 'subscription_created') {
    const variantId = attributes.variant_id.toString();
    const customerEmail = attributes.user_email;
    const userId = customData?.user_id;

    try {
      // Find the Kynar Product associated with this variant
      const { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('ls_variant_id', variantId)
        .single();

      if (productError || !product) throw new Error('Product mapping failed');

      // Resolve User ID: Use custom_data or fallback to email lookup
      let finalUserId = userId;
      if (!finalUserId) {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', customerEmail)
          .single();
        finalUserId = profile?.id;
      }

      if (finalUserId) {
        // Unlock the asset by creating the purchase record
        const { error: purchaseError } = await supabaseAdmin
          .from('purchases')
          .insert({
            user_id: finalUserId,
            product_id: product.id,
            ls_order_id: attributes.order_number.toString(),
          });

        if (purchaseError) throw purchaseError;
        console.log(`✅ Kynar Asset Unlocked: ${product.id} for User: ${finalUserId}`);
      }

    } catch (err) {
      console.error('❌ Fulfillment Error:', err);
      return NextResponse.json({ error: 'Internal fulfillment failure' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
