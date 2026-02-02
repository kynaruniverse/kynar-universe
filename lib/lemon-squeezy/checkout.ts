/**
 * KYNAR UNIVERSE: Lemon Squeezy Gateway (v1.6)
 * Role: Secure Multi-Product Checkout Orchestration.
 * Identity: Reliability, Security, Technical Precision.
 * Environment: Next.js 15 Server-Only.
 */

import { Database } from "@/lib/supabase/types";

type ProductRow = Database['public']['Tables']['products']['Row'];

// Refined type for checkout preparation
interface CheckoutProduct {
  id: string;
  title: string;
  price_id: string; // The Lemon Squeezy Variant ID
  slug: string;
}

interface CheckoutConfig {
  products: CheckoutProduct[];
  userEmail: string;
  userId: string;
  config ? : {
    currency ? : string;
    receiptButtonText ? : string;
    redirectUrl ? : string;
  };
  metadata ? : Record < string,
  any > ;
}

/**
 * Generates a hosted checkout URL via Lemon Squeezy API.
 * Optimized for high-speed mobile handoff.
 */
export async function generateCheckoutUrl({
  products,
  userEmail,
  userId,
  config,
  metadata
}: CheckoutConfig): Promise < string > {
  // 1. Environment Guard
  const API_KEY = process.env.LEMONSQUEEZY_API_KEY;
  const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kynaruniverse.com";
  
  if (!API_KEY || !STORE_ID) {
    console.error("[Kynar Checkout] Missing Lemon Squeezy configuration.");
    throw new Error("Payment gateway is temporarily offline. Please try again shortly.");
  }
  
  // 2. Selection Validation
  const validProducts = products.filter(p => p.price_id && p.price_id !== "0");
  if (validProducts.length === 0) {
    throw new Error("Your selection contains no valid technical assets for acquisition.");
  }
  
  // 3. Payload Construction (Lemon Squeezy API v1)
  // Note: For multi-product, we typically lead with the first variant 
  // and pass the full list in metadata for webhook processing.
  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        store_id: parseInt(STORE_ID),
        variant_id: parseInt(validProducts[0].price_id),
        checkout_data: {
          email: userEmail,
          custom: {
            user_id: userId,
            product_ids: validProducts.map((p) => p.id).join(","),
            product_slugs: validProducts.map((p) => p.slug).join(","),
            ...metadata
          },
        },
        checkout_options: {
          embed: false, // Redirect strategy is safer for mobile/SPCK
          media: true,
          logo: true,
          desc: true,
          discount_button: false,
          dark: false,
          button_color: "#0f172a", // Kyn-Slate-900
        },
        product_options: {
          redirect_url: config?.redirectUrl || `${SITE_URL}/checkout/success`,
          receipt_button_text: config?.receiptButtonText || "Open My Library",
          receipt_thank_you_note: "Your selection is now part of your permanent collection.",
        },
      },
    },
  };
  
  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      // Next.js 15: Bypass cache to ensure unique checkout links
      cache: 'no-store',
      body: JSON.stringify(payload),
    });
    
    const result = await response.json();
    
    if (result.errors) {
      console.error("[LemonSqueezy Error]:", result.errors);
      throw new Error(result.errors[0].detail || "Failed to initialize checkout.");
    }
    
    // Return the secure URL for client-side redirection
    return result.data.attributes.url;
    
  } catch (err) {
    console.error("[Checkout Gateway Critical]:", err);
    throw err;
  }
}