import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getAdminClient } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headerPayload = await headers()
    const signature = headerPayload.get('x-signature') || ''

    // 1. Verify Webhook Signature
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ''
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')

    // Timing-safe comparison to mitigate side-channel risks
    const digestBuffer = Buffer.from(digest, 'hex')
    const signatureBuffer = Buffer.from(signature, 'hex')

    if (
      digestBuffer.length !== signatureBuffer.length || 
      !crypto.timingSafeEqual(digestBuffer, signatureBuffer)
    ) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    const payload = JSON.parse(body)
    const eventName = payload.meta.event_name
    const customData = payload.meta.custom_data
    const admin = getAdminClient()

    // 2. Handle Successful Order
    if (eventName === 'order_created') {
      const attributes = payload.data.attributes
      const userId = customData?.user_id
      
      // We upsert to prevent duplicate purchase records from webhook retries
      const { error } = await admin
        .from('purchases')
        .upsert({
          user_id: userId,
          lemon_squeezy_order_id: payload.data.id.toString(),
          status: 'completed',
          purchase_date: new Date().toISOString(),
          // Metadata is typically mapped in the DB via variant_id or custom_data
        }, { onConflict: 'lemon_squeezy_order_id' })

      if (error) {
        console.error('Archive Sync Error:', error.message)
        throw error
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err: any) {
    console.error('Webhook Runtime Error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
