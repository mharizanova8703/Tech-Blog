const loginForm = async function(event) {
event.preventDefault();

    const usernameInput = document.getElementById("usernameLogin");
    const passwordInput = document.getElementById("passwordLogin")

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
        alert("Failed to login!")
    }

}

document.getElementById("loginForm").addEventListener("submit", loginForm)