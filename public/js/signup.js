//Signup with entered username and password
const signup = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      document.location.replace("/");
    } else {
      console.log("failed to sign up");
    }
  }
};

document.querySelector("#signup").addEventListener("click", signup);
