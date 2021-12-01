const signupForm = async function(event) {
event.preventDefault();

    const usernameInput = document.getElementById("usernameSignup");
    const passwordInput = document.getElementById("passwordSignup")

    const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value,
        }),
        headers: { "content-Type": "application/json"},
    });

    if(response.ok) {
        document.location.replace("/dashboard")
    } else {
        console.log(response)
        alert("Failed to sign up!")
    }

}

document.getElementById("signupForm").addEventListener("submit", signupForm)