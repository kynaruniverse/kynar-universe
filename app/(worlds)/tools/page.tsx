/**
 * KYNAR UNIVERSE: World Landing (Tools) v3.1
 * Refactor: Clean async fetch, typed products, and error handling.
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WorldPage } from "@/components/worlds/WorldPage";
import { toolsWorldConfig } from "@/lib/worlds/configs";
import { Product } from "@/lib/supabase/types";

export const metadata: Metadata = toolsWorldConfig.metadata;

export default async function ToolsWorldPage() {
  const supabase = await createClient();
  
  // --- Fetch published products for the "tools" world ---
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("world", "tools")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  
  const products = (data as Product[]) ?? [];
  
  // --- Render shared WorldPage with fetched products ---
  return (
    <WorldPage
      config={toolsWorldConfig}
      products={products}
      error={error?.message}
    />
  );
}