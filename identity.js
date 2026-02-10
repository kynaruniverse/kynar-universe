// identity.js - The Heart of the Universal Identity
const IdentityManager = {
    userProfile: null,

    async init() {
        this.userProfile = JSON.parse(localStorage.getItem('kynar_profile'));
        if (!this.userProfile) {
            this.renderOnboarding();
        } else {
            this.renderIdentityHub();
        }
    },

    renderOnboarding() {
        const container = document.getElementById('identity-container');
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[70vh] p-6 animate-fade-in">
                <div class="w-32 h-32 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center mb-6">
                    <div id="orb-preview" class="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-700 to-gray-400 opacity-50 animate-pulse"></div>
                </div>
                <h1 class="text-3xl font-['Bantayog'] mb-2 text-white">CHOOSE YOUR MONIKER</h1>
                <input type="text" id="username-input" placeholder="Citizen Name..." 
                    class="w-full bg-transparent border-b-2 border-white/20 p-4 text-xl text-center focus:outline-none focus:border-cyan-400 transition-all text-white mb-10">
                <button onclick="IdentityManager.createIdentity()" 
                    class="w-full py-4 bg-white text-black font-bold rounded-sm active:scale-95 transition-transform">
                    INITIALIZE IDENTITY
                </button>
            </div>
        `;
    },

    createIdentity() {
        const username = document.getElementById('username-input').value;
        if (!/^[a-z0-9]+$/i.test(username)) return alert("Monikers must be alphanumeric.");
        if (username.length < 3) return alert("Your moniker must be at least 3 characters.");

        const newProfile = {
            username: username,
            rank: 'The Pioneer',
            joinedDate: new Date().toISOString()
        };

        localStorage.setItem('kynar_profile', JSON.stringify(newProfile));
        this.userProfile = newProfile;
        this.renderIdentityHub();
    },

    renderIdentityHub() {
        const container = document.getElementById('identity-container');
        const p = this.userProfile;
        const vault = JSON.parse(localStorage.getItem('kynar_vault')) || [];
        
        // Calculate Trinity Balance
        const counts = { Lifestyle: 0, Tools: 0, Home: 0 };
        vault.forEach(item => { if(counts[item.world] !== undefined) counts[item.world]++; });
        const isBalanced = vault.length >= 3 && counts.Lifestyle === counts.Tools && counts.Tools === counts.Home;

        container.innerHTML = `
            <div class="p-6 animate-slide-up">
                <header class="flex justify-between items-center mb-10">
                    <div>
                        <h2 class="text-xs tracking-widest text-gray-500 uppercase">Universal Identity</h2>
                        <h1 class="text-3xl font-['Bantayog'] text-white">${p.username}</h1>
                    </div>
                    <div class="rank-badge px-3 py-1 border border-cyan-500/50 text-cyan-400 text-[10px] uppercase">
                        ${p.rank}
                    </div>
                </header>

                <div class="stats-grid grid grid-cols-2 gap-4 mb-10">
                    <div class="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <span class="block text-[10px] text-gray-500 uppercase">Vault Size</span>
                        <span class="text-2xl font-['Bantayog'] text-white">${vault.length}</span>
                    </div>
                    <div class="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <span class="block text-[10px] text-gray-500 uppercase">Aura Sync</span>
                        <span class="text-2xl font-['Bantayog'] text-white">1.${vault.length}</span>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center p-10 relative">
                    <div id="aura-ring-large" class="w-48 h-48 rounded-full flex items-center justify-center p-1 transition-all duration-1000"
                        style="background: ${this.getConicGradient(counts, vault.length)};">
                        <div class="w-full h-full rounded-full bg-black flex items-center justify-center">
                            ${isBalanced ? this.renderTrinityBadge() : '<span class="text-xs opacity-20 uppercase tracking-widest">Aura Core</span>'}
                        </div>
                    </div>
                    ${isBalanced ? '<p class="text-[10px] text-cyan-400 mt-6 tracking-[0.4em] animate-pulse">TRINITY SYNC ACTIVE</p>' : ''}
                </div>

                <button onclick="localStorage.clear(); location.reload();" class="text-xs text-red-500/40 uppercase tracking-widest mt-20 block w-full text-center">
                    Reset Universal Data
                </button>
            </div>
        `;
    },

    getConicGradient(counts, total) {
        if (total === 0) return '#222';
        const pL = (counts.Lifestyle / total) * 100;
        const pT = (counts.Tools / total) * 100;
        return `conic-gradient(#71797E 0% ${pL}%, #00FFFF ${pL}% ${pL+pT}%, #E2725B ${pL+pT}% 100%)`;
    },

    renderTrinityBadge() {
        return `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="animate-spin-slow">
                <path d="M12 2L2 19h20L12 2z" stroke="white" stroke-width="0.5" />
                <circle cx="12" cy="12" r="4" stroke="cyan" stroke-width="1" class="animate-pulse" />
            </svg>
        `;
    }
};
