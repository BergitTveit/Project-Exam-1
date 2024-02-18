import { displayPosts } from "../render/bloglist.js"; // Create this
import { fetchPostsAccordingToSearch } from "../api/fetching_api.js"; // Create this

//SEARCH WORKING BUT NOT WORKING ON DETAILS PAGE, check paths
const search = document.querySelector("#searchInput");

let typeTimer;

const doneTypingInterval = 100;

search.addEventListener("keyup", async function (event) {
  clearTimeout(typeTimer);
  typeTimer = setTimeout(async () => {
    const searchValue = event.target.value.trim().toLowerCase();
    location.href = getUrlWithSearchValue(location.href, searchValue);
    localStorage.setItem("searchValue", searchValue);

    const filteredPosts = await fetchPostsAccordingToSearch(searchValue);
    displayPosts(filteredPosts, ".blog-list-container"); // create class
  }, doneTypingInterval);
});

document.addEventListener("DOMContentLoaded", async () => {
  const storedSearchValue = localStorage.getItem("searchValue");
  if (storedSearchValue) {
    search.value = storedSearchValue;
    const filteredPosts = await fetchPostsAccordingToSearch(storedSearchValue);
    displayPosts(filteredPosts, ".blog-list-container");
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
