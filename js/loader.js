/* ASTRYX LOADER (js/loader.js)
   Injects Product OR Guide data into templates.
   Status: FINAL MASTER (Aligned with Data Engine & Business Vision)
*/

// ALIGNMENT: Import helper functions, not raw arrays
import { getProductById, getGuideById } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  
  // CHECK: Is this a Product request?
  if (params.has('id')) {
    const productId = params.get('id');
    const product = getProductById(productId); // Use Helper
    
    if (product) {
      loadProduct(product);
    } else {
      // Handle 404 - Product Not Found
      document.getElementById('product-title').textContent = "Product Not Found";
      document.getElementById('btn-action').style.display = "none";
    }
  } 
  // CHECK: Is this a Guide request? (For Phase 2 Hub)
  else if (params.has('guide')) {
    const guideId = params.get('guide');
    const guide = getGuideById(guideId); // Use Helper
    if (guide) loadGuide(guide);
  }
});

function loadProduct(item) {
  // 1. THEME LOGIC (Critical for Color Bible Alignment)
  // If category is 'home' (Family), we must use the 'home-category' theme to get Beige colors.
  const theme = item.category === 'home' ? 'home-category' : item.category;
  document.body.setAttribute('data-theme', theme);

  // 2. TEXT INJECTION
  safeSetText('product-title', item.title);
  safeSetText('product-tag', item.tag);
  safeSetText('product-short-desc', item.shortDesc);
  safeSetText('product-desc', item.description);
  
  // Vision Requirement: Price in GBP
  safeSetText('product-price', `£${item.price.toFixed(2)}`);

  // Language Bible: "Quiet Mythic Depth"
  safeSetText('product-lore', `"${item.lore}"`); 

  // Breadcrumbs
  safeSetText('breadcrumb-category', capitalize(item.category));
  safeSetText('breadcrumb-title', item.title);
  
  const catLink = document.getElementById('link-category');
  if(catLink) catLink.href = `../${item.category}/index.html`;

  const tag = document.getElementById('product-tag');
  if(tag) tag.setAttribute('data-variant', item.category);

  // 3. ACTION BUTTON
  const buyBtn = document.getElementById('btn-action');
  if(buyBtn) {
    buyBtn.textContent = item.actionBtn;
    // Placeholder logic - In Phase 2 this connects to Stripe/Gumroad
    buyBtn.onclick = () => alert(`Opening checkout for: ${item.title}`);
  }

  // 4. PREVIEW ICON (Phosphor)
  const preview = document.getElementById('product-preview');
  if(preview && item.previewIcon) {
    // Uses the Accent color for the icon
    preview.innerHTML = `<i class="ph ${item.previewIcon}" style="font-size: 4rem; color: var(--accent-primary); opacity: 0.8;"></i>`;
  }

  // 5. FEATURE LIST
  const featureList = document.getElementById('product-features');
  if(featureList && item.features) {
    featureList.innerHTML = item.features.map(f => `<li>${f}</li>`).join('');
  }

  // 6. TECHNICAL DATA (Business Vision: Automation Scripts)
  // Check if this product has a Code Preview (e.g., Python Script)
  const codeContainer = document.getElementById('code-preview-container');
  const codeSnippet = document.getElementById('code-snippet');
  
  if (item.codePreview && codeContainer && codeSnippet) {
    codeContainer.style.display = 'flex'; // Unhide the block
    codeSnippet.textContent = item.codePreview;
  }

  // Check if this product has Tech Specs
  const specsContainer = document.getElementById('tech-specs');
  if (item.specs && specsContainer) {
    // Generate spec list dynamically
    specsContainer.innerHTML = `
      <span>• <strong>Language:</strong> ${item.specs.language}</span>
      <span>• <strong>OS:</strong> ${item.specs.os}</span>
      <span>• <strong>Difficulty:</strong> ${item.specs.difficulty}</span>
    `;
  }
}

function loadGuide(item) {
  document.body.setAttribute('data-theme', 'hub'); // Guides always use Hub theme
  safeSetText('guide-title', item.title);
  safeSetText('guide-date', item.date);
  safeSetText('guide-readtime', item.readTime);
  safeSetText('breadcrumb-title', item.title);
  
  const contentBox = document.getElementById('guide-content');
  if(contentBox) contentBox.innerHTML = item.content;
}

/* UTILITIES */
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
