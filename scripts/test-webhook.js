const crypto = require('crypto');

// Configuration
const WEBHOOK_URL = 'http://localhost:3000/api/webhooks/checkout';
const WEBHOOK_SECRET = 'your_test_secret'; // Match your .env.local

async function simulateWebhook() {
  const payload = {
    meta: { event_name: 'order_created' },
    data: {
      attributes: {
        variant_id: 'pri_01hs5xyz...', // Use an ID from your pricing.ts
        total: 5000,                   // £50.00 in cents
        user_email: 'test@kynar.com',
        custom_data: {
          product_id: 'PASTE_A_VALID_PRODUCT_UUID_HERE',
          user_id: 'PASTE_YOUR_AUTH_USER_UUID_HERE'
        }
      }
    }
  };

  const body = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const signature = hmac.update(body).digest('hex');

  console.log('🚀 Sending simulated webhook...');

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-signature': signature
    },
    body
  });

  const result = await response.json();
  console.log('Status:', response.status);
  console.log('Result:', result);
}

simulateWebhook();
