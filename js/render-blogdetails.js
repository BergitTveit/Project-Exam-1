export function displayPostDetails(post) {
  const postDetailsContainer = document.querySelector(".post-details");
  const postTitle = document.createElement("h2");
  const postImage = document.createElement("img");

  postTitle.textContent = post.title?.rendered || "Untitled";

  postDetailsContainer.innerHTML = "";
  // postImage = _embedded["wp:featuredmedia"][0].source_url;

  postDetailsContainer.appendChild(postTitle);
  // postDetailsContainer.appendChild(postImage);
}
// postImage.src = post[0]?.featured_media;
// const postPrice = document.createElement("p");
// const postDescription = document.createElement("p");

// postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
// postImage.alt = "Find out how to fetch it";

// if (post.prices && post.prices.price) {
//   const majorUnitsPrice = parseFloat(post.prices.price) / 100;
//   postPrice.textContent = `${majorUnitsPrice.toFixed(0)} ,-`;
// } else {
//   postPrice.textContent = "Price not available";
// }

// postDescription.innerHTML =
// post.excerpt.rendered || "Description not available"; // Check API for what path is needed

//
// postDetailsContainer.appendChild(postPrice);
//   postDetailsContainer.appendChild(postDescription);
// }
