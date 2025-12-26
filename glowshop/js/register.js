document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = this.username.value.trim();
  const email = this.email.value.trim();
  const password = this.password.value;

  fetch('register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('registerMsg').textContent = data.message;
      if(data.success) {
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1200);
      }
    }).catch(() => {
      document.getElementById('registerMsg').textContent = 'Registration failed. Try again.';
    });
});
