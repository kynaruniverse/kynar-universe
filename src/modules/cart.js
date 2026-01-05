/* ==========================================================================
   MODULE | REQUISITION SYSTEM (CART)
   Description: Manages the active asset list and state persistence
   ========================================================================== */
import { EventBus, EVENTS } from '../core/events.js';
import { Logger } from '../core/logger.js';
import { vault } from '../../vault.js'; // Corrected Path (Root)

const CART_KEY = 'kynar_cart';

export function initCart() {
  // 1. Load State
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  // 2. Initialize UI
  updateCartUI(cart);

  // --- LISTENERS ---
  
  // A. Add Asset
  EventBus.on(EVENTS.CART_ADD, (productId) => {
    // Find product in the new Vault array
    const product = vault.find(p => p.id === productId);
    const exists = cart.find(p => p.id === productId);

    if (product && !exists) {
      cart.push(product);
      save();
      Logger.log(`[CART] Requisition Added: ${product.title}`);
      
      // Industrial Haptic Feedback
      if(navigator.vibrate) navigator.vibrate([15, 30]);
      
      // Auto-open sidebar
      EventBus.emit(EVENTS.CART_TOGGLE, 'open');
    } else {
      // Error Haptic
      if(navigator.vibrate) navigator.vibrate([10, 10]);
    }
  });

  // B. Remove Asset
  EventBus.on(EVENTS.CART_REMOVE, (productId) => {
    cart = cart.filter(p => p.id !== productId);
    save();
    if(navigator.vibrate) navigator.vibrate(10);
  });

  // C. Toggle Sidebar
  EventBus.on(EVENTS.CART_TOGGLE, (action) => {
    const sidebar = document.querySelector('.cart-sidebar');
    const backdrop = document.querySelector('.cart-backdrop'); // Assuming you have a backdrop div
    
    if (!sidebar) return;
    
    if (action === 'open') {
      sidebar.classList.add('active');
      if(backdrop) backdrop.classList.add('visible');
    } else if (action === 'close') {
      sidebar.classList.remove('active');
      if(backdrop) backdrop.classList.remove('visible');
    } else {
      sidebar.classList.toggle('active');
      if(backdrop) backdrop.classList.toggle('visible');
    }
  });

  // --- HELPERS ---
  function save() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI(cart);
  }

  function updateCartUI(currentCart) {
    const badge = document.getElementById('cart-badge');
    const itemsContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    // 1. Update Badge
    if (badge) {
      badge.textContent = currentCart.length;
      badge.classList.toggle('visible', currentCart.length > 0);
      if (currentCart.length > 0) badge.classList.add('pulse');
    }

    // 2. Render Items (Using the proper CSS classes)
    if (itemsContainer) {
      if (currentCart.length === 0) {
        itemsContainer.innerHTML = `
          <div class="cart-empty-state">
            <span style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;">∅</span>
            <p class="text-xs text-upper text-faded">Requisition List Empty</p>
          </div>
        `;
      } else {
        itemsContainer.innerHTML = currentCart.map(p => `
          <div class="cart-item-card">
            <div class="cart-item-thumbnail">
              <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="cart-item-info">
              <div>
                <div class="cart-item-title">${p.title}</div>
                <div class="cart-item-meta">
                  <span class="text-xs text-faded">${p.id}</span>
                </div>
              </div>
              <div class="cart-item-meta">
                <span class="cart-item-price">${p.price}</span>
                <button class="cart-item-remove" data-trigger="${EVENTS.CART_REMOVE}" data-payload="${p.id}">
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // 3. Update Total & Checkout Button
    if (checkoutBtn) {
      if (currentCart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = "Awaiting Input...";
        if (totalEl) totalEl.textContent = "£0.00";
      } else {
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = "Initialize Transfer";
        
        // Calculate Total
        const total = currentCart.reduce((acc, item) => {
          // Remove currency symbols for math
          const val = parseFloat(item.price.replace(/[£,$]/g, ''));
          return acc + val;
        }, 0);
        
        if (totalEl) totalEl.textContent = `£${total.toFixed(2)}`;

        // LOGIC: Checkout Payload
        // Note: For a static site, multi-cart checkout is complex. 
        // We will default to the FIRST item's link for now, or a bundle link if you have one.
        if (currentCart.length === 1) {
          // Use the 'link' property from Vault v10.0
          checkoutBtn.setAttribute('data-trigger', 'checkout:init');
          checkoutBtn.setAttribute('data-payload', currentCart[0].link + '?embed=1');
        } else {
          // Placeholder for multi-cart logic
          // For now, we just take them to the first item to prevent errors
          checkoutBtn.setAttribute('data-trigger', 'checkout:init');
          checkoutBtn.setAttribute('data-payload', currentCart[0].link + '?embed=1');
        }
      }
    }
  }
}
