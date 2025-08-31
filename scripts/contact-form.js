// Contact form functionality
export function initContactForm() {
  const form = document.querySelector('[data-id="contact-form"]');
  const submitBtn = document.querySelector('[data-id="submit-btn"]');
  const btnText = document.querySelector('[data-id="btn-text"]');

  if (!form || !submitBtn || !btnText) {
    console.warn('Contact form elements not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    // Validate email
    if (!isValidEmail(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

    try {
      // Simulate form submission (replace with actual endpoint)
      await simulateFormSubmission(data);
      
      // Success
      showNotification('Thank you! Your message has been sent successfully.', 'success');
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Reset button state
      btnText.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  });

  // Add real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
}

// Simulate form submission (replace with actual API call)
async function simulateFormSubmission(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', data);
      resolve();
    }, 1500);
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Field validation
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  clearFieldError(field);
  
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  if (field.type === 'email' && value && !isValidEmail(value)) {
    showFieldError(field, 'Please enter a valid email address');
    return false;
  }
  
  return true;
}

// Show field error
function showFieldError(field, message) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error text-red-400 text-sm mt-1';
  errorDiv.textContent = message;
  
  field.parentNode.appendChild(errorDiv);
  field.classList.add('border-red-500', 'focus:ring-red-500');
}

// Clear field error
function clearFieldError(field) {
  const errorDiv = field.parentNode.querySelector('.field-error');
  if (errorDiv) {
    errorDiv.remove();
  }
  field.classList.remove('border-red-500', 'focus:ring-red-500');
}

// Show notification
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
  
  // Set colors based on type
  const colors = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white'
  };
  
  notification.className += ` ${colors[type] || colors.info}`;
  
  // Add icon based on type
  const icons = {
    success: 'check-circle',
    error: 'x-circle',
    info: 'info'
  };
  
  notification.innerHTML = `
    <div class="flex items-center">
      <i data-lucide="${icons[type] || icons.info}" class="w-5 h-5 mr-3"></i>
      <p class="font-medium">${message}</p>
      <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentNode.parentNode.remove()">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Initialize icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}