/* ══════════════════════════════════════════════════════════════════════════
   KYNAR UI CORE (V4.1 - Verified & Modular)
   ══════════════════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
    // 1. THE INJECTOR: Load components first
    loadHeader(); 
    loadFooter();
    
    // 2. THE PHYSICS: Independent systems
    initSmoothScroll();
    initRevealAnimations();
    initCustomCursor();
        initStudioHaptics();
    initNetworkPopup();
    
    // 3. PERSISTENCE: Restore session state
    syncCartBadge();
    
        // 4. SOCIAL PROOF: Initial trigger
    setTimeout(triggerActivityToast, 3000); 

        // 5. DEEP LINKING: Check for URL filters
    handleUrlFilters();
    
    // 6. PRE-LAUNCH MODE
    applyPreLaunchStatus();

    console.log("Kynar Studio: Core System Online");
});




// 0.1 FOOTER INJECTOR
async function loadFooter() {
    const footerEl = document.getElementById('global-footer');
    if (!footerEl) return;

    try {
        const response = await fetch('components/footer.html');
        if (!response.ok) throw new Error('Footer not found');
        const html = await response.text();
                footerEl.innerHTML = html;
        console.log("Kynar Studio: Footer Synchronized");

    } catch (err) {
        console.error("Footer injection failed:", err);
    }
}



// 0. COMPONENT LOADER (The Injector)
async function loadHeader() {
    const headerEl = document.getElementById('global-header');
    if (!headerEl) return;

    try {
        const response = await fetch('components/header.html');
        if (!response.ok) throw new Error('Header not found');
        const html = await response.text();
        headerEl.innerHTML = html;
        
        // 🔥 CRITICAL: These only work AFTER header is injected
        initCartBadge();
        initThemeEngine();
        initSmartHeader(); 
        
        console.log("Kynar Studio: Header Synchronized");

    } catch (err) {
        console.error("Header injection failed. Ensure 'components/header.html' exists.");
    }
}

// 1. LUXURIOUS SMOOTH SCROLL (Lenis)
function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    }
}

// 2. SMART HEADER (Hides on Scroll)
function initSmartHeader() {
    const header = document.querySelector('.app-header');
    if (!header) return;
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 80) header.classList.add('hidden');
        else header.classList.remove('hidden');
        lastScroll = currentScroll;
    }, { passive: true });
}

// 3. OBSIDIAN THEME ENGINE (Dark Mode)
function initThemeEngine() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    if (localStorage.getItem('kynar_theme') === 'dark') document.body.classList.add('dark-mode');

    toggleBtn.onclick = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('kynar_theme', isDark ? 'dark' : 'light');
        if (navigator.vibrate) navigator.vibrate(10); 
    };
}

// 5. CART BADGE ENGINE
function initCartBadge() {
    const cartBtn = document.querySelector('.cart-trigger');
    if (!cartBtn || document.querySelector('.cart-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'cart-wrapper';
    cartBtn.parentNode.insertBefore(wrapper, cartBtn);
    wrapper.appendChild(cartBtn);

    const badge = document.createElement('span');
    badge.className = 'cart-count-badge';
    // Restore count from storage
    const savedCount = localStorage.getItem('kynar_cart_count') || '0';
    badge.innerText = savedCount;
    if (parseInt(savedCount) > 0) badge.classList.add('visible');
    
    wrapper.appendChild(badge);

    document.body.addEventListener('click', (e) => {
        // Only trigger on "Acquire" or "View" buttons
        const trigger = e.target.closest('.btn-primary, .btn-ghost');
        if (trigger) {
            badge.classList.add('visible');
            let newCount = parseInt(badge.innerText) + 1;
            badge.innerText = newCount;
            localStorage.setItem('kynar_cart_count', newCount);
            if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
        }
    });
}

// Helper to keep badge synced across modular loads
function syncCartBadge() {
    const badge = document.querySelector('.cart-count-badge');
    const savedCount = localStorage.getItem('kynar_cart_count');
    if (badge && savedCount && parseInt(savedCount) > 0) {
        badge.innerText = savedCount;
        badge.classList.add('visible');
    }
}


// 6. THE NETWORK POPUP
function initNetworkPopup() {
    const path = window.location.pathname;
    const isMainPage = path === '/' || path.includes('index') || path.includes('shop');
    
    if (!isMainPage || sessionStorage.getItem('kynar_popup_seen')) return;

    setTimeout(() => {
        if (document.getElementById('networkPopup')) return;
        
        const popupHTML = `
            <div class="network-popup-overlay" id="networkPopup">
                <div class="network-popup-card">
                    <button class="close-popup">✕</button>
                    <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.25em;">Kynar Studio</span>
                    <h2 class="popup-title">Join the <br><span style="color: var(--ink-medium);">Kynar Community.</span></h2>
<p style="font-size: 1rem; margin-bottom: 30px; line-height: 1.5;">Get the latest product drops, free templates, and creative tips delivered to you.</p>

                    <form action="https://formspree.io/f/mlgekbwb" method="POST">
                        <input type="email" name="email" required placeholder="Enter your email" class="popup-input">
                        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">Join Community</button>
                    </form>
                </div>
            </div>`;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        const p = document.getElementById('networkPopup');
        p.classList.add('active');
        
        p.querySelector('.close-popup').onclick = () => {
            p.classList.remove('active');
            sessionStorage.setItem('kynar_popup_seen', 'true');
        };
    }, 6000);
}

// 7. UTILITIES
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('reveal-visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

function initCustomCursor() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = document.createElement('div'), outline = document.createElement('div');
    dot.className = 'cursor-dot'; outline.className = 'cursor-outline';
    document.body.append(dot, outline);
    window.addEventListener('mousemove', (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        outline.animate({ transform: `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)` }, { duration: 500, fill: "forwards" });
    });
}

function initStudioHaptics() {
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isMobile || !navigator.vibrate) return;
    document.body.addEventListener("touchstart", (e) => {
        if (e.target.closest('.btn-primary, .btn-ghost, .nav-icon, .filter-chip')) navigator.vibrate(5);
    }, { passive: true });
}

// --- HONEST SOCIAL PROOF ENGINE ---
const activityLog = [
    "New Product Acquired: The Finance Tracker",
    "Someone joined the Kynar Community",
    "New Product Acquired: Aura Photo Filters",
    "Essential Starter Pack Claimed",
    "New Product Acquired: The Social Suite"
];



function triggerActivityToast() {
    // Create element if it doesn't exist
    let toast = document.querySelector('.activity-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'activity-toast';
        toast.innerHTML = `
            <div class="activity-dot"></div>
            <div class="activity-text"></div>
        `;
        document.body.appendChild(toast);
    }

    const textEl = toast.querySelector('.activity-text');
    
    // Cycle through activityLog
    let index = 0;
    setInterval(() => {
        textEl.textContent = activityLog[index];
        toast.classList.add('visible');
        
        setTimeout(() => {
            toast.classList.remove('visible');
            index = (index + 1) % activityLog.length;
        }, 5000); // Show for 5 seconds

    }, 15000); // Trigger every 15 seconds
}

// --- DEEP LINK FILTERING ENGINE ---
function handleUrlFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (category) {
        // Find the matching filter button in shop.html
        const targetBtn = document.querySelector(`.filter-chip[onclick*="'${category}'"]`);
        if (targetBtn) {
            // Trigger the existing filter function
            filterGrid(category, targetBtn);
            
            // Smoothly scroll to the shop section after a short delay
            setTimeout(() => {
                const shopSection = document.getElementById('shop');
                if (shopSection) {
                    window.scrollTo({
                        top: shopSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    }
}

// Update the main DOMContentLoaded listener to include this check
// --- MOBILE MENU LOGIC ---
const menuBtn = document.querySelector('.nav-icon[aria-label="Menu"]');
const closeBtn = document.getElementById('closeMenu');
const navOverlay = document.getElementById('navOverlay');

if (menuBtn && navOverlay) {
    menuBtn.onclick = () => {
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
}

if (closeBtn && navOverlay) {
    closeBtn.onclick = () => {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
}


// --- AUTOMATIC PRE-LAUNCH SYSTEM ---
function applyPreLaunchStatus() {
    // This finds every product card on the page (Home or Shop)
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        // Automatically adds the status attribute to every card found
        card.setAttribute('data-status', 'coming-soon');
    });
    
    console.log(`Kynar Studio: ${cards.length} assets set to Arriving Soon.`);
}

// Add this line to your DOMContentLoaded listener at the top of ui-core.js
// so it runs as soon as the page loads:
// applyPreLaunchStatus();

