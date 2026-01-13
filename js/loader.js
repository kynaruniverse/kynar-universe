/* KYNAR UNIVERSE ENGINE (js/loader.js)
   Retrieves assets from the Centralized Hub (data.js) and injects them into the Specification Sheet.
   Status: FINAL MASTER (REMIX ICON ALIGNED)
*/

import { getProductById, getGuideById } from './data.js';
import { injectStructuredData } from './components/structured-data.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  
  // ROUTING LOGIC: Determine if we are loading an Asset (Tool) or Knowledge (Guide)
  if (params.has('id')) {
    const productId = params.get('id');
    const product = getProductById(productId);
    
    if (product) {
      loadProduct(product);
    } else {
      handleNotFound('Asset');
    }
  } 
  else if (params.has('guide')) {
    const guideId = params.get('guide');
    const guide = getGuideById(guideId);
    
    if (guide) {
      loadGuide(guide);
    } else {
      handleNotFound('Knowledge Record');
    }
  }
});

/* =========================================
   ASSET LOADER (Products)
   "The Digital Department Store" Logic
   ========================================= */
function loadProduct(item) {
  
  // 1. ATMOSPHERE CONTROL
  const theme = item.category === 'home' ? 'home-category' : item.category;
  document.body.setAttribute('data-theme', theme);
  
  // 2. SEO INJECTION
  updatePageMeta(item.title, item.shortDesc);
  injectStructuredData('product', {
    title: item.title,
    description: item.description || item.shortDesc,
    price: item.price,
    category: item.category
  }); 
  
  // 3. TEXT INJECTION
  safeSetText('product-title', item.title);
  safeSetText('product-tag', item.tag);
  safeSetText('product-short-desc', item.shortDesc);
  safeSetText('product-desc', item.description);
  safeSetText('product-price', `£${item.price.toFixed(2)}`);
  
  // 4. LORE INJECTION
  safeSetText('product-lore', `"${item.lore}"`);
  
  // 5. NAVIGATION ALIGNMENT
  safeSetText('breadcrumb-category', capitalize(item.category));
  safeSetText('breadcrumb-title', item.title);
  
  const catLink = document.getElementById('link-category');
  if (catLink) catLink.href = `../${item.category}/index.html`;
  
  const tag = document.getElementById('product-tag');
  if (tag) {
    tag.setAttribute('data-variant', item.category);
  }
  
  // 6. ACTION LOGIC
  const buyBtn = document.getElementById('btn-action');
  if (buyBtn) {
    buyBtn.textContent = item.actionBtn || "Secure Instant Download";
    
    // If the product has a real buy link (Phase 2), use it. 
    // Otherwise, use the simulation (Phase 1).
    if (item.buyUrl && item.buyUrl !== "#") {
        buyBtn.onclick = () => window.location.href = item.buyUrl;
    } else {
        buyBtn.onclick = () => {
          addToLocalInventory(item);
          alert("Simulation: Item added to inventory."); // Phase 1 Feedback
        };
    }
  }
  
  // 7. VISUALS (REMIX ICON UPDATE)
  const preview = document.getElementById('product-preview');
  if (preview && item.previewIcon) {
    // Removed 'ph' prefix. Now uses raw Remix class (e.g., 'ri-code-line')
    preview.innerHTML = `<i class="${item.previewIcon}" style="font-size: 5rem; color: var(--accent-primary); opacity: 0.9;"></i>`;
  }
  
  // 8. ASSET LIST (REMIX ICON UPDATE)
  const featureList = document.getElementById('product-features');
  if (featureList && item.features) {
    featureList.innerHTML = item.features.map(f =>
      `<li style="display: flex; gap: 8px; align-items: flex-start;">
         <i class="ri-check-line" style="color: var(--accent-primary); margin-top: 4px;"></i>
         <span>${f}</span>
       </li>`
    ).join('');
  }
  
  // 9. TECHNICAL SPECIFICATIONS & COPY BUTTON
  const codeContainer = document.getElementById('code-preview-container');
  const codeSnippet = document.getElementById('code-snippet');
  
  if (item.codePreview && codeContainer && codeSnippet) {
    codeContainer.style.display = 'flex';
    codeSnippet.textContent = item.codePreview;

    // COPY BUTTON LOGIC (Moved inside function to fix crash)
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-tertiary';
    copyBtn.innerHTML = '<i class="ri-file-copy-line"></i> Copy';
    copyBtn.style.cssText = 'position: absolute; top: 12px; right: 12px; padding: 6px 12px; font-size: 0.85rem;';
    
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.codePreview).then(() => {
        copyBtn.innerHTML = '<i class="ri-check-line"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="ri-file-copy-line"></i> Copy';
        }, 2000);
      });
    };
    
    codeContainer.style.position = 'relative';
    codeContainer.appendChild(copyBtn);
  }
  
  if (item.specs) {
    safeSetText('spec-format', item.specs.format || "ZIP / PDF");
    safeSetText('spec-version', item.specs.version || "1.0.0");
  }
}

/* =========================================
   KNOWLEDGE LOADER (Guides)
   "The Hub" Logic
   ========================================= */
function loadGuide(item) {
  document.body.setAttribute('data-theme', 'hub'); 
  
  // SEO
  updatePageMeta(item.title, "A verified guide from the Kynar Knowledge Library.");
  injectStructuredData('article', {
    title: item.title,
    shortDesc: item.shortDesc || "A verified guide from the Kynar Knowledge Library.",
    date: item.date
  });

  // Content
  safeSetText('guide-title', item.title);
  safeSetText('guide-date', item.date);
  safeSetText('guide-readtime', item.readTime);
  safeSetText('breadcrumb-title', item.title);
  
  const contentBox = document.getElementById('guide-content');
  if (contentBox) contentBox.innerHTML = item.content;
}

/* =========================================
   UTILITIES
   ========================================= */

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function handleNotFound(type) {
  document.title = "404 Not Found | Kynar Universe";
  safeSetText('product-title', `${type} Not Found`);
  safeSetText('product-short-desc', "This item has been moved or archived.");
  const btn = document.getElementById('btn-action');
  if (btn) btn.style.display = 'none';
}

function updatePageMeta(title, desc) {
  document.title = `${title} | Kynar Universe`;
  
  const existingMetas = document.querySelectorAll('meta[name="description"]');
  existingMetas.forEach(meta => meta.remove());

  const metaDesc = document.createElement('meta');
  metaDesc.name = "description";
  metaDesc.content = desc;
  document.head.appendChild(metaDesc);
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = title;
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = desc;
}

function addToLocalInventory(item) {
  try {
    let inventory = localStorage.getItem('kynar_inventory');
    let items = inventory ? JSON.parse(inventory) : [];
    
    const exists = items.some(i => i.id === item.id);
    if (exists) return;
    
    items.push({
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      purchasedAt: new Date().toISOString()
    });
    
    localStorage.setItem('kynar_inventory', JSON.stringify(items));
    console.log(`[Universe] ${item.title} added to inventory.`);
    
  } catch (error) {
    console.error('[Universe] Failed to save to inventory:', error);
  }
}
