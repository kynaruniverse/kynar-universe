/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR CART ENGINE (V2.0 - VISUALFORGE SYNC)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages cart data, storage, and rendering.
 * Delegates UI opening/closing to Core.js.
 */

const KynarCart = {
  // 1. DATA MANAGEMENT
  getKey: () => "kynar_cart_v2",

  getContents() {
    try {
      const data = localStorage.getItem(this.getKey());
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // 2. ADD ITEM (Accepts direct object data now)
  add(productData) {
    try {
      let contents = this.getContents();
      
      // Check for duplicates
      const exists = contents.some(item => item.id === productData.id);
      
      if (!exists) {
        // Sanitize Data
        const safeItem = {
          id: productData.id,
          title: productData.title,
          price: productData.price, // Store as string "£24.00" or "Free"
          meta: productData.meta || "Digital Asset",
          icon: productData.icon || "📦",
          bg: productData.bg || "var(--ink-display)"
        };

        contents.push(safeItem);
        localStorage.setItem(this.getKey(), JSON.stringify(contents));
        
        // Haptic Feedback
        if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
      }

      // Update Visuals
      this.syncUI();
      
      // Trigger Core to Open Drawer
      if (window.toggleCart) window.toggleCart();
      
    } catch (err) {
      console.error("Kynar Cart: Add failed", err);
    }
  },

  // 3. REMOVE ITEM
  remove(productId) {
    let contents = this.getContents();
    contents = contents.filter(item => item.id !== productId);
    localStorage.setItem(this.getKey(), JSON.stringify(contents));
    this.syncUI();
  },

  // 4. CLEAR CART
  clear() {
    localStorage.removeItem(this.getKey());
    this.syncUI();
  },

  // 5. RENDER LOGIC (Injects HTML into Drawer)
  syncUI() {
    const items = this.getContents();
    
    // A. Update Header Badge
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = items.length;
      badge.style.display = items.length > 0 ? "flex" : "none";
    }

    // B. Render Drawer Items
    const container = document.querySelector("#cart-drawer .drawer-content");
    const footerTotal = document.querySelector("#cart-drawer .cart-total-row span:last-child");
    const drawerTitle = document.querySelector("#cart-drawer .drawer-title");

    if (drawerTitle) drawerTitle.textContent = `Cart (${items.length})`;

    // Calculate Total
    let total = 0;
    items.forEach(item => {
        // Parse "£24.00" -> 24.00
        const priceString = String(item.price).replace(/[^0-9.]/g, '');
        const val = parseFloat(priceString);
        if (!isNaN(val)) total += val;
    });

    if (footerTotal) footerTotal.textContent = `£${total.toFixed(2)}`;

    // Generate HTML
    if (container) {
      if (items.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:4rem 1rem; opacity:0.4;">
                <div style="font-size:3rem; margin-bottom:1rem;">🛒</div>
                <div style="font-family:var(--font-display);">Your system is empty.</div>
            </div>`;
      } else {
        container.innerHTML = items.map(item => `
          <div class="cart-item">
            <div class="cart-thumb" style="background: ${item.bg}; color:white;">${item.icon}</div>
            <div class="cart-details">
                <div class="cart-name">${item.title}</div>
                <div class="cart-meta">${item.meta}</div>
                <div class="cart-price">${item.price}</div>
            </div>
            <button class="cart-remove" onclick="KynarCart.remove('${item.id}')">×</button>
          </div>
        `).join("");
      }
    }
  },
  
  // 6. HELPER: Connects "Add" buttons from HTML
  // Call this onclick="KynarCart.addFromPage()"
  addFromPage(id) {
    // Tries to find data from the page's current productDB
    if (typeof productDB !== 'undefined' && productDB[id]) {
        const p = productDB[id];
        // Normalize data format
        this.add({
            id: id,
            title: p.title,
            price: p.price,
            meta: p.tag,
            icon: p.icon,
            bg: p.bg
        });
    } else {
        console.warn("Product data not found on this page.");
    }
  }
};

// Auto-Sync on Load
document.addEventListener("DOMContentLoaded", () => KynarCart.syncUI());
document.addEventListener("KynarHeaderLoaded", () => KynarCart.syncUI());

window.KynarCart = KynarCart;
