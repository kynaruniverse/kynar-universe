/**
 * QUIET FORGE UTILITIES
 * Role: Component Loader & Satchel Logic
 */

const ForgeUtils = {
    
    async loadComponents() {
        const elements = document.querySelectorAll('[data-include]');
        
        for (const el of elements) {
            const file = el.dataset.include;
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    el.innerHTML = html;
                    this.executeScripts(el);
                    
                    // Update Satchel if header loaded
                    if (file.includes('header')) {
                        this.updateSatchelCount();
                    }
                }
            } catch (err) {
                console.error('Forge Load Error:', err);
            }
        }
    },

    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    },

    // RENAMED: Cart -> Satchel
    updateSatchelCount() {
        const countEl = document.getElementById('satchel-count');
        if (!countEl) return;
        
        // We still use localStorage 'kynar_cart' for data safety, 
        // but the UI is now 'Satchel'
        const satchel = JSON.parse(localStorage.getItem('kynar_cart') || '[]');
        const count = satchel.length;
        
        if (count > 0) {
            countEl.textContent = `(${count})`;
            countEl.style.opacity = '1';
        } else {
            countEl.textContent = '';
            countEl.style.opacity = '0';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ForgeUtils.loadComponents();
});
