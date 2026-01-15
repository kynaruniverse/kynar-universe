/* KYNAR DEPARTMENT ENGINE (js/pages/department.js)
   Status: SECURE & DYNAMIC
   Mission: Render the correct products based on the page context.
*/

import { getProductsByCategory } from '../data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Detect Context
  // We look for a data-attribute on the <main> or the script tag itself
  const mountPoint = document.getElementById('department-grid');
  if (!mountPoint) return;

  const category = mountPoint.getAttribute('data-category');
  
  if (!category) {
    console.error('Department Engine: No category defined on #department-grid');
    return;
  }

  // 2. Fetch Data
  // If category is 'all', we might want a different logic, but here we assume strict categories
  const products = getProductsByCategory(category);

  // 3. Render
  if (products.length === 0) {
    renderEmptyState(mountPoint, category);
  } else {
    renderGrid(mountPoint, products);
  }
});

function renderGrid(container, items) {
  container.innerHTML = ''; // Clear loading skeletons
  
  // Create Grid Wrapper
  const grid = document.createElement('div');
  grid.className = 'grid-3'; // Uses your CSS class for 3-column layout
  
  items.forEach(product => {
    grid.appendChild(createProductCard(product));
  });

  container.appendChild(grid);
  
  // Trigger animations if they exist
  if (window.initMotionSystem) window.initMotionSystem();
}

/* --- The Card Builder (Standardized & Secure) --- */
function createProductCard(p) {
  const card = document.createElement('a');
  card.href = `../product.html?id=${p.id}`;
  card.className = 'card product-card animate-enter';
  card.style.textDecoration = 'none';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.height = '100%';

  // 1. Icon Header
  const header = document.createElement('div');
  header.style.marginBottom = 'var(--space-md)';
  
  const iconBox = document.createElement('div');
  iconBox.className = 'icon-box';
  iconBox.style.width = '64px';
  iconBox.style.height = '64px';
  iconBox.style.fontSize = '2rem';
  // Use the card-hover effect from your CSS
  iconBox.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  const icon = document.createElement('i');
  icon.className = `ph ${p.previewIcon || 'ph-package'}`;
  
  iconBox.appendChild(icon);
  header.appendChild(iconBox);

  // 2. Text Content
  const content = document.createElement('div');
  content.className = 'stack-xs';
  content.style.flex = '1'; // Pushes the footer down
  
  const title = document.createElement('h3');
  title.className = 'text-h3';
  title.style.fontSize = '1.35rem';
  title.textContent = p.title; // Secure Text

  const desc = document.createElement('p');
  desc.className = 'text-body';
  desc.style.fontSize = '0.95rem';
  desc.style.opacity = '0.8';
  // Limit text lines
  desc.style.display = '-webkit-box';
  desc.style.webkitLineClamp = '3';
  desc.style.webkitBoxOrient = 'vertical';
  desc.style.overflow = 'hidden';
  desc.textContent = p.shortDesc; // Secure Text

  content.append(title, desc);

  // 3. Footer (Price & Action)
  const footer = document.createElement('div');
  footer.style.cssText = 'margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;';

  const actionText = document.createElement('span');
  actionText.className = 'text-micro';
  actionText.style.fontWeight = '600';
  actionText.style.color = 'var(--accent-primary)';
  
  if (p.status === 'upcoming') {
    actionText.textContent = 'Join Waitlist';
  } else {
    actionText.textContent = `£${p.price.toFixed(2)}`;
  }

  const arrow = document.createElement('i');
  arrow.className = 'ph ph-arrow-right';
  arrow.style.opacity = '0.5';

  footer.append(actionText, arrow);

  // Assemble
  card.append(header, content, footer);
  return card;
}

function renderEmptyState(container, category) {
  container.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0; opacity: 0.6;">
      <i class="ph ph-mask-happy" style="font-size: 3rem; margin-bottom: 1rem;"></i>
      <h3 class="text-h3">Sector Quiet</h3>
      <p class="text-body">No artifacts found in the ${category} sector yet.</p>
    </div>
  `;
}
