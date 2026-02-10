window.worlds = [
    { id: 'world_sage', name: 'Lifestyle', color: '#71797E' },
    { id: 'world_electric', name: 'Tools', color: '#00FFFF' },
    { id: 'world_terra', name: 'Home', color: '#E2725B' }
];

window.currentWorldIndex = 1; 

window.shiftWorld = (direction) => {
    if (direction === 'next') {
        window.currentWorldIndex = (window.currentWorldIndex + 1) % window.worlds.length;
    } else {
        window.currentWorldIndex = (window.currentWorldIndex - 1 + window.worlds.length) % window.worlds.length;
    }
    
    const world = window.worlds[window.currentWorldIndex];
    document.body.className = world.id;
    document.documentElement.style.setProperty('--aura-color', world.color);
    if (window.navigator.vibrate) window.navigator.vibrate(20);
    window.renderMarketplace();
};

window.renderMarketplace = () => {
    const content = document.getElementById('content-area');
    const world = window.worlds[window.currentWorldIndex];
    
    content.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <button onclick="shiftWorld('prev')" class="p-2 text-xl">←</button>
            <h2 class="text-xl font-bold tracking-widest uppercase">${world.name}</h2>
            <button onclick="shiftWorld('next')" class="p-2 text-xl">→</button>
        </div>
        <div class="grid grid-cols-1 gap-4">
            <div class="artifact-card p-6 rounded-2xl cursor-pointer active:scale-95 transition-transform" onclick="openArtifact('zen-01')">
                <div class="h-32 bg-white/5 rounded-xl mb-4 flex items-center justify-center text-gray-500 italic overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400" class="object-cover w-full h-full opacity-40">
                </div>
                <h3 class="font-bold tracking-tight text-lg">Zen Architect v1.0</h3>
                <p class="text-xs text-cyan-400 font-mono">+15 Efficiency | Sage</p>
            </div>
        </div>
    `;
};
