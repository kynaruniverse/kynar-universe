/* ==========================================================================
   CORE | MAIN CONTROLLER
   Description: Initializes State, Event Listeners, and Global Services.
   ========================================================================== */

import { EventBus, EVENTS } from './core/events.js';
import { getProduct } from './vault.js';

/* --- STATE MANAGEMENT --- */
const STATE = {
  cart: JSON.parse(localStorage.getItem('kynar_cart')) || [],
  theme: localStorage.getItem('kynar_theme') || 'light'
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("System: Initializing...");

  // 1. Initialize Global Services
  initTheme();
  initHaptics();
  
  // 2. Load Layout Components (Async)
  loadComponent('global-header', 'components/header.html');
  loadComponent('global-footer', 'components/footer.html');

  // 3. Emit Boot Signal
  EventBus.emit(EVENTS.APP_INIT, STATE);
});

/* ==========================================================================
   EVENT LISTENERS (THE LOGIC)
   ========================================================================== */

// --- CART LOGIC ---
EventBus.on(EVENTS.CART_ADD, (productId) => {
  const product = getProduct(productId);
  const exists = STATE.cart.find(p => p.id === productId);

  if (product && !exists) {
    STATE.cart.push(product);
    syncCart();
    triggerHaptic([15, 30]);
    console.log(`Cart: Added ${product.title}`);
  } else if (exists) {
    console.log(`Cart: ${product.title} already in cart`);
    triggerHaptic([10, 10]); // Error haptic
  }
  
  // Open Cart Sidebar (Signal handled by legacy UI or future Cart Module)
  EventBus.emit(EVENTS.CART_TOGGLE, 'open');
});

EventBus.on(EVENTS.CART_REMOVE, (productId) => {
  STATE.cart = STATE.cart.filter(p => p.id !== productId);
  syncCart();
});

// --- UI LOGIC ---
EventBus.on(EVENTS.MODAL_OPEN, (productId) => {
  // Redirect to Product Page for now (Phase 1)
  window.location.href = `product.html?id=${productId}`;
});

/* ==========================================================================
   CORE SERVICES
   ========================================================================== */

function syncCart() {
  localStorage.setItem('kynar_cart', JSON.stringify(STATE.cart));
  EventBus.emit('state:updated', STATE);
}

function initTheme() {
  const isDark = STATE.theme === 'dark';
  if (isDark) document.body.classList.add('dark-mode');
  
  // Global Toggle (Exposed for Header Button)
  window.toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    const current = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('kynar_theme', current);
    triggerHaptic(10);
  };
}

function initHaptics() {
  window.triggerHaptic = (pattern) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };
}

async function loadComponent(elementId, path) {
  const el = document.getElementById(elementId);
  if (!el) return;
  try {
    const res = await fetch(path);
    if (res.ok) el.innerHTML = await res.text();
  } catch (err) {
    console.error(`Failed to load ${path}`, err);
  }
}

// --- GLOBAL BRIDGE (Crucial for HTML onclicks) ---
window.KynarEvents = {
  emit: EventBus.emit.bind(EventBus),
  EVENTS: EVENTS
};
