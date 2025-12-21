/* ============================================================
   KYNAR UNIVERSE - GLOBAL JAVASCRIPT (FIXED)
   Handles: Navigation, Side Drawer, Auth Modals, Marketplace Engine
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ===== 1. CORE ELEMENTS ===== */
    const burger = document.querySelector('.custom-burger');
    const drawer = document.querySelector('.side-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const filterSidebar = document.getElementById('filter-sidebar');
    const filterToggle = document.getElementById('mobile-filter-toggle');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    /* ===== 2. DRAWER & SIDEBAR LOGIC ===== */
    function openDrawer(element) {
        if (!element || !overlay) return;
        element.classList.add('is-open');
        element.setAttribute('aria-hidden', 'false');
        overlay.classList.add('is-visible');
        document.body.classList.add('drawer-open');
        document.body.style.overflow = 'hidden';
        
        // Update burger button aria-expanded
        if (burger && element === drawer) {
            burger.setAttribute('aria-expanded', 'true');
        }
    }
    
    function closeAllDrawers() {
        if (drawer) {
            drawer.classList.remove('is-open');
            drawer.setAttribute('aria-hidden', 'true');
        }
        if (filterSidebar) {
            filterSidebar.classList.remove('is-open');
            filterSidebar.setAttribute('aria-hidden', 'true');
        }
        if (overlay) {
            overlay.classList.remove('is-visible');
            overlay.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('drawer-open');
        document.body.style.overflow = '';
        
        // Update burger button aria-expanded
        if (burger) {
            burger.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Burger Menu click
    if (burger) {
        burger.addEventListener('click', () => openDrawer(drawer));
    }
    
    // Filter Mobile Toggle click
    if (filterToggle) {
        filterToggle.addEventListener('click', () => openDrawer(filterSidebar));
    }
    
    // Apply & Close Button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            closeAllDrawers();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Close on overlay click or X button
    if (overlay) overlay.addEventListener('click', closeAllDrawers);
    document.querySelectorAll('.drawer-close').forEach(btn => {
        btn.addEventListener('click', closeAllDrawers);
    });
    
    /* ===== 3. AUTH MODAL LOGIC ===== */
    const authTriggers = document.querySelectorAll('.sign-in-link');
    const authModal = document.querySelector('.auth-modal');
    
    if (authTriggers.length > 0 && authModal) {
        authTriggers.forEach(trigger => trigger.addEventListener('click', (e) => {
            if (!window._firebaseAuth?.currentUser) { // Only open if NOT logged in
                e.preventDefault();
                closeAllDrawers();
                authModal.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            }
        }));
    }
    
    /* ===== 4. MARKETPLACE ENGINE ===== */
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultCountText = document.getElementById('result-count');
    const emptyState = document.getElementById('empty-state');
    const sortDropdown = document.querySelector('.sort-dropdown');
    
    // Helper function to sort products
    function sortProducts(products, sortBy) {
        const productsArray = Array.from(products);
        
        switch (sortBy) {
            case 'low-high':
                return productsArray.sort((a, b) => {
                    const priceA = parseFloat(a.getAttribute('data-price')) || 0;
                    const priceB = parseFloat(b.getAttribute('data-price')) || 0;
                    return priceA - priceB;
                });
            case 'high-low':
                return productsArray.sort((a, b) => {
                    const priceA = parseFloat(a.getAttribute('data-price')) || 0;
                    const priceB = parseFloat(b.getAttribute('data-price')) || 0;
                    return priceB - priceA;
                });
            case 'newest':
            default:
                return productsArray; // Keep original order
        }
    }
    
    function runAllFilters() {
        const productContainer = document.getElementById('product-container');
        const products = document.querySelectorAll('.list-item');
        if (products.length === 0) return;
        
        const query = searchInput?.value.trim().toLowerCase() || "";
        const activeCats = Array.from(document.querySelectorAll('.cat-filter:checked')).map(cb => cb.value);
        const activeTypes = Array.from(document.querySelectorAll('.type-filter:checked')).map(cb => cb.value);
        const priceFilter = document.querySelector('input[name="price"]:checked')?.value || 'all';
        const sortBy = sortDropdown?.value || 'newest';
        
        let visibleProducts = [];
        
        products.forEach(product => {
            const title = product.querySelector('h4')?.textContent.toLowerCase() || '';
            const category = product.getAttribute('data-category') || '';
            const type = product.getAttribute('data-type') || '';
            const price = parseFloat(product.getAttribute('data-price')) || 0;
            
            const matchesSearch = !query || title.includes(query);
            const matchesCat = activeCats.length === 0 || activeCats.includes(category);
            const matchesType = activeTypes.length === 0 || activeTypes.includes(type);
            
            let matchesPrice = true;
            if (priceFilter === '0') matchesPrice = (price === 0);
            else if (priceFilter === 'under10') matchesPrice = (price > 0 && price < 10);
            else if (priceFilter === 'over10') matchesPrice = (price >= 10);
            
            if (matchesSearch && matchesCat && matchesType && matchesPrice) {
                visibleProducts.push(product);
            } else {
                product.style.display = 'none';
            }
        });
        
        // Sort visible products
        const sortedProducts = sortProducts(visibleProducts, sortBy);
        
        // Reorder in DOM and show
        sortedProducts.forEach((product, index) => {
            product.style.display = 'flex';
            product.style.order = index;
            if (productContainer) {
                productContainer.appendChild(product);
            }
        });
        
        const visibleCount = visibleProducts.length;
        
        if (resultCountText) {
            resultCountText.textContent = `Showing ${visibleCount} creation${visibleCount === 1 ? '' : 's'}`;
        }
        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }
    
    // Clear/Reset filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Uncheck all category and type filters
            document.querySelectorAll('.cat-filter, .type-filter').forEach(cb => cb.checked = false);
            
            // Reset price to "all"
            const priceAll = document.querySelector('input[name="price"][value="all"]');
            if (priceAll) priceAll.checked = true;
            
            // Reset sort to newest
            if (sortDropdown) sortDropdown.value = 'newest';
            
            // Clear search
            if (searchInput) searchInput.value = '';
            
            // Re-run filters
            runAllFilters();
        });
    }
    
    // Search Form logic
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check if we're on marketplace page
            const isMarketplace = window.location.pathname.includes('marketplace') ||
                window.location.pathname.endsWith('marketplace.html');
            
            if (!isMarketplace) {
                // Redirect to marketplace with search query
                window.location.href = `marketplace.html?search=${encodeURIComponent(searchInput.value)}`;
            } else {
                // Already on marketplace, just filter
                runAllFilters();
            }
        });
    }
    
    // Re-run filters on any change
    document.querySelectorAll('.cat-filter, .type-filter, input[name="price"]').forEach(el => {
        el.addEventListener('change', runAllFilters);
    });
    
    if (sortDropdown) {
        sortDropdown.addEventListener('change', runAllFilters);
    }
    
    // ESCAPE KEY
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDrawers();
            if (authModal) {
                authModal.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Check URL parameters on load and run initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryQuery = urlParams.get('category');
    
    if (searchQuery || categoryQuery) {
        if (searchInput && searchQuery) {
            searchInput.value = searchQuery;
        }
        
        if (categoryQuery) {
            const categoryCheckbox = document.querySelector(`.cat-filter[value="${categoryQuery}"]`);
            if (categoryCheckbox) categoryCheckbox.checked = true;
        }
    }
    
    // Run filters on initial load (for marketplace page)
    if (document.getElementById('product-container')) {
        runAllFilters();
    }
});