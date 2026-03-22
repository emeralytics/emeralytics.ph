// Select the form
const emailForm = document.getElementById('emailForm');

emailForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default page reload

  const formData = new FormData(emailForm);
  const email = formData.get('email');
  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    showAlert('Please complete the reCAPTCHA.');
    return;
  }

  // Replace this URL with your deployed Apps Script Web App URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyvyj9XCad0YI190QPMOLfPiU7PeLaxeHzCPwbplzo0p4rq6Z3drINNisMWbYTNiFATOg/exec';

  fetch(scriptURL, {
    method: 'POST',
    body: new URLSearchParams({
      email: email,
      'g-recaptcha-response': recaptchaResponse
    })
  })
  .then(response => response.text())
  .then(text => {
    if (text === 'success') {
      showAlert('Thank you! Your email has been submitted.');
      emailForm.reset();
      grecaptcha.reset(); // Reset the reCAPTCHA
    } else if (text === 'already_submitted') {
      showAlert('This email has already been submitted today.');
      grecaptcha.reset();
    } else if (text === 'captcha_failed') {
      showAlert('reCAPTCHA verification failed. Please try again.');
      grecaptcha.reset();
    } else {
      showAlert('Something went wrong. Please try again.');
      grecaptcha.reset();
    }
  })
  .catch(err => {
    console.error(err);
    showAlert('Error submitting the form. Please try again.');
    grecaptcha.reset();
  });
});

// Function to show custom alert modal
function showAlert(message) {
  const alertModal = document.getElementById('alertModal');
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.textContent = message;
  alertModal.style.display = 'flex';
}

function closeAlertModal() {
  document.getElementById('alertModal').style.display = 'none';
}


// ==============================================================

  // ===== Contact Modal Scripts =====
  function openContactModal() {
    document.getElementById("contactModal").style.display = "flex";
  }

  function closeContactModal() {
    document.getElementById("contactModal").style.display = "none";
  }

  window.onclick = function(e) {
    const modal = document.getElementById("contactModal");
    if (e.target === modal) closeContactModal();
  };

  // ===== Alert Modal Scripts =====
  function showAlert(message) {
    document.getElementById("alertMessage").innerText = message;
    document.getElementById("alertModal").style.display = "flex";
  }

  function closeAlertModal() {
    document.getElementById("alertModal").style.display = "none";
  }
