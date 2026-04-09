export function initContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop the page from reloading
        
        // Show "Sending" state
        btn.disabled = true;
        btnText.innerText = "Sending...";
        status.classList.remove('hidden', 'bg-red-500/20', 'text-red-400', 'bg-green-500/20', 'text-green-400');
        status.classList.add('bg-blue-500/10', 'text-blue-400', 'block');
        status.innerText = "Sending your message...";

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success State
                status.classList.replace('text-blue-400', 'text-green-400');
                status.classList.replace('bg-blue-500/10', 'bg-green-500/20');
                status.innerText = "Success! I will get back to you shortly.";
                btnText.innerText = "Message Sent!";
                form.reset(); // Clear the form fields
            } else {
                throw new Error();
            }
        } catch (error) {
            // Error State
            status.classList.replace('text-blue-400', 'text-red-400');
            status.classList.replace('bg-blue-500/10', 'bg-red-500/20');
            status.innerText = "Oops! There was a problem. Please try again.";
            btnText.innerText = "Try Again";
            btn.disabled = false;
        }
    });
}
