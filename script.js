/**
 * KYNAR UNIVERSE - Core Application Logic
 * Architect: AetherCode
 * Description: Layout controller, Marketplace filtering, and Guides logic.
 */

const KynarApp = (() => {
    
    // --- 1. STATE & CONFIG ---
    const state = {
        isDrawerOpen: false,
        searchDebounce: null,
        initialized: false
    };

    // --- 2. ACCESSIBILITY MANAGER ---
    const TrapManager = {
        activate(element) {
            if (typeof window.activateFocusTrap === 'function') {
                window.activateFocusTrap(element, 'main-ui-trap');
            }
        },
        deactivate() {
            if (typeof window.deactivateFocusTrap === 'function') {
                window.deactivateFocusTrap('main-ui-trap');
            }
        }
    };

    // --- 3. UI LAYOUT MODULE ---
    const UI = {
        elements: {
            get sideDrawer() { return document.getElementById('side-drawer'); },
            get overlay() { return document.getElementById('drawer-overlay'); },
            get authModal() { return document.getElementById('auth-modal'); }
        },

        init() {
            this.bindEvents();
            this.highlightActiveLink();
        },
        
        highlightActiveLink() {
            const path = window.location.pathname;
            const page = path.split("/").pop() || "index.html";
            
            document.querySelectorAll('.main-nav a, .drawer-list a').forEach(link => {
                const href = link.getAttribute('href');
                if (href === page) {
                    link.style.color = "var(--color-star-red)";
                    link.classList.add('active-page'); // Helper class
                } else {
                    link.style.color = ""; 
                    link.classList.remove('active-page');
                }
            });
        },

                bindEvents() {
            document.body.addEventListener('click', (e) => {
                const target = e.target;

                // A. Burger Menu (Open Drawer)
                if (target.closest('.custom-burger')) {
                    this.toggleDrawer('main');
                }
                
                // B. Close Buttons (Drawers AND Auth Modals)
                // ADDED: .auth-modal-close selector
                if (target.closest('.drawer-close') || 
                    target.closest('.drawer-close-btn') || 
                    target.closest('.auth-modal-close')) {
                    this.closeAll();
                }

                // C. Overlay Click (Close everything when clicking background)
                if (target.classList.contains('drawer-overlay') || 
                    target.classList.contains('auth-modal-backdrop') ||
                    target.classList.contains('auth-modal')) {
                    this.closeAll();
                }

                // D. Mobile Filter Toggle
                if (target.closest('.mobile-filter-btn') || target.id === 'mobile-filter-toggle') {
                    this.toggleDrawer('filter');
                }
            });

            // Global Escape Key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeAll();
            });
        },


        toggleDrawer(type) {
            const target = type === 'filter' 
                ? document.getElementById('filter-sidebar') 
                : this.elements.sideDrawer;
                
            if (!target) return;
            this.open(target);
        },

                        open(element) {
            if (!element) return;
            this.closeAll(); 
            
            // 1. Force Reset Scroll to Top (Fixes the "Cut Off" bug)
            element.scrollTop = 0;
            
            // 2. Show the Drawer
            element.classList.add('is-open');
            element.setAttribute('aria-hidden', 'false');
            
            // 3. Show Overlay & Lock Body
            this.elements.overlay?.classList.add('is-visible');
            document.body.classList.add('drawer-open');
            state.isDrawerOpen = true;
            
            // 4. Trap Focus (Slight delay ensures scroll is reset first)
            setTimeout(() => {
                if(window.activateFocusTrap) window.activateFocusTrap(element);
            }, 10);
        },


                closeAll() {
            const openUI = document.querySelectorAll('.side-drawer.is-open, .marketplace-filters.is-open, .auth-modal.is-open');
            
            openUI.forEach(el => {
                el.classList.remove('is-open');
                el.setAttribute('aria-hidden', 'true');
            });

            this.elements.overlay?.classList.remove('is-visible');
            document.body.classList.remove('drawer-open');
            
            state.isDrawerOpen = false;
            TrapManager.deactivate();
        }
    }; // Properly close the UI module

    // --- 3.5 REVEAL SYSTEM ---
    const RevealSystem = {
        init() {
            const elements = document.querySelectorAll('.reveal-on-scroll');
            if (!elements.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            elements.forEach(el => observer.observe(el));
        }
    };

        // --- 4. MARKETPLACE MODULE (With Quick View) ---
    const Marketplace = {
        get container() { return document.getElementById('product-container'); },
        get modal() { return document.getElementById('quick-view-modal'); },
        
        init() {
            if (!this.container) return; 
            this.setupFilters();
            this.parseUrlParams();
            this.filter(); 
            this.setupQuickView(); // <--- NEW TRIGGER
        },

        setupQuickView() {
            // Event Delegation: Listen for clicks on the visual part of the card
            this.container.addEventListener('click', (e) => {
                const card = e.target.closest('.list-item');
                const isBtn = e.target.closest('.js-add-to-cart');
                
                // If clicked card but NOT the add button -> Open Quick View
                if (card && !isBtn) {
                    this.openQuickView(card);
                }
            });

            // Close Logic
            if (this.modal) {
                this.modal.addEventListener('click', (e) => {
                    if (e.target.matches('.quick-view-close') || e.target.matches('.quick-view-backdrop')) {
                        this.closeQuickView();
                    }
                });
            }
        },

        openQuickView(card) {
            // 1. Harvest Data
            const data = card.dataset;
            const imgSrc = card.querySelector('.item-visual').style.backgroundImage; // Assuming dynamic bg
            const bgIndicated = card.querySelector('.item-visual').style.backgroundColor;
            const desc = card.querySelector('.item-details p').textContent;
            
            // 2. Populate UI
            const els = {
                title: document.getElementById('qv-title'),
                cat: document.getElementById('qv-category'),
                desc: document.getElementById('qv-description'),
                price: document.getElementById('qv-price'),
                visual: document.getElementById('qv-image'),
                btn: document.getElementById('qv-add-btn')
            };

            els.title.textContent = card.querySelector('h4').textContent;
            els.cat.textContent = `${data.category} • ${data.type}`;
            els.desc.textContent = desc; // In a real app, fetch full desc from ID
            els.price.textContent = card.querySelector('.item-price').textContent;
            
            // Handle Visual (Color or Image)
            els.visual.style.backgroundImage = imgSrc || 'none';
            els.visual.style.backgroundColor = bgIndicated || '#e0e0e0';

            // Setup Add Button Clone
            els.btn.onclick = () => {
                const originalBtn = card.querySelector('.js-add-to-cart');
                originalBtn.click(); // Trigger the real logic
                this.closeQuickView();
            };

            // 3. Show
            this.modal.classList.add('is-active');
            document.body.style.overflow = 'hidden'; // Lock scroll
            if(window.activateFocusTrap) window.activateFocusTrap(this.modal, 'qv-trap');
        },

        closeQuickView() {
            this.modal.classList.remove('is-active');
            document.body.style.overflow = '';
            if(window.deactivateFocusTrap) window.deactivateFocusTrap('qv-trap');
        },

                setupFilters() {
            // THE NEW FILTER UI CONTROLLER
            const filterModal = document.getElementById('filter-modal');
            
            // This selects the existing "Filters" button on your main page
            const openBtns = document.querySelectorAll('#mobile-filter-toggle, .mobile-filter-btn'); 
            
            const closeBtns = document.querySelectorAll('.filter-close-btn, .filter-backdrop, #apply-filters-btn');
            const resetBtn = document.getElementById('clear-filters-btn');

            // 1. Open Logic
            openBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (filterModal) {
                        filterModal.classList.add('is-active');
                        document.body.style.overflow = 'hidden'; // Lock background scroll
                    }
                });
            });

            // 2. Close Logic
            closeBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (filterModal) {
                        filterModal.classList.remove('is-active');
                        document.body.style.overflow = '';
                        
                        // If it was the "Show Results" button, trigger the filter
                        if (btn.id === 'apply-filters-btn') {
                            this.filter();
                        }
                    }
                });
            });

            // 3. Reset Logic
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    // Reset Checkboxes
                    document.querySelectorAll('.cat-filter').forEach(cb => cb.checked = false);
                    // Reset Radio
                    document.querySelectorAll('input[name="price"]').forEach(r => r.checked = (r.value === 'all'));
                    // Reset Sort
                    const sort = document.querySelector('.sort-dropdown');
                    if (sort) sort.value = 'newest';

                    // Apply & Close
                    this.filter();
                    filterModal.classList.remove('is-active');
                    document.body.style.overflow = '';
                });
            }
        },


        filter() {
            // ... (Keep your existing filter code here, unchanged) ...
             const products = Array.from(this.container.children).filter(el => el.classList.contains('list-item'));
            if (!products.length) return;

            const q1 = document.getElementById('global-search-input')?.value.trim().toLowerCase() || "";
            const q2 = document.getElementById('search-input')?.value.trim().toLowerCase() || "";
            const query = q2 || q1; 

            const activeCats = Array.from(document.querySelectorAll('.cat-filter:checked')).map(cb => cb.value);
            const priceFilter = document.querySelector('input[name="price"]:checked')?.value || 'all';
            const sortBy = document.querySelector('.sort-dropdown')?.value || 'newest';

            let visibleCount = 0;
            let visibleProducts = [];

            products.forEach(product => {
                const title = product.querySelector('h4')?.textContent.toLowerCase() || '';
                const cat = product.dataset.category || '';
                const price = parseFloat(product.dataset.price || 0);

                const matchesSearch = !query || title.includes(query);
                const matchesCat = activeCats.length === 0 || activeCats.includes(cat);
                
                let matchesPrice = true;
                if (priceFilter === 'under10') matchesPrice = price > 0 && price < 10;
                if (priceFilter === 'over10') matchesPrice = price >= 10;
                if (priceFilter === '0') matchesPrice = price === 0;

                if (matchesSearch && matchesCat && matchesPrice) {
                    product.style.display = 'flex';
                    visibleProducts.push(product);
                    visibleCount++;
                } else {
                    product.style.display = 'none';
                }
            });

            this.sort(visibleProducts, sortBy);
            
            const countDisplay = document.getElementById('result-count');
            const emptyState = document.getElementById('empty-state');
            
            if (countDisplay) countDisplay.textContent = `Showing ${visibleCount} creation${visibleCount !== 1 ? 's' : ''}`;
            if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        },

        sort(products, method) {
             // ... (Keep existing sort code) ...
            products.sort((a, b) => {
                const pA = parseFloat(a.dataset.price || 0), pB = parseFloat(b.dataset.price || 0);
                const dA = new Date(a.dataset.date || 0).getTime(), dB = new Date(b.dataset.date || 0).getTime();

                if (method === 'low-high') return pA - pB;
                if (method === 'high-low') return pB - pA;
                return dB - dA; 
            });

            const fragment = document.createDocumentFragment();
            products.forEach(el => fragment.appendChild(el));
            this.container.appendChild(fragment);
        },
        
        parseUrlParams() {
             // ... (Keep existing parseUrlParams code) ...
            const urlParams = new URLSearchParams(window.location.search);
            const cat = urlParams.get('category');
            if (cat) {
                const cb = document.querySelector(`.cat-filter[value="${cat}"]`);
                if (cb) cb.checked = true;
            }
            const search = urlParams.get('search');
            if (search) {
                const globalInput = document.getElementById('global-search-input');
                const pageInput = document.getElementById('search-input');
                if (globalInput) globalInput.value = search;
                if (pageInput) pageInput.value = search;
            }
        }
    };


        // --- 5. GUIDES MODULE (2026 Update) ---
    const Guides = {
        init() {
            // Updated Selector: Looks for the new Grid ID
            const grid = document.getElementById('guides-grid');
            if (!grid) return;

            const pills = document.querySelectorAll('.filter-pill'); // New Pill Class
            const searchInput = document.getElementById('guide-search'); // New Search Input
            const cards = document.querySelectorAll('.guide-tile'); // New Card Class

            // 1. Pill Filter Logic
            pills.forEach(pill => {
                pill.addEventListener('click', () => {
                    // Visual Update
                    pills.forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');

                    const category = pill.dataset.category;
                    // Filter based on BOTH category and current search text
                    this.filterGrid(cards, category, searchInput ? searchInput.value : '');
                });
            });

            // 2. Search Logic
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const activePill = document.querySelector('.filter-pill.active');
                    const category = activePill ? activePill.dataset.category : 'all';
                    this.filterGrid(cards, category, e.target.value);
                });
            }
        },

        filterGrid(cards, category, searchTerm) {
            const term = searchTerm.toLowerCase().trim();

            cards.forEach(card => {
                const cardCat = card.dataset.category;
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                
                // Check Category Match
                const catMatch = (category === 'all' || cardCat === category);
                
                // Check Search Match
                const searchMatch = !term || title.includes(term) || desc.includes(term);

                // Apply
                if (catMatch && searchMatch) {
                    card.style.display = 'flex';
                    // Optional: Retrigger reveal animation
                    if(card.classList.contains('reveal-on-scroll')) {
                        card.classList.add('is-visible');
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        }
    };


        return {
        init: () => {
            if (state.initialized) return; 
            state.initialized = true;

            UI.init();
            Marketplace.init();
            Guides.init();
            RevealSystem.init(); // <--- This line is the spark plug!
            console.log('✨ KYNAR Universe Engine Started');
                    // Update Footer Year
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        }
    };

})();

// Temporal Bridge for Marketplace Actions
window.kynarPurchases = {
    addToWishlist: (item) => {
        console.log("Added to wishlist:", item.title);
        // This will be linked to firebase-logic.js in the next phase
        alert(`${item.title} added to wishlist!`);
    }
};


// Initialize when Components are Ready
document.addEventListener('componentsLoaded', () => {
    KynarApp.init();
});

// Fallback safety (in case components load faster than script execution)
if (document.querySelector('.header-wrapper header')) {
    KynarApp.init();
}
