import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';
import crypto from 'crypto';

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const { success: rateLimitOk } = rateLimit(`webhook:${ip}`, 30, 60000);
  
  if (!rateLimitOk) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    // -------------------------------------------------------------------------
    // SIGNATURE VERIFICATION
    // -------------------------------------------------------------------------
    import { env } from '@/lib/env';

    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = env.lemonSqueezy.webhookSecret;

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
        env.supabase.url,
        env.supabase.serviceRoleKey
      );

      // 2. DYNAMIC LOOKUP: Find product where 'price_id' matches the Variant ID OR full checkout URL
      // First try exact match on variant ID
      let { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('id, title, content_url')
        .eq('price_id', variantId)
        .single();

      // If not found, try matching against URLs that contain the variant ID
      if (productError || !product) {
        const { data: products } = await supabaseAdmin
          .from('products')
          .select('id, title, content_url, price_id')
          .like('price_id', `%${variantId}%`);
        
        product = products?.[0] || null;
        productError = product ? null : productError;
      }

      if (productError || !product) {
        console.error(`Product not found for Variant ID: ${variantId}`);
        // We don't error 500 here, because it might just be a product we haven't added yet.
        return NextResponse.json({ error: 'Product not matched' }, { status: 404 });
      }

      console.log(`Processing order for product: ${product.title} (${product.id})`);

      // 3. Check for duplicate purchase record (idempotency)
      const { data: existingPurchase } = await supabaseAdmin
        .from('purchases')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', product.id)
        .eq('lemon_squeezy_order_id', orderId)
        .single();

      if (existingPurchase) {
        console.log('Purchase already recorded, skipping duplicate');
        return NextResponse.json({ received: true, duplicate: true });
      }

      // 3. Record Purchase
      const { error: insertError } = await supabaseAdmin
        .from('purchases')
        .insert({
          user_id: userId,
          product_id: product.id,
          lemon_squeezy_order_id: orderId,
          lemon_squeezy_checkout_id: String(data.attributes.identifier),
          status: 'completed',
          purchase_date: new Date().toISOString()
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
