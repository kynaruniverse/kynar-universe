import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; 
import crypto from 'crypto';

/**
 * Webhook Handler: Lemon Squeezy -> Kynar Fulfillment
 * Aligned with Brand Strategy 4.2: "Immediate gratification through secure systems."
 */
export async function POST(req: Request) {
  // 1. Capture Raw Body for HMAC Verification
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature') || '';
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    console.error('❌ Kynar Error: LEMON_SQUEEZY_WEBHOOK_SECRET is missing.');
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  // 2. Security Check: Verify that the request actually came from Lemon Squeezy
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');

  if (digest !== signature) {
    console.warn('⚠️ Kynar Security Alert: Invalid Webhook Signature.');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const attributes = payload.data.attributes;
  const customData = payload.meta.custom_data;

  // 3. Asset Fulfillment Logic
  // Handles 'order_created' for one-time assets and 'subscription_created' for recurring access
  if (eventName === 'order_created' || eventName === 'subscription_created') {
    const variantId = attributes.variant_id.toString();
    const customerEmail = attributes.user_email;
    const userId = customData?.user_id; // Metadata passed from lib/commerce.ts

    try {
      // 3.1 Map the Commercial Variant to the System Product
      const { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('ls_variant_id', variantId)
        .single();

      if (productError || !product) {
        console.error(`❌ Mapping Failed: Variant ${variantId} not in Registry.`);
        throw new Error('Product mapping failed');
      }

      // 3.2 Identify the Architect (User)
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
        // 3.3 Grant Access: Insert into the Purchases Ledger
        const { error: purchaseError } = await supabaseAdmin
          .from('purchases')
          .insert({
            user_id: finalUserId,
            product_id: product.id,
            ls_order_id: attributes.order_number.toString(),
            amount_total: attributes.total // Stored for internal audit
          });

        // If it's a duplicate order ID, Supabase RLS or unique constraints will handle it
        if (purchaseError && purchaseError.code !== '23505') throw purchaseError;
        
        console.log(`✅ Vault Updated: Product ${product.id} granted to User ${finalUserId}`);
      } else {
        console.warn(`⚠️ Delayed Fulfillment: No account found for ${customerEmail}.`);
        // Note: You might trigger an "Invite" email here in a future version
      }

    } catch (err: any) {
      console.error('❌ Fulfillment Failure:', err.message);
      return NextResponse.json({ error: 'Internal processing error' }, { status: 500 });
    }
  }

  // Always respond with 200 to acknowledge receipt to Lemon Squeezy
  return NextResponse.json({ received: true });
}
