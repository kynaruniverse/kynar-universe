/* KYNAR UNIVERSE ENGINE (js/loader.js)
   Status: EVOLVED MASTER (Path + Query Aware / Guaranteed Reveal)
*/

import { getProductById, getGuideById, formatPrice } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const mainContent = document.querySelector('main');
  
  // 1. INITIAL STATE: Hide content for a smooth fade-in
  if (mainContent) mainContent.style.opacity = '0';

  /** * 2. IDENTIFIER EXTRACTION
   * Priority 1: URL Query (?id= or ?guide=)
   * Priority 2: URL Path (/pages/product/slug)
   */
  let productId = params.get('id');
  let guideId = params.get('guide');

  if (!productId && !guideId) {
    const lastSegment = pathParts[pathParts.length - 1];
    if (window.location.pathname.includes('/product')) {
      if (lastSegment && !lastSegment.includes('.html') && lastSegment !== 'product') {
        productId = lastSegment;
      }
    } else if (window.location.pathname.includes('/guide')) {
      if (lastSegment && !lastSegment.includes('.html') && lastSegment !== 'guide') {
        guideId = lastSegment;
      }
    }
  }

  // 3. DISPATCH TO LOADERS
  if (productId) {
    const product = getProductById(productId);
    product ? loadProduct(product) : handleNotFound('Asset');
  } 
  else if (guideId) {
    const guide = getGuideById(guideId);
    guide ? loadGuide(guide) : handleNotFound('Knowledge Record');
  }

  // 4. GUARANTEED REVEAL: Prevents blank screens
  if (mainContent) {
    requestAnimationFrame(() => {
      mainContent.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
      mainContent.style.opacity = '1';
    });
  }
});

function loadProduct(item) {
  document.body.setAttribute('data-theme', item.category === 'home' ? 'home-category' : item.category);
  updatePageMeta(item.title, item.shortDesc);
  safeSetText('product-title', item.title);
  safeSetText('product-tag', item.tag);
  safeSetText('product-short-desc', item.shortDesc);
  safeSetText('product-desc', item.description);
  safeSetText('product-price', formatPrice(item.price));
  safeSetText('product-lore', `"${item.lore}"`);
  
  const tag = document.getElementById('product-tag');
  if (tag) tag.setAttribute('data-variant', item.category);
  
  const buyBtn = document.getElementById('btn-action');
  if (buyBtn) {
    buyBtn.textContent = item.actionBtn || "Secure Instant Download";
    buyBtn.onclick = () => {
      if (item.buyUrl && item.buyUrl !== "#") {
        window.location.href = item.buyUrl;
      } else {
        addToLocalInventory(item);
        if (window.showToast) window.showToast(`${item.title} added to your inventory.`, 'success');
      }
    };
  }
}

function loadGuide(item) {
  document.body.setAttribute('data-theme', 'hub'); 
  updatePageMeta(item.title, item.shortDesc || "Verified Guide.");
  safeSetText('guide-title', item.title);
  const contentBox = document.getElementById('guide-content');
  if (contentBox) contentBox.innerHTML = item.content;
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function updatePageMeta(title, desc) {
  document.title = `${title} | Kynar Universe`;
  const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
  meta.name = "description";
  meta.content = desc;
  document.head.appendChild(meta);
}

function addToLocalInventory(item) {
  try {
    let items = JSON.parse(localStorage.getItem('kynar_inventory') || '[]');
    if (items.some(i => i.id === item.id)) return;
    items.push({ id: item.id, title: item.title, purchasedAt: new Date().toISOString() });
    localStorage.setItem('kynar_inventory', JSON.stringify(items));
  } catch (e) { console.error('Inventory Sync Failed', e); }
}

function handleNotFound(type) {
  document.title = "404 | Kynar Universe";
  safeSetText('product-title', `${type} Not Found`);
}
