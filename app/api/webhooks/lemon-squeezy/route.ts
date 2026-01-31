/**
 * KYNAR UNIVERSE: Fulfillment Engine (v1.5)
 * Role: Securely bridges Lemon Squeezy events to the Supabase Vault.
 * Hardened for: Next.js 15, Multi-product logic, and Idempotency.
 */

import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { headers } from "next/headers";

// Disable static rendering for this route
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // 1. Initialize Admin Client (Service Role is required for UPSERT)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const rawBody = await req.text();
  const headerList = await headers();
  const signature = headerList.get("x-ls-signature") || "";
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  // 2. Cryptographic Verification
  // Timing-safe comparison prevents side-channel attacks.
  try {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (signatureBuffer.length !== digest.length || !crypto.timingSafeEqual(signatureBuffer, digest)) {
      return new Response("Unauthorized: Signature Mismatch", { status: 401 });
    }
  } catch (err) {
    return new Response("Unauthorized: Verification Failed", { status: 401 });
  }

  // 3. Parse and Route Event
  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data; // Captured from Checkout Gateway

  /**
   * EVENT: order_created
   * This is the moment of ownership. We map the Lemon Squeezy order 
   * back to our internal Product UUIDs.
   */
  if (eventName === "order_created") {
    const userId = customData.user_id;
    const productIdsString = customData.product_ids; // Expected as comma-separated UUIDs
    const status = payload.data.attributes.status;

    // Acknowledge the webhook but skip fulfillment if payment is pending
    if (status !== "paid") {
      return new Response("Payment Process Pending", { status: 200 });
    }

    if (!userId || !productIdsString) {
      console.error("[Webhook Error] Missing Metadata:", { userId, productIdsString });
      return new Response("Incomplete Metadata", { status: 400 });
    }

    // 4. Fulfillment Implementation
    const productIds = productIdsString.split(",");
    
    // Prepare library entries for bulk insertion
    const libraryEntries = productIds.map((pid: string) => ({
      user_id: userId,
      product_id: pid.trim(),
      order_id: payload.data.id.toString(),
      acquired_at: new Date().toISOString(),
      status: 'active',
      source: 'lemonsqueezy'
    }));

    // Perform Upsert: If user buys again or refreshes, we don't create duplicates
    const { error } = await supabaseAdmin
      .from("user_library")
      .upsert(libraryEntries, { 
        onConflict: 'user_id,product_id' 
      });

    if (error) {
      console.error("[Webhook Error] Supabase Upsert Failed:", error);
      return new Response("Internal Fulfillment Error", { status: 500 });
    }

    return new Response("Fulfillment Complete", { status: 200 });
  }

  // Handle other events (e.g., license_key_created, subscription_updated) as needed
  return new Response("Event Acknowledged", { status: 200 });
}
