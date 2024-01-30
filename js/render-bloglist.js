export async function displayPost(post, displaySectionName) {
  const displayContainer = document.querySelector(displaySectionName);

  const postElements = document.createElement("div");
  postElements.classList.add("post-item");

  const postElement = document.createElement("a");
  postElement.href = `/post/?id=${post.id}`;
  postElement.classList.add("post-link");

  // const img = document.createElement("img");
  // img.src = post.images[0]?.src;
  // img.src = post._embedded["wp:featuredmedia"][0].source_url;
  // img.alt = post.name;

  const title = document.createElement("h4");
  title.textContent = post.title.rendered;

  // postElement.append(img);
  postElements.append(postElements, title);

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
