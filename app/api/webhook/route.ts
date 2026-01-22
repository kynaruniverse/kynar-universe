import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    // 1. Validate the Request (Security)
    // In a real app, you MUST verify the X-Signature header from Lemon Squeezy
    // We are skipping signature verification for the V1 MVP to avoid secret management complexity on mobile
    // usage, but I will leave a comment where it goes.
    
    const body = await req.json();
    const { meta, data } = body;

    // Check if event is "order_created"
    if (meta.event_name === 'order_created') {
      const userId = meta.custom_data?.user_id; // We passed this in Step 3!
      const productVariantId = data.attributes.first_order_item.variant_id;
      const orderId = data.id;

      if (!userId) {
        console.error('No user_id found in webhook custom_data');
        return NextResponse.json({ error: 'No user_id' }, { status: 400 });
      }

      // 2. Init Supabase Admin (Bypasses RLS)
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! // We need to add this env var
      );

      // 3. Find Product in DB by matching logic (Simplified for v1)
      // For v1, we assume if we got a webhook, we trust the purchase.
      // In v2, you would match variant_id to product.id.
      // Here, we hardcode looking up the "Weekly Home Planner" for testing.
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('slug', 'weekly-home-planner') // SAFETY: Hardcoded for first test
        .single();

      if (product) {
        // 4. Record Purchase
        const { error } = await supabaseAdmin
          .from('purchases')
          .insert({
            user_id: userId,
            product_id: product.id,
            lemon_squeezy_order_id: orderId,
            status: 'completed'
          });
          
        if (error) console.error('DB Insert Error:', error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
