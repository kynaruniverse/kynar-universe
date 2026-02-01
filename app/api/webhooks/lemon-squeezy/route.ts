/**
 * KYNAR UNIVERSE: Fulfillment Engine (v1.5)
 * Role: Securely bridges Lemon Squeezy events to the Supabase Vault.
 */

import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // 1. Initialize Admin Client
  // FIX: Using the correct variables we set in Netlify
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const rawBody = await req.text();
  const headerList = await headers();
  
  // FIX: Lemon Squeezy uses 'x-signature'
  const signature = headerList.get("x-signature") || "";
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  // 2. Cryptographic Verification
  if (!signature || !secret) {
    return new Response("Unauthorized: Missing Credentials", { status: 401 });
  }

  try {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(rawBody).digest("hex");
    
    const digestBuffer = Buffer.from(digest, "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (signatureBuffer.length !== digestBuffer.length || !crypto.timingSafeEqual(signatureBuffer, digestBuffer)) {
      console.error("[Webhook] Signature Mismatch");
      return new Response("Unauthorized: Signature Mismatch", { status: 401 });
    }
  } catch (err) {
    return new Response("Unauthorized: Verification Failed", { status: 401 });
  }

  // 3. Parse and Route Event
  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data;

  // 4. Fulfillment: order_created
  if (eventName === "order_created") {
    const userId = customData.user_id;
    const productIdsString = customData.product_ids;
    // LS Status check: attributes.status
    const orderStatus = payload.data.attributes.status;

    // Acknowledge but wait for payment success
    if (orderStatus !== "paid") {
      return new Response("Payment Process Pending", { status: 200 });
    }

    if (!userId || !productIdsString) {
      console.error("[Webhook Error] Missing Metadata:", { userId, productIdsString });
      return new Response("Incomplete Metadata", { status: 400 });
    }

    const productIds = productIdsString.split(",");
    
    // Prepare entries for bulk insertion
    const libraryEntries = productIds.map((pid: string) => ({
      user_id: userId,
      product_id: pid.trim(),
      order_id: payload.data.id.toString(),
      status: 'active',
      source: 'lemonsqueezy'
      // acquired_at is handled by DB default (created_at)
    }));

    // Perform Upsert to ensure idempotency
    const { error } = await supabaseAdmin
      .from("user_library")
      .upsert(libraryEntries, { 
        onConflict: 'user_id,product_id' 
      });

    if (error) {
      console.error("[Webhook Error] Supabase Fulfillment Failed:", error);
      return new Response("Internal Fulfillment Error", { status: 500 });
    }

    console.log(`[Webhook Success] Fulfilled ${productIds.length} items for User ${userId}`);
    return new Response("Fulfillment Complete", { status: 200 });
  }

  return new Response("Event Acknowledged", { status: 200 });
}
