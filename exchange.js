/**
 * QUIET FORGE EXCHANGE LOGIC
 * Role: Render manifest and process transaction
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const DOM = {
        list: document.getElementById('manifest-list'),
        count: document.getElementById('summary-count'),
        total: document.getElementById('summary-total'),
        btn: document.getElementById('btn-acquire')
    };

    function init() {
        renderManifest();
        
        if (DOM.btn) {
            DOM.btn.addEventListener('click', processExchange);
        }
    }

    function renderManifest() {
        const items = window.Satchel.getContents();
        const total = window.Satchel.total();

        DOM.count.textContent = items.length;
        DOM.total.textContent = `£${total.toFixed(2)}`;

        if (items.length === 0) {
            DOM.list.innerHTML = `
                <div style="padding: 4rem 0; text-align: center;">
                    <p class="text-body" style="margin: 0 auto;">Your satchel is light. No artifacts gathered.</p>
                    <a href="archive.html" class="ink-link" style="margin-top: 1.5rem; display: inline-block;">Return to Archive</a>
                </div>
            `;
            DOM.btn.style.opacity = '0.5';
            DOM.btn.style.pointerEvents = 'none';
            return;
        }

        DOM.list.innerHTML = items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                <div>
                    <span class="stone-meta">${item.collection || 'Artifact'}</span>
                    <h4 class="text-heading" style="font-size: 1.25rem;">${item.title}</h4>
                </div>
                <div style="text-align: right;">
                    <span class="text-body" style="display: block; font-weight: bold;">£${item.price.toFixed(2)}</span>
                    <button onclick="removeItem('${item.id}')" class="ink-link" style="font-size: 0.75rem; color: var(--ink-secondary); border: none; background: none; cursor: pointer; margin-top: 0.5rem;">
                        Remove
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Expose remove function globally for the HTML onclick
    window.removeItem = (id) => {
        window.Satchel.remove(id);
        renderManifest();
    };

    function processExchange() {
        const originalText = DOM.btn.textContent;
        DOM.btn.textContent = 'Securing...';
        
        // Simulation of API call
        setTimeout(() => {
            // Success
            DOM.btn.textContent = 'Exchange Complete';
            DOM.btn.style.background = '#4CAF50'; // Muted Success Green
            
            alert("Exchange successful. Artifacts have been added to your Identity.");
            
            // Clear and Redirect
            window.Satchel.clear();
            window.location.href = 'identity.html';
            
        }, 1500);
    }

    init();
});
