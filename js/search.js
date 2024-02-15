import { fetchAllPosts } from "./api.js"; // Create this
import { displayPosts } from "./render-bloglist.js"; // Create this
//SEARCH WORKING BUT NOT WORKING ON DETAILS PAGE, check paths
const search = document.querySelector("#searchInput");

let typeTimer;

const doneTypingInterval = 100;

export async function fetchPostsAccordingToSearch(searchText) {
  const allPosts = await fetchAllPosts();
  const filteredPosts = allPosts.filter(
    (post) => post.title.toLowerCase().includes(searchText.toLowerCase()) //check parameters (ADDED RENDERED)
  );

  return filteredPosts;
}

search.addEventListener("keyup", async function (event) {
  clearTimeout(typeTimer);
  console.log("TIMEEER", typeTimer);
  typeTimer = setTimeout(async () => {
    const searchValue = event.target.value.trim().toLowerCase();
    location.href = getUrlWithSearchValue(location.href, searchValue);
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
    displayPosts(filteredPosts, ".post-list");
  }
});

function getUrlWithSearchValue(url, searchValue) {
  const index = url.indexOf("?search");
  if (searchValue) {
    return index === -1
      ? url + `?search=${encodeURIComponent(searchValue)}`
      : url.substring(0, index + 8) + `${encodeURIComponent(searchValue)}`;
  }

  return index === -1 ? url : url.substring(0, index);
}
