// artifact.js - The Detailed Data Sheet & Fulfillment Engine
const Artifact = {
    currentArtifact: null,

    open(id) {
        // Mock data for Phase 2 - In Phase 3 this comes from Supabase
        this.currentArtifact = {
            id: id,
            name: "Neural Scanner",
            world: "tools",
            impact: "+15 EFF",
            auraShift: "SHIFT BLUE",
            description: "A high-fidelity tool for organizing digital entropy. Part of the Tools World."
        };

        const stage = document.getElementById('main-stage');
        stage.innerHTML = `
            <div class="animate-slide-up bg-black min-h-screen pb-32 scanlines">
                <div class="h-64 w-full bg-gradient-to-b from-gray-700 to-black flex items-center justify-center overflow-hidden relative">
                    <div class="w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <h2 class="absolute font-['Bantayog'] text-2xl tracking-[0.5em] opacity-50">ARTIFACT</h2>
                </div>

                <div class="p-8 space-y-8 relative z-10">
                    <section>
                        <h1 class="text-3xl font-['Bantayog'] mb-2">${this.currentArtifact.name}</h1>
                        <p class="text-gray-400 font-['Glacial_Indifference'] leading-relaxed">
                            ${this.currentArtifact.description}
                        </p>
                    </section>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 border border-white/10 bg-white/5 rounded-sm">
                            <span class="text-[10px] uppercase text-gray-500 block mb-1">Impact Score</span>
                            <span class="text-xl font-['Bantayog'] text-cyan-400">${this.currentArtifact.impact}</span>
                        </div>
                        <div class="p-4 border border-white/10 bg-white/5 rounded-sm">
                            <span class="text-[10px] uppercase text-gray-500 block mb-1">Aura Weight</span>
                            <span class="text-xl font-['Bantayog'] text-purple-400">${this.currentArtifact.auraShift}</span>
                        </div>
                    </div>

                    <div id="action-zone" class="space-y-4">
                        <button onclick="Artifact.acquire()" id="acquire-btn" 
                            class="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-sm transition-all active:scale-95">
                            Acquire Asset
                        </button>
                        <button onclick="Marketplace.init()" class="w-full py-4 border border-white/20 text-xs uppercase tracking-[0.3em] opacity-60">
                            ← Back to Worlds
                        </button>
                    </div>
                </div>
            </div>
        `;
        stage.scrollTo(0,0);
    },

    async acquire() {
        const btn = document.getElementById('acquire-btn');
        const zone = document.getElementById('action-zone');
        
        // Fulfillment Logic: Progressive Loading Bar
        zone.innerHTML = `
            <div class="w-full space-y-2">
                <div class="flex justify-between text-[10px] uppercase tracking-widest text-cyan-400">
                    <span>Syncing with Identity...</span>
                    <span id="load-percent">0%</span>
                </div>
                <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div id="load-bar" class="h-full bg-cyan-400 transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>
        `;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.finalizeAcquisition();
            }
            document.getElementById('load-bar').style.width = `${progress}%`;
            document.getElementById('load-percent').innerText = `${Math.floor(progress)}%`;
        }, 200);
    },

    finalizeAcquisition() {
        if (window.Vault) {
            Vault.addAsset(this.currentArtifact);
            if (window.navigator.vibrate) window.navigator.vibrate([30, 100, 30]);
            
            document.getElementById('action-zone').innerHTML = `
                <div class="p-4 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-center rounded-sm animate-pulse">
                    <p class="text-xs font-bold uppercase tracking-widest">Asset Secured in Vault</p>
                </div>
                <button onclick="Navigation.teleport('vault')" class="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm mt-4">
                    View in Vault
                </button>
            `;
        }
    }
};
