/* js/main.js - KYNAR UNIVERSE CORE V2.7 (Unified Handshake & Dynamic Logic) */
const KynarApp = {
    async init() {
        // 1. CRITICAL: Load Shell Components First
        await this.Layout.loadShell();
        
        // 2. UI CORE (Sequenced to run AFTER shell is injected)
        this.UI.initHeaderTracking();
        this.UI.initMobileMenu(); 
        this.UI.initThemeToggle(); 
        this.UI.initFilterChips();
        this.UI.initCopyright(); 
        this.UI.initCookieBanner(); 
        this.UI.highlightCurrentPage();
        this.Commerce.initLemonSqueezy();
        
        // 3. UTILS & DYNAMIC MODULES
        this.Utils.initCodeCopy(); 
        this.Utils.initSearch();
        this.Utils.handleRecentProducts();
        this.Utils.handleNewsletter();
        this.Utils.handleFilters();
        this.Utils.loadProductTemplate(); // Restoration of full logic

        // 4. KINETIC PHYSICS ENGINE
        this.Utils.initKineticVitro(); 
        this.Utils.initImagePulse();   

        // 5. PWA & SECURE HANDSHAKE
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .then(() => {
                    console.log('Vitro SW: Online');
                    this.Utils.checkSecureStatus();
                })
                .catch(err => console.warn('Vitro SW: Offline', err));
        }

        // Final Layout Sync
        window.addEventListener('load', () => this.UI.updateHeaderHeight());
    },

    Layout: {
        async loadShell() {
            try {
                // Parallel fetch for speed
                const [navHtml, footerHtml] = await Promise.all([
                    fetch('nav-content.html').then(r => r.text()),
                    fetch('footer-content.html').then(r => r.text())
                ]);
                
                const menuContainer = document.getElementById('mobile-menu');
                const footerContainer = document.getElementById('global-footer');
                
                if (menuContainer) menuContainer.innerHTML = navHtml;
                if (footerContainer) footerContainer.innerHTML = footerHtml;
                
                return true;
            } catch (e) { 
                console.error("Critical Layout Failure:", e); 
                return false;
            }
        }
    },

    UI: {
        initHeaderTracking() {
            const h = document.getElementById('global-header');
            if (!h) return;
            const update = () => {
                document.documentElement.style.setProperty('--header-height', h.offsetHeight + 'px');
            };
            // ResizeObserver is more efficient than the resize event
            const ro = new ResizeObserver(update);
            ro.observe(h);
            update();
        },

        initMobileMenu() {
            // Target toggles in the header and the new injected nav
            const btns = document.querySelectorAll('.menu-toggle:not(#theme-toggle)');
            const menu = document.getElementById('mobile-menu');
            if (!btns.length || !menu) return;

            const close = () => {
                menu.classList.remove('is-active');
                document.body.classList.remove('is-scroll-locked');
                btns.forEach(b => b.setAttribute('aria-expanded', 'false'));
            };
            const open = () => {
                menu.classList.add('is-active');
                document.body.classList.add('is-scroll-locked');
                btns.forEach(b => b.setAttribute('aria-expanded', 'true'));
                history.pushState({ menuOpen: true }, '');
            };

            btns.forEach(b => b.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                menu.classList.contains('is-active') ? history.back() : open();
            }));

            window.addEventListener('popstate', () => { if (menu.classList.contains('is-active')) close(); });
            menu.addEventListener('click', (e) => { if (e.target === menu) history.back(); });
            
            // Auto-close on link click (for SPAs or Anchor links)
            menu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => close()));
        },
        
        initThemeToggle() {
            // Supports multiple toggles (Header + Mobile Menu)
            const toggles = document.querySelectorAll('#theme-toggle');
            const html = document.documentElement;
            
            if (localStorage.getItem('theme') === 'dark') {
                html.setAttribute('data-theme', 'dark');
            }

            toggles.forEach(btn => {
                btn.addEventListener('click', () => {
                    const isDark = html.getAttribute('data-theme') === 'dark';
                    if (isDark) {
                        html.removeAttribute('data-theme');
                        localStorage.setItem('theme', 'light');
                    } else {
                        html.setAttribute('data-theme', 'dark');
                        localStorage.setItem('theme', 'dark');
                    }
                });
            });
        },

        initCookieBanner() {
            const b = document.getElementById('cookie-banner');
            const btn = document.getElementById('accept-cookies');
            if (!b || localStorage.getItem('cookiesAccepted')) return;
            
            setTimeout(() => {
                b.style.display = 'flex';
                requestAnimationFrame(() => b.classList.add('is-visible'));
            }, 2500);

            btn?.addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                b.classList.remove('is-visible');
                setTimeout(() => b.style.display = 'none', 500);
            });
        },

        highlightCurrentPage() {
            const file = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.mobile-nav-link, .dash-link, .footer-link').forEach(l => {
                if (l.getAttribute('href') === file) { 
                    l.style.fontWeight = 'bold'; 
                    l.classList.add('is-active');
                    if (l.classList.contains('mobile-nav-link')) {
                        l.style.borderLeft = '2px solid var(--item-color, var(--color-tech))';
                        l.style.paddingLeft = '12px';
                    }
                }
            });
        },

        initCopyright() { 
            const yr = document.getElementById('year');
            if (yr) yr.textContent = new Date().getFullYear(); 
        },

        initFilterChips() {
            document.addEventListener('click', (e) => {
                const chip = e.target.closest('.chip');
                if (!chip) return;
                const parent = chip.parentElement;
                parent.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
                chip.classList.add('is-active');
            });
        }
    },

    Commerce: {
        initLemonSqueezy() {
            if (window.createLemonSqueezy) {
                window.createLemonSqueezy();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://assets.lemonsqueezy.com/lemon.js';
            script.defer = true;
            script.onload = () => { if (window.createLemonSqueezy) window.createLemonSqueezy(); };
            document.head.appendChild(script);
        }
    },

    Utils: {
        async loadSearchIndex() {
            if (window.KynarSearchIndex) return; 
            return new Promise((res) => {
                const s = document.createElement('script');
                s.src = 'js/search-index.js';
                s.onload = res;
                document.body.appendChild(s);
            });
        },

        initCodeCopy() {
            document.addEventListener('click', async (e) => {
                const b = e.target.closest('.code-preview__copy'); 
                if (!b) return;
                const code = b.closest('.code-preview').querySelector('code').textContent;
                try { 
                    await navigator.clipboard.writeText(code); 
                    const original = b.innerHTML; 
                    b.innerHTML = 'COPIED'; 
                    setTimeout(() => b.innerHTML = original, 2000); 
                } catch (err) { console.error('Clip error', err); }
            });
        },

        initSearch() {
            const input = document.querySelector('.search-input');
            const wrapper = document.querySelector('.search-input-wrapper');
            if (!input || !wrapper) return;
            
            const resultsBox = document.createElement('div');
            resultsBox.className = 'search-results'; 
            resultsBox.hidden = true;
            wrapper.appendChild(resultsBox);
            
            document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) resultsBox.hidden = true; });
            
            input.addEventListener('input', async (e) => {
                const term = e.target.value.toLowerCase().trim();
                if (term.length < 2) { resultsBox.hidden = true; return; }
                
                await KynarApp.Utils.loadSearchIndex();
                if (!window.KynarSearchIndex) return;

                const matches = KynarSearchIndex.filter(i => 
                    i.title.toLowerCase().includes(term) || 
                    i.tags.toLowerCase().includes(term)
                ).slice(0, 5);
                
                resultsBox.hidden = false;
                if (matches.length > 0) {
                    resultsBox.innerHTML = matches.map(m => `
                        <a href="${m.url}" class="search-result-row">
                            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
                                <img src="${m.image}" alt="" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover; background: var(--color-surface-dark);">
                                <div style="flex: 1;">
                                    <div class="search-result-title">${m.title}</div>
                                    <div class="search-result-meta">${m.category.toUpperCase()}</div>
                                </div>
                                <div class="search-result-price">${m.price}</div>
                            </div>
                        </a>
                    `).join('');
                } else { 
                    resultsBox.innerHTML = `<div class="search-result-empty">NO_MATCHES_FOUND</div>`; 
                }
            });
        },

        initImagePulse() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.complete) return;
                const wrapper = img.closest('.product-card__image-wrapper') || img.parentElement;
                wrapper?.classList.add('vitro-loading');
                img.addEventListener('load', () => wrapper?.classList.remove('vitro-loading'));
                img.addEventListener('error', () => wrapper?.classList.remove('vitro-loading'));
            });
        },

        initKineticVitro() {
            const blobs = document.querySelectorAll('.vitro-blob');
            if (!blobs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            let tx = 0, ty = 0, cx = 0, cy = 0;
            window.addEventListener('mousemove', (e) => {
                tx = (e.clientX / window.innerWidth) - 0.5;
                ty = (e.clientY / window.innerHeight) - 0.5;
            });

            const anim = () => {
                cx += (tx - cx) * 0.06;
                cy += (ty - cy) * 0.06;
                blobs.forEach((b, i) => {
                    const d = (i + 1) * 25;
                    b.style.transform = `translate3d(${cx * d * -1}px, ${cy * d * -1}px, 0)`;
                });
                requestAnimationFrame(anim);
            };
            anim();
        },

        handleRecentProducts() {
            const KEY = 'kynar_recent';
            const path = window.location.pathname.split('/').pop() || 'index.html';
            
            // Capture visit if on a PDP
            if (document.querySelector('.pdp-layout')) {
                const title = document.querySelector('h1')?.textContent;
                const img = document.querySelector('#pdp-main-image')?.getAttribute('src');
                const price = document.getElementById('pdp-price')?.textContent;
                
                if (title && img) {
                    let recent = JSON.parse(localStorage.getItem(KEY) || '[]');
                    recent = recent.filter(p => p.url !== window.location.search);
                    recent.unshift({ 
                        url: window.location.search, 
                        title, 
                        image: img, 
                        price: price || 'View', 
                        ts: Date.now() 
                    });
                    localStorage.setItem(KEY, JSON.stringify(recent.slice(0, 4)));
                }
            }

            // Render to container if it exists
            const container = document.getElementById('recently-viewed-container');
            if (container) {
                const recent = JSON.parse(localStorage.getItem(KEY) || '[]');
                const toShow = recent.filter(p => !window.location.search.includes(p.url)).slice(0, 3);
                if (toShow.length === 0) return;
                
                container.style.display = 'block';
                const grid = container.querySelector('.product-grid');
                if (grid) {
                    grid.innerHTML = toShow.map(p => `
                        <article class="product-card">
                            <a href="product.html${p.url}" style="text-decoration: none; display: contents; color: inherit;">
                                <div class="product-card__image-wrapper"><img src="${p.image}" class="product-card__image"></div>
                                <div class="product-card__content">
                                    <h3 class="product-card__title">${p.title}</h3>
                                    <div class="product-card__footer"><span class="product-card__price">${p.price}</span></div>
                                </div>
                            </a>
                        </article>
                    `).join('');
                }
            }
        },

        handleNewsletter() {
            const toast = document.getElementById('newsletter-toast');
            if (!toast || sessionStorage.getItem('kynar_newsletter_seen')) return;

            setTimeout(() => {
                toast.classList.add('is-visible');
                sessionStorage.setItem('kynar_newsletter_seen', 'true');
            }, 5000);

            document.getElementById('newsletter-close')?.addEventListener('click', () => {
                toast.classList.remove('is-visible');
            });

            document.getElementById('newsletter-form')?.addEventListener('submit', async (e) => {
                e.preventDefault();
                const status = document.getElementById('newsletter-status');
                if (status) { status.style.display = 'block'; status.textContent = 'TRANSMITTING...'; }
                
                try {
                    await fetch('https://assets.mailerlite.com/jsonp/2029228/forms/176215388525168382/subscribe', {
                        method: 'POST', body: new FormData(e.target), mode: 'no-cors'
                    });
                    if (status) status.textContent = 'SYSTEM_SYNC_COMPLETE';
                    setTimeout(() => toast.classList.remove('is-visible'), 2000);
                } catch {
                    if (status) status.textContent = 'SYNC_FAILED_RETRY';
                }
            });
        },

        handleFilters() {
            document.getElementById('apply-filters')?.addEventListener('click', () => {
                const active = Array.from(document.querySelectorAll('.sidebar-filters input:checked'))
                    .map(c => c.parentElement.textContent.trim().toLowerCase());
                
                document.querySelectorAll('.product-card').forEach(card => {
                    const badges = Array.from(card.querySelectorAll('.badge')).map(b => b.textContent.trim().toLowerCase());
                    card.style.display = !active.length || active.some(f => badges.includes(f)) ? '' : 'none';
                });
            });
        },

        checkSecureStatus() {
            const dot = document.querySelector('.status-dot');
            const txt = document.querySelector('.status-text');
            if (!navigator.serviceWorker.controller || !dot) return;

            const chan = new MessageChannel();
            chan.port1.onmessage = (e) => {
                if (e.data?.status === 'SECURE_CONNECTION_ACTIVE') {
                    dot.classList.add('is-secure');
                    if (txt) txt.textContent = 'SECURE_LINK_ACTIVE';
                }
            };
            navigator.serviceWorker.controller.postMessage({ type: 'CHECK_SECURE_STATUS' }, [chan.port2]);
        },

        loadProductTemplate() {
            if (!document.getElementById('pdp-title')) return;
            if (typeof KynarDatabase === 'undefined') return;

            const productId = new URLSearchParams(window.location.search).get('id');
            const p = KynarDatabase[productId];
            if (!p) { window.location.href = '404.html'; return; }

            // Document Meta
            document.title = `${p.title} | KYNAR UNIVERSE`;
            
            // Content Mapping
            const map = {
                'pdp-title': p.title,
                'pdp-tagline': p.tagline || "Product Overview",
                'pdp-price': p.price,
                'pdp-mobile-price': p.price,
                'pdp-meta-info': p.meta || "",
                'pdp-badge-type': p.badgeType || "Digital",
                'pdp-badge-level': p.badgeLevel || "Instant",
                'pdp-long-description': p.description
            };

            Object.entries(map).forEach(([id, val]) => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = val;
            });

            const mainImg = document.getElementById('pdp-main-image');
            if (mainImg) mainImg.src = p.image;

            // Commerce Links
            const buyBtns = [document.getElementById('pdp-buy-btn'), document.getElementById('pdp-mobile-buy-btn')];
            buyBtns.forEach(btn => { if (btn) btn.href = `${p.lsLink}?embed=1`; });

            // Sector Branding
            const bgBlob = document.getElementById('pdp-bg-blob');
            const backLink = document.getElementById('pdp-back-link');
            const sectors = {
                'Family': { color: 'var(--color-family)', url: 'shop-family.html', label: 'KYNAR Family' },
                'Life': { color: 'var(--color-life)', url: 'shop-life.html', label: 'KYNAR Life' },
                'Tech': { color: 'var(--color-tech)', url: 'shop-tech.html', label: 'KYNAR Tech' }
            };

            const s = sectors[p.category] || sectors['Tech'];
            if (bgBlob) bgBlob.style.background = s.color;
            if (backLink) {
                backLink.href = s.url;
                backLink.textContent = `← Back to ${s.label}`;
            }

            // File List
            const fileList = document.getElementById('pdp-file-list');
            if (fileList && p.files) {
                fileList.innerHTML = p.files.map(f => `
                    <li class="spec-item">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        ${f}
                    </li>
                `).join('');
            }
        }
    }
};

// INITIALIZE SYSTEM
document.addEventListener('DOMContentLoaded', () => KynarApp.init());
