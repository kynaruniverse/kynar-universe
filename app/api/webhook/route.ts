import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';
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
    
    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(digest, 'utf8'))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    const body = JSON.parse(rawBody);
    const eventName = body.meta.event_name;
    const data = body.data;
    
    // 2. Filter for relevant events
    if (eventName === 'order_created') {
      const attributes = data.attributes;
      const userId = body.meta.custom_data?.user_id; // Passed via openCheckout logic
      const orderId = String(data.id);
      
      // Extract Variant ID (Lemon Squeezy usually nests this in order_items)
      const variantId = String(attributes.first_order_item?.variant_id || attributes.variant_id);
      
      if (!userId) {
        console.error('❌ Webhook Error: Missing user_id in custom_data');
        return NextResponse.json({ error: 'No user_id provided' }, { status: 400 });
      }

      const supabaseAdmin = getAdminClient();

      // 3. Find the Product
      // We search for the product that matches the LS Variant ID
      const { data: product, error: productError } = await supabaseAdmin
        .from('products')
        .select('id, title')
        .or(`price_id.eq.${variantId},price_id.ilike.%${variantId}%`)
        .single();
      
      if (productError || !product) {
        console.error(`❌ Match Failed: No product found for Variant ID ${variantId}`);
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      // 4. Record the Purchase
      // Using upsert with order_id as a constraint prevents double-unlocking
      const { error: insertError } = await supabaseAdmin
        .from('purchases')
        .upsert({
          user_id: userId,
          product_id: product.id,
          lemon_squeezy_order_id: orderId,
          status: 'completed',
          purchase_date: new Date().toISOString(),
        }, {
          onConflict: 'lemon_squeezy_order_id' 
        });
      
      if (insertError) {
        console.error('❌ Database Error:', insertError.message);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
      
      console.log(`✅ Success: ${userId} purchased ${product.title}`);
    }
    
    // Always return 200 to Lemon Squeezy to stop retries
    return NextResponse.json({ received: true }, { status: 200 });
    
  } catch (err: any) {
    console.error('💥 Webhook Crash:', err.message);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
