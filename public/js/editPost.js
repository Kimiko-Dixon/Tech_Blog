const editPost = async (event) => {
  event.preventDefault();

  console.log(event);
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const id = event.target.dataset.postid;
  if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      document.location.replace("/dashboard");
    } else {
      console.log("failed to edit post");
    }
  }
};

document.querySelector("#edit-post").addEventListener("click", editPost);
