/* KYNAR ACCOUNT ENGINE (js/pages/account.js)
   Status: SECURE (Server-Side Inventory & Session)
*/

import { supabase } from '../../supabase.js';
import { getProductById } from '../../data.js';

document.addEventListener('DOMContentLoaded', () => {
  initAccountPage();
});

async function initAccountPage() {
  const mount = document.getElementById('inventory-mount');
  
  // 1. Enforce Session Security
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    // No valid crypto-token? Eject immediately.
    window.location.href = '../login.html';
    return;
  }

  // 2. Bind Logout Action
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.onclick = handleLogout;
  }

  // 3. Fetch Verified Inventory
  await loadInventory(session.user.id, mount);
}

async function loadInventory(userId, mount) {
  mount.innerHTML = ''; // Clear skeleton loader

  try {
    // 4. Query the Database (The Source of Truth)
    // We fetch all product_ids associated with this user
    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('product_id')
      .eq('user_id', userId);

    if (error) throw error;

    // 5. Handle Empty State
    if (!purchases || purchases.length === 0) {
      renderEmptyState(mount);
      return;
    }

    // 6. Hydrate Data (Match IDs to Product Catalog)
    const items = purchases
      .map(p => getProductById(p.product_id))
      .filter(item => item !== undefined);

    // 7. Render Grid
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: var(--space-md);';

    items.forEach(item => {
      grid.appendChild(createInventoryCard(item));
    });

    mount.appendChild(grid);

    // Trigger animations
    if (window.initMotionSystem) window.initMotionSystem();

  } catch (err) {
    console.error('Inventory Sync Error:', err);
    // Graceful error UI
    mount.innerHTML = `
      <div style="text-align: center; padding: 2rem; opacity: 0.7;">
        <i class="ph ph-warning-circle" style="font-size: 2rem; color: var(--color-error);"></i>
        <p class="text-body">Unable to sync inventory. Connection failure.</p>
        <button onclick="window.location.reload()" class="btn-tertiary" style="margin-top: 1rem;">Retry Signal</button>
      </div>
    `;
  }
}

/* --- Render Helpers (DOM Safe) --- */

function createInventoryCard(item) {
  const card = document.createElement('div');
  card.className = 'card animate-enter';
  card.style.padding = 'var(--space-md)';

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;';

  // Left Side: Icon & Meta
  const leftGroup = document.createElement('div');
  leftGroup.style.cssText = 'display: flex; gap: var(--space-md); align-items: center;';

  const iconBox = document.createElement('div');
  iconBox.className = 'icon-box';
  iconBox.style.cssText = 'width: 48px; height: 48px;';
  
  const icon = document.createElement('i');
  icon.className = `ph ${item.previewIcon}`;
  iconBox.appendChild(icon);

  const metaStack = document.createElement('div');
  metaStack.className = 'stack-xs';

  const title = document.createElement('h3');
  title.className = 'text-body';
  title.style.fontWeight = '600';
  title.textContent = item.title;

  const sub = document.createElement('span');
  sub.className = 'text-micro';
  sub.style.opacity = '0.6';
  sub.textContent = `${item.category.toUpperCase()} • Verified License`;

  metaStack.append(title, sub);
  leftGroup.append(iconBox, metaStack);

  // Right Side: Actions
  const actionGroup = document.createElement('div');
  actionGroup.style.cssText = 'text-align: right; display: flex; gap: 8px;';

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'btn-secondary';
  downloadBtn.innerHTML = '<i class="ph ph-download-simple"></i> Download';
  downloadBtn.onclick = () => {
    // In a real scenario, this would generate a signed URL from Supabase Storage
    if(window.showToast) window.showToast(`Downloading ${item.title}...`, 'success');
  };

  const detailsLink = document.createElement('a');
  detailsLink.href = `../product.html?id=${item.id}`;
  detailsLink.className = 'btn-tertiary';
  detailsLink.setAttribute('aria-label', 'View Details');
  detailsLink.innerHTML = '<i class="ph ph-arrow-right"></i>';

  actionGroup.append(downloadBtn, detailsLink);
  wrapper.append(leftGroup, actionGroup);
  card.appendChild(wrapper);

  return card;
}

function renderEmptyState(mount) {
  mount.innerHTML = `
    <div style="text-align: center; padding: 4rem 0; opacity: 0.6;">
      <i class="ph ph-archive-box" style="font-size: 3rem; margin-bottom: var(--space-md);"></i>
      <h2 class="text-h3">Vault Empty</h2>
      <p class="text-body" style="margin-bottom: var(--space-md);">You haven't acquired any digital assets yet.</p>
      <a href="../../index.html#departments" class="btn-primary">Browse Store</a>
    </div>
  `;
}

async function handleLogout() {
  const btn = document.getElementById('btn-logout');
  btn.disabled = true;
  btn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite"></i>';

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error);
  }
  
  // Clear any local flags
  localStorage.removeItem('kynar_session');
  // Redirect to Home
  window.location.href = '../../index.html';
}
