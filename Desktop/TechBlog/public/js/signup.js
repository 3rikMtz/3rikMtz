const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim(); 

  if (name && password && email) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to sign up');
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
