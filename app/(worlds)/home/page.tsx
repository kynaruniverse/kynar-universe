/**
 * KYNAR UNIVERSE: World Landing (Home) v3.1
 * Refactor: Cleaned async fetch, typed products, and error handling.
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WorldPage } from "@/components/worlds/WorldPage";
import { homeWorldConfig } from "@/lib/worlds/configs";
import { Product } from "@/lib/supabase/types";

export const metadata: Metadata = homeWorldConfig.metadata;

export default async function HomeWorldPage() {
  const supabase = await createClient();
  
  // --- Fetch published products for the "home" world ---
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("world", "home")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  
  const products = (data as Product[]) ?? [];
  
  // --- Render WorldPage with fetched products ---
  return (
    <WorldPage
      config={homeWorldConfig}
      products={products}
      error={error?.message}
    />
  );
}