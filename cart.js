/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR COMMERCE ENGINE (V1.2 - ULTRA ROBUST)
 * ══════════════════════════════════════════════════════════════════════════
 */

const KynarCart = {
  getKey: () => "kynar_cart_v1",

  getContents() {
    try {
      const data = localStorage.getItem(this.getKey());
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Cart: Storage corrupted, resetting.");
      return [];
    }
  },

  add(productId) {
    try {
      // 1. Find the product in the shop database
      let product = null;
      if (window.ShopSystem) {
        product = window.ShopSystem.getDb().find(p => p.id === productId);
      }

      if (!product) {
        console.error("Cart: Product not found in DB.");
        return;
      }

      // 2. Get current cart and add item
      const contents = this.getContents();
      
      // Check if already in cart
      const exists = contents.some(item => item.id === productId);
      
      if (!exists) {
        contents.push(product);
        localStorage.setItem(this.getKey(), JSON.stringify(contents));
        
        // 3. Feedback effects
        this.bumpCart();
        if (window.Haptics) window.Haptics.success();
      }

      // 4. Update UI & Open Drawer
      this.syncUI();
      this.openDrawer();
      
    } catch (err) {
      console.error("Cart Add Error:", err);
    }
  },

  remove(productId) {
    let contents = this.getContents();
    contents = contents.filter(item => item.id !== productId);
    localStorage.setItem(this.getKey(), JSON.stringify(contents));
    this.syncUI();
    if (window.Haptics) window.Haptics.light();
  },

  syncUI() {
    try {
      const items = this.getContents();
      const badge = document.getElementById("cart-count");
      
      // Update Badge count safely
      if (badge) {
        badge.textContent = items.length;
        badge.style.display = items.length > 0 ? "flex" : "none";
      }

      // Update Total and Item List in Drawer
      this.renderDrawer(items);
    } catch (err) {
      console.warn("Cart UI Sync: Some elements missing on this page.");
    }
  },

  renderDrawer(items) {
    const container = document.getElementById("drawer-items");
    const totalEl = document.getElementById("drawer-total");
    
    if (totalEl) {
      const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
      totalEl.textContent = `£${total.toFixed(2)}`;
    }

    if (container) {
      if (items.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:4rem; opacity:0.5;">Empty Vault</div>`;
        return;
      }

      container.innerHTML = items.map(item => `
        <div class="nav-item" style="margin: 0.8rem; padding: 1rem; background: white; border: 1px solid var(--ink-border);">
          <div class="nav-icon" style="background: var(--grad-emerald); color: white;">${item.icon || '📦'}</div>
          <div class="nav-label">
            <div style="font-weight: 800;">${item.title}</div>
            <div style="font-size: 0.8rem; color: var(--accent-gold);">£${(item.price || 0).toFixed(2)}</div>
          </div>
          <button onclick="KynarCart.remove('${item.id}')" style="background:none; border:none; color:var(--ink-muted); cursor:pointer; font-size:1.2rem;">&times;</button>
        </div>
      `).join("");
    }
  },

  openDrawer() {
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

  bumpCart() {
    const trigger = document.getElementById("cart-trigger");
    if (trigger) {
      trigger.style.transform = "scale(1.3) rotate(8deg)";
      setTimeout(() => trigger.style.transform = "scale(1) rotate(0deg)", 300);
    }
  }
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  KynarCart.syncUI();
  
  // Listen for Header Loading to re-sync badge
  document.addEventListener("KynarHeaderLoaded", () => KynarCart.syncUI());
});

window.KynarCart = KynarCart;
