/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR CHECKOUT CONTROLLER (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages the merchant interface, order reconciliation, 
 * and the secure payment success sequence.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECTORS & INITIALIZATION
  const DOM = {
    list: document.getElementById("order-list"),
    count: document.getElementById("summary-count"),
    total: document.getElementById("summary-total"),
    btn: document.getElementById("btn-pay"),
  };

  function init() {
    renderOrderSummary();

    if (DOM.btn) {
      DOM.btn.addEventListener("click", processPurchase);
    }
    console.log("Kynar Merchant: Terminal Ready");
  }

  // 2. RENDERING ENGINE
  function renderOrderSummary() {
    const items = window.KynarCart ? window.KynarCart.getContents() : [];
    const total = window.KynarCart ? window.KynarCart.total() : 0;

    // Update Merchant Sidebar
    if (DOM.count) DOM.count.textContent = items.length;
    if (DOM.total) DOM.total.textContent = `£${total.toFixed(2)}`;

    if (!DOM.list) return;

    // --- State: Empty Cart ---
    if (items.length === 0) {
      DOM.list.innerHTML = `
        <div class="feature-card" style="background: var(--bg-canvas); border: 2px dashed var(--ink-border); padding: 5rem 2rem; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem; opacity: 0.3;">🛒</div>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.75rem;">Empty Cart</h3>
          <p style="color: var(--ink-muted); margin-bottom: 2rem; font-size: 0.95rem;">Please select an asset to continue.</p>
          <a href="shop.html" class="dock-btn" style="height: 52px; padding: 0 2.5rem;">Explore Marketplace</a>
        </div>
      `;

      if (DOM.btn) {
        DOM.btn.style.opacity = "0.5";
        DOM.btn.style.pointerEvents = "none";
        DOM.btn.innerText = "Cart Empty";
      }
      return;
    }

    // --- State: Order Details ---
    DOM.list.innerHTML = items.map(item => `
      <div class="order-item">
        <div style="display: flex; gap: 1.25rem; align-items: center;">
          <div class="nav-icon" style="background: var(--grad-emerald); color: white; width: 48px; height: 48px; font-size: 1.4rem;">
            ${item.icon || '📦'}
          </div>
          <div>
            <div style="font-family: var(--font-display); font-size: 1.1rem; color: var(--ink-display); line-height: 1.2;">${item.title}</div>
            <div style="font-size: 0.75rem; color: var(--ink-muted); font-weight: 800; text-transform: uppercase; margin-top: 4px; letter-spacing: 0.05em;">
              ${item.collection || "System Asset"}
            </div>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-weight: 800; color: var(--ink-display); font-size: 1.1rem;">£${item.price.toFixed(2)}</div>
          <button onclick="removeItem('${item.id}')" style="background: none; border: none; color: var(--accent-red); font-size: 0.7rem; font-weight: 800; text-transform: uppercase; cursor: pointer; margin-top: 6px; letter-spacing: 0.05em;">
            Remove
          </button>
        </div>
      </div>
    `).join("");

    if (DOM.btn) {
      DOM.btn.style.opacity = "1";
      DOM.btn.style.pointerEvents = "all";
      DOM.btn.innerText = 'Authorize & Pay';
    }
  }

  // 3. MERCHANT LOGIC
  window.removeItem = (id) => {
    if (window.KynarCart) {
      window.KynarCart.remove(id);
      renderOrderSummary(); 
    }
  };

  function processPurchase() {
    const successScreen = document.getElementById("payment-success-screen");

    if (window.Haptics) window.Haptics.heavy();

    // Loading Transition
    DOM.btn.innerHTML = '<span class="spinner" style="width: 18px; height: 18px; border-width: 2px; margin-right: 12px; border-top-color: var(--ink-display);"></span> Encrypting...';
    DOM.btn.style.opacity = "0.8";
    DOM.btn.style.pointerEvents = "none";

    // Simulate Secure Merchant Handshake
    setTimeout(() => {
      const purchasedItems = window.KynarCart.getContents();
      const userVault = JSON.parse(localStorage.getItem("kynar_vault") || "[]");

      purchasedItems.forEach((item) => {
        if (!userVault.find((owned) => owned.id === item.id)) {
          item.authorizedDate = new Date().toLocaleDateString();
          userVault.push(item);
        }
      });

      localStorage.setItem("kynar_vault", JSON.stringify(userVault));

      if (window.Haptics) window.Haptics.success();
      
      if (successScreen) {
          successScreen.classList.add('active');
      }

      setTimeout(() => {
        window.KynarCart.clear();
        window.location.href = "success.html"; 
      }, 2200);
    }, 2000);
  }

  init();
});
