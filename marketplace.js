// marketplace.js - The Multi-World Discovery Engine
export const Marketplace = {
    activeWorld: 'world_sage',

    init() {
        this.render();
    },

    render() {
        const stage = document.getElementById('main-stage');
        if (!stage) return;

        stage.innerHTML = `
            <div class="p-6 animate-fade-in pb-40">
                <header class="mb-8">
                    <span class="text-[9px] tracking-[0.5em] text-cyan-400 uppercase font-bold">Discovery Protocol</span>
                    <h1 class="text-4xl font-bantayog tracking-tighter text-white mt-1 uppercase">Worlds</h1>
                </header>
                
                <div class="flex gap-4 overflow-x-auto pb-8 no-scrollbar snap-x">
                    ${this.renderWorldCard('Lifestyle', 'world_sage', '#71797E')}
                    ${this.renderWorldCard('Tools', 'world_electric', '#00FFFF')}
                    ${this.renderWorldCard('Home', 'world_terra', '#E2725B')}
                </div>

                <div class="flex justify-between items-center mb-6">
                    <h2 id="world-title" class="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Select Frequency</h2>
                    <div class="h-[1px] flex-grow mx-4 bg-white/5"></div>
                </div>

                <div id="product-grid" class="space-y-4">
                    ${this.renderDiscoveryPrompt()}
                </div>
            </div>
        `;
        
        // Auto-select active world if returning to screen
        if (this.activeWorld) this.switchWorld(this.activeWorld);
    },

    renderWorldCard(name, id, color) {
        const isActive = this.activeWorld === id;
        return `
            <div id="card-${id}" onclick="Marketplace.switchWorld('${id}')" 
                 class="world-card snap-center shrink-0 w-36 h-48 rounded-2xl border ${isActive ? 'border-white/40' : 'border-white/10'} flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group"
                 style="background: linear-gradient(180deg, ${color}15 0%, #050505 100%);">
                
                <div class="w-10 h-10 rounded-full mb-4 transition-all duration-700 ${isActive ? 'scale-110' : 'opacity-40 grayscale'}" 
                     style="border: 1px solid ${color}; box-shadow: 0 0 20px ${color}33; background: ${color}11;">
                </div>
                
                <span class="font-bantayog uppercase tracking-widest text-[10px] ${isActive ? 'text-white' : 'text-gray-500'}">${name}</span>
                
                ${isActive ? `<div class="absolute bottom-0 left-0 w-full h-1" style="background: ${color}"></div>` : ''}
            </div>
        `;
    },

    async switchWorld(worldId) {
        this.activeWorld = worldId;
        const config = window.Worlds ? window.Worlds[worldId] : { primary: '#fff' };
        
        // 1. Update UI Classes
        document.querySelectorAll('.world-card').forEach(c => {
            c.classList.remove('border-white/40');
            c.classList.add('border-white/10');
        });
        document.getElementById(`card-${worldId}`)?.classList.replace('border-white/10', 'border-white/40');

        // 2. Global Style Shift
        document.body.className = `world-${worldId.split('_')[1]}`;
        if (window.Portal) window.Portal.updateAura(config.primary);
        
        // 3. Update Text
        const title = document.getElementById('world-title');
        if (title) title.innerText = `${worldId.replace('_', ' ')} Feed`;

        // 4. Haptic & Fetch
        if (window.navigator.vibrate) window.navigator.vibrate(15);
        this.fetchArtifacts(worldId);
    },

    async fetchArtifacts(worldId) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = this.renderLoadingState();

        try {
            // SYNC: Attempt to pull from Supabase
            const { data, error } = await window.kynarDB
                .from('artifacts')
                .select('*')
                .eq('world_id', worldId);

            if (error) throw error;

            if (data && data.length > 0) {
                grid.innerHTML = data.map(item => this.renderProductItem(item)).join('');
            } else {
                grid.innerHTML = this.renderEmptyWorld();
            }
        } catch (err) {
            console.warn("Kynar Discovery: DB Fetch offline, using local fallbacks.");
            grid.innerHTML = this.renderProductItem({
                id: 'local_001',
                name: 'Kynar Core Signal',
                impact: 'Protocol Link',
                cost: 'SECURED'
            });
        }
    },

    renderProductItem(item) {
        return `
            <div onclick="Artifact.open('${item.id}')" 
                 class="artifact-card p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-5 active:bg-white/10 transition-all group animate-slide-up">
                
                <div class="w-14 h-14 bg-black border border-white/10 rounded-lg flex items-center justify-center group-hover:border-cyan-400/50 transition-colors">
                    <div class="w-6 h-6 border border-white/20 rotate-45"></div>
                </div>

                <div class="flex flex-col">
                    <h3 class="font-bold uppercase text-[11px] tracking-wider text-white">${item.name}</h3>
                    <p class="text-[9px] text-gray-500 uppercase tracking-tighter mt-1">${item.impact}</p>
                </div>

                <div class="ml-auto font-bantayog text-[10px] text-cyan-400 tracking-widest bg-cyan-400/5 px-2 py-1 border border-cyan-400/20">
                    ${item.cost || 'FREE'}
                </div>
            </div>
        `;
    },

    renderLoadingState() {
        return `
            <div class="flex flex-col items-center py-20 opacity-50 scanlines">
                <div class="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-[8px] uppercase tracking-[0.4em] mt-4 text-cyan-400">Scanning Frequencies...</span>
            </div>
        `;
    },

    renderEmptyWorld() {
        return `<p class="text-center text-gray-600 py-20 text-[10px] uppercase tracking-widest">No artifacts detected in this sector.</p>`;
    },

    renderDiscoveryPrompt() {
        return `<div class="py-20 text-center animate-pulse text-[10px] uppercase tracking-[0.5em] text-gray-600">Select a world to begin</div>`;
    }
};

window.Marketplace = Marketplace;
