/* KYNAR PRODUCT ENGINE (js/pages/product.js)
   Status: SECURE (DOM Safe Rendering)
*/

import { getProductById } from '../data.js';
import { initiateCheckout, handleWaitlist } from '../checkout.js';

document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
});

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    window.location.href = '../404.html';
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    renderNotFound();
    return;
  }

  // Set Theme (Department Color)
  document.documentElement.setAttribute('data-theme', product.category);
  document.title = `${product.title} | Kynar Universe`;

  renderProduct(product);
}

function renderProduct(product) {
  const container = document.getElementById('product-app');
  container.innerHTML = ''; // Clear skeleton

  // --- 1. Breadcrumbs ---
  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.style.marginBottom = 'var(--space-lg)';
  breadcrumb.innerHTML = `
    <a href="../index.html">Universe</a>
    <i class="ph ph-caret-right"></i>
    <a href="index.html">Store</a>
    <i class="ph ph-caret-right"></i>
  `;
  const currentCrumb = document.createElement('span');
  currentCrumb.style.color = 'var(--text-main)';
  currentCrumb.textContent = product.title;
  breadcrumb.appendChild(currentCrumb);

  // --- 2. Main Grid ---
  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-xl);';

  // --- Left Column (Image & Preview) ---
  const leftCol = document.createElement('div');
  leftCol.className = 'stack-md';
  leftCol.appendChild(createImageCard(product));
  
  if (product.codePreview) {
    leftCol.appendChild(createCodeBlock(product));
  }

  // --- Right Column (Details) ---
  const rightCol = document.createElement('div');
  rightCol.className = 'stack-md';

  // Header Stack
  const headerStack = document.createElement('div');
  headerStack.className = 'stack-xs';
  
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.setAttribute('data-variant', product.category);
  tag.textContent = product.subCategory;

  const title = document.createElement('h1');
  title.className = 'text-h1';
  title.textContent = product.title;

  const lore = document.createElement('p');
  lore.className = 'text-lore';
  lore.style.fontSize = '1.1rem';
  lore.textContent = product.lore;

  headerStack.append(tag, title, lore);

  // Description
  const desc = document.createElement('p');
  desc.className = 'text-body';
  desc.style.cssText = 'font-size: 1.05rem; line-height: 1.7;';
  desc.textContent = product.description;

  // Features List
  const featureList = document.createElement('ul');
  featureList.className = 'text-body stack-xs';
  featureList.style.marginTop = 'var(--space-md)';
  featureList.style.listStyle = 'none';
  
  product.features.forEach(f => {
    const li = document.createElement('li');
    li.style.cssText = 'display: flex; gap: 8px; align-items: center;';
    
    const icon = document.createElement('i');
    icon.className = 'ph ph-check';
    icon.style.color = 'var(--accent-primary)';
    
    const text = document.createElement('span');
    text.textContent = f;
    
    li.append(icon, text);
    featureList.appendChild(li);
  });

  // Action Area
  const actionArea = createActionArea(product);

  // Specs (Optional)
  const specs = product.specs ? createSpecsCard(product.specs) : null;

  // Assembly
  rightCol.append(headerStack, desc, featureList, actionArea);
  if (specs) rightCol.appendChild(specs);

  grid.append(leftCol, rightCol);
  container.append(breadcrumb, grid);

  // Re-trigger global animations
  if (window.initMotionSystem) window.initMotionSystem();
}

/* --- Component Helpers --- */

