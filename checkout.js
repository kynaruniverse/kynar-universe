/**
 * KYNAR UNIVERSE - Checkout Logic
 * Architect: KynarForge Pro
 * Description: Order rendering, total calculation, and submission handler.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM ELEMENTS ---
    const form = document.getElementById('checkout-form');
    const emptyState = document.getElementById('checkout-empty');
    const itemsList = document.getElementById('checkout-items-list');
    const totalDisplay = document.getElementById('checkout-total-display');
    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');

    // --- 1. LOAD CART DATA ---
    // Access the raw data directly from CartSystem's storage key
    const rawData = localStorage.getItem('kynar_cart_v1');
    const cartItems = rawData ? JSON.parse(rawData) : [];

    if (cartItems.length === 0) {
        if(form) form.remove(); // Remove form to prevent confusion
        if(emptyState) emptyState.style.display = 'block';
        return;
    }

    // --- 2. RENDER UI ---
    if(form) form.style.display = 'grid'; // Reveal form
    
    // Calculate Total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    if(totalDisplay) totalDisplay.textContent = `£${total.toFixed(2)}`;

    // Render List
    if(itemsList) {
        itemsList.innerHTML = cartItems.map(item => `
            <div class="summary-item">
                <span>${item.title}</span>
                <span>£${item.price.toFixed(2)}</span>
            </div>
        `).join('');
    }

    // --- 3. AUTO-FILL (Wait for Firebase) ---
    // We check for the global authManager or listen for auth state
    // Simple approach: Check if inputs are empty after 1 sec (Auth usually fast)
    setTimeout(() => {
        import('./firebase-config.js').then(({ auth }) => {
            const user = auth.currentUser;
            if (user) {
                if(nameInput && !nameInput.value) nameInput.value = user.displayName || '';
                if(emailInput && !emailInput.value) emailInput.value = user.email || '';
            }
        });
    }, 800);

    // --- 4. HANDLE SUBMISSION ---
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            
            if(window.LoadingState) window.LoadingState.buttonStart(btn);
            
            // SIMULATE API CALL
            await new Promise(r => setTimeout(r, 2000));

            // SUCCESS
            if(window.LoadingState) window.LoadingState.buttonEnd(btn, "Order Placed!");
            
            alert(`Order Successful! \n\nA confirmation email has been sent to ${emailInput.value} with your download links.`);
            
            // Clear Cart
            localStorage.removeItem('kynar_cart_v1');
            
            // Redirect Home
            window.location.href = 'index.html';
        });
    }

    console.log("💳 Checkout System Ready");
});
