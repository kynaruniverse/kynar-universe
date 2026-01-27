import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headerPayload = await headers()
    const signature = headerPayload.get('x-signature') || ''

    // 1. Verify Webhook Signature
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ''
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')

    // Timing-safe comparison to prevent timing attacks
    const digestBuffer = Buffer.from(digest, 'hex')
    const signatureBuffer = Buffer.from(signature, 'hex')

    // Buffers must be of equal length for timingSafeEqual
    if (
      digestBuffer.length !== signatureBuffer.length || 
      !crypto.timingSafeEqual(digestBuffer, signatureBuffer)
    ) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    const payload = JSON.parse(body)
    const eventName = payload.meta.event_name
    const customData = payload.meta.custom_data

    // 2. Handle Successful Order
    if (eventName === 'order_created') {
      const userId = customData?.user_id
      const productId = customData?.product_id // Assuming you pass this in checkout
      
      if (!userId) {
        console.error('Webhook Error: No user_id in custom_data')
        return new NextResponse('Missing User Identity', { status: 400 })
      }

      // We use upsert to ensure idempotency (preventing duplicates on webhook retries)
      const { error } = await supabaseAdmin
        .from('purchases')
        .upsert({
          user_id: userId,
          product_id: productId,
          lemon_squeezy_order_id: payload.data.id.toString(),
          status: 'completed',
          purchase_date: new Date().toISOString(),
        }, { onConflict: 'lemon_squeezy_order_id' })

      if (error) {
        console.error('Archive Sync Error:', error.message)
        return new NextResponse('Database Sync Failed', { status: 500 })
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err: any) {
    console.error('Webhook Runtime Error:', err.message)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
