document.getElementById('loginForm').addEventListener('submit', async function(event){
    event.preventDefault();

    const credentials = {
        email : document.getElementById('email').value,
        password : document.getElementById('password').value,
    };

    const response = await fetch('http://localhost:8080/employee/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (response.ok) {
        alert('Login successful!');
        const emailJson = JSON.stringify({ email: credentials.email });
        sessionStorage.setItem("userEmail",emailJson);
        window.location.href = 'dashboard.html';
    }
    else {
        alert('Invalid email or password.');
    }
});