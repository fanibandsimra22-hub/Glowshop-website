document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('[name="email"]').value.trim();
  const password = this.querySelector('[name="password"]').value;

  fetch('login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById('loginMsg').textContent = data.message;
      if (data.success) {
        sessionStorage.setItem('glowshop_user', JSON.stringify({
          username: data.username,
          email: data.email
        }));
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }
    })
    .catch(() => {
      document.getElementById('loginMsg').textContent = 'Login failed. Try again.';
    });
});
