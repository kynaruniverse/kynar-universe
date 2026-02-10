// theme.js - Visual DNA & Evolutionary Engine
const Worlds = {
    world_sage: { primary: '#71797E', accent: '#D4AF37', name: 'Lifestyle', key: 'Lifestyle' },
    world_electric: { primary: '#00FFFF', accent: '#2F4F4F', name: 'Tools', key: 'Tools' },
    world_terra: { primary: '#E2725B', accent: '#000080', name: 'Home', key: 'Home' }
};

const Navigation = {
    isZenMode: false,

    teleport(destination) {
        if (this.isZenMode && (destination === 'square' || destination === 'worlds')) {
            console.log("Zen Mode Active: Exploration Restricted.");
            return;
        }

        if (window.navigator.vibrate) window.navigator.vibrate(10);
        const stage = document.getElementById('main-stage');
        stage.innerHTML = '';

        if (destination === 'identity') {
            const container = document.createElement('div');
            container.id = 'identity-container';
            stage.appendChild(container);
            if (window.IdentityManager) IdentityManager.init();
        } else if (destination === 'worlds') {
            if (window.Marketplace) Marketplace.init();
        } else if (destination === 'vault') {
            if (window.Vault) Vault.init();
        } else if (destination === 'square') {
            if (window.Social) Social.init();
        }
    },

    toggleZen() {
        this.isZenMode = !this.isZenMode;
        document.body.classList.toggle('zen-active', this.isZenMode);
        const stage = document.getElementById('main-stage');
        
        if (this.isZenMode) {
            this.teleport('vault'); // Default to Vault in Zen Mode
            console.log("Zen Mode: Enabled");
        } else {
            console.log("Zen Mode: Disabled");
        }
    }
};

const Portal = {
    activate() {
        // Toggle Zen Mode on Portal Click for now
        Navigation.toggleZen();
        if (window.navigator.vibrate) window.navigator.vibrate([50, 20, 50]);
    },

    updateAura() {
        const orb = document.getElementById('the-orb');
        const vaultData = JSON.parse(localStorage.getItem('kynar_vault')) || [];
        
        if (vaultData.length === 0) {
            orb.style.background = '#71797E'; // Default Sage
            return;
        }

        // Calculate Weights
        const counts = { Lifestyle: 0, Tools: 0, Home: 0 };
        vaultData.forEach(item => { if(counts[item.world]) counts[item.world]++; });
        
        const total = vaultData.length;
        const pLifestyle = (counts.Lifestyle / total) * 100;
        const pTools = (counts.Tools / total) * 100;
        const pHome = (counts.Home / total) * 100;

        // Apply Conic Gradient Pattern
        const gradient = `conic-gradient(
            #71797E 0% ${pLifestyle}%, 
            #00FFFF ${pLifestyle}% ${pLifestyle + pTools}%, 
            #E2725B ${pLifestyle + pTools}% 100%
        )`;
        
        orb.style.transition = 'all 2s ease-in-out';
        orb.style.background = gradient;
        orb.style.boxShadow = `0 0 40px rgba(255,255,255,0.2)`;
        
        // Update the header ring if it exists
        const ring = document.getElementById('aura-ring');
        if (ring) ring.style.background = gradient;
    }
};

// Auto-sync Aura on load
window.addEventListener('load', () => Portal.updateAura());
