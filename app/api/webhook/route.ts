import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    // -------------------------------------------------------------------------
    // SIGNATURE VERIFICATION
    // -------------------------------------------------------------------------
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!secret) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not set.');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      console.error('Webhook signature verification failed.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    // -------------------------------------------------------------------------
    // END VERIFICATION
    // -------------------------------------------------------------------------

    const body = JSON.parse(rawBody);
    const { meta, data } = body;

    if (meta.event_name === 'order_created') {
      const userId = meta.custom_data?.user_id;
      // Lemon Squeezy sends the Variant ID as a string or number. We cast to string to be safe.
      const variantId = String(data.attributes.first_order_item.variant_id);
      const orderId = String(data.id);

      if (!userId) {
        console.error('No user_id found in webhook custom_data');
        return NextResponse.json({ error: 'No user_id' }, { status: 400 });
      }

      // 1. Init Supabase Admin
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // 2. DYNAMIC LOOKUP: Find product where 'price_id' matches the Variant ID
      const { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('id, title')
        .eq('price_id', variantId)
        .single();

      if (productError || !product) {
        console.error(`Product not found for Variant ID: ${variantId}`);
        // We don't error 500 here, because it might just be a product we haven't added yet.
        return NextResponse.json({ error: 'Product not matched' }, { status: 404 });
      }

      console.log(`Processing order for product: ${product.title} (${product.id})`);

      // 3. Record Purchase
      const { error: insertError } = await supabaseAdmin
        .from('purchases')
        .insert({
          user_id: userId,
          product_id: product.id,
          lemon_squeezy_order_id: orderId,
          status: 'completed'
        });
          
      if (insertError) {
        console.error('DB Insert Error:', insertError);
        return NextResponse.json({ error: 'DB Error' }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
