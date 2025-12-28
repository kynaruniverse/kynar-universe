/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: CLEARVIEW CHECKOUT LOGIC (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Handles the checkout page: rendering products, 
 * calculating totals, removing items, and processing the final purchase.
 */

document.addEventListener("DOMContentLoaded", () => {
  // #region [ 1. CONFIGURATION & INITIALIZATION ]

  const DOM = {
    list: document.getElementById("manifest-list"),
    count: document.getElementById("summary-count"),
    total: document.getElementById("summary-total"),
    btn: document.getElementById("btn-acquire"),
  };

  /**
   * Initializes the checkout page.
   */
  function init() {
    renderOrderSummary();

    if (DOM.btn) {
      DOM.btn.addEventListener("click", processPurchase);
    }
  }

  // #endregion

  // #region [ 2. RENDERING ENGINE ]

  /**
   * Renders the list of products or the Empty State.
   */
  function renderOrderSummary() {
    const items = window.Satchel ? window.Satchel.getContents() : [];
    const total = window.Satchel ? window.Satchel.total() : 0;

    // Update Summary Card
    if (DOM.count) DOM.count.textContent = items.length;
    if (DOM.total) DOM.total.textContent = `£${total.toFixed(2)}`;

    // --- State: Empty Cart ---
    if (items.length === 0) {
      DOM.list.innerHTML = `
                <div class="feature-card" style="background: var(--grad-silver); height: auto; align-items: center; text-align: center; padding: 4rem 2rem; border: 1px dashed rgba(0,0,0,0.1); box-shadow: none;">
                    <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🛍️</div>
                    <h3 style="font-family: 'Bantayog'; margin-bottom: 0.5rem; color: var(--ink-display);">Your Cart is Empty</h3>
                    <p style="font-size: 0.9rem; color: var(--ink-muted); margin-bottom: 2rem;">
                        You haven't added any products to your cart yet.
                    </p>
                    <a href="shop.html" class="dock-btn" style="height: 50px; padding: 0 2rem; width: auto;">
                        Return to Shop
                    </a>
                </div>
            `;

      if (DOM.btn) {
        DOM.btn.style.opacity = "0.5";
        DOM.btn.style.pointerEvents = "none";
        DOM.btn.innerHTML = "Cart Empty";
      }
      return;
    }

    // --- State: Populated Cart ---
    DOM.list.innerHTML = items
      .map(
        (item) => `
            <div class="manifest-item">
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div class="stream-visual" style="background: var(--grad-emerald); font-size: 1.2rem; width: 40px; height: 40px;">
                        ${item.icon || '📦'}
                    </div>
                    
                    <div>
                        <div style="font-family: 'Bantayog'; font-size: 1.1rem; color: var(--ink-display); line-height: 1;">${
                          item.title
                        }</div>
                        <div style="font-size: 0.8rem; color: var(--ink-muted); margin-top: 4px;">${
                          item.collection || "Digital Product"
                        }</div>
                    </div>
                </div>

                <div style="text-align: right;">
                    <div style="font-weight: bold; color: var(--ink-display); font-family: 'Glacial Indifference';">£${item.price.toFixed(
                      2
                    )}</div>
                    <button onclick="removeItem('${
                      item.id
                    }')" style="background: none; border: none; color: var(--accent-red); font-size: 0.75rem; cursor: pointer; opacity: 0.7; margin-top: 4px; padding: 0;">
                        Remove
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    if (DOM.btn) {
      DOM.btn.style.opacity = "1";
      DOM.btn.style.pointerEvents = "all";
      DOM.btn.innerHTML = 'Confirm & Pay';

    }
  }

  // #endregion

  // #region [ 3. PURCHASE LOGIC ]

  /**
   * Global helper to remove an item.
   */
  window.removeItem = (id) => {
    if (window.Satchel) {
      window.Satchel.remove(id);
      renderOrderSummary(); 
    }
  };

  /**
   * Processes the mock transaction.
   */
    /**
   * Processes the transaction with a high-end success transition.
   */
  function processPurchase() {
    const btn = document.getElementById("btn-acquire");
    const successScreen = document.getElementById("payment-success-screen");

    // 1. Initiate Haptic "Heavy" Tap for confirmation start
    if (window.Haptics) window.Haptics.heavy();

    // 2. Loading State: Transform button into a progress terminal
    btn.innerHTML = '<span class="spinner" style="width: 18px; height: 18px; border-width: 2px; margin-right: 10px;"></span> Verifying with Stripe...';
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";
    btn.style.transform = "scale(0.98)";

    // Simulate Payment Gateway Security Check
    setTimeout(() => {
      const newItems = window.Satchel.getContents();
      const currentLibrary = JSON.parse(
        localStorage.getItem("kynar_library") || "[]"
      );

      // Save to Library logic
      newItems.forEach((newItem) => {
        if (!currentLibrary.find((owned) => owned.id === newItem.id)) {
          newItem.acquiredDate = new Date().toLocaleDateString();
          currentLibrary.push(newItem);
        }
      });

      localStorage.setItem("kynar_library", JSON.stringify(currentLibrary));

      // 3. Trigger Success Sequence
      if (window.Haptics) window.Haptics.success();
      
      // Activate the full-screen success overlay from checkout.html
      if (successScreen) {
          successScreen.classList.add('active');
      }

      // 4. Clear and Redirect after user sees the "Verified" screen
      setTimeout(() => {
        window.Satchel.clear();
        window.location.href = "success.html"; 
      }, 2000); // 2 seconds of visual "Success" confirmation
    }, 1800);
  }


  // #endregion

  init();
});
