// identity.js - The Heart of the Universal Identity
export const IdentityManager = {
    userProfile: null,

    async init() {
        this.userProfile = JSON.parse(localStorage.getItem('kynar_profile'));
        const container = document.getElementById('identity-container');
        if (!container) return;

        if (!this.userProfile) {
            this.renderOnboarding(container);
        } else {
            this.renderIdentityHub(container);
        }
    },

    renderOnboarding(container) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[80vh] p-8 animate-fade-in">
                <div class="relative w-40 h-40 mb-12">
                    <div class="absolute inset-0 rounded-full border border-white/10 animate-spin-slow"></div>
                    <div class="absolute inset-2 rounded-full border border-cyan-500/20"></div>
                    <div id="orb-preview" class="absolute inset-4 rounded-full bg-gradient-to-tr from-gray-900 to-gray-600 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center transition-all duration-700">
                        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
                
                <h1 class="text-4xl font-bantayog mb-2 text-white tracking-tighter">INITIALIZE ID</h1>
                <p class="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-10">Select your universal moniker</p>
                
                <div class="w-full max-w-xs relative">
                    <input type="text" id="username-input" autocomplete="off" maxlength="15"
                        placeholder="NAME_REQD" 
                        class="w-full bg-transparent border-b border-white/10 py-4 text-2xl text-center focus:outline-none focus:border-cyan-400 transition-all text-white font-mono placeholder:opacity-20 uppercase">
                </div>

                <button onclick="IdentityManager.createIdentity()" 
                    class="mt-12 w-full max-w-xs py-4 bg-white text-black text-xs font-bold tracking-[0.2em] hover:bg-cyan-400 transition-colors active:scale-95">
                    CONFIRM IDENTITY
                </button>
            </div>
        `;

        // Interactive Preview: Orb glows as you type
        const input = document.getElementById('username-input');
        input.addEventListener('input', (e) => {
            const preview = document.getElementById('orb-preview');
            if(e.target.value.length >= 3) {
                preview.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.2)';
                preview.style.background = 'linear-gradient(135deg, #222, #00ffff44)';
            } else {
                preview.style.boxShadow = 'none';
                preview.style.background = 'linear-gradient(135deg, #111, #333)';
            }
        });
    },

    createIdentity() {
        const input = document.getElementById('username-input');
        const username = input.value.trim().toLowerCase();
        
        if (!/^[a-z0-9_]+$/i.test(username)) return alert("Protocol: Monikers must be alphanumeric.");
        if (username.length < 3) return alert("Protocol: Moniker length insufficient.");

        const newProfile = {
            username: username,
            rank: 'The Pioneer',
            joinedDate: new Date().toISOString(),
            syncLevel: 1.0
        };

        localStorage.setItem('kynar_profile', JSON.stringify(newProfile));
        this.userProfile = newProfile;
        
        if (window.navigator.vibrate) window.navigator.vibrate([50, 30, 200]);
        if (window.Portal) window.Portal.updateAura();
        
        this.init();
    },

    renderIdentityHub(container) {
        const p = this.userProfile;
        const vault = JSON.parse(localStorage.getItem('kynar_vault')) || [];
        
        const counts = { Lifestyle: 0, Tools: 0, Home: 0 };
        vault.forEach(item => { if(counts[item.world] !== undefined) counts[item.world]++; });
        
        // Calculate Symmetry (0 to 100)
        const total = vault.length || 1;
        const diffs = Math.abs(counts.Lifestyle - counts.Tools) + Math.abs(counts.Tools - counts.Home);
        const symmetry = Math.max(0, 100 - (diffs * 10));
        const isBalanced = vault.length >= 3 && diffs === 0;

        container.innerHTML = `
            <div class="p-6 animate-slide-up pb-32">
                <header class="flex justify-between items-start mb-12">
                    <div>
                        <span class="text-[9px] tracking-[0.4em] text-cyan-400 uppercase font-bold">Authenticated</span>
                        <h1 class="text-4xl font-bantayog text-white uppercase mt-1 tracking-tighter">${p.username}</h1>
                    </div>
                    <div class="bg-white/5 border border-white/10 px-3 py-1 text-[9px] text-gray-400 uppercase tracking-widest mt-2">
                        ${p.rank}
                    </div>
                </header>

                <div class="grid grid-cols-2 gap-3 mb-12">
                    <div class="kynar-card p-5">
                        <span class="text-[8px] text-gray-500 uppercase tracking-widest">Vault Capacity</span>
                        <div class="flex items-end gap-1 mt-1">
                            <span class="text-3xl font-bantayog text-white">${vault.length}</span>
                            <span class="text-[10px] text-gray-600 mb-1.5">/ ∞</span>
                        </div>
                    </div>
                    <div class="kynar-card p-5">
                        <span class="text-[8px] text-gray-500 uppercase tracking-widest">Symmetry</span>
                        <div class="flex items-end gap-1 mt-1">
                            <span class="text-3xl font-bantayog text-cyan-400">${symmetry}%</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center py-10 relative">
                    <div id="aura-ring-large" class="w-56 h-56 rounded-full flex items-center justify-center p-[2px] transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        style="background: ${this.getConicGradient(counts, vault.length)};">
                        <div class="w-full h-full rounded-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 bg-white/[0.02] animate-pulse"></div>
                            ${isBalanced ? this.renderTrinityBadge() : '<span class="text-[8px] text-gray-700 uppercase tracking-[0.5em] font-bold">Aura_Core</span>'}
                        </div>
                    </div>
                    
                    ${isBalanced ? 
                        '<p class="text-[9px] text-cyan-400 mt-8 tracking-[0.5em] font-bold animate-pulse uppercase">Trinity Sync Active</p>' : 
                        `<p class="text-[9px] text-gray-600 mt-8 tracking-[0.2em] uppercase uppercase">Acquire items to balance aura</p>`
                    }
                </div>

                <div class="mt-20 pt-10 border-t border-white/5">
                    <button onclick="IdentityManager.resetIdentity()" class="text-[9px] text-red-500/30 hover:text-red-500 transition-colors uppercase tracking-[0.3em] block w-full text-center">
                        De-initialize Identity (Reset Data)
                    </button>
                </div>
            </div>
        `;
    },

    getConicGradient(counts, total) {
        if (total === 0) return 'rgba(255,255,255,0.05)';
        const pL = (counts.Lifestyle / total) * 100;
        const pT = (counts.Tools / total) * 100;
        return `conic-gradient(#71797E 0% ${pL}%, #00FFFF ${pL}% ${pL+pT}%, #E2725B ${pL+pT}% 100%)`;
    },

    renderTrinityBadge() {
        return `
            <div class="relative flex items-center justify-center">
                <div class="absolute w-24 h-24 border border-cyan-400/20 rounded-full animate-ping"></div>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" class="animate-spin-slow">
                    <path d="M12 2L22 21H2L12 2Z" stroke="white" stroke-width="0.5" stroke-linejoin="round"/>
                    <circle cx="12" cy="13" r="4" stroke="#00FFFF" stroke-width="1" class="animate-pulse"/>
                </svg>
            </div>
        `;
    },

    resetIdentity() {
        if(confirm("PROTOCOL WARNING: This will permanently erase your Universal Identity and Vault assets. Proceed?")) {
            localStorage.clear();
            location.reload();
        }
    }
};

window.IdentityManager = IdentityManager;
