/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR CART ENGINE (SUPABASE COMPATIBLE)
 * ══════════════════════════════════════════════════════════════════════════
 */

const KynarCart = {
  getKey: () => "kynar_cart_v3", // New Key version

  getContents() {
    try {
      const data = localStorage.getItem(this.getKey());
      return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
  },

  add(productData) {
    try {
      let contents = this.getContents();
      
      // Ensure ID is string for comparison consistency
      const pId = String(productData.id);
      const exists = contents.some(item => String(item.id) === pId);
      
      if (!exists) {
        const safeItem = {
          id: pId,
          title: productData.title,
          price: Number(productData.price), // Force Number storage
          meta: productData.meta || "Digital Asset",
          icon: productData.icon || "📦",
          bg: productData.bg || "var(--ink-display)"
        };

        contents.push(safeItem);
        localStorage.setItem(this.getKey(), JSON.stringify(contents));
        if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
      }

      this.syncUI();
      if (window.toggleCart) window.toggleCart(); // Open Drawer
      
    } catch (err) {
      console.error("Cart Add Error", err);
    }
  },

  remove(productId) {
    let contents = this.getContents();
    // String comparison safe
    contents = contents.filter(item => String(item.id) !== String(productId));
    localStorage.setItem(this.getKey(), JSON.stringify(contents));
    this.syncUI();
  },

  clear() {
    localStorage.removeItem(this.getKey());
    this.syncUI();
  },

  syncUI() {
    const items = this.getContents();
    
    // Badge
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = items.length;
      badge.style.display = items.length > 0 ? "flex" : "none";
    }

    // Drawer Elements
    const container = document.querySelector("#cart-drawer .drawer-content");
    const footerTotal = document.querySelector("#cart-drawer .cart-total-row span:last-child");
    const drawerTitle = document.querySelector("#cart-drawer .drawer-title");

    if (drawerTitle) drawerTitle.textContent = `Cart (${items.length})`;

    // Logic: Calculate Total Safely
    let total = 0;
    items.forEach(item => {
        const val = parseFloat(item.price);
        if (!isNaN(val)) total += val;
    });

    if (footerTotal) footerTotal.textContent = `£${total.toFixed(2)}`;

    // Render HTML
    if (container) {
      if (items.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:4rem 1rem; opacity:0.4;">
                <div style="font-size:3rem; margin-bottom:1rem;">🛒</div>
                <div>Your system is empty.</div>
            </div>`;
      } else {
        container.innerHTML = items.map(item => `
          <div class="cart-item">
            <div class="cart-thumb" style="background: ${item.bg}; color:white;">${item.icon}</div>
            <div class="cart-details">
                <div class="cart-name">${item.title}</div>
                <div class="cart-meta">${item.meta}</div>
                <div class="cart-price">£${Number(item.price).toFixed(2)}</div>
            </div>
            <button class="cart-remove" onclick="KynarCart.remove('${item.id}')">×</button>
          </div>
        `).join("");
      }
    }
  },
  
  // Connects page buttons to global DB
  addFromPage(id) {
    // Looks up KynarDB (exposed by Shop.js)
    if (typeof window.KynarDB !== 'undefined') {
        // Loose comparison (string vs number ID)
        const p = window.KynarDB.find(x => x.id == id);
        if(p) {
            this.add({
                id: p.id,
                title: p.title,
                price: p.price,
                meta: p.tag,
                icon: p.icon,
                bg: p.bg
            });
        }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => KynarCart.syncUI());
window.KynarCart = KynarCart;
