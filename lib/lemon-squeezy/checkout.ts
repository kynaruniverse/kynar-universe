/**
 * KYNAR UNIVERSE: Lemon Squeezy Gateway (v1.5)
 * Role: Multi-Product Handoff & Webhook Metadata Sync
 * Fix: Securely handles bulk selections while following LS API constraints.
 */

import { Database } from "@/lib/supabase/types";

// Update the Product type to match the properties we actually pass from the Checkout Page
type Product = {
  id: string;
  title: string;
  price_id: string;
  slug: string;
};

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
  
  // VALIDATION: Filter products to ensure they have a price/variant ID
  const validProducts = products.filter(p => p.price_id);
  if (validProducts.length === 0) {
    throw new Error("Your selection appears to be empty or contains invalid items.");
  }
  
  /**
   * NOTE ON MULTI-PRODUCT: 
   * Lemon Squeezy v1 Checkouts handle ONE variant_id as the "anchor."
   * We pass the first item as the charge, and use the 'product_ids' 
   * custom attribute for the fulfillment Webhook.
   */
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
            // Combined IDs for Webhook processing
            product_ids: validProducts.map((p) => p.id).join(","),
            product_slugs: validProducts.map((p) => p.slug).join(","),
            ...metadata
          },
        },
        checkout_options: {
          embed: false,
          media: true,
          logo: true,
          desc: true,
          discount_button: false,
          dark: false,
          button_color: "#166534", // Kynar Green-800
        },
        product_options: {
          redirect_url: config?.redirectUrl || `${SITE_URL}/library?status=success`,
          receipt_button_text: config?.receiptButtonText || "Open My Library",
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
      console.error("LS_API_ERROR:", json.errors);
      throw new Error(json.errors[0].detail);
    }
    
    return json.data.attributes.url;
  } catch (error) {
    console.error("LS_GATEWAY_FAILURE:", error);
    throw new Error("Connection to the secure gateway timed out. Please try again.");
  }
}