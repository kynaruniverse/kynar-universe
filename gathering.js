/**
 * QUIET FORGE SATCHEL LOGIC v2.0 (Enhanced)
 * Role: Manage artifacts and Ghost Drawer UI
 */

const Satchel = {
    
    getKey() { return 'kynar_cart'; },

    getContents() {
        return JSON.parse(localStorage.getItem(this.getKey()) || '[]');
    },

    add(artifact) {
        const contents = this.getContents();
        if (!contents.find(item => item.id === artifact.id)) {
            contents.push(artifact);
            this.save(contents);
            this.openDrawer(); // AUTO-OPEN on add
            return true;
        }
        this.openDrawer(); // Open even if already added
        return false;
    },

    remove(artifactId) {
        let contents = this.getContents();
        contents = contents.filter(item => item.id !== artifactId);
        this.save(contents);
        this.renderDrawer(); // Re-render immediately
    },

    clear() {
        localStorage.removeItem(this.getKey());
        this.updateUI();
    },

    save(contents) {
        localStorage.setItem(this.getKey(), JSON.stringify(contents));
        this.updateUI();
        this.renderDrawer();
    },

    total() {
        return this.getContents().reduce((sum, item) => sum + item.price, 0);
    },

        updateUI() {
        if (window.ForgeUtils) window.ForgeUtils.updateSatchelCount();
    },

    // --- GATEKEEPER LOGIC ---
    hasSignal() {
        return localStorage.getItem('kynar_signal_token') !== null;
    },

    requireSignal(callback) {
        if (this.hasSignal()) {
            callback(); 
        } else {
            if (window.Haptics) window.Haptics.heavy();
            const gateTrigger = document.querySelector('.trigger-access'); 
            if (gateTrigger) gateTrigger.click();
            alert("This artifact requires a Signal connection (Email).");
        }
    },

    // --- DRAWER LOGIC ---

    
    initDrawer() {
        const trigger = document.querySelector('a[href="exchange.html"]'); // Hijack the link
        const backdrop = document.getElementById('satchel-drawer-backdrop');
        const closeBtn = document.getElementById('close-drawer');
        
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault(); // Stop navigation
                this.openDrawer();
            });
        }
        if (backdrop) backdrop.addEventListener('click', () => this.closeDrawer());
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());
    },

    openDrawer() {
        this.renderDrawer();
        document.body.classList.add('drawer-open');
    },

    closeDrawer() {
        document.body.classList.remove('drawer-open');
    },

    renderDrawer() {
        const container = document.getElementById('drawer-items');
        const totalEl = document.getElementById('drawer-total');
        const items = this.getContents();

        if (!container) return;

        totalEl.textContent = `£${this.total().toFixed(2)}`;

        if (items.length === 0) {
            container.innerHTML = `<p class="text-body" style="text-align:center; color: var(--ink-secondary);">Your satchel is empty.</p>`;
            return;
        }

        container.innerHTML = items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05);">
                <div style="display: flex; gap: 1rem;">
                    <div style="width: 50px; height: 50px; background: #E6E6E2; border-radius: 4px; overflow:hidden;">
                        ${item.image ? `<img src="${item.image}" style="width:100%; height:100%; object-fit:cover;">` : ''}
                    </div>
                    <div>
                        <h4 class="text-heading" style="font-size: 1rem;">${item.title}</h4>
                        <span class="stone-meta">${item.collection}</span>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span class="text-body" style="font-weight: bold; font-size: 0.9rem;">£${item.price.toFixed(2)}</span>
                    <button onclick="Satchel.remove('${item.id}')" style="display:block; margin-top:0.5rem; background:none; border:none; color:var(--ink-secondary); font-size:0.75rem; cursor:pointer; text-decoration:underline; margin-left:auto;">Remove</button>
                </div>
            </div>
        `).join('');
    }
};

// Initialize listeners when DOM is ready (using a slight delay to wait for Header injection)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        Satchel.initDrawer();
    }, 500); // Wait for header.html to inject
});

window.Satchel = Satchel;
