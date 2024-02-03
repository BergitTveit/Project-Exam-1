export function displayPostDetails(post) {
  const postDetailsContainer = document.querySelector(".post-details");

  const postElement = document.createElement("div");

  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title || "Untitled";

  if (post.img) {
    const imgElement = document.createElement("img");
    imgElement.src = post.img;
    imgElement.classList.add("img-postlist");
    postElement.append(imgElement);
  }

  postDetailsContainer.innerHTML = "";
  postDetailsContainer.appendChild(postTitle);
  postDetailsContainer.appendChild(postElement);
}
