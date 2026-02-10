// theme.js - Visual DNA & Evolutionary Engine
export const Worlds = {
    world_sage: { primary: '#71797E', accent: '#D4AF37', name: 'Lifestyle', key: 'Lifestyle' },
    world_electric: { primary: '#00FFFF', accent: '#2F4F4F', name: 'Tools', key: 'Tools' },
    world_terra: { primary: '#E2725B', accent: '#000080', name: 'Home', key: 'Home' }
};

export const Navigation = {
    isZenMode: false,
    currentScreen: 'identity',

    teleport(destination) {
        if (this.isZenMode && ['square', 'worlds'].includes(destination)) {
            console.warn("Kynar System: Navigation Restricted in Zen Mode.");
            return;
        }

        // Haptic Feedback: Short pulse for navigation
        if (window.navigator.vibrate) window.navigator.vibrate(12);

        this.currentScreen = destination;
        const stage = document.getElementById('main-stage');
        if (!stage) return;
        
        stage.innerHTML = '';
        this.updateNavUI(destination);

        // Routing Logic
        switch(destination) {
            case 'identity':
                const container = document.createElement('div');
                container.id = 'identity-container';
                stage.appendChild(container);
                if (window.IdentityManager) window.IdentityManager.init();
                break;
            case 'worlds':
                if (window.Marketplace) window.Marketplace.init();
                break;
            case 'vault':
                if (window.Vault) window.Vault.init();
                break;
            case 'square':
                if (window.Social) window.Social.init();
                break;
        }
    },

    updateNavUI(activeId) {
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.classList.remove('active');
            if (icon.getAttribute('onclick')?.includes(activeId)) {
                icon.classList.add('active');
            }
        });
    },

    handleDeepLinks() {
        const params = new URLSearchParams(window.location.search);
        const screen = params.get('screen');
        if (screen) this.teleport(screen);
    },

    toggleZen() {
        this.isZenMode = !this.isZenMode;
        document.body.classList.toggle('zen-active', this.isZenMode);
        
        if (this.isZenMode) {
            this.teleport('vault');
            console.log("🌙 Zen Mode: Active");
        } else {
            console.log("☀️ Zen Mode: Deactivated");
        }
    }
};

export const Portal = {
    activate() {
        Navigation.toggleZen();
        // Haptic Feedback: Distinct rhythmic pulse
        if (window.navigator.vibrate) window.navigator.vibrate([40, 30, 40]);
    },

    updateAura(overrideColor = null) {
        const orb = document.getElementById('the-orb');
        if (!orb) return;

        if (overrideColor) {
            orb.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            orb.style.background = overrideColor;
            orb.style.boxShadow = `0 0 50px ${overrideColor}88`;
            return;
        }

        const vaultData = JSON.parse(localStorage.getItem('kynar_vault')) || [];
        
        // Default to Sage if empty
        if (vaultData.length === 0) {
            orb.style.background = Worlds.world_sage.primary;
            return;
        }

        const counts = { Lifestyle: 0, Tools: 0, Home: 0 };
        vaultData.forEach(item => { if (counts[item.world] !== undefined) counts[item.world]++; });

        const total = vaultData.length;
        const pL = (counts.Lifestyle / total) * 100;
        const pT = (counts.Tools / total) * 100;

        const gradient = `conic-gradient(
            ${Worlds.world_sage.primary} 0% ${pL}%, 
            ${Worlds.world_electric.primary} ${pL}% ${pL + pT}%, 
            ${Worlds.world_terra.primary} ${pL + pT}% 100%
        )`;

        orb.style.transition = 'all 2.5s ease-in-out';
        orb.style.background = gradient;
        
        // Sync to CSS variables for global UI influence
        document.documentElement.style.setProperty('--aura-gradient', gradient);
    }
};

// Global Initialization Hooks
window.addEventListener('load', () => {
    Portal.updateAura();
    Navigation.handleDeepLinks();
});
