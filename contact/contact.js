// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // Check if form exists before adding event listener
  if (!form) {
    console.error('Contact form not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Hide any previous messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    try {
      const formData = new FormData(form);
      
      // For Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        successMessage.classList.add('show');
        form.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      errorMessage.classList.add('show');
      
      // Scroll to error message
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
});