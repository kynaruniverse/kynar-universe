/* ==========================================================================
   MODULE | WIRELESS CHECKOUT BRIDGE
   Description: Manages Lemon Squeezy Overlay & Dynamic Script Loading
   ========================================================================== */
import { EventBus, EVENTS } from '../core/events.js';
import { Logger } from '../core/logger.js'; // FIX: This import was missing

export function initCheckout() {
  EventBus.on(EVENTS.CHECKOUT_INIT, (url) => {
    // 1. Validation: Check if URL exists
    if (!url || url === '#' || url.includes('undefined')) {
      console.warn('[CHECKOUT] Invalid Asset Link');
      
      // Industrial Feedback Toast
      const toast = document.createElement('div');
      toast.className = 'activity-toast visible';
      toast.innerHTML = `
        <span style="font-size: 1.5rem;">🔒</span>
        <span class="text-bold text-xs">Asset Locked / Unavailable</span>
      `;
      document.body.appendChild(toast);
      
      // Auto-dismiss
      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 600);
      }, 3000);
      return;
    }

    // 2. Execution: Initialize Bridge
    Logger.log(`[CHECKOUT] Initializing Overlay: ${url}`);
    if (navigator.vibrate) navigator.vibrate([10, 50, 10]); // Haptic Click

    loadLemonSqueezy().then(() => {
      // Try Overlay Mode first
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Url.Open(url);
      } else {
        // Fallback: Direct Link
        window.location.href = url;
      }
    }).catch((err) => {
      console.error('[CHECKOUT] Bridge Failed:', err);
      window.location.href = url; // Hard Fallback
    });
  });
}

// --- INTERNAL HELPER: Lazy Load Script ---
let scriptLoaded = false;

function loadLemonSqueezy() {
  return new Promise((resolve, reject) => {
    // Avoid double loading
    if (scriptLoaded) return resolve();
    if (document.querySelector('script[src*="lemon.js"]')) {
      scriptLoaded = true;
      return resolve();
    }

    const script = document.createElement('script');
    script.src = 'https://assets.lemonsqueezy.com/lemon.js';
    script.defer = true;
    
    script.onload = () => {
      Logger.log('[SYSTEM] Lemon Squeezy Secured');
      scriptLoaded = true;
      
      // Initialize LS Global Settings
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Setup({
          eventHandler: (event) => {
             // CRITICAL: Redirect to Kynar Success Page on purchase
             if (event.event === 'Checkout.Success') {
                Logger.log('[CHECKOUT] Payment Verified');
                localStorage.removeItem('kynar_cart'); // Clear cart
                
                // Get the Product ID from the event if possible, or default
                // This redirects to our new success.html
                window.location.href = 'success.html?type=order'; 
             }
          }
        });
      }
      resolve();
    };
    
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
