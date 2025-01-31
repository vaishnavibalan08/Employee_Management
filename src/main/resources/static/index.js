document.getElementById('signupForm').addEventListener('submit', async function(event){
    event.preventDefault();

    let valid = true;

    // Name Validation
    const name = document.getElementById('name').value.trim();
    if (name === "") {
        document.getElementById('nameError').textContent = "Name is required.";
        valid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }

    // Designation Validation
    const designation = document.getElementById('designation').value.trim();
    if (designation === "") {
        document.getElementById('designationError').textContent = "Designation is required";
        valid = false;
    } else {
        document.getElementById('designationError').textContent = "";
    }

    // Age Validation
    const age = document.getElementById('age').value.trim();
    if (age === "" || isNaN(age) || age <= 0) {
        document.getElementById('ageError').textContent = "Enter a valid age";
        valid = false;
    } else {
        document.getElementById('ageError').textContent = "";
    }

    // Email Validation
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Enter a valid email";
        valid = false;
    } else {
        document.getElementById('emailError').textContent = "";
    }

    // Phone Number Validation
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const phoneNumberPattern = /^\d{10}$/;
    if (phoneNumber === "" || !phoneNumberPattern.test(phoneNumber)) {
        document.getElementById('phoneNumberError').textContent = "Please enter a valid 10-digit phone number.";
        valid = false;
    } else {
        document.getElementById('phoneNumberError').textContent = "";
    }

    // Password Validation
    const password = document.getElementById('password').value.trim();
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = "Password must be at least 8 characters long";
        valid = false;
    } else {
        document.getElementById('passwordError').textContent = "";
    }

    // Stop if validation failed
    if (!valid) {
        return;
    }

    // Create the employee object
    const employee = {
        name: name,
        designation: designation,
        age: age,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8080/employee/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee),
        });

        if (response.ok) {
            window.location.href = 'login.html';
        }
        else {
            alert('Error during signup. Please try again.');
        }
    } catch (error) {
        console.error("Network error:", error);
        alert('Could not connect to the server. Please try again later.');
    }
});
