/* ============================================================
   KYNAR UNIVERSE - GLOBAL JAVASCRIPT
   Handles: Navigation, Side Drawer, and Marketplace Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ===== 1. SIDE DRAWER & NAVIGATION ===== */
    const burger = document.querySelector('.custom-burger');
    const drawer = document.querySelector('.side-drawer');
    const closeBtn = drawer ? drawer.querySelector('.drawer-close') : null;
    
    // Create a dim overlay behind the drawer if it doesn't exist
    let overlay = document.querySelector('.drawer-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'drawer-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
    }
    
    function openDrawer() {
        drawer.classList.add('is-open');
        overlay.classList.add('is-visible');
        document.body.classList.add('drawer-open');
        drawer.setAttribute('aria-hidden', 'false');
        burger.setAttribute('aria-expanded', 'true');
    }
    
    function closeDrawer() {
        drawer.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        document.body.classList.remove('drawer-open');
        drawer.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
    }
    
    if (burger && drawer && closeBtn) {
        // Open/close via burger
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = drawer.classList.contains('is-open');
            isOpen ? closeDrawer() : openDrawer();
        });
        
        // Close via "X" button
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDrawer();
        });
        
        // Close via overlay click
        overlay.addEventListener('click', closeDrawer);
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
                closeDrawer();
            }
        });
    }

    /* ===== 2. MARKETPLACE ENGINE (FILTERS & SORTING) ===== */
    const productContainer = document.getElementById('product-container');
    // Selects both the top Featured cards and the bottom List items
    const products = Array.from(document.querySelectorAll('.list-item, .category-card'));
    const categoryCheckboxes = document.querySelectorAll('.cat-filter');
    const priceRadios = document.querySelectorAll('input[name="price"]');
    const sortDropdown = document.querySelector('.sort-dropdown');
    const resetBtn = document.getElementById('clear-filters');

    /**
     * Filters products based on selected categories and price ranges
     */
    function filterProducts() {
        const activeCategories = Array.from(categoryCheckboxes)
            .filter(i => i.checked)
            .map(i => i.value.toLowerCase());
        
        const priceFilter = document.querySelector('input[name="price"]:checked')?.value || 'all';

        products.forEach(product => {
            const category = (product.getAttribute('data-category') || '').toLowerCase();
            const priceAttr = product.getAttribute('data-price');
            const price = priceAttr === 'FREE' ? 0 : parseFloat(priceAttr);
            
            // 1. Category Matching
            const categoryMatch = activeCategories.length === 0 || activeCategories.includes(category);
            
            // 2. Price Matching
            let priceMatch = true;
            if (priceFilter === '0') {
                priceMatch = (price === 0);
            } else if (priceFilter === 'under10') {
                priceMatch = (price > 0 && price < 10);
            } else if (priceFilter === 'over10') {
                priceMatch = (price >= 10);
            }

            // Show or Hide
            if (categoryMatch && priceMatch) {
                product.style.display = product.classList.contains('list-item') ? 'flex' : 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    /**
     * Sorts the products in the main container
     */
    function sortProducts() {
        if (!productContainer) return;

        const sortBy = sortDropdown.value;
        const sorted = [...products].sort((a, b) => {
            const priceA = a.getAttribute('data-price') === 'FREE' ? 0 : parseFloat(a.getAttribute('data-price') || 0);
            const priceB = b.getAttribute('data-price') === 'FREE' ? 0 : parseFloat(b.getAttribute('data-price') || 0);
            
            if (sortBy === 'low-high') return priceA - priceB;
            if (sortBy === 'high-low') return priceB - priceA;
            return 0; // Default: Keep original order
        });

        // Clear and re-append sorted items to the container
        sorted.forEach(p => {
            if (p.parentElement === productContainer || p.classList.contains('list-item')) {
                productContainer.appendChild(p);
            }
        });
    }

    // --- Marketplace Event Listeners ---
    if (categoryCheckboxes.length > 0) {
        categoryCheckboxes.forEach(el => el.addEventListener('change', filterProducts));
    }
    
    if (priceRadios.length > 0) {
        priceRadios.forEach(el => el.addEventListener('change', filterProducts));
    }

    if (sortDropdown) {
        sortDropdown.addEventListener('change', sortProducts);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            categoryCheckboxes.forEach(c => c.checked = false);
            const allPriceRadio = document.querySelector('input[name="price"][value="all"]');
            if (allPriceRadio) allPriceRadio.checked = true;
            filterProducts();
        });
    }

});
