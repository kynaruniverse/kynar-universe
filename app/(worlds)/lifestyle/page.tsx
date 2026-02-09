/**
 * KYNAR UNIVERSE: World Landing (Lifestyle) v3.1
 * Refactor: Clean async fetch, typed products, and error handling.
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WorldPage } from "@/components/worlds/WorldPage";
import { lifestyleWorldConfig } from "@/lib/worlds/configs";
import { Product } from "@/lib/supabase/types";

export const metadata: Metadata = lifestyleWorldConfig.metadata;

export default async function LifestyleWorldPage() {
  const supabase = await createClient();
  
  // --- Fetch published products for the "lifestyle" world ---
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("world", "lifestyle")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  
  const products = (data as Product[]) ?? [];
  
  // --- Render shared WorldPage with fetched products ---
  return (
    <WorldPage
      config={lifestyleWorldConfig}
      products={products}
      error={error?.message}
    />
  );
}