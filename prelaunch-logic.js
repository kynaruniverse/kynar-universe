// This script handles the "Notify Me" logic for unreleased products
function handleWaitlist(productId) {
    const email = prompt("Enter your email to be notified when this launches:");
    if (email) {
        // Integrate with your Formspree/Newsletter endpoint
        fetch("https://formspree.io/f/mlgekbwb", {
            method: "POST",
            body: JSON.stringify({ email: email, product_interest: productId }),
            headers: { 'Accept': 'application/json' }
        }).then(() => alert("You're on the list!"));
    }
}
