import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const rawBody = await req.text();
  const headerList = await headers();
  const signature = headerList.get("x-signature") || "";
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  if (!signature || !secret) return new Response("Unauthorized", { status: 401 });

  // 1. Unified Cryptographic Guard (Constant Time)
  try {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(rawBody).digest("hex");
    
    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(digest, 'utf8'), Buffer.from(signature, 'utf8'))) {
      throw new Error("Invalid Signature");
    }
  } catch (err) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data;

  // 2. Fulfillment for order_created
  if (eventName === "order_created") {
    const userId = customData?.user_id;
    const productIdsString = customData?.product_ids;
    const orderStatus = payload.data.attributes.status;

    if (orderStatus !== "paid") return new Response("Payment Pending", { status: 200 });
    if (!userId || !productIdsString) return new Response("Incomplete Metadata", { status: 400 });

    const productIds = productIdsString.split(",").map((id: string) => id.trim());
    
    const libraryEntries = productIds.map((pid: string) => ({
      user_id: userId,
      product_id: pid,
      order_id: payload.data.id.toString(),
      status: 'active',
      source: 'lemonsqueezy'
    }));

    // Conflict resolution ensures multiple items/same order don't double up
    const { error } = await supabaseAdmin
      .from("user_library")
      .upsert(libraryEntries, { onConflict: 'user_id,product_id' });

    if (error) {
      console.error("[Vault Webhook] Error:", error.message);
      return new Response("Internal Error", { status: 500 });
    }

    return new Response("Vault Synchronized", { status: 200 });
  }

  return new Response("Received", { status: 200 });
}
