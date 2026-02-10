// vault.js - The Permanent Asset Gallery
export const Vault = {
    ownedAssets: [],

    init() {
        const saved = localStorage.getItem('kynar_vault');
        this.ownedAssets = saved ? JSON.parse(saved) : [];
        this.render();
    },

    addAsset(asset) {
        if (this.ownedAssets.find(a => a.id === asset.id)) return;
        
        // Inject a timestamp for collection sorting
        const securedAsset = { ...asset, securedAt: Date.now() };
        this.ownedAssets.unshift(securedAsset);
        
        localStorage.setItem('kynar_vault', JSON.stringify(this.ownedAssets));
        
        if (window.Portal) window.Portal.updateAura();
        console.log(`📦 System: Artifact ${asset.id} Secured in Vault.`);
    },

    render() {
        const stage = document.getElementById('main-stage');
        if (!stage) return;

        stage.innerHTML = `
            <div class="p-6 animate-fade-in min-h-screen pb-40">
                <header class="mb-12">
                    <span class="text-[9px] tracking-[0.5em] text-gray-500 uppercase font-bold">Secure Storage</span>
                    <h1 class="text-4xl font-bantayog tracking-tighter text-white mt-1">THE VAULT</h1>
                    <div class="h-[2px] w-8 bg-cyan-400 mt-3 shadow-[0_0_10px_#00ffff]"></div>
                </header>
                
                <div id="vault-grid" class="grid grid-cols-2 gap-6 perspective-1000">
                    ${this.ownedAssets.length > 0 ? 
                        this.ownedAssets.map((asset, index) => this.renderArtifactCube(asset, index)).join('') : 
                        this.renderEmptyState()
                    }
                </div>
            </div>
        `;
    },

    renderArtifactCube(asset, index) {
        // Map world names to their evolved CSS variables
        const worldClass = asset.world ? `world-${asset.world.toLowerCase()}` : 'world-sage';
        
        return `
            <div id="cube-container-${index}" class="artifact-container w-full aspect-square group" onclick="Vault.handleCubeClick(${index})">
                <div class="artifact-card relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer">
                    <div class="absolute inset-0 backface-hidden kynar-card flex flex-col items-center justify-center p-4 border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                        <div class="w-12 h-12 border border-white/10 rotate-45 mb-5 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors duration-500">
                            <div class="w-6 h-6 bg-white/5 border border-white/5 rotate-45 animate-pulse-slow"></div>
                        </div>
                        <span class="text-[9px] font-bantayog uppercase tracking-[0.2em] text-center text-gray-400 group-hover:text-white transition-colors">${asset.name}</span>
                    </div>
                    
                    <div class="absolute inset-0 backface-hidden rotate-y-180 kynar-card flex flex-col items-center justify-center p-4 border-cyan-400/20 bg-cyan-950/20">
                        <span class="text-[7px] uppercase tracking-widest text-cyan-500 mb-3">Sync Specs</span>
                        <span class="text-[11px] font-bold text-white mb-1 text-center leading-tight uppercase">${asset.impact}</span>
                        <span class="text-[8px] text-gray-500 text-center font-mono">${asset.auraShift}</span>
                        <div class="mt-4 text-[7px] text-cyan-400/50 animate-pulse font-bold uppercase tracking-tighter">Click to Expand</div>
                    </div>
                </div>
            </div>
        `;
    },

    renderEmptyState() {
        return `
            <div class="col-span-2 flex flex-col items-center justify-center py-32 opacity-30">
                <div class="w-12 h-12 border border-dashed border-gray-500 rotate-45 mb-8"></div>
                <p class="text-center italic font-['Glacial_Indifference'] tracking-widest text-sm">
                    No artifacts detected in local frequency.<br>
                    <span class="text-[10px] uppercase not-italic opacity-60">Explore the Worlds to begin collection.</span>
                </p>
            </div>
        `;
    },

    handleCubeClick(index) {
        const container = document.getElementById(`cube-container-${index}`);
        const card = container.querySelector('.artifact-card');

        // Reset other cards that might be rotated
        document.querySelectorAll('.artifact-card.rotated').forEach(c => {
            if (c !== card) {
                c.style.transform = 'rotateY(0deg)';
                c.classList.remove('rotated');
            }
        });

        if (card.classList.contains('rotated')) {
            this.expandArtifact(index);
        } else {
            card.style.transform = 'rotateY(180deg)';
            card.classList.add('rotated');
            if (window.navigator.vibrate) window.navigator.vibrate(8);
        }
    },

    expandArtifact(index) {
        const asset = this.ownedAssets[index];
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 z-[100] bg-black/95 animate-fade-in p-8 flex flex-col items-center justify-center scanlines backdrop-blur-md';
        
        const registryHash = Math.random().toString(16).substring(2, 8).toUpperCase();

        overlay.innerHTML = `
            <div class="w-full max-w-md flex flex-col items-center animate-slide-up">
                <div class="w-40 h-40 border border-cyan-400/30 rounded-full mb-12 flex items-center justify-center relative">
                    <div class="absolute inset-0 border border-cyan-400/10 rounded-full animate-ping"></div>
                    <div class="w-20 h-20 border-2 border-cyan-400 rotate-45 shadow-[0_0_30px_rgba(0,255,255,0.2)]"></div>
                </div>
                
                <h1 class="text-5xl font-bantayog text-white mb-2 uppercase tracking-tighter text-center">${asset.name}</h1>
                <p class="text-cyan-400 text-[10px] uppercase tracking-[0.4em] mb-10">Artifact Integrity: 100%</p>
                
                <div class="w-full space-y-5 bg-white/5 p-6 rounded-xl border border-white/10">
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] text-gray-500 uppercase tracking-widest">Registry Hash</span>
                        <span class="text-[10px] font-mono text-white">KY-${asset.id}-${registryHash}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] text-gray-500 uppercase tracking-widest">Primary Impact</span>
                        <span class="text-[10px] text-cyan-400 font-bold uppercase">${asset.impact}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] text-gray-500 uppercase tracking-widest">Aura Class</span>
                        <span class="text-[10px] text-white font-bold uppercase">${asset.world}</span>
                    </div>
                </div>

                <button onclick="this.closest('.fixed').remove()" class="mt-16 px-12 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] active:scale-90 transition-transform">
                    Collapse Artifact
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
        if (window.navigator.vibrate) window.navigator.vibrate([10, 50, 10]);
    }
};

window.Vault = Vault;
