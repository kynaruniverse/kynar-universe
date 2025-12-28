/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR VAULT CONTROLLER (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages the retrieval and display of authorized digital 
 * assets within the user's private account area.
 */

const KynarVault = {
  // 1. INITIALIZATION
  init() {
    const vaultContainer = document.getElementById("vault-list");
    if (!vaultContainer) return;

    this.renderVault(vaultContainer);
    console.log("Kynar Vault: System Active");
  },

  // 2. DATA ACCESS
  getAuthorizedAssets() {
    // Sync with checkout.js storage key
    return JSON.parse(localStorage.getItem("kynar_vault") || "[]");
  },

  // 3. RENDERING ENGINE
  renderVault(container) {
    const assets = this.getAuthorizedAssets();

    // --- State: Empty Vault ---
    if (assets.length === 0) {
      container.innerHTML = `
        <div 
          class="feature-card" 
          style="
            background: var(--bg-canvas); 
            border: 2px dashed var(--ink-border); 
            padding: 4rem 2rem; 
            text-align: center;
          "
        >
          <div style="font-size: 3rem; margin-bottom: 1.5rem; opacity: 0.3;">📦</div>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem;">Vault Empty</h3>
          <p style="color: var(--ink-muted); margin-bottom: 2rem; font-size: 0.9rem;">Authorized assets will appear here after purchase.</p>
          <a href="shop.html" class="dock-btn" style="height: 50px; padding: 0 2rem;">Browse Marketplace</a>
        </div>
      `;
      return;
    }

    // --- State: Populated Vault ---
    container.innerHTML = assets.map(asset => `
      <div 
        class="nav-item" 
        style="
          margin-bottom: 1rem; 
          padding: 1.25rem; 
          background: white; 
          border: 1px solid var(--ink-border); 
          box-shadow: var(--shadow-soft); 
          display: flex; 
          align-items: center;
          cursor: default;
        "
      >
        <div 
          class="nav-icon" 
          style="
            background: var(--grad-emerald); 
            color: white; 
            width: 52px; 
            height: 52px; 
            font-size: 1.5rem;
          "
        >
          ${asset.icon || "📦"}
        </div>

        <div class="nav-label" style="margin-left: 0.5rem;">
          <div 
            style="
              font-size: 0.65rem; 
              text-transform: uppercase; 
              letter-spacing: 0.1em; 
              color: var(--accent-gold); 
              font-weight: 900; 
              margin-bottom: 4px;
            "
          >System Authorized</div>
          <div 
            style="
              font-family: var(--font-display); 
              font-size: 1.15rem; 
              color: var(--ink-display); 
              line-height: 1.2;
            "
          >${asset.title}</div>
          <div 
            style="
              font-size: 0.75rem; 
              color: var(--ink-muted); 
              margin-top: 4px;
            "
          >Deployed: ${asset.authorizedDate || "Recent"}</div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-left: auto;">
          <a 
            href="${asset.downloadLink || "#"}" 
            download
            class="dock-btn" 
            style="
              width: 48px; 
              height: 48px; 
              padding: 0; 
              background: var(--bg-canvas); 
              color: var(--ink-display);
              border: 1px solid var(--ink-border);
              font-size: 1.2rem;
            "
            title="Download Asset"
          >↓</a>
          
          <a 
            href="library.html" 
            class="dock-btn" 
            style="
              width: 48px; 
              height: 48px; 
              padding: 0; 
              background: white; 
              color: var(--ink-display);
              border: 1px solid var(--ink-border);
              font-size: 1rem;
            "
            title="View Setup Guide"
          >📖</a>
        </div>
      </div>
    `).join("");
  }
};

// Global Exposure
window.KynarVault = KynarVault;

// Start Sequence
document.addEventListener("DOMContentLoaded", () => KynarVault.init());
