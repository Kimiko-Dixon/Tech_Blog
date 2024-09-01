//Creates new post with the title and the content
const newPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      document.location.replace("/dashboard");
    } else {
      console.log("failed to create new post");
    }
  }
};

document.querySelector("#new-post").addEventListener("click", newPost);
