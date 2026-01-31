import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { headers } from "next/headers";

/**
 * KYNAR UNIVERSE: Fulfillment Webhook (v1.2)
 * Purpose: Securely bridges payment confirmation to Library ownership.
 * Fix: Handles multi-product fulfillment and UUID mapping.
 */
export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! 
  );

  const rawBody = await req.text();
  const h = await headers();
  const signature = h.get("x-ls-signature") || ""; 
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  // 1. Signature Verification
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");

  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature, "utf8"), Buffer.from(digest, "utf8"))) {
      return new Response("Unauthorized", { status: 401 });
    }
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data; 

  // 2. Fulfillment Logic
  if (eventName === "order_created") {
    const userId = customData.user_id;
    const productIdsString = customData.product_ids; // The CSV-aligned UUIDs from our Gateway
    const status = payload.data.attributes.status;

    if (status !== "paid") {
      return new Response("Payment Not Confirmed", { status: 200 });
    }

    if (!userId || !productIdsString) {
      return new Response("Missing Required Metadata", { status: 200 });
    }

    // Convert comma-separated string back to array of UUIDs
    const productIds = productIdsString.split(",");

    // 3. Bulk Update User Library
    // We map each ID into a row for the user_library table
    const libraryEntries = productIds.map((pid: string) => ({
      user_id: userId,
      product_id: pid, // This is now the correct UUID
      order_id: payload.data.id.toString(),
      acquired_at: new Date().toISOString(),
      status: 'active',
      source: 'lemonsqueezy'
    }));

    const { error } = await supabaseAdmin
      .from("user_library")
      .upsert(libraryEntries, { 
        onConflict: 'user_id,product_id' 
      });

    if (error) {
      console.error("Fulfillment Error:", error);
      return new Response("Database Error", { status: 500 });
    }

    return new Response("Library Fulfilled", { status: 200 });
  }

  return new Response("Acknowledged", { status: 200 });
}
