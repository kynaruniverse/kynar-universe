/**
 * KYNAR UNIVERSE - Community Page Logic (2026 Edition)
 * Architect: AetherCode
 * Description: Handles the new 'Glass' forms and accordion interactions.
 */

const CommunityPage = (() => {

    // --- 1. FORM HANDLING ENGINE ---

    /**
     * Handles the visual state changes for the new "Glass" forms
     * (Newsletter VIP Card & Feedback Panel)
     */
    const setupForms = () => {
        // A. VIP Newsletter Form
        const vipForm = document.querySelector('.vip-form');
        if (vipForm) {
            vipForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = vipForm.querySelector('button');
                const input = vipForm.querySelector('input');
                const originalText = btn.textContent;

                // 1. Loading State
                btn.textContent = 'Joining...';
                btn.style.opacity = '0.7';
                btn.disabled = true;

                // Simulate API Call (Replace with real fetch if needed)
                setTimeout(() => {
                    // 2. Success State (Premium Feedback)
                    btn.textContent = 'Welcome, Founder!';
                    btn.style.background = 'var(--color-search-deep)'; // Success Green
                    btn.style.color = '#fff';
                    btn.style.borderColor = 'var(--color-search-deep)';
                    input.value = ''; // Clear input

                    // 3. Reset after delay
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = ''; 
                        btn.style.color = '';
                        btn.style.borderColor = '';
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    }, 4000);
                }, 1500);
            });
        }

        // B. Feedback Glass Form
        const feedbackForm = document.querySelector('.feedback-mini-form');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = feedbackForm.querySelector('button');
                const originalText = btn.textContent;

                // 1. Loading
                btn.textContent = 'Sending...';
                btn.disabled = true;
                
                setTimeout(() => {
                    // 2. Success
                    btn.textContent = 'Message Sent';
                    btn.classList.remove('btn-secondary');
                    btn.classList.add('btn-primary'); // Switch to Gold
                    
                    // 3. Reset
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.add('btn-secondary');
                        btn.classList.remove('btn-primary');
                        feedbackForm.reset();
                        btn.disabled = false;
                    }, 3000);
                }, 1200);
            });
        }
    };

    // --- 2. FAQ ACCORDION ---
    
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            
            if (!questionBtn) return;

            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Accordion logic: Close others for a cleaner look
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle Current
                item.classList.toggle('active');
            });
        });
    };

    // --- 3. INITIALIZATION ---
    
    const init = () => {
        initFAQ();
        setupForms();
        console.log('✨ Community Nexus Online');
    };

    return { init };

})();

// Initialize when Components are Ready
document.addEventListener('componentsLoaded', () => CommunityPage.init());

// Fallback for direct page access
if (document.readyState !== 'loading') {
    CommunityPage.init();
}