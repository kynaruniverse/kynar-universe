window.renderIdentity = async () => {
    const content = document.getElementById('content-area');
    
    // Check for session
    const { data: { session } } = await window.kynarDB.auth.getSession();

    if (!session) {
        content.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-4 animate-fade-in">
                <div class="w-20 h-20 mb-6 rounded-full border border-white/20 flex items-center justify-center text-3xl">?</div>
                <h2 class="text-2xl font-bold mb-2 uppercase tracking-widest text-gray-400">Identity Unknown</h2>
                <p class="text-gray-500 text-sm mb-8">Establish your connection to the Unified Identity.</p>
                
                <button onclick="handleAuth()" class="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                    INITIALIZE SYNC (LOG IN)
                </button>
            </div>
        `;
    } else {
        const { data: profile } = await window.kynarDB
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        content.innerHTML = `
            <div class="animate-fade-in">
                <div class="flex items-center gap-4 mb-8">
                    <div class="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_#00ffff]"></div>
                    <div>
                        <h2 class="text-xl font-bold uppercase">${profile?.username || 'Citizen'}</h2>
                        <p class="text-xs text-gray-500 font-mono">ID: ${session.user.id.slice(0,8)}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p class="text-[10px] text-gray-500 uppercase">Aura Power</p>
                        <p class="text-xl font-bold text-cyan-400">${profile?.impact_total || 0}</p>
                    </div>
                    <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p class="text-[10px] text-gray-500 uppercase">Artifacts</p>
                        <p class="text-xl font-bold">0</p>
                    </div>
                </div>

                <button onclick="window.kynarDB.auth.signOut().then(() => location.reload())" class="w-full py-3 border border-red-500/30 text-red-400 text-xs rounded-lg">
                    DISCONNECT SESSION
                </button>
            </div>
        `;
    }
};

window.handleAuth = async () => {
    // For now, using Magic Link for zero-password friction
    const email = prompt("Enter your email to sync:");
    if (!email) return;

    const { error } = await window.kynarDB.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the Kynar access link!");
};
