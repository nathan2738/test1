// Ensure DOM is loaded before scripts run
document.addEventListener('DOMContentLoaded', () => {
  // Show the appropriate form based on user answer
  function showForm(answer) {
    console.log("showForm called with:", answer);
    document.getElementById("account-question").style.display = 'none';
    document.getElementById("login-form").style.display = 'none';
    document.getElementById("signup-form").style.display = 'none';

    if (answer === 'yes') {
      document.getElementById("login-form").style.display = 'block';
    } else {
      document.getElementById("signup-form").style.display = 'block';
    }
  }

  // Back button to return to initial view
  function goBack() {
    document.getElementById("login-form").style.display = 'none';
    document.getElementById("signup-form").style.display = 'none';
    document.getElementById("account-question").style.display = 'block';
  }

  // Signup handler
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async e => {
      e.preventDefault();
      const username = signupForm.username.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value;
      try {
        const res = await fetch('/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Signup failed');
        alert(data.message);
        goBack();
      } catch (err) {
        console.error('Signup error:', err);
        alert(err.message);
      }
    });
  }

  // Login handler
  async function handleLogin(username, password) {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  }

  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value;
      if (!username || !password) {
        alert('Please fill in both fields!');
        return;
      }
      try {
        const data = await handleLogin(username, password);
        alert(data.message);
        fetchUserDetails(username);
      } catch (err) {
        console.error('Login error:', err);
        alert(err.message);
      }
    });
  }

  // Fetch user details after login
  async function fetchUserDetails(username) {
    try {
      const res = await fetch(`/user?username=${encodeURIComponent(username)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert(`Username: ${data.username}, Email: ${data.email}`);
    } catch (err) {
      console.error('Fetch user error:', err);
      alert(err.message);
    }
  }

  // Update password (if form exists)
  const updatePasswordForm = document.getElementById('updatePasswordForm');
  if (updatePasswordForm) {
    updatePasswordForm.addEventListener('submit', async e => {
      e.preventDefault();
      const username = updatePasswordForm.username.value.trim();
      const newPassword = updatePasswordForm.newPassword.value;
      try {
        const res = await fetch('/user', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, newPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert(data.message);
      } catch (err) {
        console.error('Update password error:', err);
        alert(err.message);
      }
    });
  }

  // Delete account (if form exists)
  const deleteAccountForm = document.getElementById('deleteAccountForm');
  if (deleteAccountForm) {
    deleteAccountForm.addEventListener('submit', async e => {
      e.preventDefault();
      const username = deleteAccountForm.username.value.trim();
      try {
        const res = await fetch('/user', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert(data.message);
        goBack();
      } catch (err) {
        console.error('Delete account error:', err);
        alert(err.message);
      }
    });
  }

  // Expose toggles globally for inline onclick
  window.showForm = showForm;
  window.goBack = goBack;
});

