/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR COMMERCE ENGINE (V1.1)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Luxury commerce engine for the Kynar Marketplace.
 * Handles local storage persistence, drawer UI, and haptic feedback.
 */

const KynarCart = {
  // 1. DATA CORE
  getKey: () => "kynar_cart_v1",

  getContents() {
    try {
      return JSON.parse(localStorage.getItem(this.getKey()) || "[]");
    } catch (e) {
      return [];
    }
  },

  // 2. ADD TO CART LOGIC (Fixed for Multiple Items)
  add(productOrId) {
    let product = productOrId;

    // Fetch from ShopSystem if only an ID is passed
    if (typeof productOrId === "string") {
      if (window.ShopSystem) {
        const db = window.ShopSystem.getDb();
        product = db.find((i) => i.id === productOrId);
      }
    }

    if (!product) {
      console.error("Kynar: Product initialization failed.");
      return;
    }

    const contents = this.getContents();
    
    // Check if item already exists to prevent duplicates
    const isDuplicate = contents.some((item) => item.id === product.id);

    if (!isDuplicate) {
      // PUSH new item to the existing array
      contents.push(product);
      this.save(contents);
      
      // Feedback Sequence
      this.bumpCart();
      if (window.Haptics) window.Haptics.success();
      
      // Auto-reveal the update
      this.openDrawer();
      return true;
    } else {
      // If already in cart, just show the drawer
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

  save(contents) {
    localStorage.setItem(this.getKey(), JSON.stringify(contents));
    this.syncUI();
    this.renderDrawer();
  },

  total() {
    return this.getContents().reduce((sum, item) => sum + item.price, 0);
  },

  // 3. UI SYNC & PHYSICS
  bumpCart() {
    const trigger = document.getElementById("cart-trigger");
    if (trigger) {
      trigger.style.transition = "transform 0.4s var(--transition-tactile)";
      trigger.style.transform = "scale(1.4) rotate(8deg)";
      setTimeout(() => {
        trigger.style.transform = "scale(1) rotate(0deg)";
      }, 400);
    }
  },

  syncUI() {
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

  // 4. DRAWER CONTROLLER (Fixed Trigger Logic)
  init() {
    // We use Body Delegation so it works even if the header loads late
    document.body.addEventListener("click", (e) => {
      const trigger = e.target.closest("#cart-trigger");
      const closeBtn = e.target.closest("#close-drawer");
      const backdrop = e.target.closest("#cart-drawer-backdrop");

      if (trigger) {
        e.preventDefault();
        this.openDrawer();
      }
      if (closeBtn || backdrop) {
        this.closeDrawer();
      }
    });

    this.syncUI();
    this.renderDrawer();
    console.log("Kynar Cart: Online");
  },

  openDrawer() {
    this.renderDrawer();
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-drawer-backdrop");

    if (drawer && backdrop) {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden"; // Scroll Lock
      if (window.Haptics) window.Haptics.medium();
    }
  },

  closeDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-drawer-backdrop");

    if (drawer && backdrop) {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
      document.body.style.overflow = ""; // Release Lock
    }
  },

  // 5. DRAWER RENDERING
  renderDrawer() {
    const container = document.getElementById("drawer-items");
    const totalEl = document.getElementById("drawer-total");
    const items = this.getContents();

    if (totalEl) totalEl.textContent = `£${this.total().toFixed(2)}`;
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1.5rem; opacity: 0.4;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
          <p style="font-family: var(--font-display); font-size: 1.1rem; color: var(--ink-display);">Empty Vault</p>
          <p style="font-size: 0.8rem; margin-top: 0.5rem;">Your selected assets will appear here.</p>
        </div>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="nav-item" style="margin: 0.8rem 1rem; padding: 1.25rem; background: white; border: 1px solid var(--ink-border); box-shadow: var(--shadow-soft);">
        <div class="nav-icon" style="background: var(--grad-emerald); color: white; width: 44px; height: 44px;">
          ${item.icon || '📦'}
        </div>
        <div class="nav-label">
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--ink-display);">${item.title}</div>
          <div style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 700;">£${item.price.toFixed(2)}</div>
        </div>
        <button onclick="KynarCart.remove('${item.id}')" 
                style="background: var(--bg-canvas); border:none; width:34px; height:34px; border-radius:50%; color:var(--ink-muted); cursor:pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">
          &times;
        </button>
      </div>
    `).join("");
  }
};

// GLOBAL ACCESS
window.KynarCart = KynarCart;

// INITIALIZE ON LOAD
document.addEventListener("DOMContentLoaded", () => KynarCart.init());
// Sync again when components are injected
document.addEventListener("KynarHeaderLoaded", () => KynarCart.syncUI());
