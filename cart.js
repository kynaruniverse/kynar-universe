/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR CART SYSTEM (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Luxury commerce engine for the Kynar Marketplace.
 * Handles local storage persistence, drawer UI, and haptic feedback.
 */

const KynarCart = {
  // 0. CONFIGURATION
  getKey() {
    return "kynar_cart_v1";
  },

  // 1. DATA MANAGEMENT
  getContents() {
    return JSON.parse(localStorage.getItem(this.getKey()) || "[]");
  },

  /**
   * Adds a product to the cart.
   * @param {Object|string} productOrId - The product object or its ID string.
   */
  add(productOrId) {
    let product = productOrId;

    // Fetch from ShopSystem if only an ID is provided
    if (typeof productOrId === "string") {
      if (window.ShopSystem) {
        const db = window.ShopSystem.getDb();
        product = db.find((i) => i.id === productOrId);
      }
    }

    if (!product) {
      console.error("Kynar: Product data missing.");
      return;
    }

    const contents = this.getContents();
    const exists = contents.find((item) => item.id === product.id);

    if (!exists) {
      contents.push(product);
      this.save(contents);
      this.openDrawer();
      this.bumpCart();
      if (window.Haptics) window.Haptics.success();
      return true;
    } else {
      this.openDrawer(); 
      return false;
    }
  },

  remove(productId) {
    let contents = this.getContents();
    contents = contents.filter((item) => item.id !== productId);
    this.save(contents);
    if (window.Haptics) window.Haptics.light();
  },

  clear() {
    localStorage.removeItem(this.getKey());
    this.updateUI();
    this.renderDrawer();
  },

  save(contents) {
    localStorage.setItem(this.getKey(), JSON.stringify(contents));
    this.updateUI();
    this.renderDrawer();
  },

  total() {
    return this.getContents().reduce((sum, item) => sum + item.price, 0);
  },

  // 2. UI & TACTILE FEEDBACK
  bumpCart() {
    const trigger = document.getElementById("cart-trigger");
    if (trigger) {
      trigger.style.transition = "transform 0.3s var(--transition-tactile)";
      trigger.style.transform = "scale(1.3) rotate(5deg)";
      setTimeout(() => {
        trigger.style.transform = "scale(1) rotate(0deg)";
      }, 300);
    }
  },

  updateUI() {
    const count = this.getContents().length;
    const badge = document.getElementById("cart-count");

    if (badge) {
      if (count > 0) {
        badge.style.display = "flex";
        badge.textContent = count;
      } else {
        badge.style.display = "none";
      }
    }
  },

  // 3. DRAWER CONTROLLER
  initDrawer() {
    const trigger = document.getElementById("cart-trigger");
    const backdrop = document.getElementById("cart-drawer-backdrop");
    const closeBtn = document.getElementById("close-drawer");

    if (trigger) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    }

    if (backdrop) backdrop.addEventListener("click", () => this.closeDrawer());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeDrawer());

    this.updateUI();
  },

  openDrawer() {
    this.renderDrawer();
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-drawer-backdrop");

    if (drawer && backdrop) {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    }
  },

  closeDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-drawer-backdrop");

    if (drawer && backdrop) {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
      document.body.style.overflow = "";
    }
  },

  // 4. DRAWER RENDERING
  renderDrawer() {
    const container = document.getElementById("drawer-items");
    const totalEl = document.getElementById("drawer-total");
    const items = this.getContents();

    if (totalEl) totalEl.textContent = `£${this.total().toFixed(2)}`;
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 5rem 1rem; opacity: 0.5;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
          <p style="font-weight: 700; color: var(--ink-display);">Your cart is empty.</p>
          <button onclick="KynarCart.closeDrawer()" style="background:none; border:none; color:var(--accent-gold); font-weight:800; margin-top:1rem; cursor:pointer;">Continue Browsing</button>
        </div>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="nav-item" style="margin: 0.75rem 0; padding: 1rem; border: 1px solid var(--ink-border); background: var(--bg-paper);">
        <div class="nav-icon" style="background: var(--grad-emerald); color: white;">
          ${item.icon || '📦'}
        </div>
        <div class="nav-label">
          <div style="font-size: 0.9rem; font-weight: 800; color: var(--ink-display);">${item.title}</div>
          <div style="font-size: 0.8rem; color: var(--ink-muted);">£${item.price.toFixed(2)}</div>
        </div>
        <button onclick="KynarCart.remove('${item.id}')" 
                style="background: var(--bg-canvas); border:none; width:32px; height:32px; border-radius:50%; color:var(--accent-red); cursor:pointer; font-weight:bold;">
          &times;
        </button>
      </div>
    `).join("");
  },

  // 5. DOWNLOAD LOGIC
  directDownload(url) {
    const hasAuth = localStorage.getItem("kynar_auth_token");

    if (hasAuth || true) { // Demo bypass
      if (window.Haptics) window.Haptics.success();
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      if (window.KynarCore) window.KynarCore.openAuthModal();
    }
  }
};

// Global Bridge
window.KynarCart = KynarCart;
window.Satchel = KynarCart; // Legacy support for pending audits

// 6. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("KynarHeaderLoaded", () => KynarCart.initDrawer());
  if (document.getElementById("cart-trigger")) KynarCart.initDrawer();
});
