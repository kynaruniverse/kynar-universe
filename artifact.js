const openArtifact = (id) => {
    const content = document.getElementById('content-area');
    
    // Technical Data for the Briefing
    const artifactData = {
        title: "Zen Architect v1.0",
        type: "Notion Template",
        impact: "+15 Efficiency",
        auraWeight: "Sage / Terra",
        description: "A digital sanctuary for organizing your homestead and wellness routines."
    };

    content.innerHTML = `
        <div class="animate-fade-in">
            <div class="h-48 w-full rounded-2xl overflow-hidden mb-6 relative border border-white/10">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800" class="object-cover w-full h-full opacity-60">
                <div class="absolute bottom-4 left-4">
                    <span class="text-xs font-mono bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-md border border-cyan-500/30">ARTIFACT DETECTED</span>
                </div>
            </div>

            <h2 class="text-2xl font-bold mb-2">${artifactData.title}</h2>
            <p class="text-gray-400 text-sm mb-6">${artifactData.description}</p>

            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="p-3 bg-white/5 rounded-lg border border-white/5">
                    <p class="text-[10px] uppercase text-gray-500 tracking-widest">Format</p>
                    <p class="text-sm font-bold text-gray-200">${artifactData.type}</p>
                </div>
                <div class="p-3 bg-white/5 rounded-lg border border-white/5">
                    <p class="text-[10px] uppercase text-gray-500 tracking-widest">Impact Score</p>
                    <p class="text-sm font-bold text-emerald-400">${artifactData.impact}</p>
                </div>
                <div class="p-3 bg-white/5 rounded-lg border border-white/5">
                    <p class="text-[10px] uppercase text-gray-500 tracking-widest">Aura Weight</p>
                    <p class="text-sm font-bold text-purple-400">${artifactData.auraWeight}</p>
                </div>
                <div class="p-3 bg-white/5 rounded-lg border border-white/5">
                    <p class="text-[10px] uppercase text-gray-500 tracking-widest">Status</p>
                    <p class="text-sm font-bold text-blue-400">Available</p>
                </div>
            </div>

            <button onclick="initAcquisition()" class="w-full py-4 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                ACQUIRE ARTIFACT
            </button>
            
            <button onclick="renderMarketplace()" class="w-full mt-4 py-2 text-gray-500 text-sm">Return to World</button>
        </div>
    `;
};

const initAcquisition = () => {
    if (window.navigator.vibrate) window.navigator.vibrate([30, 50, 30]);
    alert("Connection to Lemon Squeezy established. Proceed to secure checkout?");
    // Checkout logic and Supabase Edge Function triggers follow in next step
};
