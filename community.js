/* ============================================================
   KYNAR UNIVERSE - COMMUNITY PAGE JAVASCRIPT
   Handles: FAQ Accordion, Newsletter, Story Submissions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
        // ===== NEWSLETTER FORM (FORMSPREE AJAX) =====
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            // Visual feedback
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            
            newsletterMessage.style.color = 'rgba(17,17,17,0.6)';
            newsletterMessage.textContent = 'Processing your subscription...';
            
            const formData = new FormData(newsletterForm);

            try {
                const response = await fetch(newsletterForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // SUCCESS
                    newsletterMessage.style.color = '#28a745';
                    newsletterMessage.textContent = '✓ Success! Check your email to confirm.';
                    newsletterForm.reset(); 
                } else {
                    // SERVER ERROR
                    const data = await response.json();
                    newsletterMessage.style.color = 'var(--color-star-red)';
                    newsletterMessage.textContent = data.errors ? data.errors[0].message : "Submission failed.";
                }
            } catch (error) {
                // NETWORK ERROR
                newsletterMessage.style.color = 'var(--color-star-red)';
                newsletterMessage.textContent = "Connection error. Please try again.";
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    newsletterMessage.textContent = '';
                }, 5000);
            }
        });
    }
    
    // ===== FEEDBACK FORM (FORMSPREE AJAX INTEGRATION) =====
const feedbackForm = document.getElementById('feedback-form');
const feedbackResponse = document.getElementById('feedback-message-response');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the page from redirecting
        
        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        const formData = new FormData(feedbackForm);
        
        // Visual feedback
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        feedbackResponse.style.color = '#666';
        feedbackResponse.textContent = 'Submitting your feedback...';

        try {
            const response = await fetch(feedbackForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // SUCCESS
                feedbackResponse.style.color = '#28a745';
                feedbackResponse.textContent = '✓ Thank you! Your feedback has been sent.';
                feedbackForm.reset(); // Clear the form
            } else {
                // ERROR FROM SERVER
                const data = await response.json();
                feedbackResponse.style.color = '#490101'; // Your star-red color
                feedbackResponse.textContent = data.errors ? data.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form.";
            }
        } catch (error) {
            // NETWORK ERROR
            feedbackResponse.style.color = '#490101';
            feedbackResponse.textContent = "Oops! There was a problem connecting to the server.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Feedback';
            
            // Clear message after 6 seconds
            setTimeout(() => {
                feedbackResponse.textContent = '';
            }, 6000);
        }
    });
}
    
    // ===== SMOOTH SCROLL TO SECTIONS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or just "#"
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✅ Community page loaded successfully');
});