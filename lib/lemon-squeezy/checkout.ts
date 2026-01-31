/**
 * KYNAR UNIVERSE: Lemon Squeezy Gateway (v1.5)
 * Aligned with: Business Ref 23 (Anti-Features) & UX Canon 6 (Checkout)
 */

import { Database } from "@/lib/supabase/types";

type Product = Database['public']['Tables']['products']['Row'];

interface CheckoutConfig {
  products: Product[];
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

export async function generateCheckoutUrl({
  products,
  userEmail,
  userId,
  config,
  metadata
}: CheckoutConfig) {
  const API_KEY = process.env.LEMONSQUEEZY_API_KEY;
  const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kynaruniverse.com";
  
  if (!API_KEY || !STORE_ID) {
    throw new Error("Kynar System: Payment configuration is currently unavailable.");
  }
  
  // VALIDATION: Filter products to ensure they exist and have a price/variant ID
  const validProducts = products.filter(p => p.price_id);
  if (validProducts.length === 0) {
    throw new Error("Your cart appears to be empty or contains invalid items.");
  }
  
  /**
   * PAYLOAD CONSTRUCTION
   * Rule: No discount codes, no urgency. 
   * Design: Matches the Earthy-Cosmic palette.
   */
  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        store_id: parseInt(STORE_ID),
        variant_id: parseInt(validProducts[0].price_id), // Primary entry point
        checkout_data: {
          email: userEmail,
          custom: {
            user_id: userId,
            // Bulk ID string for Webhook fulfillment logic
            product_ids: validProducts.map((p) => p.id).join(","),
            ...metadata
          },
        },
        checkout_options: {
          embed: false,
          media: true,
          logo: true,
          desc: true,
          discount_button: false, // Locked: No coupon pressure
          dark: false, // Maintains 'Canvas' light-mode aesthetic
          button_color: "#166534", // Kynar Green-800: Calm action color
        },
        product_options: {
          redirect_url: config?.redirectUrl || `${SITE_URL}/library?status=success`,
          receipt_button_text: config?.receiptButtonText || "Go to My Library",
          receipt_thank_you_note: "Your selection is now part of your permanent collection. Explore it at your own pace.",
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
      body: JSON.stringify(payload),
    });
    
    const json = await response.json();
    
    if (json.errors) {
      throw new Error(json.errors[0].detail);
    }
    
    return json.data.attributes.url;
  } catch (error) {
    console.error("LS_GATEWAY_FAILURE:", error);
    throw new Error("We encountered a brief issue connecting to the secure checkout. Please try again in a moment.");
  }
}