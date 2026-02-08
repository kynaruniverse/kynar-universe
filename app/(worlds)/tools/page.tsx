/**
 * KYNAR UNIVERSE: World Landing (Tools) v3.0
 * Refactored to use shared WorldPage component
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WorldPage } from "@/components/worlds/WorldPage";
import { toolsWorldConfig } from "@/lib/worlds/configs";
import { Product } from "@/lib/supabase/types";

export const metadata: Metadata = toolsWorldConfig.metadata;

export default async function ToolsWorldPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("world", "tools")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  
  const products = (data as Product[]) ?? [];
  
  return <WorldPage config={toolsWorldConfig} products={products} error={error?.message} />;
}