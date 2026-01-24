import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Signature Verification
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(rawBody).digest('hex');
    const digestBuffer = Buffer.from(digest, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digestBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const { meta, data } = body;

    // 2. Handle Order Created
    if (meta.event_name === 'order_created') {
      const userId = meta.custom_data?.user_id;
      const orderId = String(data.id);
      
      // LS provides variant_id in the attributes of the first order item
      const variantId = String(data.attributes.first_order_item?.variant_id);

      if (!userId) {
        console.error('❌ Webhook Error: No user_id found in custom_data. Check your Checkout link generation.');
        return NextResponse.json({ error: 'No user_id provided' }, { status: 400 });
      }

      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // 3. Find the Product based on Price ID
      const { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('id, title')
        .eq('price_id', variantId)
        .single();

      if (productError || !product) {
        // Fallback: If direct match fails, try the ilike search for safety
        const { data: fallbackProduct } = await supabaseAdmin
          .from('products')
          .select('id, title')
          .ilike('price_id', `%${variantId}%`)
          .single();
          
        if (!fallbackProduct) {
          console.error(`❌ Webhook Match Failed: No product found for LS Variant ID ${variantId}`);
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
      }

      // 4. Record the Purchase
      const { error: insertError } = await supabaseAdmin
        .from('purchases')
        .upsert({
          user_id: userId,
          product_id: product?.id || '',
          lemon_squeezy_order_id: orderId,
          lemon_squeezy_checkout_id: String(data.attributes.checkout_id || ''),
          status: 'completed',
          purchase_date: new Date().toISOString(),
        }, { 
          onConflict: 'user_id, product_id, lemon_squeezy_order_id' 
        });

      if (insertError) {
        console.error('❌ Database Insert Error:', insertError.message);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }

      console.log(`🚀 Success: User ${userId} unlocked "${product?.title || 'Unknown Product'}"`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('💥 Webhook Crash:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
