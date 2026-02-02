/**
 * KYNAR UNIVERSE: Fulfillment Engine (v1.6)
 * Role: Securely bridges Lemon Squeezy events to the Supabase Vault.
 * Environment: Next.js 15 Server Route (force-dynamic).
 * Security: HMAC SHA256 Signature Verification.
 */

import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // 1. Initialize Administrative Access
  // We use the Service Role Key here to bypass RLS for fulfillment.
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const rawBody = await req.text();
  const headerList = await headers(); // Next.js 15 requirement
  
  const signature = headerList.get("x-signature") || "";
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  // 2. Cryptographic Guard
  if (!signature || !secret) {
    console.error("[Vault Webhook] Missing signature or secret.");
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (signatureBuffer.length !== digest.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      throw new Error("Signature Mismatch");
    }
  } catch (err) {
    console.error("[Vault Webhook] Verification failed.");
    return new Response("Unauthorized", { status: 401 });
  }

  // 3. Payload Extraction
  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data; // contains user_id and product_ids

  /**
   * EVENT: order_created
   * Logic: When a purchase is finalised, map products to the User Library.
   */
  if (eventName === "order_created") {
    const userId = customData.user_id;
    const productIdsString = customData.product_ids;
    const orderStatus = payload.data.attributes.status;

    // We only fulfill when payment is fully captured
    if (orderStatus !== "paid") {
      return new Response("Payment Pending", { status: 200 });
    }

    if (!userId || !productIdsString) {
      console.error("[Vault Webhook] Missing fulfillment metadata.");
      return new Response("Incomplete Metadata", { status: 400 });
    }

    const productIds = productIdsString.split(",").map((id: string) => id.trim());
    
    // 4. Atomic Fulfillment
    // Mapping the payment data to the 'user_library' schema
    const libraryEntries = productIds.map((pid: string) => ({
      user_id: userId,
      product_id: pid,
      order_id: payload.data.id.toString(),
      status: 'active',
      source: 'lemonsqueezy'
    }));

    const { error } = await supabaseAdmin
      .from("user_library")
      .upsert(libraryEntries, { 
        onConflict: 'user_id,product_id' 
      });

    if (error) {
      console.error("[Vault Webhook] Fulfillment failed:", error.message);
      return new Response("Internal Server Error", { status: 500 });
    }

    console.log(`[Vault Success] Fulfilling ${productIds.length} items for User: ${userId}`);
    return new Response("Vault Synchronized", { status: 200 });
  }

  // Acknowledge other events (e.g., subscription changes) without action
  return new Response("Event Received", { status: 200 });
}
