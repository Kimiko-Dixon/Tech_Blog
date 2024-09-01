//Gets logged in status and either changes commenting status to true or directs the user to the login page
const commentingStatus = async (event) => {
  event.preventDefault();
  if (event.target.dataset.loggedin === "true") {
    const id = event.target.dataset.postid;
    const response = await fetch(`/api/posts/commenting`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      document.location.replace(`/comment/${id}`);
    } else {
      console.log("failed to change status");
    }
  }
  else{
    document.location.replace(`/login`);
  }
};

document
  .querySelector("#toComment")
  .addEventListener("click", commentingStatus);
