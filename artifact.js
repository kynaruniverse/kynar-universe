// artifact.js - The Detailed Data Sheet & Fulfillment Engine
export const Artifact = {
    currentArtifact: null,

    async open(id) {
        // Attempt to pull real-time data from Supabase
        try {
            const { data, error } = await window.kynarDB
                .from('artifacts')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            this.currentArtifact = data;
        } catch (err) {
            console.warn("Kynar System: Using local metadata fallback.");
            this.currentArtifact = {
                id: id,
                name: "Neural Scanner",
                world: "Tools",
                world_id: "world_electric",
                impact: "+15 EFF",
                auraShift: "SHIFT CYAN",
                description: "A high-fidelity tool for organizing digital entropy. Calibrated for the Electric World."
            };
        }

        this.render();
    },

    render() {
        const stage = document.getElementById('main-stage');
        const config = window.Worlds[this.currentArtifact.world_id] || { primary: '#00FFFF' };
        const vault = JSON.parse(localStorage.getItem('kynar_vault')) || [];
        const isOwned = vault.some(a => a.id === this.currentArtifact.id);

        stage.innerHTML = `
            <div class="animate-slide-up bg-[#050505] min-h-screen pb-40 scanlines">
                <div class="h-72 w-full flex items-center justify-center overflow-hidden relative border-b border-white/5">
                    <div class="absolute inset-0 opacity-20" 
                         style="background: radial-gradient(circle at center, ${config.primary}, transparent);"></div>
                    <div class="w-40 h-40 border border-white/10 rotate-45 flex items-center justify-center relative">
                        <div class="absolute inset-0 border border-${config.primary}/20 animate-ping"></div>
                        <div class="w-20 h-20 border-2" style="border-color: ${config.primary}; box-shadow: 0 0 30px ${config.primary}44;"></div>
                    </div>
                    <h2 class="absolute bottom-10 font-bantayog text-[10px] tracking-[1em] text-white/30 uppercase">Data_Node_${this.currentArtifact.id}</h2>
                </div>

                <div class="p-8 space-y-10 relative z-10 max-w-lg mx-auto">
                    <section class="animate-fade-in">
                        <span class="text-[9px] uppercase tracking-[0.4em] mb-2 block" style="color: ${config.primary}">${this.currentArtifact.world} World</span>
                        <h1 class="text-4xl font-bantayog mb-4 text-white tracking-tighter uppercase">${this.currentArtifact.name}</h1>
                        <p class="text-sm text-gray-400 font-['Glacial_Indifference'] leading-relaxed opacity-80">
                            ${this.currentArtifact.description}
                        </p>
                    </section>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-5 kynar-card border-white/5">
                            <span class="text-[8px] uppercase text-gray-500 tracking-widest block mb-2">Impact Class</span>
                            <span class="text-xl font-bantayog text-white uppercase">${this.currentArtifact.impact}</span>
                        </div>
                        <div class="p-5 kynar-card border-white/5">
                            <span class="text-[8px] uppercase text-gray-500 tracking-widest block mb-2">Aura Weight</span>
                            <span class="text-xl font-bantayog" style="color: ${config.primary}">${this.currentArtifact.auraShift}</span>
                        </div>
                    </div>

                    <div id="action-zone" class="space-y-4 pt-6">
                        ${isOwned ? `
                            <div class="p-5 border border-white/10 text-center rounded-sm bg-white/5">
                                <span class="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Identity Already Synced</span>
                            </div>
                        ` : `
                            <button onclick="Artifact.acquire()" id="acquire-btn" 
                                class="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-cyan-400 transition-colors active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Initialize Sync
                            </button>
                        `}
                        
                        <button onclick="window.Marketplace.init()" class="w-full py-4 text-[9px] uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors">
                            [ Exit Frequency ]
                        </button>
                    </div>
                </div>
            </div>
        `;
        stage.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async acquire() {
        const config = window.Worlds[this.currentArtifact.world_id] || { primary: '#00FFFF' };
        const zone = document.getElementById('action-zone');
        
        // Visual Sync Initiation
        if (window.navigator.vibrate) window.navigator.vibrate([10, 50, 10]);
        
        zone.innerHTML = `
            <div class="w-full space-y-4 p-6 kynar-card border-white/10">
                <div class="flex justify-between text-[9px] uppercase tracking-widest font-bold" style="color: ${config.primary}">
                    <span class="animate-pulse">Mapping Universal Geometry...</span>
                    <span id="load-percent">0%</span>
                </div>
                <div class="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <div id="load-bar" class="h-full transition-all duration-300 shadow-[0_0_10px_${config.primary}]" 
                         style="width: 0%; background-color: ${config.primary}"></div>
                </div>
            </div>
        `;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.finalizeAcquisition(config.primary);
            }
            const bar = document.getElementById('load-bar');
            const pct = document.getElementById('load-percent');
            if(bar) bar.style.width = `${progress}%`;
            if(pct) pct.innerText = `${progress}%`;
        }, 150);
    },

    finalizeAcquisition(color) {
        if (window.Vault) {
            window.Vault.addAsset(this.currentArtifact);
            
            // Success Haptic
            if (window.navigator.vibrate) window.navigator.vibrate([40, 10, 40, 10, 100]);
            
            document.getElementById('action-zone').innerHTML = `
                <div class="p-6 bg-white text-black text-center animate-fade-in">
                    <p class="text-[10px] font-bold uppercase tracking-[0.3em]">Protocol Success: Asset Secured</p>
                </div>
                <button onclick="window.Navigation.teleport('vault')" 
                    class="w-full py-5 border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.3em] mt-4 hover:bg-white/5 transition-colors">
                    Access Vault
                </button>
            `;
        }
    }
};

window.Artifact = Artifact;
