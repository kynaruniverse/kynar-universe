/* ============================================================
   KYNAR UNIVERSE - GLOBAL JAVASCRIPT
   Handles: Navigation, Side Drawer, Marketplace Filters, and Search
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ===== 1. SIDE DRAWER & NAVIGATION ===== */
    const burger = document.querySelector('.custom-burger');
    const drawer = document.querySelector('.side-drawer');
    const closeBtn = drawer ? drawer.querySelector('.drawer-close') : null;
    const overlay = document.querySelector('.drawer-overlay');
    
    function openDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.add('is-open');
        overlay.classList.add('is-visible');
        document.body.classList.add('drawer-open');
        drawer.setAttribute('aria-hidden', 'false');
        burger.setAttribute('aria-expanded', 'true');
    }
    
    function closeDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        document.body.classList.remove('drawer-open');
        drawer.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
    }
    
    if (burger && drawer && closeBtn && overlay) {
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
    
    /* ===== 2. SEARCH FUNCTIONALITY (GLOBAL) ===== */
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            
            if (!query) return;
            
            // If on marketplace page, filter products
            if (window.location.pathname.includes('marketplace')) {
                filterBySearch(query);
            } else {
                // Redirect to marketplace with search query
                window.location.href = `marketplace.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Search filter function for marketplace
    function filterBySearch(query) {
        const products = document.querySelectorAll('.list-item');
        let visibleCount = 0;
        
        products.forEach(product => {
            const title = product.querySelector('h4')?.textContent.toLowerCase() || '';
            const description = product.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (title.includes(query) || description.includes(query)) {
                product.style.display = 'flex';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });
        
        // Show "no results" message if needed
        showNoResultsMessage(visibleCount);
    }
    
    function showNoResultsMessage(count) {
        const container = document.getElementById('product-container');
        if (!container) return;
        
        let noResultsMsg = document.getElementById('no-results-message');
        
        if (count === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.style.cssText = 'text-align: center; padding: 40px 20px; font-family: "Glacial Indifference", sans-serif; color: rgba(17,17,17,0.7);';
                noResultsMsg.innerHTML = '<p style="font-size: 18px; margin-bottom: 10px;">No products found</p><p style="font-size: 14px;">Try adjusting your filters or search terms</p>';
                container.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Check for search query in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        filterBySearch(searchQuery);
    }
    
    /* ===== 3. MARKETPLACE ENGINE (FILTERS & SORTING) ===== */
    const productContainer = document.getElementById('product-container');
    // ONLY select .list-item (not .category-card)
    const products = Array.from(document.querySelectorAll('.list-item'));
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
        let visibleCount = 0;
        
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
                product.style.display = 'flex';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });
        
        showNoResultsMessage(visibleCount);
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
            productContainer.appendChild(p);
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
            if (searchInput) searchInput.value = '';
            
            // Clear URL search params
            if (window.location.search) {
                window.history.replaceState({}, '', window.location.pathname);
            }
            
            filterProducts();
        });
    }
    
    // Auto-filter by category from URL (from homepage links)
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const matchingCheckbox = document.querySelector(`.cat-filter[value="${categoryParam}"]`);
        if (matchingCheckbox) {
            matchingCheckbox.checked = true;
            filterProducts();
        }
    }
    
});