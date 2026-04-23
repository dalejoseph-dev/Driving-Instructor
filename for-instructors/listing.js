// Handle Netlify Forms AJAX submission for listing request
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('listingForm');
  const submitBtn = document.getElementById('listingSubmitBtn');
  const successMessage = document.getElementById('listingSuccess');
  const errorMessage = document.getElementById('listingError');

  if (!form) {
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
      const formData = new FormData(form);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        successMessage.style.display = 'block';
        form.reset();
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      errorMessage.style.display = 'block';
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit listing request';
    }
  });
});
