window.renderIdentity = async () => {
    console.log("Accessing Identity Hub...");
    const content = document.getElementById('content-area');
    
    // Check if Supabase is connected
    if (!window.kynarDB) {
        content.innerHTML = `<p class="text-red-500 p-4 font-mono text-xs">Error: Kynar Intelligence (Supabase) not connected.</p>`;
        return;
    }

    const { data: { session } } = await window.kynarDB.auth.getSession();

    // 1. STATE: LOGGED OUT
    if (!session) {
        content.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-4 animate-fade-in">
                <div class="w-20 h-20 mb-6 rounded-full border border-white/20 flex items-center justify-center text-3xl">?</div>
                <h2 class="text-2xl font-bold mb-2 uppercase tracking-widest text-gray-400">Identity Unknown</h2>
                <p class="text-gray-500 text-sm mb-8">Establish your connection to the Unified Identity.</p>
                <button onclick="handleAuth()" class="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl active:scale-95 transition-transform">
                    INITIALIZE SYNC (LOG IN)
                </button>
            </div>
        `;
    } else {
        // 2. STATE: LOGGED IN - Fetching Profile Data
        let { data: profile, error } = await window.kynarDB
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        // 3. STATE: LOGGED IN BUT NO PROFILE (NEW CITIZEN)
        if (!profile) {
            content.innerHTML = `
                <div class="animate-fade-in p-4 text-center h-full flex flex-col justify-center">
                    <h2 class="text-xl font-bold mb-4 uppercase tracking-tighter text-cyan-400">First Sync Detected</h2>
                    <p class="text-xs text-gray-500 mb-6">Claim your unique handle in the Kynar Universe to proceed.</p>
                    
                    <input id="new-username" type="text" maxlength="15" placeholder="Citizen Name" 
                        class="w-full bg-white/5 border border-white/20 p-4 rounded-xl mb-4 text-center outline-none focus:border-cyan-500 font-bold tracking-widest">
                    
                    <button onclick="initializeProfile('${session.user.id}')" 
                        class="w-full py-4 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        ESTABLISH IDENTITY
                    </button>
                </div>
            `;
            return;
        }

        // 4. STATE: LOGGED IN & ESTABLISHED
        content.innerHTML = `
            <div class="animate-fade-in">
                <div class="flex items-center gap-4 mb-8">
                    <div class="w-16 h-16 rounded-full border-2 shadow-[0_0_15px_var(--aura-color)]" 
                         style="border-color: ${profile.aura_color}; --aura-color: ${profile.aura_color}"></div>
                    <div>
                        <h2 class="text-xl font-bold uppercase tracking-tight">${profile.username}</h2>
                        <p class="text-[10px] text-gray-500 font-mono italic tracking-widest">AURA SYNCED</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Impact Score</p>
                        <p class="text-xl font-bold text-cyan-400">${profile.impact_total || 0}</p>
                    </div>
                    <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Vault Size</p>
                        <p class="text-xl font-bold">0 Items</p>
                    </div>
                </div>

                <div class="mb-8 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
                    <p class="text-[10px] text-cyan-400 uppercase font-mono mb-2">System Status</p>
                    <p class="text-xs text-gray-400 italic">"Identity persistent across all Worlds. Connection stable."</p>
                </div>

                <button onclick="window.kynarDB.auth.signOut().then(() => location.reload())" 
                    class="w-full py-3 border border-red-500/30 text-red-400 text-xs rounded-lg active:bg-red-500/10 transition-colors">
                    DISCONNECT SESSION
                </button>
            </div>
        `;
    }
};

// Global Handler for Magic Link
window.handleAuth = async () => {
    const email = prompt("Enter your email to sync:");
    if (!email) return;
    const { error } = await window.kynarDB.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the Kynar access link!");
};

// Global Handler for Profile Creation
window.initializeProfile = async (userId) => {
    const usernameInput = document.getElementById('new-username');
    const username = usernameInput.value.trim();
    
    if (!username || username.length < 3) {
        alert("Identity Handle must be at least 3 characters.");
        return;
    }

    const { error } = await window.kynarDB
        .from('profiles')
        .insert([{ 
            id: userId, 
            username: username, 
            aura_color: '#00ffff', 
            impact_total: 0 
        }]);

    if (error) {
        console.error(error);
        alert("Handle is already claimed or system error. Try another.");
    } else {
        window.renderIdentity();
    }
};
