/* ASTRYX LOADER (js/loader.js)
   Injects product data into the Master Template.
*/
import { products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Get the Product ID from the URL (e.g., ?id=daily-clarity-planner)
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  // 2. Find the product in the database
  const product = products[productId];

  if (product) {
    loadProduct(product);
  } else {
    // If product not found, redirect to home or show error
    document.querySelector('main').innerHTML = '<div class="container stack-md" style="text-align:center; padding-top: 100px;"><h1>Item not found.</h1><a href="../../index.html" class="btn-tertiary">Return Home</a></div>';
  }
});

function loadProduct(item) {
  // A. Apply Theme Color
  document.body.setAttribute('data-theme', item.category);

  // B. Inject Text Content
  safeSetText('product-title', item.title);
  safeSetText('product-tag', item.tag);
  safeSetText('product-short-desc', item.shortDesc);
  safeSetText('product-lore', `"${item.loreWhisper}"`);
  safeSetText('product-desc', item.description);
  safeSetText('breadcrumb-category', capitalize(item.category));
  safeSetText('breadcrumb-title', item.title);
  
  // C. Update Links & Visuals
  const categoryLink = document.getElementById('link-category');
  if(categoryLink) categoryLink.href = `../${item.category}/index.html`;

  const tag = document.getElementById('product-tag');
  if(tag) tag.setAttribute('data-variant', item.category);

  const buyBtn = document.getElementById('btn-action');
  if(buyBtn) {
    buyBtn.textContent = item.actionBtn;
    buyBtn.onclick = () => window.open(item.gumroadLink, '_blank');
  }

  const preview = document.getElementById('product-preview');
  if(preview) preview.innerHTML = `<span style="font-size: 3rem;">${item.previewEmoji}</span>`;

  // D. Inject Features List
  const featureList = document.getElementById('product-features');
  if(featureList && item.features) {
    featureList.innerHTML = item.features.map(f => `<li>${f}</li>`).join('');
  }
}

// Helper: Safely set text if element exists
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Helper: Capitalize first letter
function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
