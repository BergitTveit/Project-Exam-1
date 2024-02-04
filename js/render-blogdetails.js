export function displayPostDetails(post) {
  const postDetailsContainer = document.querySelector(".post-details");
  postDetailsContainer.classList.add("m-top", "m-bottom");

  const postContentContainer = document.createElement("div");
  postContentContainer.classList.add("frame");

  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title || "Untitled";

  const postElement = document.createElement("div");
  postElement.classList.add("img-details-container");
  if (post.img) {
    const imgElement = document.createElement("img");
    imgElement.src = post.img;
    imgElement.classList.add("img-details", "img-details-position");
    postElement.appendChild(imgElement);
  }

  const contentElement = document.createElement("div");
  contentElement.innerHTML = post.content;

  postDetailsContainer.innerHTML = "";
  postDetailsContainer.appendChild(postContentContainer);
  postContentContainer.appendChild(postTitle);
  postContentContainer.appendChild(postElement);

  postContentContainer.appendChild(contentElement);
}
