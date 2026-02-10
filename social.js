// social.js - The Global Social Square & Identity Sync Feed
const Social = {
    feedData: [
        { id: 1, user: "Kynar_Master", rank: "Founder", text: "The first portal has been stabilized. Welcome to the Square.", world: "world_electric", time: "2m", artifact: null },
        { id: 2, user: "Nexus_Traveler", rank: "Pioneer", text: "Just secured a Neural Scanner for my homestead. The efficiency gains are real.", world: "world_sage", time: "15m", artifact: { name: "Neural Scanner", id: "art_001" } }
    ],

    init() {
        this.render();
    },

    render() {
        const stage = document.getElementById('main-stage');
        stage.innerHTML = `
            <div class="animate-fade-in pb-32">
                <div class="sticky top-0 z-30 bg-black/80 kynar-glass border-b border-white/10 p-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full border border-cyan-400/30 flex items-center justify-center bg-cyan-400/5 text-cyan-400 font-bold">
                            ${JSON.parse(localStorage.getItem('kynar_profile'))?.username[0] || '?'}
                        </div>
                        <input type="text" id="post-input" placeholder="Broadcast to the Universe..." 
                            class="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-cyan-400 transition-all text-white">
                        <button onclick="Social.broadcast()" class="text-cyan-400 p-2 active:scale-90 transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </button>
                    </div>
                </div>

                <div class="p-6 space-y-6">
                    <header class="mb-4">
                        <h1 class="text-4xl font-['Bantayog'] tracking-tighter text-white">SQUARE</h1>
                        <p class="text-[10px] text-cyan-400 uppercase tracking-widest">Real-time Identity Stream</p>
                    </header>

                    <div id="social-feed" class="space-y-6">
                        ${this.feedData.map(post => this.renderPost(post)).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    renderPost(post) {
        const config = Worlds[post.world];
        return `
            <div class="relative p-5 bg-white/5 border-l-2 rounded-r-xl transition-all" 
                 style="border-color: ${config.primary}; background: linear-gradient(90deg, ${config.primary}11, transparent);">
                
                <div class="flex justify-between items-start mb-3">
                    <div class="flex flex-col">
                        <span class="text-xs font-bold font-['Bantayog'] tracking-wider text-white">${post.user}</span>
                        <span class="text-[8px] uppercase px-1.5 py-0.5 border border-white/10 rounded-sm w-fit mt-1" 
                              style="color: ${config.primary}; border-color: ${config.primary}44;">
                            ${post.rank}
                        </span>
                    </div>
                    <span class="text-[9px] text-gray-600 font-mono">${post.time}</span>
                </div>

                <p class="text-sm text-gray-300 font-['Glacial_Indifference'] leading-relaxed mb-4">
                    ${post.text}
                </p>

                ${post.artifact ? `
                    <div class="mb-4 p-3 border border-white/10 bg-black/40 rounded-lg flex items-center gap-3 active:scale-95 transition-transform" onclick="Artifact.open('${post.artifact.id}')">
                        <div class="w-8 h-8 border border-cyan-400/50 rotate-45 bg-cyan-400/10"></div>
                        <div class="flex flex-col">
                            <span class="text-[8px] text-gray-500 uppercase">Artifact Attached</span>
                            <span class="text-[10px] font-bold text-white uppercase">${post.artifact.name}</span>
                        </div>
                    </div>
                ` : ''}

                <div class="flex gap-6">
                    <button class="flex items-center gap-1.5 text-[10px] uppercase tracking-tighter text-gray-500 active:text-cyan-400 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        Likes
                    </button>
                    <button class="flex items-center gap-1.5 text-[10px] uppercase tracking-tighter text-gray-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4m-11 6l-4-4 4-4"/><path d="M3 5h14a4 4 0 0 1 4 4v1m-18 6h14a4 4 0 0 0 4-4v-1"/></svg>
                        Echo
                    </button>
                </div>
            </div>
        `;
    },

    broadcast() {
        const input = document.getElementById('post-input');
        if (!input.value) return;

        const profile = JSON.parse(localStorage.getItem('kynar_profile')) || { username: "Citizen", rank: "The Pioneer" };
        
        const newPost = {
            id: Date.now(),
            user: profile.username,
            rank: profile.rank,
            text: input.value,
            world: "world_sage", // Default to Sage (Lifestyle)
            time: "Now",
            artifact: null
        };

        this.feedData.unshift(newPost);
        input.value = '';
        this.render();
    }
};
