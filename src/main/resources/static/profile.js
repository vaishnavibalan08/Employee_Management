document.addEventListener("DOMContentLoaded", async function() {
    const userEmailJson = sessionStorage.getItem("userEmail");
    if (!userEmailJson) {
        alert("No user logged in. Redirecting to login page.");
        window.location.href = "login.html";
        return;
    }
    const userEmailObj = JSON.parse(userEmailJson);
    const userEmail = userEmailObj?.email;
    try{
        const response = await fetch(`http://localhost:8080/employee/retrieve/${userEmail}`);
        const user = await response.json();

        document.getElementById("name").value = user.name;
        document.getElementById("designation").value = user.designation;
        document.getElementById("age").value = user.age;
        document.getElementById("email").value = user.email;
        document.getElementById("phoneNumber").value = user.phoneNumber;
        document.getElementById("password").value = user.password;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
    document.getElementById("profileForm").addEventListener("submit" , async function(event){
        event.preventDefault();

        const updateUser = {
            name:document.getElementById("name").value,
            designation:document.getElementById("designation").value,
            age:document.getElementById("age").value,
            password:document.getElementById("password").value,
        };

        const response = await fetch (`http://localhost:8080/employee/update/${userEmail}`,{
            method:'PUT',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(updateUser),
        });
        if(response.ok){
            alert('updated successful!');
        }
        else{
            alert('update Failed!');
        }
    });

});

