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
            <div class="stream-card" style="
                align-items: center; 
                gap: 1rem; 
                height: auto; 
                padding: 1rem;
            ">
                
                <div class="stream-visual" style="
                    align-items: center; 
                    background: var(--grad-emerald); 
                    border-radius: 12px; 
                    color: white; 
                    display: flex; 
                    flex-shrink: 0; 
                    font-size: 1.2rem; 
                    height: 50px; 
                    justify-content: center; 
                    width: 50px;
                ">
                    ${item.icon || "📦"}
                </div>

                <div style="flex: 1;">
                    <div class="stream-title" style="font-size: 1rem;">
                        ${item.title}
                    </div>
                    <div class="stream-meta">
                        Purchased: ${item.acquiredDate || "Recently"}
                    </div>
                </div>

                <a 
                    class="dock-btn" 
                    download 
                    href="${item.downloadLink || "#"}" 
                    style="
                        background: transparent; 
                        border: 1px solid rgba(0,0,0,0.1); 
                        font-size: 0.75rem; 
                        height: 32px; 
                        padding: 0 1rem;
                        color: var(--ink-display);
                    "
                >
                    Download
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
