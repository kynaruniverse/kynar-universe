/* KYNAR INVENTORY PAGE LOGIC (js/pages/inventory.js)
   Loads and displays user's purchased items from localStorage.
   Status: PHASE 3 - Extracted from inline script
*/

document.addEventListener('DOMContentLoaded', () => {
  loadInventory();
});

function loadInventory() {
  try {
    const inventory = localStorage.getItem('kynar_inventory');
    const items = inventory ? JSON.parse(inventory) : [];
    
    if (items.length === 0) {
      // Keep the empty state that's already in HTML
      return;
    }
    
    // Replace empty state with actual inventory
    const container = document.querySelector('section.card');
    if (!container) {
      console.error('[Inventory] Container element not found');
      return;
    }
    
    container.innerHTML = `
      <div class="stack-md">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2 class="text-h3">Your Upgrades (${items.length})</h2>
          <button onclick="window.clearInventory()" class="btn-tertiary" style="color: var(--color-error);">
            <i class="ph ph-trash"></i> Clear All
          </button>
        </div>
        
        <div style="display: grid; gap: var(--space-md);">
          ${items.map(item => `
            <div class="card" style="padding: var(--space-md);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="stack-xs">
                  <h3 class="text-body" style="font-weight: 600;">${item.title}</h3>
                  <span class="text-micro" style="opacity: 0.6;">
                    ${item.category.toUpperCase()} • Purchased ${new Date(item.purchasedAt).toLocaleDateString()}
                  </span>
                </div>
                <div style="text-align: right;">
                  <span class="text-body" style="font-weight: 600; color: var(--accent-primary);">
                    £${item.price.toFixed(2)}
                  </span>
                  <br>
                  <a href="#" class="text-micro" style="text-decoration: underline; margin-top: 4px; display: inline-block;">
                    <i class="ph ph-download-simple"></i> Download
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('[Universe] Failed to load inventory:', error);
  }
}

// Expose to window for button onclick
window.clearInventory = function() {
  if (confirm('Are you sure? This will remove all items from your inventory.')) {
    localStorage.removeItem('kynar_inventory');
    location.reload();
  }
};