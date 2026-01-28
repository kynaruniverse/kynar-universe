import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; // Use service_role for bypass
import crypto from 'crypto';

export async function POST(req: Request) {
  const rawBody = await req.text();
  
  // 1. VERIFY SIGNATURE (Security Guardrail)
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');
  const signature = req.headers.get('x-signature') || '';

  if (digest !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const attributes = payload.data.attributes;

  // 2. FULFILLMENT LOGIC
  if (eventName === 'order_created' || eventName === 'subscription_created') {
    const variantId = attributes.variant_id.toString();
    
    // We pass the user_id in the 'custom' field during checkout (lib/commerce.ts)
    // This is more reliable than email-matching.
    const userId = payload.meta.custom_data?.user_id;
    const customerEmail = attributes.customer_email;

    try {
      // Find the internal product ID matched to this Lemon Squeezy variant
      const { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('ls_variant_id', variantId)
        .single();

      if (productError || !product) throw new Error('Product mapping failed');

      // Resolve User ID if not in custom_data
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
        // Create the Purchase Record (Unlocks the asset in /library)
        const { error: purchaseError } = await supabaseAdmin
          .from('purchases')
          .insert({
            user_id: finalUserId,
            product_id: product.id,
            ls_order_id: attributes.order_number.toString(),
            status: 'completed'
          });

        if (purchaseError) throw purchaseError;

        console.log(`✅ Asset unlocked for user: ${finalUserId}`);
      } else {
        // Fallback: Create a "pending" entry or log for manual intervention
        console.warn(`⚠️ Purchase recorded for guest email: ${customerEmail}`);
      }

    } catch (err) {
      console.error('❌ Webhook Processing Error:', err);
      return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
