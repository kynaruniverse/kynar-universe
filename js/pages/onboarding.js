/* KYNAR ONBOARDING ENGINE (js/pages/onboarding.js)
   Status: EVOLVED MASTER (Step-Logic + State Persistence)
*/

let currentStep = 1;
const totalSteps = 4;

document.addEventListener('DOMContentLoaded', () => {
    // Initial State Check
    updateStepUI();
});

/**
 * 1. NAVIGATION LOGIC
 */
window.nextStep = function(step) {
    if (step > totalSteps || step < 1) return;
    
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
    });

    // Show current step
    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) {
        targetStep.classList.add('active');
        currentStep = step;
        updateStepUI();
    }
};

/**
 * 2. SELECTION LOGIC
 */
window.selectOption = function(element, focusType) {
    // Remove selected class from siblings
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selected class to clicked element
    element.classList.add('selected');

    // Enable the "Next" button for Step 2
    const nextBtn = document.getElementById('btn-step-2');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }

    // Store preference locally
    localStorage.setItem('kynar_user_focus', focusType);
};

/**
 * 3. UI SYNC
 */
function updateStepUI() {
    // Update Progress Dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index + 1 === currentStep) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Handle Breadcrumbs if they exist
    const nav = document.getElementById('breadcrumb-nav');
    if (nav && window.location.pathname.includes('onboarding')) {
        nav.innerHTML = `<span class="text-micro muted">System / Calibration / Step ${currentStep}</span>`;
    }
}

/**
 * 4. FINALIZATION
 */
window.finishOnboarding = function() {
    // Mark onboarding as complete in localStorage
    localStorage.setItem('kynar_onboarding_complete', 'true');
    
    if (window.showToast) {
        window.showToast('Workspace Initialized. Welcome traveler.', 'success');
    }

    // Redirect to the Hub or Dashboard
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1500);
};
