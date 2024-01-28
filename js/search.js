import { fetchAllPosts } from ""; // Create this
import { displayPosts } from ""; // Create this

const search = document.querySelector("#searchInput");

let typeTimer;

const doneTypingInterval = 50;

export async function fetchPostsAccordingToSearch(searchText) {
  const allPosts = await fetchAllPosts();
  const filteredPosts = allPosts.filter(
    (post) => post.title.toLowerCase().includes(searchText.toLowerCase()) //check if title. is the right argument=parameter
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
      `../films/index.html?search=${encodeURIComponent(searchValue)}` //check this make new url
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
    console.log("Filtered Films on Load:", filteredPosts);
    displayPosts(filteredPosts, ".post-list");
  }
});

//double check no film is left in the functions.
