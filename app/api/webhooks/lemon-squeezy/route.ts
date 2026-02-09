/**
 * KYNAR UNIVERSE: LemonSqueezy Webhook Handler
 * Refactor: Modular, type-safe, and structured logging
 */

import { NextResponse } from "next/server";
import crypto from "crypto";
import type { TablesInsert, Json } from "@/lib/supabase/types";
import { supabaseServer } from "@/lib/supabase/server";
import { logWebhookEvent } from "@/lib/supabase/serverHelper";

// --- Types ---
interface LemonSqueezyCustomData {
  user_id: string;
  product_id: string;
}

interface LemonSqueezyPayload {
  meta: { event_name: string };
  data: {
    id: string;
    attributes ? : { custom_data ? : LemonSqueezyCustomData[] };
  };
}

// --- Constants ---
const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";
export const runtime = "nodejs";

// --- Helpers ---
async function recordWebhookEvent(
  eventId: string,
  eventName: string,
  payload: LemonSqueezyPayload,
  status: "pending" | "processed" | "failed",
  errorMessage ? : string
) {
  await supabaseServer
    .from("webhook_events")
    .upsert({
      event_id: eventId,
      event_name: eventName,
      payload: payload as unknown as Json,
      status,
      error_message: errorMessage || null,
      updated_at: new Date().toISOString(),
    });
}

// --- Main Handler ---
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") || "";
  
  // --- Verify signature ---
  const digest = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  
  if (signature !== digest) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  
  const payload = JSON.parse(rawBody) as LemonSqueezyPayload;
  const eventId = `${payload.meta.event_name}_${payload.data.id}`;
  const eventName = payload.meta.event_name;
  
  try {
    // --- Idempotency: skip already processed events ---
    const { data: existingEvent } = await supabaseServer
      .from("webhook_events")
      .select("id")
      .eq("event_id", eventId)
      .maybeSingle();
    
    if (existingEvent) {
      return NextResponse.json({ message: "Event already processed" }, { status: 200 });
    }
    
    // --- Record pending webhook ---
    await recordWebhookEvent(eventId, eventName, payload, "pending");
    
    // --- Handle specific events ---
    if (eventName === "order_created") {
      const items = payload.data.attributes?.custom_data;
      if (!items || items.length === 0) throw new Error("Missing custom_data");
      
      const batchInserts: TablesInsert < "user_library" > [] = items.map(({ user_id, product_id }) => ({
        user_id,
        product_id,
        order_id: payload.data.id,
        source: "lemon-squeezy",
        status: "active",
        acquired_at: new Date().toISOString(),
      }));
      
      const { error: insertError } = await supabaseServer
        .from("user_library")
        .insert(batchInserts);
      
      if (insertError) throw insertError;
      
      // --- Mark webhook as processed ---
      await recordWebhookEvent(eventId, eventName, payload, "processed");
    }
    
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error(`[Webhook Critical] ${eventId}:`, err.message || err);
    
    await recordWebhookEvent(eventId, eventName, payload, "failed", err.message);
    
    return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
  }
}