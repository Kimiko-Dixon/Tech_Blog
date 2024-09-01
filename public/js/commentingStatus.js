const commentingStatus = async (event) => {
    event.preventDefault()
    const id = event.target.dataset.postid;
    const response = await fetch(`/api/posts/commenting`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      document.location.replace(`/comment/${id}`);
    } 
    else if (response.status === 401){
        document.location.replace(`/login`)
    }
    else {
      console.log("failed to change status");
    }
}

document.querySelector("#toComment").addEventListener("click", commentingStatus);