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
    
    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            // Show loading message
            newsletterMessage.style.color = '#666';
            newsletterMessage.textContent = 'Processing...';
            
            // Simulate API call (replace with your actual newsletter service)
            setTimeout(() => {
                // Success
                newsletterMessage.style.color = '#28a745';
                newsletterMessage.textContent = '✓ Success! Check your email to confirm subscription.';
                emailInput.value = '';
                submitBtn.textContent = 'Subscribe';
                submitBtn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    newsletterMessage.textContent = '';
                }, 5000);
                
                // TODO: Integrate with actual newsletter service
                // Examples: Mailchimp, ConvertKit, Substack API
                console.log('Newsletter signup:', email);
            }, 1500);
        });
    }
    
    // ===== STORY SUBMISSION FORM =====
    const storyForm = document.getElementById('story-form');
    const storyMessage = document.getElementById('story-message-feedback');
    const charCount = document.getElementById('char-count');
    const storyTextarea = document.getElementById('story-message');
    
    // Character counter
    if (storyTextarea && charCount) {
        storyTextarea.addEventListener('input', () => {
            const length = storyTextarea.value.length;
            charCount.textContent = `${length} / 200`;
            
            if (length > 180) {
                charCount.style.color = '#dc3545';
            } else {
                charCount.style.color = 'rgba(17,17,17,0.5)';
            }
        });
    }
    
    if (storyForm) {
        storyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('story-name');
            const emailInput = document.getElementById('story-email');
            const productInput = document.getElementById('story-product');
            const messageInput = document.getElementById('story-message');
            const submitBtn = storyForm.querySelector('button[type="submit"]');
            
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                product: productInput.value.trim(),
                story: messageInput.value.trim()
            };
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Show loading message
            storyMessage.style.color = '#666';
            storyMessage.textContent = 'Sending your story...';
            
            // Simulate API call (replace with your actual submission endpoint)
            setTimeout(() => {
                // Success
                storyMessage.style.color = '#28a745';
                storyMessage.textContent = '✓ Thank you! Your story has been submitted for review.';
                
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                productInput.value = '';
                messageInput.value = '';
                charCount.textContent = '0 / 200';
                
                submitBtn.textContent = 'Submit Story';
                submitBtn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    storyMessage.textContent = '';
                }, 5000);
                
                // TODO: Integrate with actual submission service
                // Options: Google Forms, Airtable, Firebase, email service
                console.log('Story submission:', formData);
            }, 1500);
        });
    }
    
    // ===== SOCIAL CARD ANIMATIONS =====
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== ANIMATED COUNTER (Optional Enhancement) =====
    const memberCountEl = document.getElementById('member-count');
    
    if (memberCountEl) {
        // Animate count on page load
        const targetCount = 2500;
        let currentCount = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetCount / steps;
        const stepDuration = duration / steps;
        
        const counter = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                memberCountEl.textContent = '2,500+';
                clearInterval(counter);
            } else {
                memberCountEl.textContent = Math.floor(currentCount).toLocaleString() + '+';
            }
        }, stepDuration);
    }
    
    // ===== SMOOTH SCROLL TO SECTIONS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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