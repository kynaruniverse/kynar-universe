/**
 * KYNAR SIGNALS LOGIC
 * Role: Handle newsletter subscriptions
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signals-form');
    const status = document.getElementById('signal-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // UI Feedback (Simulated transmission)
            status.textContent = "Transmitting Signal...";
            status.style.opacity = '1';

            // Simulate Network Delay
            setTimeout(() => {
                const name = document.getElementById('signal-name').value;
                
                // Success State
                status.textContent = `Connected. Welcome, ${name}.`;
                status.style.color = 'var(--ink-primary)';
                
                form.reset();
                
                // Fade out message after 3s
                setTimeout(() => {
                    status.style.opacity = '0';
                }, 4000);

                // TODO: Connect this to Firebase/Mailchimp in production
                console.log(`Signal connected for: ${name}`);

            }, 1200);
        });
    }
});
