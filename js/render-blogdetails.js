export function displaypostDetails(post) {
  const postDetailsContainer = document.querySelector(".post-details");
  const postTitle = document.createElement("h2");
  const postImage = document.createElement("img");
  const postPrice = document.createElement("p");
  const postDescription = document.createElement("p");

  postTitle.textContent = post.name;

  postImage.src = post.images[0]?.src;
  postImage.alt = post.name;
  if (post.prices && post.prices.price) {
    const majorUnitsPrice = parseFloat(post.prices.price) / 100;
    postPrice.textContent = `${majorUnitsPrice.toFixed(0)} ,-`;
  } else {
    postPrice.textContent = "Price not available";
  }
  postDescription.innerHTML = post.description || "Description not available";

  postDetailsContainer.innerHTML = "";

  postDetailsContainer.appendChild(postTitle);
  postDetailsContainer.appendChild(postImage);
  postDetailsContainer.appendChild(postPrice);
  postDetailsContainer.appendChild(postDescription);
}
