/* ==========================================================================
   COMPONENT | PRODUCT CARD
   Description: Pure function to render a BEM-structured product card.
   ========================================================================== */

/**
 * Renders a single product card HTML string.
 * @param {import('../vault.js').Product} p - The product object
 * @returns {string} HTML string
 */
export function renderCard(p) {
  const isLocked = p.status === 'coming-soon';
  const buttonLabel = isLocked ? 'Locked' : 'Add To Cart';
  
  // Logic for locked state modifier
  const modifierClass = isLocked ? 'card--locked' : '';

  return `
    <article class="card ${modifierClass} reveal-up" data-id="${p.id}">
      
      <div class="card__media">
        <div class="card__image-container" style="background: ${p.accentColor || 'var(--color-sage)'}">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <span class="card__price">${p.price}</span>
      </div>

      <div class="card__body">
        
        <div class="card__header">
          <h3 class="card__title">${p.title}</h3>
          <span class="card__tag">${p.tag}</span>
        </div>

        <p class="card__desc">${p.shortDesc}</p>

        <div class="card__actions">
          <button 
            class="btn btn--ghost" 
            onclick="KynarEvents.emit(KynarEvents.EVENTS.MODAL_OPEN, '${p.id}')"
          >
            Details
          </button>
          
          <button 
            class="btn btn--primary" 
            onclick="KynarEvents.emit(KynarEvents.EVENTS.CART_ADD, '${p.id}')"
            ${isLocked ? 'disabled' : ''}
          >
            ${buttonLabel}
          </button>
        </div>

      </div>
    </article>
  `;
}
