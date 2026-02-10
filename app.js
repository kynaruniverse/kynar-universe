// app.js - The Universal Heartbeat & Orchestrator
import { kynarDB, checkConnection } from './supabase-config.js';

const Universe = {
    state: 'initialization',

    async start() {
        console.log("🌌 KYNAR UNIVERSE: Initializing Systems...");
        
        // 1. Establish Database Connection
        const isOnline = await checkConnection();
        if (!isOnline) {
            console.warn("⚠️ System Alert: Operating in Local-Only Mode.");
        }

        try {
            // 2. Wake up Identity Hub (User Heart)
            if (window.IdentityManager) {
                await window.IdentityManager.init();
            }

            // 3. Load Local Vault Assets
            if (window.Vault) {
                window.Vault.init();
            }

            // 4. Initial Aura Calculation
            if (window.Portal) {
                window.Portal.updateAura();
            }

            // 5. Complete Boot Sequence
            this.finalizeBoot();

        } catch (error) {
            console.error("❌ Critical System Failure:", error);
            this.enterSafeMode();
        }
    },

    finalizeBoot() {
        this.state = 'active';
        
        // Cinematic Transition: Remove Boot Loader
        const loader = document.getElementById('boot-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 1000);
        }

        // System Heartbeat (Haptic)
        if (window.navigator.vibrate) {
            window.navigator.vibrate([15, 10, 15]);
        }

        console.log("✅ KYNAR UNIVERSE: Systems Online.");
    },

    enterSafeMode() {
        this.state = 'safe_mode';
        const loader = document.getElementById('boot-loader');
        if (loader) {
            loader.innerHTML = `
                <div class="text-center p-6">
                    <p class="text-red-500 font-bantayog mb-4">CRITICAL_SYNC_ERR</p>
                    <button onclick="location.reload()" class="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-widest">Re-Initialize</button>
                </div>
            `;
        }
    }
};

// Global Exposure for debugging/console access
window.Universe = Universe;

// Fire when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    Universe.start();
});
