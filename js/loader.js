/* KYNAR UNIVERSE ENGINE (js/loader.js)
   Status: EVOLVED MASTER (Path + Query Aware / Pretty URL Compatible)
*/

import { getProductById, getGuideById, formatPrice } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  // filter(Boolean) removes empty strings from trailing slashes
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const mainContent = document.querySelector('main');
  
  // 1. INITIAL STATE: Hide content for a smooth fade-in
  if (mainContent) mainContent.style.opacity = '0';

  /** * 2. IDENTIFIER EXTRACTION (Unified Logic)
   * Priority 1: URL Query (?id= or ?guide=)
   * Priority 2: URL Path (/pages/product/slug)
   */
  let productId = params.get('id');
  let guideId = params.get('guide');

  if (!productId && !guideId) {
    const lastSegment = pathParts[pathParts.length - 1];
    
    // Check path for "Pretty URL" slugs
    if (window.location.pathname.includes('/product')) {
      // Ensure we don't treat the page name itself as the ID
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
  } else {
    // FALLBACK: If no ID found at all, force a reveal or redirect to 404
    handleNotFound('Universal');
  }

  // 4. GUARANTEED REVEAL: Ensure opacity is restored even if loading fails
  if (mainContent) {
    requestAnimationFrame(() => {
      mainContent.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
      mainContent.style.opacity = '1';
    });
  }
});


/* =========================================
   ASSET LOADER (Products)
   ========================================= */
function loadProduct(item) {
  // 1. Theme & Meta
  document.body.setAttribute('data-theme', item.category === 'home' ? 'home-category' : item.category);
  updatePageMeta(item.title, item.shortDesc);
  
  // 2. Text Content
  safeSetText('product-title', item.title);
  safeSetText('product-tag', item.tag);
  safeSetText('product-short-desc', item.shortDesc);
  safeSetText('product-desc', item.description);
  safeSetText('product-price', formatPrice(item.price));
  safeSetText('product-lore', `"${item.lore}"`);
  
  // 3. UI Indicators
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbTitle) breadcrumbTitle.textContent = item.title;

  const tag = document.getElementById('product-tag');
  if (tag) tag.setAttribute('data-variant', item.category);
  
  // 4. Action Logic
  const buyBtn = document.getElementById('btn-action');
  if (buyBtn) {
    buyBtn.textContent = item.actionBtn || "Secure Instant Download";
    
    buyBtn.onclick = () => {
      if (item.buyUrl && item.buyUrl !== "#") {
        window.location.href = item.buyUrl;
      } else {
        addToLocalInventory(item);
        if (window.showToast) {
          window.showToast(`${item.title} added to your inventory.`, 'success');
        }
      }
    };
  }
  
  // 5. Visuals & Features
  const preview = document.getElementById('product-preview');
  if (preview && item.previewIcon) {
    // Use CSS classes instead of inline styles for better performance
    preview.innerHTML = `<i class="${item.previewIcon} hero-icon-display"></i>`;
  }
  
  const featureList = document.getElementById('product-features');
  if (featureList && item.features) {
    featureList.innerHTML = item.features.map(f =>
      `<li><i class="ri-check-line"></i><span>${f}</span></li>`
    ).join('');
  }
  
  // 6. Technical Specs
  setupCodePreview(item);

  if (item.specs) {
    safeSetText('spec-format', item.specs.format);
    safeSetText('spec-version', item.specs.version);
  }
}

/* =========================================
   KNOWLEDGE LOADER (Guides)
   ========================================= */
function loadGuide(item) {
  document.body.setAttribute('data-theme', 'hub'); 
  updatePageMeta(item.title, item.shortDesc || "Verified Guide.");

  safeSetText('guide-title', item.title);
  safeSetText('guide-date', item.date);
  safeSetText('guide-readtime', item.readTime);
  
  const contentBox = document.getElementById('guide-content');
  if (contentBox) contentBox.innerHTML = item.content;
}

/* --- LOGIC HELPERS --- */

function setupCodePreview(item) {
  const container = document.getElementById('code-preview-container');
  const snippet = document.getElementById('code-snippet');
  
  if (item.codePreview && container && snippet) {
    container.style.display = 'flex';
    snippet.textContent = item.codePreview;

    const oldBtn = container.querySelector('.copy-btn');
    if (oldBtn) oldBtn.remove();

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-tertiary copy-btn';
    copyBtn.innerHTML = '<i class="ri-file-copy-line"></i> Copy';
    
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.codePreview).then(() => {
        copyBtn.innerHTML = '<i class="ri-check-line"></i> Copied!';
        setTimeout(() => copyBtn.innerHTML = '<i class="ri-file-copy-line"></i> Copy', 2000);
      });
    };
    container.appendChild(copyBtn);
  }
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
    
    items.push({
      id: item.id,
      title: item.title,
      purchasedAt: new Date().toISOString()
    });
    
    localStorage.setItem('kynar_inventory', JSON.stringify(items));
  } catch (e) { console.error('Inventory Sync Failed', e); }
}

function handleNotFound(type) {
  document.title = "404 | Kynar Universe";
  safeSetText('product-title', `${type} Not Found`);
  const btn = document.getElementById('btn-action');
  if (btn) btn.style.display = 'none';
}
