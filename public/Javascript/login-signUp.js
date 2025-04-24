function showForm(answer) {
  document.getElementById("account-question").style.display = 'none';

  if (answer === 'yes') {
    document.getElementById("login-form").style.display = 'block';
  } else if (answer === 'no') {
    document.getElementById("signup-form").style.display = 'block';
  }
}

function goBack() {
  document.getElementById("login-form").style.display = 'none';
  document.getElementById("signup-form").style.display = 'none';
  document.getElementById("account-question").style.display = 'block';
}

// Signup form submission
const form = document.getElementById('signupForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message);
  });
}