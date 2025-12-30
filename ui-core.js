/* ══════════════════════════════════════════════════════════════════════════
   KYNAR UI CORE (V3.5)
   Fixes: Path Detection, Menu Logic, and Cart Synchronization
   ══════════════════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initSmartHeader();
    initCustomCursor();
    initRevealAnimations();
    initAtelierHaptics();
    initMenuEngine();
    initCartBadge();
    initNetworkPopup();
    console.log("Kynar Atelier: System Fully Calibrated");
});

// 1. LUXURIOUS SMOOTH SCROLL (Lenis)
function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureDirection: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
}

// 2. SMART HEADER (Hides on Scroll Down, Shows on Up)
function initSmartHeader() {
    const header = document.querySelector('.app-header');
    if (!header) return;
    
    let lastScroll = 0;
    const threshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            return;
        }
        if (currentScroll > lastScroll && currentScroll > threshold) {
            header.classList.add('hidden');
        } else if (currentScroll < lastScroll) {
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });
}

// 3. MAGNETIC CURSOR (Desktop Only)
function initCustomCursor() {
    if (window.matchMedia("(pointer: fine)").matches) {
        const dot = document.createElement('div');
        const outline = document.createElement('div');
        dot.className = 'cursor-dot';
        outline.className = 'cursor-outline';
        document.body.appendChild(dot);
        document.body.appendChild(outline);

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            dot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
            outline.animate({
                transform: `translate(${posX}px, ${posY}px) translate(-50%, -50%)`
            }, { duration: 500, fill: "forwards" });
        });
    }
}

// 4. SCROLL REVEAL (Elements float in)
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

// 5. ATELIER TACTILE ENGINE (Vibration Feedback)
function initAtelierHaptics() {
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isMobile || !navigator.vibrate) return;

    const atelierTargets = [
        '.btn-primary', 
        '.btn-ghost', 
        '.product-card', 
        '.nav-icon', 
        '.filter-chip',
        '.nav-menu-link'
    ];

    document.body.addEventListener("touchstart", (e) => {
        if (e.target.closest(atelierTargets.join(","))) {
            navigator.vibrate(5); 
        }
    }, { passive: true });
}

// 6. GLOBAL MENU ENGINE
function initMenuEngine() {
    if (!document.querySelector('.nav-overlay')) {
        const menuHTML = `
            <div class="nav-overlay">
                <button class="close-menu nav-icon" aria-label="Close Menu">✕</button>
                <ul class="nav-menu-list">
                    <li class="nav-menu-item" style="--i:1"><a href="index.html" class="nav-menu-link">Home</a></li>
                    <li class="nav-menu-item" style="--i:2"><a href="shop.html" class="nav-menu-link">Collection</a></li>
                    <li class="nav-menu-item" style="--i:3"><a href="newsletter.html" class="nav-menu-link">Network</a></li>
                    <li class="nav-menu-item" style="--i:4"><a href="contact.html" class="nav-menu-link">Concierge</a></li>
                </ul>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', menuHTML);
    }

    const burgerBtn = document.querySelector('.nav-icon[aria-label="Menu"]');
    const overlay = document.querySelector('.nav-overlay');
    const closeBtn = document.querySelector('.close-menu');

    if (burgerBtn && overlay) {
        burgerBtn.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    }

    document.querySelectorAll('.nav-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// 7. CART BADGE ENGINE
function initCartBadge() {
    const cartBtn = document.querySelector('.nav-icon.cart-trigger') || document.querySelector('.nav-icon[aria-label="Cart"]');
    if (!cartBtn) return;

    // Check if wrapper already exists to prevent duplication
    if (document.querySelector('.cart-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'cart-wrapper';
    cartBtn.parentNode.insertBefore(wrapper, cartBtn);
    wrapper.appendChild(cartBtn);

    const badge = document.createElement('span');
    badge.className = 'cart-count-badge';
    badge.innerText = '0';
    wrapper.appendChild(badge);

    // Click listener for badge feedback
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('.btn-primary, .btn-ghost, .product-card');
        if (target) {
            // If it's the "Acquire Asset" button, we increment. 
            // If it's a "View" button, we show the badge but keep count at 1 for visual interest
            badge.classList.add('visible');
            let current = parseInt(badge.innerText);
            badge.innerText = current + 1;
            
            if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
        }
    });
}

// 8. THE NETWORK POPUP ENGINE
function initNetworkPopup() {
    const path = window.location.pathname;
    // Fix: Allow for root domain, index, and shop paths
    const isMainPage = path === '/' || path.includes('index') || path.includes('shop');
    
    if (!isMainPage || sessionStorage.getItem('kynar_popup_seen')) return;

    const popupHTML = `
        <div class="network-popup-overlay" id="networkPopup">
            <div class="network-popup-card">
                <button class="close-popup" aria-label="Dismiss">✕</button>
                <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.25em;">The Network</span>
                <h2 class="popup-title">Acquire <br><span style="color: var(--ink-medium);">Fresh Coordinates.</span></h2>
                <p style="font-size: 1rem; margin-bottom: 30px; line-height: 1.5;">
                    Join the inner circle for weekly archive transmissions and system updates.
                </p>
                <form action="https://formspree.io/f/mlgekbwb" method="POST">
                    <input type="email" name="email" required placeholder="Enter your email" class="popup-input">
                    <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">Authorize Access</button>
                </form>
                <p style="margin-top: 20px; font-size: 0.75rem; opacity: 0.4; font-weight: 600;">
                    NO SPAM. ZERO FRICTION. ONE CLICK OPT-OUT.
                </p>
            </div>
        </div>
    `;

    setTimeout(() => {
        if (document.getElementById('networkPopup')) return;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        const popup = document.getElementById('networkPopup');
        const closeBtn = popup.querySelector('.close-popup');

        if (popup) {
            popup.classList.add('active');
            closeBtn.onclick = () => {
                popup.classList.remove('active');
                sessionStorage.setItem('kynar_popup_seen', 'true');
            };
        }
    }, 6000); 
}
