const SUPABASE_URL = 'https://wtmshxqojvafphokscze.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return;
  }
  document.getElementById('user-identity').innerText = session.user.email;
  renderInventory();

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await sb.auth.signOut();
    window.location.href = 'index.html';
  });
});

function renderInventory() {
  const container = document.getElementById('inventory-container');
  const inventory = JSON.parse(localStorage.getItem('kynar_inventory') || '[]');
  
  if (inventory.length === 0) {
    container.innerHTML = `<p class="text-body">Your hub is currently empty.</p>`;
    return;
  }

  container.innerHTML = inventory.map(item => `
    <div class="card inventory-item" style="margin-bottom: 10px; padding: 15px;">
      <h3 class="text-body bold">${item.title}</h3>
      <button class="btn-secondary sm">Download</button>
    </div>
  `).join('');
}
