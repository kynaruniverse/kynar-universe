/**
 * KYNAR UNIVERSE: Transactional Fulfillment (v2.3)
 * Role: Processing Lemon Squeezy signals and synchronizing the User Library.
 * Fully aligned with canonical types.ts and Next.js 15.
 */

import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { headers } from "next/headers";
import { Database } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Use Service Role to bypass RLS for administrative fulfillment
  const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const rawBody = await req.text();
  const headerList = await headers();
  const signature = headerList.get("x-signature") || "";
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  if (!signature || !secret) {
    return new Response("Unauthorized: Missing Security Credentials", { status: 401 });
  }

  /**
   * 1. Cryptographic Handshake
   * Validating that the payload originated from Lemon Squeezy.
   */
  try {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(rawBody).digest("hex");
    
    // Constant-time comparison to mitigate timing side-channel attacks
    const digestBuffer = Buffer.from(digest, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digestBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
      throw new Error("Invalid Handshake");
    }
  } catch (err) {
    return new Response("Unauthorized: Signature Mismatch", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data;

  /**
   * 2. Vault Provisioning (order_created)
   * We listen for successful payments and map product IDs to the User Library.
   */
  if (eventName === "order_created") {
    const userId = customData?.user_id;
    const productIdsString = customData?.product_ids;
    const orderStatus = payload.data.attributes.status;

    // We only provision on 'paid' status.
    if (orderStatus !== "paid") {
      return new Response("Status Acknowledged: Payment Pending", { status: 200 });
    }

    if (!userId || !productIdsString) {
      return new Response("Validation Failed: Missing Metadata", { status: 400 });
    }

    const productIds = productIdsString.split(",").map((id: string) => id.trim());
    
    // Align with UserLibraryInsert type
    const libraryEntries = productIds.map((pid: string) => ({
      user_id: userId,
      product_id: pid,
      order_id: payload.data.id.toString(),
      // 'status' and 'source' are valid columns in the Kynar User Library schema
    }));

    // Perform the Upsert: prevents duplicate access if webhooks fire twice
    const { error } = await supabaseAdmin
      .from("user_library")
      .upsert(libraryEntries, { 
        onConflict: 'user_id,product_id' 
      });

    if (error) {
      console.error("[Vault Webhook] Synchronization Error:", error.message);
      return new Response("Internal Synchronization Error", { status: 500 });
    }

    return new Response("Vault Synchronized", { status: 200 });
  }

  // Handle other events gracefully
  return new Response("Event Processed", { status: 200 });
}
