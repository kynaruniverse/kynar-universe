/* KYNAR CHECKOUT ENGINE (js/checkout.js)
   Lemon Squeezy Integration - Mobile-First, Free Forever
   Status: PRODUCTION READY (Pure ES6 - No Build Required)
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LS_CONFIG = {
  storeUrl: 'kynaruniversee.lemonsqueezy.com', // Your LS store (note: double 'e')
  
  // PRODUCT VARIANT IDs (Get these from Lemon Squeezy after creating products)
  products: {
    // ✅ ACTIVE PRODUCTS (Ready for checkout)
    'python-automation-bundle': 'd4db2941-6c51-4f25-9ce9-1597a835d714',
    
    // 🔄 UPCOMING (Add variant IDs as you create them in LS)
    'finance-tracker': 'PASTE_VARIANT_ID_WHEN_READY',
    'business-intelligence': 'PASTE_VARIANT_ID_WHEN_READY',
    'creative-assets': 'PASTE_VARIANT_ID_WHEN_READY',
    'morning-mindset-journal': 'PASTE_VARIANT_ID_WHEN_READY',
    'kids-bundles': 'PASTE_VARIANT_ID_WHEN_READY',
    'home-management': 'PASTE_VARIANT_ID_WHEN_READY'
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN CHECKOUT FUNCTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export async function initiateCheckout(productId, productTitle) {
  if (!productTitle) {
    productTitle = 'Product';
  }
  
  try {
    // 1. Get Lemon Squeezy Product Variant ID
    const variantId = LS_CONFIG.products[productId];
    
    if (!variantId || variantId.includes('PASTE_')) {
      console.error('Product ' + productId + ' not configured in Lemon Squeezy yet');
      
      if (window.showToast) {
        window.showToast('Product setup in progress. Join waitlist instead?', 'error');
      }
      
      // Fallback to waitlist
      handleWaitlist(productId, productTitle);
      return;
    }
    
    // 2. Build Checkout URL
    let checkoutUrl = 'https://' + LS_CONFIG.storeUrl + '/buy/' + variantId;
    
    // 3. Pre-fill customer email if logged in (Supabase session)
    const userEmail = await getLoggedInUserEmail();
    if (userEmail) {
      checkoutUrl += '?checkout[email]=' + encodeURIComponent(userEmail);
    }
    
    // 4. Track checkout attempt (for analytics)
    if (window.plausible) {
      window.plausible('Checkout Started', { props: { product: productId } });
    }
    
    // 5. Show loading state
    if (window.showToast) {
      window.showToast('Opening secure checkout...', 'normal');
    }
    
    // 6. Redirect to Lemon Squeezy Checkout
    // (Handles payment, VAT, delivery automatically)
    window.location.href = checkoutUrl;
    
  } catch (error) {
    console.error('Checkout error:', error);
    
    if (window.showToast) {
      window.showToast('Checkout unavailable. Please try again.', 'error');
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WAITLIST HANDLER (For Upcoming Products)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function handleWaitlist(productId, productTitle) {
  // Simple prompt-based collection (upgrade to modal later)
  const email = prompt('Enter your email to get notified when "' + productTitle + '" launches:');
  
  if (!email || !email.includes('@')) {
    if (window.showToast) {
      window.showToast('Invalid email address', 'error');
    }
    return;
  }
  
  // Store in localStorage temporarily (you'll sync to Supabase later)
  const waitlist = JSON.parse(localStorage.getItem('kynar_waitlist') || '[]');
  
  // Check if email already exists for this product
  let alreadyOnList = false;
  for (let i = 0; i < waitlist.length; i++) {
    if (waitlist[i].email === email && waitlist[i].productId === productId) {
      alreadyOnList = true;
      break;
    }
  }
  
  if (!alreadyOnList) {
    waitlist.push({
      email: email,
      productId: productId,
      productTitle: productTitle,
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('kynar_waitlist', JSON.stringify(waitlist));
    
    if (window.showToast) {
      window.showToast('You\'re on the list! We\'ll email you at launch. 🚀', 'success');
    }
    
    // Track waitlist signup
    if (window.plausible) {
      window.plausible('Waitlist Joined', { props: { product: productId } });
    }
  } else {
    if (window.showToast) {
      window.showToast('You\'re already on the waitlist!', 'normal');
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER: GET LOGGED-IN USER EMAIL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function getLoggedInUserEmail() {
  try {
    // Check if Supabase client is available
    if (window.supabase) {
      const result = await window.supabase.auth.getUser();
      if (result && result.data && result.data.user && result.data.user.email) {
        return result.data.user.email;
      }
    }
    
    // Fallback: Check localStorage session marker
    const session = localStorage.getItem('kynar_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed && parsed.email) {
          return parsed.email;
        }
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
    
    return null;
  } catch (error) {
    console.warn('Could not get user email:', error);
    return null;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST-PURCHASE HANDLER (Called from success page)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function handlePurchaseSuccess() {
  // Lemon Squeezy will redirect to your success page with URL params
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('order_id');
  
  if (!orderId) {
    return;
  }
  
  // Show success message
  if (window.showToast) {
    window.showToast('Purchase successful! Check your email for download link.', 'success');
  }
  
  // Track conversion
  if (window.plausible) {
    window.plausible('Purchase Completed', { props: { order: orderId } });
  }
  
  // Redirect to account page after 2 seconds
  setTimeout(function() {
    window.location.href = '/pages/account/index.html';
  }, 2000);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT FOR GLOBAL USE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Make available globally for inline onclick handlers
window.initiateCheckout = initiateCheckout;
window.handleWaitlist = handleWaitlist;