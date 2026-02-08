import { NextResponse } from 'next/server';
import crypto from 'crypto';
import type { TablesInsert, Json } from '@/lib/supabase/types';
import { supabaseServer } from '@/lib/supabase/server';
import { logWebhookEvent } from '@/lib/supabase/serverHelper';

interface LemonSqueezyCustomData {
  user_id: string;
  product_id: string;
}

interface LemonSqueezyPayload {
  meta: { event_name: string };
  data: {
    id: string;
    attributes: { custom_data ? : LemonSqueezyCustomData[] };
  };
}

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature') || '';
  
  const digest = crypto.createHmac('sha256', WEBHOOK_SECRET).update(rawBody).digest('hex');
  if (signature !== digest) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  
  const payload = JSON.parse(rawBody) as LemonSqueezyPayload;
  const eventId = `${payload.meta.event_name}_${payload.data.id}`;
  const eventName = payload.meta.event_name;
  
  try {
    const { data: existingEvent } = await supabaseServer
      .from('webhook_events')
      .select('id')
      .eq('event_id', eventId)
      .maybeSingle();
    
    if (existingEvent) return NextResponse.json({ message: 'Event already processed' }, { status: 200 });
    
    const insertEvent: TablesInsert < 'webhook_events' > = {
      event_id: eventId,
      event_name: eventName,
      payload: payload as unknown as Json,
      status: 'pending',
    };
    await logWebhookEvent(insertEvent);
    
    if (eventName === 'order_created') {
      const items = payload.data.attributes.custom_data;
      if (!items || items.length === 0) throw new Error('Missing custom_data');
      
      const batchInserts: TablesInsert < 'user_library' > [] = items.map(({ user_id, product_id }) => ({
        user_id,
        product_id,
        order_id: payload.data.id,
        source: 'lemon-squeezy',
        status: 'active',
        acquired_at: new Date().toISOString(),
      }));
      
      const { error: insertError } = await supabaseServer.from('user_library').insert(batchInserts);
      if (insertError) throw insertError;
      
      await supabaseServer
        .from('webhook_events')
        .update({ status: 'processed', updated_at: new Date().toISOString() })
        .eq('event_id', eventId);
    }
    
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error(`[Webhook Critical] ${eventId}:`, err.message);
    
    await supabaseServer
      .from('webhook_events')
      .update({
        status: 'failed',
        error_message: err.message,
        updated_at: new Date().toISOString(),
      })
      .eq('event_id', eventId);
    
    return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
  }
}