function createImageCard(product) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.cssText = 'padding: 0; overflow: hidden; position: relative; aspect-ratio: 16/10; background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-panel) 100%);';

  // Pattern Overlay (Safe HTML)
  const pattern = document.createElement('div');
  pattern.style.cssText = 'position: absolute; inset: 0; opacity: 0.05; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, var(--text-main) 10px, var(--text-main) 11px);';
  
  // Icon Placeholder
  const placeholder = document.createElement('div');
  placeholder.style.cssText = 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-sm); z-index: 1; pointer-events: none;';
  placeholder.innerHTML = `
    <div class="icon-box" style="width: 80px; height: 80px; font-size: 2.5rem; background: var(--bg-surface); border: 2px solid var(--border-subtle);">
      <i class="ph ${product.previewIcon || 'ph-package'}"></i>
    </div>
    <span class="text-micro" style="opacity: 0.6;">Preview Image</span>
  `;

  // Real Image
  const img = document.createElement('img');
  img.src = '../' + product.image;
  img.alt = product.title;
  img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; position: relative; z-index: 2;';
  img.onerror = () => { img.style.display = 'none'; }; // Fallback to placeholder

  card.append(pattern, placeholder, img);
  return card;
}

function createCodeBlock(product) {
  const block = document.createElement('div');
  block.className = 'code-block';
  block.setAttribute('data-context', product.category);
  
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = product.codePreview; // SAFE SINK (Escapes HTML entities)
  
  pre.appendChild(code);
  block.appendChild(pre);
  return block;
}

function createActionArea(product) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'margin-top: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--border-subtle);';

  const btn = document.createElement('button');
  btn.id = 'checkout-btn';
  btn.className = 'btn-primary btn-block';
  btn.style.justifyContent = 'center';
  
  // Button Content
  const icon = document.createElement('i');
  icon.className = `ph ${product.status === 'upcoming' ? 'ph-hourglass' : 'ph-download-simple'}`;
  
  const span = document.createElement('span');
  span.id = 'btn-text';
  span.textContent = product.status === 'upcoming' 
    ? 'Join Waitlist' 
    : `Purchase • £${product.price.toFixed(2)}`;

  btn.append(icon, span);

  // Logic Binding
  btn.onclick = () => handleProductAction(btn, product);

  const note = document.createElement('p');
  note.className = 'text-micro';
  note.style.cssText = 'text-align: center; margin-top: var(--space-sm); opacity: 0.6;';
  note.innerHTML = '<i class="ph ph-shield-check"></i> Secure Checkout via Lemon Squeezy • Instant Delivery';

  wrapper.append(btn, note);
  return wrapper;
}

function createSpecsCard(specs) {
  const card = document.createElement('div');
  card.className = 'card stack-sm';
  card.style.marginTop = 'var(--space-lg)';
  
  const title = document.createElement('h3');
  title.className = 'text-micro';
  title.textContent = 'Technical Specifications';
  
  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.9rem;';

  Object.entries(specs).forEach(([key, value]) => {
    const label = document.createElement('div');
    label.style.cssText = 'color: var(--text-muted); text-transform: capitalize;';
    label.textContent = key;

    const val = document.createElement('div');
    val.style.cssText = 'color: var(--text-main); font-family: var(--font-mono);';
    val.textContent = value;

    grid.append(label, val);
  });

  card.append(title, grid);
  return card;
}

function renderNotFound() {
  const container = document.getElementById('product-app');
  container.innerHTML = `
    <div style="text-align: center; padding: 4rem 0;">
      <i class="ph ph-mask-sad" style="font-size: 3rem; margin-bottom: var(--space-md); color: var(--text-muted);"></i>
      <h1 class="text-h2">Product Not Found</h1>
      <p class="text-body">The item you are looking for has been moved or de-listed.</p>
      <a href="../index.html" class="btn-secondary" style="margin-top: var(--space-md);">Return to Universe</a>
    </div>
  `;
}

function handleProductAction(btn, product) {
  const btnText = document.getElementById('btn-text');
  
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btnText.textContent = 'Processing...';
  
  if (product.status === 'upcoming') {
    handleWaitlist(product.id, product.title);
    setTimeout(() => {
      btn.disabled = false;
      btn.style.opacity = '1';
      btnText.textContent = 'Join Waitlist';
    }, 500);
  } else {
    initiateCheckout(product.id, product.title);
    // Button stays disabled as user is redirected
  }
}
