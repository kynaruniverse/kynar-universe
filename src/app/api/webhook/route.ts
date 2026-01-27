import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { LEMON_CONFIG } from '@/lib/config'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headerPayload = await headers()
    const signature = headerPayload.get('x-signature') || ''

    // 1. Verify Webhook Signature using Config Engine
    const hmac = crypto.createHmac('sha256', LEMON_CONFIG.webhookSecret)
    const digest = hmac.update(body).digest('hex')

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

    // 2. Handle Successful Order
    if (eventName === 'order_created') {
      const userId = customData?.user_id
      const productId = customData?.product_id
      
      if (!userId) {
        return new NextResponse('Missing User Identity', { status: 400 })
      }

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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
