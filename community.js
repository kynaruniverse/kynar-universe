/**
 * KYNAR UNIVERSE - Community Page Module
 * Architect: AetherCode
 * Description: Optimized FAQ Accordion and Formspree handlers.
 */

const CommunityPage = (() => {

    // --- 1. FORM LOGIC ---

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    /**
     * Unified Formspree Handler
     */
    const handleFormSubmission = (config) => {
        const { formId, successId, responseId } = config;
        const form = document.getElementById(formId);
        const successMsg = document.getElementById(successId);
        const responseMsg = document.getElementById(responseId);
        
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const emailInput = form.querySelector('input[type="email"]');
            const honeypot = form.querySelector('input[name="_gotcha"]');

            // 1. Bot Check (Honeypot)
            if (honeypot && honeypot.value) return;

                        // 2. Client-side Validation
            if (emailInput && !isValidEmail(emailInput.value)) {
                showError(responseMsg, "Please enter a valid email address.");
                return;
            }


            // 3. UI Loading State
            if (window.LoadingState) {
                window.LoadingState.buttonStart(submitBtn);
            } else {
                submitBtn.disabled = true;
            }

            if (responseMsg) responseMsg.textContent = "";

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // 4. Success State
                    form.reset();
                    form.style.display = 'none';
                    if (successMsg) {
                        successMsg.style.display = 'block';
                        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    const data = await response.json();
                    throw new Error(data.errors ? data.errors.map(err => err.message).join(", ") : "Submission failed");
                }
            } catch (error) {
                console.error('[Community Form Error]:', error);
                this.showError(responseMsg, "Something went wrong. Please try again later.");
            } finally {
                // 5. Restore UI State
                if (window.LoadingState) {
                    window.LoadingState.buttonEnd(submitBtn);
                } else {
                    submitBtn.disabled = false;
                }
            }
        });
    };

    const showError = (container, message) => {
        if (container) {
            container.textContent = message;
            container.style.color = "var(--color-star-red)";
        } else {
            alert(message);
        }
    };

    // --- 2. FAQ ACCORDION ---
    
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            const answerPanel = item.querySelector('.faq-answer');
            
            if (!questionBtn || !answerPanel) return;

            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Accordion logic: Close others
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                        otherItem.querySelector('.faq-answer')?.setAttribute('aria-hidden', 'true');
                    }
                });

                                // Toggle Current
                item.classList.toggle('active');
                questionBtn.setAttribute('aria-expanded', !isOpen);
                answerPanel.setAttribute('aria-hidden', isOpen);
                
                // Optional: Max-height animation support
                if (!isOpen) {
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                } else {
                    answerPanel.style.maxHeight = null;
                }

            });
        });
    };

    // --- 3. INITIALIZATION ---
    
    const init = () => {
        initFAQ();

        // Newsletter
        handleFormSubmission({
            formId: 'newsletter-form',
            successId: 'newsletter-success',
            responseId: 'newsletter-message'
        });

        // Feedback
        handleFormSubmission({
            formId: 'feedback-form',
            successId: 'feedback-success',
            responseId: 'feedback-message-response'
        });
        
        console.log('✨ Community Module Initialized');
    };

    return { init, showError };

})();

// Start - Listen for the custom component loader event
document.addEventListener('componentsLoaded', () => CommunityPage.init());

// Fallback for direct page access
if (document.readyState !== 'loading') {
    CommunityPage.init();
}

