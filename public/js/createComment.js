//Creates comment with the comment text and the id of the post the comment is on
const createComment = async (event) => {
  event.preventDefault();
  const text = document.querySelector("#comment").value.trim();
  const id = event.target.dataset.postid;
  if (text) {
    const response = await fetch(`/api/posts/comment/${id}`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      document.location.replace(`/comment/${id}`);
    } else {
      console.log("failed to create comment");
    }
  }
};

document.querySelector("#comment-button").addEventListener("click", createComment);

