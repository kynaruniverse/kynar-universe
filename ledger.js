/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR PRODUCT LIBRARY (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Renders purchased products in the user's account dashboard.
 * Reads from local storage and prepares for future Firestore integration.
 */

const Ledger = {
  // #region [ 1. INITIALIZATION ]

  /**
   * Initializes the Library display.
   */
  init() {
    const listContainer = document.getElementById("artifact-list");
    if (!listContainer) return;

    this.renderLibrary(listContainer);
  },

  // #endregion

  // #region [ 2. DATA ACCESS ]

  /**
   * Retrieves purchased products from local storage.
   */
  getPurchases() {
    return JSON.parse(localStorage.getItem("kynar_library") || "[]");
  },

  // #endregion

  // #region [ 3. RENDERING ENGINE ]

  /**
   * Renders the product list or the empty state into the account page.
   */
  renderLibrary(container) {
    const items = this.getPurchases();

    // --- State: Empty Library ---
    if (items.length === 0) {
      container.innerHTML = `
                <div class="stream-card" style="
                    align-items: center; 
                    flex-direction: column; 
                    gap: 1rem; 
                    height: auto; 
                    opacity: 0.8; 
                    padding: 3rem 1rem; 
                    text-align: center; 
                    width: 100%;
                ">
                    <div style="font-size: 2.5rem; opacity: 0.5;">🛍️</div>
                    <div>
                        <div class="stream-title">Library Empty</div>
                        <div class="stream-meta">You haven't purchased any products yet.</div>
                    </div>
                    <a href="shop.html" class="dock-btn" style="
                        font-size: 0.8rem; 
                        height: 36px; 
                        margin-top: 1rem;
                    ">
                        Go to Shop
                    </a>
                </div>
            `;
      return;
    }

    // --- State: Populated Library ---
        container.innerHTML = items
      .map(
        (item) => `
            <div class="nav-item" style="margin: 0.8rem 0; padding: 1rem; background: white; border: 1px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-soft); display: flex; align-items: center; cursor: default;">
                
                <div class="nav-icon" style="background: var(--grad-emerald); color: white; flex-shrink: 0; box-shadow: inset 0 0 10px rgba(0,0,0,0.1);">
                    ${item.icon || "📦"}
                </div>

                <div class="nav-label" style="margin-left: 0.2rem;">
                    <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-gold); font-weight: bold; margin-bottom: 2px;">Ready for Download</div>
                    <div style="font-size: 1rem; line-height: 1.2; color: var(--ink-display); font-weight: 600;">${item.title}</div>
                    <div style="font-size: 0.75rem; color: var(--ink-muted); font-weight: 400; margin-top: 2px;">Purchased: ${item.acquiredDate || "Recently"}</div>
                </div>

                <a 
                    class="dock-btn" 
                    download 
                    href="${item.downloadLink || "#"}" 
                    style="
                        background: var(--bg-canvas); 
                        border: 1px solid rgba(0,0,0,0.05); 
                        color: var(--ink-display);
                        width: 44px; 
                        height: 44px; 
                        border-radius: 12px; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        font-size: 1.1rem; 
                        transition: all 0.2s;
                        flex-shrink: 0;
                    "
                    onmousedown="this.style.transform='scale(0.92)'; this.style.background='var(--ink-border)';"
                    onmouseup="this.style.transform='scale(1)'; this.style.background='var(--bg-canvas)';"
                >
                    ↓
                </a>
            </div>
        `
      )
      .join("");

  },

  // #endregion
};

// Start Sequence
document.addEventListener("DOMContentLoaded", () => Ledger.init());
