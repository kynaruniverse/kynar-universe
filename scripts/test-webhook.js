import crypto from "crypto";

// --- CONFIGURATION ---
const WEBHOOK_URL = "http://localhost:3000/api/webhooks/checkout";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "your_test_secret"; // Match .env.local

// --- PAYLOAD TEMPLATE ---
const payloadTemplate = {
  meta: { event_name: "order_created" },
  data: {
    attributes: {
      variant_id: "pri_01hs5xyz...", // Use a valid price ID from pricing.ts
      total: 5000, // £50.00 in cents
      user_email: "test@kynar.com",
      custom_data: {
        product_id: "PASTE_A_VALID_PRODUCT_UUID_HERE",
        user_id: "PASTE_YOUR_AUTH_USER_UUID_HERE",
      },
    },
  },
};

/**
 * Generate HMAC signature for webhook verification
 */
function generateSignature(body: string): string {
  return crypto.createHmac("sha256", WEBHOOK_SECRET).update(body).digest("hex");
}

/**
 * Sends the simulated webhook to the configured endpoint
 */
async function simulateWebhook() {
  try {
    const body = JSON.stringify(payloadTemplate);
    const signature = generateSignature(body);
    
    console.log("🚀 Sending simulated webhook...");
    
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-signature": signature,
      },
      body,
    });
    
    const result = await response.json();
    console.log("Status:", response.status);
    console.log("Result:", result);
  } catch (error) {
    console.error("⚠️ Webhook simulation failed:", error);
  }
}

// Execute
simulateWebhook();