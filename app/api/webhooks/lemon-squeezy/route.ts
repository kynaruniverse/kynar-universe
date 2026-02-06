import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { Json } from '@/lib/supabase/types';

interface LSPayload {
  meta: { event_name: string };
  data: { id: string; attributes: { custom_data?: { user_id?: string; product_id?: string } } };
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = (await headers()).get('x-signature') || '';
  const hmac = crypto.createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET!).update(rawBody).digest('hex');

  if (signature !== hmac) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

  const payload = JSON.parse(rawBody) as LSPayload;
  const eventId = `${payload.meta.event_name}_${payload.data.id}`;
  const supabase = await createClient<Database>();

  // Logging with strict Json casting
  await supabase.from('webhook_events').insert({
    event_id: eventId,
    event_name: payload.meta.event_name,
    payload: payload as unknown as Json,
    status: 'pending'
  });

  if (payload.meta.event_name === 'order_created') {
    const { user_id, product_id } = payload.data.attributes.custom_data || {};
    if (user_id && product_id) {
      await supabase.from('user_library').insert({
        user_id,
        product_id,
        order_id: payload.data.id,
        source: 'lemon-squeezy',
        status: 'active'
      });
      await supabase.from('webhook_events').update({ status: 'processed' }).eq('event_id', eventId);
    }
  }

  return NextResponse.json({ received: true });
}
