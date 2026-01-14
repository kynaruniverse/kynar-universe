/* KYNAR AUTH ENGINE (js/pages/auth.js)
   Status: EVOLVED MASTER
*/
const SUPABASE_URL = 'https://wtmshxqojvafphokscze.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_KEY_HERE';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let isLoginMode = true;

// UI Elements
const els = {
  form: document.getElementById('auth-form'),
  title: document.getElementById('form-title'),
  btnText: document.getElementById('btn-text'),
  toggle: document.getElementById('toggle-mode-btn'),
  message: document.getElementById('auth-message')
};

// Check Session on Load
(async () => {
  const { data: { session } } = await sb.auth.getSession();
  if (session) window.location.href = 'collections.html';
})();

// Toggle Logic
els.toggle.onclick = () => {
  isLoginMode = !isLoginMode;
  els.title.innerText = isLoginMode ? 'Access Inventory' : 'Join the Universe';
  els.btnText.innerText = isLoginMode ? 'Open Inventory' : 'Create Account';
  els.toggle.innerText = isLoginMode ? 'Need an account?' : 'Already have an account?';
};

// Form Submission
els.form.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const { data, error } = isLoginMode 
      ? await sb.auth.signInWithPassword({ email, password })
      : await sb.auth.signUp({ email, password });

    if (error) throw error;
    if (data.user && !data.session) {
      if (window.showToast) window.showToast('Verification email sent!', 'success');
    } else {
      window.location.href = 'collections.html';
    }
  } catch (err) {
    els.message.innerText = err.message;
    if (window.showToast) window.showToast(err.message, 'error');
  }
};
