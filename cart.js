/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR COMMERCE ENGINE (V1.3 - MASTER SYNC)
 * ══════════════════════════════════════════════════════════════════════════
 */

const KynarCart = {
  getKey: () => "kynar_cart_v1",

  // Ensures we ALWAYS get an array, never null or an object
  getContents() {
    try {
      const data = localStorage.getItem(this.getKey());
      const parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  },

  add(productId) {
    console.log("Kynar: Adding Product ID:", productId);
    try {
      // 1. Safeguard: Wait for ShopSystem database
      if (!window.ShopSystem) {
        console.warn("Kynar: ShopSystem not ready.");
        return;
      }

      const product = window.ShopSystem.getDb().find(p => p.id === productId);
      if (!product) return;

      // 2. Load and Update
      let contents = this.getContents();
      const exists = contents.some(item => item.id === productId);
      
      if (!exists) {
        contents.push(product);
        localStorage.setItem(this.getKey(), JSON.stringify(contents));
        this.bumpCart();
        if (window.Haptics) window.Haptics.success();
      }

      // 3. UI Synchronization
      this.syncUI();
      this.openDrawer();
      
    } catch (err) {
      console.error("Kynar: Cart Add Exception:", err);
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
    const items = this.getContents();
    
    // Update Badge
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = items.length;
      badge.style.display = items.length > 0 ? "flex" : "none";
    }

    // Update Drawer Content
    this.renderDrawer(items);
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
        container.innerHTML = `
          <div style="text-align:center; padding:5rem 2rem; opacity:0.3;">
            <p style="font-weight:800;">VAULT EMPTY</p>
            <p style="font-size:0.7rem; margin-top:0.5rem;">Select assets to begin.</p>
          </div>`;
        return;
      }

      container.innerHTML = items.map(item => `
        <div class="nav-item" style="margin:0.5rem 1rem; padding:1rem; background:white; border:1px solid var(--ink-border); display:flex; align-items:center;">
          <div class="nav-icon" style="background:var(--grad-emerald); color:white; min-width:36px;">${item.icon || '📦'}</div>
          <div class="nav-label" style="margin-left:1rem; flex:1;">
            <div style="font-weight:800; font-size:0.9rem; color:var(--ink-display);">${item.title}</div>
            <div style="font-size:0.8rem; color:var(--accent-gold); font-weight:700;">£${(item.price || 0).toFixed(2)}</div>
          </div>
          <button onclick="KynarCart.remove('${item.id}')" style="background:var(--bg-canvas); border:none; width:30px; height:30px; border-radius:50%; cursor:pointer; color:var(--ink-muted); font-weight:bold;">&times;</button>
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
      trigger.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      trigger.style.transform = "scale(1.3) rotate(8deg)";
      setTimeout(() => trigger.style.transform = "scale(1) rotate(0deg)", 300);
    }
  }
};

window.KynarCart = KynarCart;

// Re-Sync when the page finishes loading components
document.addEventListener("DOMContentLoaded", () => KynarCart.syncUI());
document.addEventListener("KynarHeaderLoaded", () => KynarCart.syncUI());
