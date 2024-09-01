//Logout
const logout = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 204) {
    document.location.replace("/");
  } else {
    console.log("failed to logout");
  }
};

document.querySelector("#logout").addEventListener("click", logout);
