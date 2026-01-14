/* KYNAR UNIVERSE ENGINE (js/loader.js)
   Retrieves assets from the Centralized Hub (data.js) and injects them into the Specification Sheet.
   Status: FINAL MASTER (Aligned with "Grand Vision" & SEO Logic)
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
  
// Inject SEO structured data
  injectStructuredData('product', {
    title: item.title,
    description: item.description || item.shortDesc,
    price: item.price,
    category: item.category
  });  
  
  const catLink = document.getElementById('link-category');
  if (catLink) catLink.href = `../${item.category}/index.html`;
  
  // ✅ FIX: Added null check before setting attribute
  const tag = document.getElementById('product-tag');
  if (tag) {
    tag.setAttribute('data-variant', item.category);
  } else {
    console.warn('[Loader] Product tag element not found');
  }
  
  // 6. ACTION LOGIC
  const buyBtn = document.getElementById('btn-action');
  if (buyBtn) {
    buyBtn.textContent = item.actionBtn || "Secure Instant Download";
    buyBtn.onclick = () => {
      addToLocalInventory(item);
      window.location.href = '../checkout/success.html';
    };
  }
  
  // 7. VISUALS
  const preview = document.getElementById('product-preview');
  if (preview && item.previewIcon) {
    preview.innerHTML = `<i class="ph ${item.previewIcon}" style="font-size: 5rem; color: var(--accent-primary); opacity: 0.9;"></i>`;
  }
  
  // 8. ASSET LIST
  const featureList = document.getElementById('product-features');
  if (featureList && item.features) {
    featureList.innerHTML = item.features.map(f =>
      `<li style="display: flex; gap: 8px; align-items: flex-start;"><i class="ph ph-check" style="color: var(--accent-primary); margin-top: 4px;"></i><span>${f}</span></li>`
    ).join('');
  }
  
  // 9. TECHNICAL SPECIFICATIONS
  const codeContainer = document.getElementById('code-preview-container');
  const codeSnippet = document.getElementById('code-snippet');
  
  if (item.codePreview && codeContainer && codeSnippet) {
    codeContainer.style.display = 'flex';
    codeSnippet.textContent = item.codePreview;
  }
  
  if (item.specs) {
    safeSetText('spec-format', item.specs.format || "ZIP / PDF");
    safeSetText('spec-version', item.specs.version || "1.0.0");
  }
}

if (item.codePreview && codeContainer && codeSnippet) {
    codeContainer.style.display = 'flex';
    codeSnippet.textContent = item.codePreview;
    
    // ADD COPY BUTTON
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-tertiary';
    copyBtn.innerHTML = '<i class="ph ph-copy"></i> Copy';
    copyBtn.style.cssText = 'position: absolute; top: 12px; right: 12px; padding: 6px 12px; font-size: 0.85rem;';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.codePreview).then(() => {
        copyBtn.innerHTML = '<i class="ph ph-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="ph ph-copy"></i> Copy';
        }, 2000);
      });
    };
    codeContainer.style.position = 'relative';
    codeContainer.appendChild(copyBtn);
  }

/* =========================================
   KNOWLEDGE LOADER (Guides)
   "The Hub" Logic
   ========================================= */
function loadGuide(item) {
  document.body.setAttribute('data-theme', 'hub'); // Guides always use Hub theme
  
  // SEO
  updatePageMeta(item.title, "A verified guide from the Kynar Knowledge Library.");

  // Content
  safeSetText('guide-title', item.title);
  safeSetText('guide-date', item.date);
  safeSetText('guide-readtime', item.readTime);
  safeSetText('breadcrumb-title', item.title);
  
  const contentBox = document.getElementById('guide-content');
  if (contentBox) contentBox.innerHTML = item.content;
}

// Inject SEO structured data for guides
  injectStructuredData('article', {
    title: item.title,
    shortDesc: item.shortDesc || "A verified guide from the Kynar Knowledge Library.",
    date: item.date
  });

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
  // Update Tab Title
  document.title = `${title} | Kynar Universe`;
  
 // Remove any existing description meta tags to avoid duplicates
const existingMetas = document.querySelectorAll('meta[name="description"]');
existingMetas.forEach(meta => meta.remove());

// Create fresh meta description
const metaDesc = document.createElement('meta');
metaDesc.name = "description";
metaDesc.content = desc;
document.head.appendChild(metaDesc);
  
  // ✅ BONUS: Update Open Graph tags if they exist
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = title;
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = desc;
}

// ✅ FIX: Actually save items to localStorage
function addToLocalInventory(item) {
  try {
    // Get existing inventory
    let inventory = localStorage.getItem('kynar_inventory');
    let items = inventory ? JSON.parse(inventory) : [];
    
    // Check if item already exists (prevent duplicates)
    const exists = items.some(i => i.id === item.id);
    if (exists) {
      console.log(`[Universe] ${item.title} already in inventory.`);
      return;
    }
    
    // Add new item with timestamp
    items.push({
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      purchasedAt: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('kynar_inventory', JSON.stringify(items));
    console.log(`[Universe] ${item.title} added to inventory.`);
    
  } catch (error) {
    console.error('[Universe] Failed to save to inventory:', error);
    // Fail gracefully - don't block checkout
  }
}