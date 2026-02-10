const worlds = [
    { id: 'world_sage', name: 'Lifestyle', color: '#71797E' },
    { id: 'world_electric', name: 'Tools', color: '#00FFFF' },
    { id: 'world_terra', name: 'Home', color: '#E2725B' }
];

let currentWorldIndex = 1; // Default to Electric

const shiftWorld = (direction) => {
    if (direction === 'next') {
        currentWorldIndex = (currentWorldIndex + 1) % worlds.length;
    } else {
        currentWorldIndex = (currentWorldIndex - 1 + worlds.length) % worlds.length;
    }
    
    const world = worlds[currentWorldIndex];
    
    // Apply Theme to Body
    document.body.className = world.id;
    
    // Update CSS Variable for the Orb
    document.documentElement.style.setProperty('--aura-color', world.color);
    
    // Haptic Feedback
    if (window.navigator.vibrate) window.navigator.vibrate(20);
    
    renderMarketplace();
};

const renderMarketplace = () => {
    const content = document.getElementById('content-area');
    const world = worlds[currentWorldIndex];
    
    content.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <button onclick="shiftWorld('prev')" class="p-2">←</button>
            <h2 class="text-xl font-bold tracking-widest uppercase">${world.name}</h2>
            <button onclick="shiftWorld('next')" class="p-2">→</button>
        </div>
        <div class="grid grid-cols-1 gap-4">
            <div class="artifact-card p-6 rounded-2xl cursor-pointer active:opacity-80" onclick="openArtifact('zen-01')">
                <div class="h-32 bg-white/5 rounded-xl mb-4 flex items-center justify-center text-gray-500 italic overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400" class="object-cover w-full h-full opacity-40">
                </div>
                <h3 class="font-bold tracking-tight text-lg">Zen Architect v1.0</h3>
                <p class="text-xs text-cyan-400 font-mono">+15 Efficiency | Sage</p>
            </div>
        </div>
    `;
};
