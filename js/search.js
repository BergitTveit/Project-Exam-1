import { fetchAllPosts } from "./api.js"; // Create this
import { displayPosts } from "./render-bloglist.js"; // Create this
//SEARCH WORKING BUT NOT WORKING ON DETAILS PAGE, check paths
const search = document.querySelector("#searchInput");

let typeTimer;

const doneTypingInterval = 50;

export async function fetchPostsAccordingToSearch(searchText) {
  const allPosts = await fetchAllPosts();
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.rendered.toLowerCase().includes(searchText.toLowerCase()) //check parameters (ADDED RENDERED)
  );
  console.log("Filtered Posts:", filteredPosts);
  return filteredPosts;
}

search.addEventListener("input", async (event) => {
  clearTimeout(typeTimer);

  typeTimer = setTimeout(async () => {
    const searchValue = event.target.value.trim().toLowerCase();
    window.history.replaceState(
      {},
      "",
      `../bloglist/index.html?search=${encodeURIComponent(searchValue)}` //check this make new url UPDATED to bloglist.
    );
    localStorage.setItem("searchValue", searchValue);

    const filteredPosts = await fetchPostsAccordingToSearch(searchValue);
    displayPosts(filteredPosts, ".post-list"); // create class
  }, doneTypingInterval);
});

document.addEventListener("DOMContentLoaded", async () => {
  const storedSearchValue = localStorage.getItem("searchValue");
  if (storedSearchValue) {
    search.value = storedSearchValue;
    const filteredPosts = await fetchPostsAccordingToSearch(storedSearchValue);
    console.log("Filtered posts on Load:", filteredPosts);
    displayPosts(filteredPosts, ".post-list");
  }
});
