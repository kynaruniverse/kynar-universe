/* ==========================================================================
   COMPONENT | PRODUCT CARD
   ========================================================================== */
export function renderCard(p) {
  const isLocked = p.status === 'coming-soon';
  const buttonLabel = isLocked ? 'Locked' : 'Add To Cart';
  const modifierClass = isLocked ? 'product-card--locked' : '';
  
  return `
    <article class="product-card ${modifierClass} reveal-up" data-id="${p.id}">
      <div class="product-card__media">
        <div class="product-card__image-box" style="background: ${p.accentColor || 'var(--color-sage)'}">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <span class="product-card__price">${p.price}</span>
      </div>

      <div class="product-card__body">
        <div class="product-card__header">
           <h3 class="product-card__title">${p.title}</h3>
          <span class="text-accent text-upper text-bold text-xs" style="letter-spacing: 0.1em;">${p.tag}</span>
        </div>

        <p class="card__desc" style="opacity: 0.7; font-size: 0.95rem; margin-bottom: 20px;">${p.shortDesc}</p>

        <div class="product-card__actions">
          <button class="btn btn--ghost" data-trigger="modal:open" data-payload="${p.id}">
            Details
          </button>
          
          <button 
            class="btn btn--primary" 
            data-trigger="cart:add" 
            data-payload="${p.id}"
            ${isLocked ? 'disabled' : ''}
          >
            ${buttonLabel}
          </button>
        </div>
      </div>
    </article>
  `;
}
