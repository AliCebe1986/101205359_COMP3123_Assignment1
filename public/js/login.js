document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.status === 200) {
            alert('Login successful');
            localStorage.setItem('token', data.jwt_token);
            window.location.href = 'employees.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error logging in');
    }
});
