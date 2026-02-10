// vault.js - The Permanent Asset Gallery
const Vault = {
    ownedAssets: [],

    init() {
        const saved = localStorage.getItem('kynar_vault');
        this.ownedAssets = saved ? JSON.parse(saved) : [];
        this.render();
    },

    addAsset(asset) {
        if (this.ownedAssets.find(a => a.id === asset.id)) return;
        this.ownedAssets.push(asset);
        localStorage.setItem('kynar_vault', JSON.stringify(this.ownedAssets));
    },

    render() {
        const stage = document.getElementById('main-stage');
        stage.innerHTML = `
            <div class="p-6 animate-fade-in min-h-screen pb-32">
                <header class="mb-10">
                    <h1 class="text-4xl font-['Bantayog'] tracking-tighter text-white">THE VAULT</h1>
                    <div class="h-[1px] w-12 bg-cyan-400 mt-2"></div>
                </header>
                
                <div class="grid grid-cols-2 gap-6 perspective-1000">
                    ${this.ownedAssets.length > 0 ? 
                        this.ownedAssets.map((asset, index) => this.renderArtifactCube(asset, index)).join('') : 
                        `<p class="col-span-2 text-center text-gray-600 py-20 italic font-['Glacial_Indifference']">The Vault is empty. Explore the Worlds to begin.</p>`
                    }
                </div>
            </div>
        `;
    },

    renderArtifactCube(asset, index) {
        return `
            <div id="cube-${index}" class="artifact-container w-full aspect-square" onclick="Vault.handleCubeClick(${index})">
                <div class="artifact-card relative w-full h-full transition-transform duration-700 preserve-3d">
                    <div class="absolute inset-0 backface-hidden kynar-glass border border-white/10 rounded-xl flex flex-col items-center justify-center p-4">
                        <div class="w-10 h-10 bg-cyan-400/20 border border-cyan-400/50 rotate-45 mb-4 shadow-[0_0_15px_rgba(0,255,255,0.2)]"></div>
                        <span class="text-[8px] font-['Bantayog'] uppercase tracking-[0.2em] text-center">${asset.name}</span>
                    </div>
                    <div class="absolute inset-0 backface-hidden rotate-y-180 kynar-glass border border-cyan-400/30 rounded-xl bg-cyan-900/10 flex flex-col items-center justify-center p-4">
                        <span class="text-[7px] uppercase text-cyan-400 mb-2">Technical Specs</span>
                        <span class="text-[10px] font-bold text-white mb-1">${asset.impact}</span>
                        <span class="text-[8px] text-gray-400">${asset.auraShift}</span>
                    </div>
                </div>
            </div>
        `;
    },

    handleCubeClick(index) {
        const container = document.getElementById(`cube-${index}`);
        const card = container.querySelector('.artifact-card');

        if (card.classList.contains('rotated')) {
            // Second click: Expand to fill screen
            this.expandArtifact(index);
        } else {
            // First click: Flip
            card.style.transform = 'rotateY(180deg)';
            card.classList.add('rotated');
            if (window.navigator.vibrate) window.navigator.vibrate(10);
        }
    },

    expandArtifact(index) {
        const asset = this.ownedAssets[index];
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 z-[100] bg-black animate-fade-in p-8 flex flex-col items-center justify-center scanlines';
        overlay.innerHTML = `
            <div class="w-32 h-32 bg-cyan-400/10 border border-cyan-400 rounded-full animate-pulse-slow mb-10 flex items-center justify-center">
                <div class="w-16 h-16 border-2 border-cyan-400 rotate-45"></div>
            </div>
            <h1 class="text-4xl font-['Bantayog'] text-white mb-4 uppercase tracking-tighter">${asset.name}</h1>
            <div class="w-full max-w-xs space-y-4 opacity-70">
                <div class="flex justify-between border-b border-white/10 pb-2">
                    <span class="text-[10px] uppercase">Registry ID</span>
                    <span class="text-[10px] font-mono">KY-${asset.id}</span>
                </div>
                <div class="flex justify-between border-b border-white/10 pb-2">
                    <span class="text-[10px] uppercase">Status</span>
                    <span class="text-[10px] text-cyan-400">SYNCED</span>
                </div>
            </div>
            <button onclick="this.parentElement.remove()" class="mt-20 px-10 py-3 border border-white/20 text-[10px] uppercase tracking-widest active:bg-white active:text-black">
                Collapse Artifact
            </button>
        `;
        document.body.appendChild(overlay);
    }
};
