export async function displayPost(post, displaySectionName) {
  const displayContainer = document.querySelector(displaySectionName);

  const postElements = document.createElement("div");
  postElements.classList.add("post-item");

  const postElement = document.createElement("a");
  postElement.href = `/blogdetails/index.html?id=${post.id}`;
  postElement.classList.add("post-link");

  const imgElement = document.createElement("img");
  // ADD IF IMAGE, Cuz now some post without image is not showing....?

  imgElement.src = post._embedded["wp:featuredmedia"][0].source_url;
  imgElement.classList.add("img-postlist");

  const title = document.createElement("h4");
  title.textContent = post.title.rendered;

  postElement.append(imgElement);
  postElement.appendChild(title);
  postElements.append(postElement);

  if (displayContainer) {
    displayContainer.appendChild(postElements);
  } else {
    console.error("Display container not found");
  }
}

export function displayPosts(postList, displaySectionName) {
  const displayContainer = document.querySelector(displaySectionName);

  if (!displayContainer) {
    console.error("Display container not found");
    return;
  }

  displayContainer.innerHTML = "";

  postList.forEach((post) => {
    displayPost(post, displaySectionName);
  });
}
