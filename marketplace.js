// marketplace.js - The Multi-World Commerce Engine
const Marketplace = {
    activeWorld: 'world_sage',

    init() {
        this.renderWorldPicker();
    },

    renderWorldPicker() {
        const stage = document.getElementById('main-stage');
        stage.innerHTML = `
            <div class="p-6 animate-fade-in">
                <h1 class="text-4xl font-['Bantayog'] mb-8 tracking-tighter">DISCOVER</h1>
                
                <div class="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                    ${this.renderWorldCard('Lifestyle', 'world_sage', '#71797E')}
                    ${this.renderWorldCard('Tools', 'world_electric', '#00FFFF')}
                    ${this.renderWorldCard('Home', 'world_terra', '#E2725B')}
                </div>

                <div id="product-grid" class="grid grid-cols-1 gap-6 mt-4">
                    <p class="text-gray-500 font-['Glacial_Indifference'] italic">Select a World to begin exploration...</p>
                </div>
            </div>
        `;
    },

    renderWorldCard(name, id, color) {
        return `
            <div onclick="Marketplace.switchWorld('${id}')" 
                 class="snap-center shrink-0 w-40 h-52 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden active:scale-95 transition-transform"
                 style="background: linear-gradient(135deg, ${color}22, #000);">
                <div class="w-12 h-12 rounded-full mb-4 shadow-[0_0_20px_${color}44]" style="border: 2px solid ${color}"></div>
                <span class="font-['Bantayog'] uppercase tracking-widest text-xs">${name}</span>
            </div>
        `;
    },

    switchWorld(worldId) {
        this.activeWorld = worldId;
        const config = Worlds[worldId]; // From theme.js
        
        // Update the Portal Aura
        if (window.Portal) Portal.updateAura(config.primary);
        
        // Trigger Haptic
        if (window.navigator.vibrate) window.navigator.vibrate(20);

        this.renderProducts(worldId);
    },

    renderProducts(worldId) {
        const grid = document.getElementById('product-grid');
        // Placeholder data - In Phase 2 this pulls from Supabase
        grid.innerHTML = `
            <div onclick="Artifact.open('art_001')" class="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4 active:bg-white/10 transition-colors">
                <div class="w-16 h-16 bg-gray-800 rounded-lg"></div>
                <div>
                    <h3 class="font-bold uppercase text-sm">Example Artifact</h3>
                    <p class="text-[10px] text-gray-500">Efficiency +15</p>
                </div>
                <div class="ml-auto font-['Bantayog']">Free</div>
            </div>
        `;
    }
};
