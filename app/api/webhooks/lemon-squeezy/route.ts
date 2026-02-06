import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  const rawBody = await req.text();
  const headerList = await headers();
  const signature = headerList.get('x-signature') || '';

  // 1. Signature Verification
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(rawBody).digest('hex');

  if (signature !== digest) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventId = payload.meta.event_name + '_' + payload.data.id; // Unique event key
  const eventName = payload.meta.event_name;
  
  const supabase = await createClient();

  // 2. IDEMPOTENCY CHECK: Have we seen this event?
  const { data: existingEvent } = await (supabase as any)
    .from('webhook_events')
    .select('status')
    .eq('event_id', eventId)
    .maybeSingle();

  if (existingEvent?.status === 'processed') {
    return NextResponse.json({ message: 'Event already processed' }, { status: 200 });
  }

  // 3. LOG THE EVENT: Register as pending
  if (!existingEvent) {
    await (supabase as any).from('webhook_events').insert({
      event_id: eventId,
      event_name: eventName,
      payload: payload,
      status: 'pending'
    });
  }

  // 4. PROCESS THE FULFILLMENT (Logic specific to 'order_created')
  if (eventName === 'order_created') {
    try {
      const attributes = payload.data.attributes;
      const { user_id: userId, product_id: productId } = attributes.custom_data || {};

      const { error: fulfillmentError } = await (supabase as any)
        .from('user_library')
        .insert({
          user_id: userId,
          product_id: productId,
          order_id: payload.data.id,
          source: 'lemon-squeezy',
          status: 'active',
          acquired_at: new Date().toISOString()
        });

      if (fulfillmentError) throw fulfillmentError;

      // 5. UPDATE STATUS: Mark as complete
      await (supabase as any)
        .from('webhook_events')
        .update({ status: 'processed', updated_at: new Date().toISOString() })
        .eq('event_id', eventId);

    } catch (err: any) {
      console.error(`[Webhook Critical] ${eventId} failed:`, err.message);
      
      // LOG THE FAILURE: Don't let it vanish
      await (supabase as any)
        .from('webhook_events')
        .update({ 
          status: 'failed', 
          error_message: err.message, 
          updated_at: new Date().toISOString() 
        })
        .eq('event_id', eventId);

      return NextResponse.json({ error: 'Fulfillment failed recorded' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Success' }, { status: 200 });
}
