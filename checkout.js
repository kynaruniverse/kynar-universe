/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR CHECKOUT CONTROLLER (V2.0 - VISUALFORGE SYNC)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages the secure payment sequence and order rendering.
 * Compatible with KynarCart V2.0 data structure.
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. SELECTORS
  const DOM = {
    list: document.getElementById("order-list"),
    count: document.getElementById("summary-count"),
    total: document.getElementById("summary-total"), // Sidebar Total
    payBtnTotal: document.getElementById("pay-btn-amount"), // Button Text
    btn: document.getElementById("btn-pay"),
    successScreen: document.getElementById("payment-success-screen")
  };

  // 2. HELPER: Parse Price Strings ("£24.00" -> 24.00, "Free" -> 0)
  function parsePrice(priceString) {
    if (!priceString || priceString === "Free") return 0;
    const num = parseFloat(String(priceString).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  }

  // 3. RENDERING ENGINE
  function renderOrderSummary() {
    const items = window.KynarCart ? window.KynarCart.getContents() : [];
    
    // Calculate Total Locally
    const totalVal = items.reduce((sum, item) => sum + parsePrice(item.price), 0);
    const formattedTotal = `£${totalVal.toFixed(2)}`;

    // Update UI Counters
    if (DOM.count) DOM.count.textContent = items.length;
    if (DOM.total) DOM.total.textContent = formattedTotal;
    if (DOM.payBtnTotal) DOM.payBtnTotal.textContent = formattedTotal;

    if (!DOM.list) return;

    // --- State: Empty Cart ---
    if (items.length === 0) {
      DOM.list.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; border: 2px dashed var(--ink-border); border-radius: 16px; opacity: 0.6;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem;">Cart Empty</h3>
          <p style="margin-bottom: 1.5rem;">Select a system to proceed.</p>
          <a href="shop.html" class="dock-btn" style="display:inline-flex; text-decoration:none; background:var(--ink-display);">Return to Shop</a>
        </div>
      `;
      
      if (DOM.btn) {
        DOM.btn.style.opacity = "0.5";
        DOM.btn.style.pointerEvents = "none";
      }
      return;
    }

    // --- State: Render Items ---
    DOM.list.innerHTML = items.map(item => `
      <div class="checkout-item" style="display:flex; justify-content:space-between; align-items:center; padding: 1.5rem 0; border-bottom: 1px solid var(--ink-border);">
        <div style="display: flex; gap: 1.25rem; align-items: center;">
          
          <div style="
            background: ${item.bg || 'var(--ink-display)'}; 
            color: white; 
            width: 56px; height: 56px; 
            border-radius: 12px; 
            display:flex; align-items:center; justify-content:center; 
            font-size: 1.5rem;
          ">
            ${item.icon || '📦'}
          </div>
          
          <div>
            <div style="font-family: var(--font-display); font-size: 1.1rem; color: var(--ink-display); margin-bottom: 4px;">${item.title}</div>
            <div style="font-size: 0.75rem; color: var(--ink-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
              ${item.meta || "Digital Asset"}
            </div>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-weight: 800; color: var(--ink-display); font-size: 1.1rem;">${item.price}</div>
          <button onclick="removeCheckoutItem('${item.id}')" style="
            background: none; border: none; 
            color: var(--accent-red); font-size: 0.75rem; 
            font-weight: 700; text-transform: uppercase; 
            cursor: pointer; margin-top: 4px; opacity: 0.7;
          ">
            Remove
          </button>
        </div>
      </div>
    `).join("");

    if (DOM.btn) {
      DOM.btn.style.opacity = "1";
      DOM.btn.style.pointerEvents = "all";
    }
  }

  // 4. INTERACTION HANDLERS
  
  // Global remove function (called by onclick in HTML above)
  window.removeCheckoutItem = (id) => {
    if (window.KynarCart) {
      window.KynarCart.remove(id);
      renderOrderSummary(); // Re-render immediately
    }
  };

  function processPurchase() {
    // 1. Haptic Feedback
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(200);

    // 2. Loading State
    const originalBtnText = DOM.btn.innerHTML;
    DOM.btn.innerHTML = '<span class="spinner"></span> Processing...';
    DOM.btn.style.opacity = "0.8";
    DOM.btn.style.pointerEvents = "none";

    // 3. Simulate API Call (2 Seconds)
    setTimeout(() => {
      
      // A. Transfer to "Vault" (Simulate ownership)
      const purchasedItems = window.KynarCart.getContents();
      const userVault = JSON.parse(localStorage.getItem("kynar_vault") || "[]");

      purchasedItems.forEach((item) => {
        // Prevent duplicates in vault
        if (!userVault.find((owned) => owned.id === item.id)) {
          item.authorizedDate = new Date().toLocaleDateString();
          userVault.push(item);
        }
      });
      localStorage.setItem("kynar_vault", JSON.stringify(userVault));

      // B. Trigger Success Screen
      if (DOM.successScreen) {
          DOM.successScreen.classList.add('active'); // CSS must handle visibility
          DOM.successScreen.style.display = "flex";  // Fallback
      }

      // C. Redirect after animation
      setTimeout(() => {
        window.KynarCart.clear();
        window.location.href = "success.html"; 
      }, 2500);

    }, 2000);
  }

  // 5. INITIALIZE
  renderOrderSummary();
  if (DOM.btn) DOM.btn.addEventListener("click", processPurchase);

  console.log("Kynar Merchant: Terminal V2 Ready");
});
