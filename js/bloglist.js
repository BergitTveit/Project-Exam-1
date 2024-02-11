import { fetchPostsSortedByDate } from "./api.js";
import { displayPosts } from "./render-bloglist.js";
import { showLoader, hideLoader } from "./loader.js";
import { fetchPostsAccordingToSearch } from "./search.js";
import { handleError } from "./errors.js";

let posts;
// Creating the posts page for all posts, initially show 9 posts.////////////////
export async function postsPage() {
  const postListContainer = document.querySelector(".post-list");

  try {
    showLoader();

    const url = new URL(location.href);
    const searchValue = url.searchParams.get("search");

    if (searchValue) {
      posts = await fetchPostsAccordingToSearch(searchValue);
    } else {
      posts = await fetchPostsSortedByDate();
    }
  } catch (error) {
    postListContainer.innerHTML = handleError(" Unable to load post page");
  }
  hideLoader();
  postListContainer.innerHTML = "";

  displayPosts(posts, ".post-list", 9);

  if (posts.length > 9) {
    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.textContent = "See more";
    loadMoreBtn.addEventListener("click", loadMorePosts);
    postListContainer.appendChild(loadMoreBtn);
  }
}
// Loading more posts. ////////////////////////////////////////
async function loadMorePosts() {
  const postListContainer = document.querySelector(".post-list");
  const loadMoreBtn = document.querySelector("button");

  const displayContainer = document.querySelector(".post-list");
  displayContainer.innerHTML = "";
  displayPosts(posts, ".post-list", posts.length);

  loadMoreBtn.style.display = "none";
}

//Calling postspage //////////////////////////////////////
postsPage();

//   const genreSelect = document.getElementById("genreSelect");  // UPDATE TO SORT WHAT WE OFFER
//   genreSelect.addEventListener("change", async function () {
//     const selectedGenre = genreSelect.value;

//     try {
//       showLoader();
//       let filteredposts;

//       if (selectedGenre === "All") {
//         filteredposts = await fetchAllposts();
//       } else {
//         filteredposts = await fetchpostsByGenre(selectedGenre);
//       }

//       hideLoader();
//       postListContainer.innerHTML = "";
//       displayposts(filteredposts, ".post-list");
//     } catch (error) {
//       hideLoader();
//       postListContainer.innerHTML = handleError("Unable to load posts");
//     }
//   });
