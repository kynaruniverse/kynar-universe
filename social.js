// social.js - The Global Social Square & Identity Sync Feed
export const Social = {
    feedData: [],

    async init() {
        await this.fetchPosts();
        this.render();
    },

    async fetchPosts() {
        try {
            const { data, error } = await window.kynarDB
                .from('social_feed')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;
            this.feedData = data || [];
        } catch (err) {
            console.warn("Kynar Social: Database offline. Using local buffer.");
            // Fallback to internal cache if offline
        }
    },

    render() {
        const stage = document.getElementById('main-stage');
        if (!stage) return;

        const profile = JSON.parse(localStorage.getItem('kynar_profile')) || { username: '?' };

        stage.innerHTML = `
            <div class="animate-fade-in pb-40">
                <div class="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 p-4">
                    <div class="flex items-center gap-4 max-w-lg mx-auto">
                        <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white font-bantayog text-lg">
                            ${profile.username[0].toUpperCase()}
                        </div>
                        <div class="flex-grow relative">
                            <input type="text" id="post-input" maxlength="140"
                                placeholder="Broadcast to the Square..." 
                                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-gray-600">
                        </div>
                        <button onclick="Social.broadcast()" class="bg-white text-black p-3 rounded-xl active:scale-90 transition-transform">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>

                <div class="p-6 max-w-lg mx-auto">
                    <header class="mb-10">
                        <span class="text-[9px] tracking-[0.5em] text-cyan-400 uppercase font-bold">Live Frequency</span>
                        <h1 class="text-4xl font-bantayog tracking-tighter text-white mt-1 uppercase">Square</h1>
                    </header>

                    <div id="social-feed" class="space-y-8">
                        ${this.feedData.length > 0 ? 
                            this.feedData.map(post => this.renderPost(post)).join('') : 
                            this.renderEmptyFeed()}
                    </div>
                </div>
            </div>
        `;
    },

    renderPost(post) {
        // Logic to determine theme based on the world associated with the post
        const worldKey = post.world_id || 'world_sage';
        const config = window.Worlds ? window.Worlds[worldKey] : { primary: '#ffffff' };
        
        return `
            <div class="relative p-6 kynar-card border-l-4 group animate-slide-up" 
                 style="border-left-color: ${config.primary};">
                
                <div class="flex justify-between items-start mb-4">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-[11px] font-bold font-bantayog tracking-wider text-white uppercase">${post.username}</span>
                            <span class="w-1 h-1 rounded-full bg-gray-700"></span>
                            <span class="text-[10px] text-gray-500 font-mono">${this.formatTime(post.created_at)}</span>
                        </div>
                        <span class="text-[8px] uppercase tracking-[0.2em] text-gray-500 mt-1">${post.rank || 'The Pioneer'}</span>
                    </div>
                    <div class="w-2 h-2 rounded-full animate-pulse" style="background: ${config.primary}; box-shadow: 0 0 8px ${config.primary}"></div>
                </div>

                <p class="text-sm text-gray-300 leading-relaxed mb-5 font-['Glacial_Indifference']">
                    ${post.content}
                </p>

                <div class="flex items-center gap-6 pt-4 border-t border-white/5">
                    <button onclick="Social.likePost('${post.id}')" class="flex items-center gap-2 text-[9px] uppercase tracking-widest text-gray-500 hover:text-cyan-400 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        <span>${post.likes || 0}</span>
                    </button>
                </div>
            </div>
        `;
    },

    async broadcast() {
        const input = document.getElementById('post-input');
        if (!input || !input.value.trim()) return;

        const profile = JSON.parse(localStorage.getItem('kynar_profile'));
        if (!profile) return alert("Protocol: Identity Required to Broadcast.");

        const activeWorld = window.Marketplace ? window.Marketplace.activeWorld : 'world_sage';

        const broadcastPayload = {
            username: profile.username,
            rank: profile.rank,
            content: input.value.trim(),
            world_id: activeWorld,
            created_at: new Date().toISOString()
        };

        if (window.navigator.vibrate) window.navigator.vibrate(20);

        try {
            const { error } = await window.kynarDB.from('social_feed').insert([broadcastPayload]);
            if (error) throw error;
            
            input.value = '';
            await this.init(); // Refresh feed
        } catch (err) {
            console.error("Broadcast Failure:", err);
            // Local fallback for UI continuity
            this.feedData.unshift(broadcastPayload);
            this.render();
        }
    },

    async likePost(postId) {
        if (window.navigator.vibrate) window.navigator.vibrate(10);
        // Database logic for likes would go here
        console.log(`Echoed Signal: ${postId}`);
    },

    formatTime(timestamp) {
        if (!timestamp) return 'Now';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    renderEmptyFeed() {
        return `
            <div class="py-20 text-center opacity-20">
                <div class="w-10 h-10 border border-white/20 rotate-45 mx-auto mb-6"></div>
                <p class="text-[10px] uppercase tracking-[0.5em]">Silence in the Square</p>
            </div>
        `;
    }
};

window.Social = Social;
