const createPost = (event) => {
  event.preventDefault();
  document.location.replace("/newPost");
};

document.querySelector("#create-post").addEventListener("click", createPost);
