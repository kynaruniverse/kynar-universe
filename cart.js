/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: CLEARVIEW CART LOGIC (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages the shopping cart state, local storage persistence,
 * and the visual logic for the cart drawer UI.
 */

const Satchel = {
  // #region [ 0. CONFIGURATION ]

  getKey() {
    return "kynar_cart";
  },

  // #endregion

  // #region [ 1. DATA MANAGEMENT ]

  /**
   * Retrieves the current cart contents.
   */
  getContents() {
    return JSON.parse(localStorage.getItem(this.getKey()) || "[]");
  },

  /**
   * Adds a product to the cart.
   */
  add(productOrId) {
    let product = productOrId;

    // Handle ID string (from Shop) vs Object (from Product page)
    if (typeof productOrId === "string") {
      if (window.ArchiveSystem) {
        const db = window.ArchiveSystem.getDb();
        product = db.find((i) => i.id === productOrId);
      }
    }

    if (!product) {
      console.error("Product data missing.");
      return;
    }

    const contents = this.getContents();
    if (!contents.find((item) => item.id === product.id)) {
      contents.push(product);
      this.save(contents);
      this.openDrawer(); // Auto-open to confirm add

      if (window.Haptics) window.Haptics.success();
      return true;
    } else {
      this.openDrawer(); // Already exists, just show cart
      return false;
    }
  },

  /**
   * Removes an item from the cart.
   */
  remove(productId) {
    let contents = this.getContents();
    contents = contents.filter((item) => item.id !== productId);
    this.save(contents);
  },

  /**
   * Clears the entire cart.
   */
  clear() {
    localStorage.removeItem(this.getKey());
    this.updateUI();
    this.renderDrawer();
  },

  /**
   * Persists to LocalStorage and triggers UI updates.
   */
  save(contents) {
    localStorage.setItem(this.getKey(), JSON.stringify(contents));
    this.updateUI();
    this.renderDrawer();
  },

  /**
   * Calculates total price.
   */
  total() {
    return this.getContents().reduce((sum, item) => sum + item.price, 0);
  },

  // #endregion

  // #region [ 2. UI & BADGE UPDATES ]

  /**
   * Updates the notification dot on the header icon.
   */
  updateUI() {
    const count = this.getContents().length;
    const badge = document.getElementById("satchel-count");

    if (badge) {
      if (count > 0) {
        badge.style.display = "flex";
        badge.textContent = count;
      } else {
        badge.style.display = "none";
      }
    }
  },

  // #endregion

  // #region [ 3. DRAWER INTERACTION ]

  initDrawer() {
    const trigger = document.getElementById("satchel-trigger");
    const backdrop = document.getElementById("satchel-drawer-backdrop");
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
    const drawer = document.getElementById("satchel-drawer");
    const backdrop = document.getElementById("satchel-drawer-backdrop");

    if (drawer && backdrop) {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-visible");
    }
  },

  closeDrawer() {
    const drawer = document.getElementById("satchel-drawer");
    const backdrop = document.getElementById("satchel-drawer-backdrop");

    if (drawer && backdrop) {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
    }
  },

  // #endregion

  // #region [ 4. DRAWER RENDERING ]

  renderDrawer() {
    const container = document.getElementById("drawer-items");
    const totalEl = document.getElementById("drawer-total");
    const items = this.getContents();

    if (totalEl) totalEl.textContent = `£${this.total().toFixed(2)}`;
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `
                <div class="empty-state" style="text-align: center; margin-top: 3rem; opacity: 0.6;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🛍️</div>
                    <p>Your cart is empty.</p>
                    <a href="shop.html" onclick="Satchel.closeDrawer()" style="display: inline-block; margin-top: 1rem; color: var(--accent-gold); font-weight: bold; font-size: 0.9rem;">Shop Products →</a>
                </div>`;
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
            <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05);">
                
                <div style="width: 50px; height: 50px; background: var(--grad-emerald); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; flex-shrink: 0;">
                    ${
                      item.image
                        ? `<img src="${item.image}" style="width:100%; height:100%; object-fit: cover; border-radius: 12px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">`
                        : ""
                    }
                    <span style="${item.image ? "display:none;" : ""}">${
          item.icon || "📦"
        }</span>
                </div>

                <div style="flex: 1;">
                    <h4 style="font-family: 'Bantayog'; font-size: 1rem; color: var(--ink-display); margin-bottom: 2px;">${
                      item.title
                    }</h4>
                    <span style="font-size: 0.75rem; color: var(--ink-muted); text-transform: uppercase;">${
                      item.collection || "Digital Product"
                    }</span>
                </div>

                <div style="text-align: right;">
                    <div style="font-weight: bold; font-size: 0.9rem; margin-bottom: 4px;">£${item.price.toFixed(
                      2
                    )}</div>
                    <button onclick="Satchel.remove('${
                      item.id
                    }')" style="background: none; border: none; color: var(--accent-red); font-size: 0.7rem; cursor: pointer; opacity: 0.7;">
                        Remove
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  },

  // #endregion

  // #region [ 5. DOWNLOAD GATEKEEPER ]

  directDownload(url) {
    const hasAuth = localStorage.getItem("kynar_signal_token");

    if (hasAuth) {
      if (window.Haptics) window.Haptics.success();

      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert("Please join our newsletter to unlock free downloads.");
      window.location.href = "newsletter.html";
    }
  },

  // #endregion
};

window.Satchel = Satchel;

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  const checkHeader = setInterval(() => {
    if (document.getElementById("satchel-trigger")) {
      Satchel.initDrawer();
      clearInterval(checkHeader);
    }
  }, 100);
  setTimeout(() => clearInterval(checkHeader), 3000);
});
