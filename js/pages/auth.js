/* KYNAR AUTH ENGINE (js/pages/auth.js)
   Status: EVOLVED MASTER (CSP Compliant & Supabase Integrated)
*/

const SUPABASE_URL = 'https://wtmshxqojvafphokscze.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Ensure this matches your project key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let isLoginMode = true;

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const toggleBtn = document.getElementById('toggle-mode-btn');
    const messageBox = document.getElementById('auth-message');
    
    // 1. Toggle between Login and Signup
    toggleBtn?.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        
        document.getElementById('form-title').innerText = isLoginMode ? 'Access Inventory' : 'Create Identity';
        document.getElementById('form-desc').innerText = isLoginMode ? 'Unlock your verified digital upgrades.' : 'Begin your journey in the Kynar Universe.';
        document.getElementById('btn-text').innerText = isLoginMode ? 'Open Inventory' : 'Initialize Account';
        toggleBtn.innerText = isLoginMode ? 'Need an account?' : 'Have an account?';
        
        if (messageBox) messageBox.innerText = '';
    });

    // 2. Handle Form Submission
    authForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitBtn = document.getElementById('submit-btn');
        
        if (submitBtn) submitBtn.disabled = true;
        if (messageBox) messageBox.innerText = 'Processing request...';

        try {
            if (isLoginMode) {
                const { error } = await sb.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.href = 'collections.html';
            } else {
                const { error } = await sb.auth.signUp({ email, password });
                if (error) throw error;
                // Redirect to onboarding for new users
                window.location.href = '../onboarding/index.html';
            }
        } catch (error) {
            if (messageBox) {
                messageBox.innerText = error.message;
                messageBox.style.color = 'var(--accent-error)';
            }
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});
