/* KYNAR INVENTORY PAGE LOGIC (js/pages/inventory.js)
   Status: EVOLVED MASTER (Simulated Downloads + Interactive State)
*/

document.addEventListener('DOMContentLoaded', () => {
  renderInventory();
});

/**
 * 1. PRIMARY RENDERER
 */
function renderInventory() {
  const container = document.querySelector('section.card');
  if (!container) return;

  const items = getInventoryItems();

  if (items.length === 0) {
    renderEmptyState(container);
    return;
  }

  // Build the Fragment
  const html = `
    <div class="stack-lg animate-enter">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2 class="text-h3">Your Inventory (${items.length})</h2>
        <button id="clear-inventory-trigger" class="btn-tertiary" style="color: var(--color-error);">
          <i class="ri-delete-bin-line"></i> Clear All
        </button>
      </div>
      
      <div class="inventory-grid">
        ${items.map(item => generateItemCard(item)).join('')}
      </div>
    </div>
  `;
  
  container.innerHTML = html;

  // Attach Safe Listeners
  attachInventoryListeners(container);
}

/**
 * 2. COMPONENT GENERATORS
 */
function generateItemCard(item) {
  // Use formatPrice helper from data.js if available
  const displayPrice = item.price ? `£${item.price.toFixed(2)}` : 'Free';
  const purchaseDate = new Date(item.purchasedAt).toLocaleDateString();

  return `
    <div class="card inventory-item" style="padding: var(--space-md); border-left: 3px solid var(--accent-primary);">
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
        <div class="stack-xs">
          <h3 class="text-body" style="font-weight: 600;">${item.title}</h3>
          <span class="text-micro" style="opacity: 0.6;">
            ${item.category.toUpperCase()} • ${purchaseDate}
          </span>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <span class="text-body" style="font-weight: 600; color: var(--accent-primary);">
            ${displayPrice}
          </span>
          <br>
          <button class="btn-tertiary download-sim" data-item="${item.title}" style="padding:0; margin-top: 4px;">
            <i class="ri-download-line"></i> <span class="text-micro" style="text-decoration:underline;">Download</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderEmptyState(container) {
  container.innerHTML = `
    <div class="stack-md" style="text-align: center; padding: var(--space-xl) 0; opacity: 0.6;">
      <i class="ri-archive-line" style="font-size: 3rem;"></i>
      <h2 class="text-h3">Your Inventory is Empty</h2>
      <p class="text-body">Upgrade your digital arsenal at the Department Store.</p>
      <a href="../../index.html" class="btn-primary" style="display: inline-block; margin-top: var(--space-md);">Browse Departments</a>
    </div>
  `;
}

/**
 * 3. INTERACTION LOGIC
 */
function attachInventoryListeners(container) {
  // A. Download Simulation
  container.querySelectorAll('.download-sim').forEach(btn => {
    btn.onclick = () => {
      const name = btn.getAttribute('data-item');
      if (window.showToast) {
        window.showToast(`Downloading ${name}...`, 'normal');
        setTimeout(() => window.showToast(`${name} Ready.`, 'success'), 1500);
      }
    };
  });

  // B. Clear Inventory (Programmatic Event)
  const clearBtn = document.getElementById('clear-inventory-trigger');
  if (clearBtn) {
    clearBtn.onclick = () => {
      if (confirm('Decrypt and wipe inventory? This cannot be undone.')) {
        localStorage.removeItem('kynar_inventory');
        if (window.showToast) window.showToast('Inventory Wiped.', 'error');
        setTimeout(() => location.reload(), 800);
      }
    };
  }
}

function getInventoryItems() {
  try {
    return JSON.parse(localStorage.getItem('kynar_inventory') || '[]');
  } catch (e) {
    return [];
  }
}

// Keep global bridge for compatibility
window.clearInventory = () => document.getElementById('clear-inventory-trigger')?.click();
