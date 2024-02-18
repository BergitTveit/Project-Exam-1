function createPostElement(post) {
  const postElement = document.createElement("a");
  postElement.href = `/blogdetails/index.html?id=${post.id}`;
  postElement.classList.add("post-link");

  if (post.img) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("listImgContainer");
    const imgElement = document.createElement("img");
    imgElement.src = post.img;
    imgElement.classList.add("list-img");
    imgContainer.appendChild(imgElement);
    postElement.appendChild(imgContainer);
  }
  const maxChar = 100;
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const titleElement = document.createElement("h4");
  titleElement.textContent = post.title;
  contentContainer.appendChild(titleElement);

  const introElement = document.createElement("div");
  introElement.innerHTML =
    post.content.length > maxChar
      ? post.content.substring(0, maxChar) + "..."
      : post.content;
  contentContainer.appendChild(introElement);

  postElement.appendChild(contentContainer);
  return postElement;
}

export function displayPosts(posts, displaySectionName, nrOfPosts = 9) {
  const displayContainer = document.querySelector(displaySectionName);
  if (!displayContainer) {
    console.error("Display container not found");
    return;
  }

  const numberOfPosts = posts.slice(0, nrOfPosts);
  numberOfPosts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.appendChild(createPostElement(post));
    displayContainer.appendChild(postCard);
  });
}
