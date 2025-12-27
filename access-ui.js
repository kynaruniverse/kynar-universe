/**
 * QUIET FORGE ACCESS LOGIC
 * Role: Handle Auth Overlay, Login States, and UI Toggles
 */

const AccessSystem = (() => {

    const DOM = {
        overlay: null, // assigned on init
        block: null,
        triggers: null,
        closeBtn: null,
        toggleBtn: null,
        loginForm: null,
        regForm: null,
        title: null
    };

    let isRegisterMode = false;

    // --- 1. INITIALIZATION ---
    function init() {
        // Wait for component injection
        setTimeout(() => {
            bindElements();
            setupListeners();
            checkAuthState();
        }, 500);
        
        console.log('Quiet Forge Access: Standing By');
    }

    function bindElements() {
        DOM.overlay = document.getElementById('access-overlay');
        if (!DOM.overlay) return;

        DOM.block = DOM.overlay.querySelector('.stone-block');
        DOM.triggers = document.querySelectorAll('.trigger-access'); // Any button can trigger login
        DOM.closeBtn = document.getElementById('close-access');
        DOM.toggleBtn = document.getElementById('toggle-access-mode');
        DOM.loginForm = document.getElementById('login-form');
        DOM.regForm = document.getElementById('register-form');
        DOM.title = document.getElementById('access-title');
    }

    // --- 2. EVENT LISTENERS ---
    function setupListeners() {
        if (!DOM.overlay) return;

        // Open
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.trigger-access') || e.target.closest('[href="identity.html"]')) {
                // If user is NOT logged in, intercept the click
                const isLoggedIn = localStorage.getItem('kynar_user_token');
                if (!isLoggedIn && e.target.closest('[href="identity.html"]')) {
                    e.preventDefault();
                    openGate();
                } else if (e.target.closest('.trigger-access')) {
                    e.preventDefault();
                    openGate();
                }
            }
        });

        // Close
        DOM.closeBtn.addEventListener('click', closeGate);
        DOM.overlay.addEventListener('click', (e) => {
            if (e.target === DOM.overlay) closeGate();
        });

        // Toggle Mode
        DOM.toggleBtn.addEventListener('click', toggleMode);

        // Forms (Mock Submission)
        DOM.loginForm.addEventListener('submit', (e) => handleAuth(e, 'login'));
        DOM.regForm.addEventListener('submit', (e) => handleAuth(e, 'register'));
        
        // Logout Logic
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
    }

    // --- 3. UI LOGIC (The Gate) ---
    function openGate() {
        DOM.overlay.style.visibility = 'visible';
        DOM.overlay.style.opacity = '1';
        DOM.overlay.style.pointerEvents = 'all';
        DOM.block.style.transform = 'translateY(0)';
    }

    function closeGate() {
        DOM.overlay.style.opacity = '0';
        DOM.overlay.style.pointerEvents = 'none';
        DOM.block.style.transform = 'translateY(20px)';
        setTimeout(() => {
            DOM.overlay.style.visibility = 'hidden';
        }, 400);
    }

    function toggleMode() {
        isRegisterMode = !isRegisterMode;
        
        if (isRegisterMode) {
            DOM.loginForm.style.display = 'none';
            DOM.regForm.style.display = 'block';
            DOM.title.textContent = 'Create Identity';
            DOM.toggleBtn.textContent = 'Already have an identity? Connect here.';
        } else {
            DOM.loginForm.style.display = 'block';
            DOM.regForm.style.display = 'none';
            DOM.title.textContent = 'Access Identity';
            DOM.toggleBtn.textContent = 'Need an identity? Register here.';
        }
    }

    // --- 4. AUTH LOGIC (Mock Implementation) ---
    function handleAuth(e, type) {
        e.preventDefault();
        
        // Simulate Processing
        const btn = e.target.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        
        setTimeout(() => {
                        // Mock Success
            const user = { name: type === 'login' ? 'Traveler' : 'New Soul' };
            
            // SAVE TOKENS
            localStorage.setItem('kynar_user_token', JSON.stringify(user));
            localStorage.setItem('kynar_signal_token', 'active'); // Unlocks free downloads
            
            if (window.Haptics) window.Haptics.success();

            btn.textContent = originalText;

            closeGate();
            updateIdentityPage(user);
            
            // Redirect if on identity page logic
            if (window.location.pathname.includes('identity.html')) {
                location.reload();
            }
        }, 1000);
    }

    function doLogout() {
        localStorage.removeItem('kynar_user_token');
        location.reload();
    }

    function checkAuthState() {
        const token = localStorage.getItem('kynar_user_token');
        if (token) {
            updateIdentityPage(JSON.parse(token));
        }
    }

    function updateIdentityPage(user) {
        const greeting = document.getElementById('user-greeting');
        const guestState = document.getElementById('state-guest');
        const userState = document.getElementById('state-user');
        const actions = document.getElementById('identity-actions');

        if (greeting && user) {
            greeting.textContent = user.name || 'Traveler';
            if (guestState) guestState.style.display = 'none';
            if (userState) userState.style.display = 'block';
            if (actions) actions.style.display = 'block';
        }
    }

    return { init };

})();

document.addEventListener('DOMContentLoaded', AccessSystem.init);
