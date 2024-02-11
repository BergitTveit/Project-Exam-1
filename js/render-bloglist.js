// Render single post card.
export async function displayPost(post, displaySectionName) {
  const displayContainer = document.querySelector(displaySectionName);

  const postElements = document.createElement("div");
  postElements.classList.add("post-item");

  const postElement = document.createElement("a");
  postElement.href = `/blogdetails/index.html?id=${post.id}`;
  postElement.classList.add("post-link");

  if (post.img) {
    const imgElement = document.createElement("img");
    imgElement.src = post.img;
    imgElement.classList.add("img-postlist");
    postElement.append(imgElement);
  }
  const title = document.createElement("h4");
  title.textContent = post.title;

  postElement.appendChild(title);
  postElements.append(postElement);

  if (displayContainer) {
    displayContainer.appendChild(postElements);
  } else {
    console.error("Display container not found");
  }
}

// Displaying posts in desired outcome in desired place.
export async function displayPosts(posts, displaySectionName, nrOfPosts = 9) {
  const numberOfPosts = posts.slice(0, nrOfPosts);
  numberOfPosts.forEach((post) => {
    displayPost(post, displaySectionName);
  });
}
