/* KYNAR COLLECTIONS ENGINE (js/pages/collections.js)
   Status: EVOLVED MASTER (Auth-Aware Rendering)
*/

const SUPABASE_URL = 'https://wtmshxqojvafphokscze.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  verifyAndLoad();
  setupLogout();
});

/**
 * 1. IDENTITY VERIFICATION
 */
async function verifyAndLoad() {
  const { data: { session } } = await sb.auth.getSession();
  
  if (!session) {
    window.location.href = 'index.html';
    return;
  }

  // Update Identity UI
  const identity = document.getElementById('user-identity');
  if (identity) identity.innerText = session.user.email;

  renderInventory();
}

/**
 * 2. SECURE RENDERING
 */
function renderInventory() {
  const container = document.getElementById('inventory-container');
  if (!container) return;

  const inventory = JSON.parse(localStorage.getItem('kynar_inventory') || '[]');

  if (inventory.length === 0) {
    renderEmptyState(container);
    return;
  }

  container.innerHTML = `
    <div class="stack-lg">
      <div class="flex-between border-bottom pb-sm">
        <h2 class="text-h3">Unlocked Upgrades (${inventory.length})</h2>
        <button id="clear-local-btn" class="btn-tertiary danger-text">Wipe Cache</button>
      </div>
      
      <div class="grid-auto">
        ${inventory.map(item => generateInventoryCard(item)).join('')}
      </div>
    </div>
  `;

  attachInteractionHandlers(container);
}

function generateInventoryCard(item) {
  return `
    <div class="card inventory-item" data-variant="accounts">
      <div class="flex-between align-center">
        <div class="stack-xs">
          <h3 class="text-body bold">${item.title}</h3>
          <span class="text-micro muted">${(item.category || 'Asset').toUpperCase()} • Verified</span>
        </div>
        <button class="btn-secondary sm download-sim" data-title="${item.title}">
          <i class="ri-download-line"></i> Download
        </button>
      </div>
    </div>
  `;
}

function renderEmptyState(container) {
  container.innerHTML = `
    <div class="stack-md align-center text-center py-xl">
      <div class="icon-box lg"><i class="ri-stack-line"></i></div>
      <div class="stack-sm">
        <h2 class="text-h3">Your Hub is Empty</h2>
        <p class="text-body max-ch">Visit the Digital Department Store to acquire verified tools.</p>
      </div>
      <a href="../../index.html#departments" class="btn-primary">Browse Departments</a>
    </div>
  `;
}

/**
 * 3. LOGOUT & UTILS
 */
function setupLogout() {
  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    if (window.showToast) window.showToast('Signing out...', 'normal');
    await sb.auth.signOut();
    window.location.href = 'index.html';
  });
}

function attachInteractionHandlers(container) {
  // Clear Logic
  container.querySelector('#clear-local-btn')?.addEventListener('click', () => {
    if (confirm('Decrypt and wipe local history?')) {
      localStorage.removeItem('kynar_inventory');
      location.reload();
    }
  });

  // Download Simulation
  container.querySelectorAll('.download-sim').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      if (window.showToast) {
        window.showToast(`Accessing ${title}...`, 'normal');
        setTimeout(() => window.showToast(`Ready for transfer.`, 'success'), 1200);
      }
    });
  });
}
