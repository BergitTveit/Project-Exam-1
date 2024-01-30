import { fetchAllPosts } from "./api.js";
import { displayPosts } from "./render-bloglist.js";
import { showLoader, hideLoader } from "./loader.js";
import { fetchPostsAccordingToSearch } from "./search.js";
import { handleError } from "./errors.js";

export async function postsPage() {
  const postListContainer = document.querySelector(".post-list");
  let posts;

  try {
    showLoader();

    const url = new URL(location.href);
    const searchValue = url.searchParams.get("search");

    if (searchValue) {
      posts = await fetchPostsAccordingToSearch(searchValue);
    } else {
      posts = await fetchAllPosts();
      console.log(posts);
    }
  } catch (error) {
    postListContainer.innerHTML = handleError(" Unable to load post page");
  }
  hideLoader();

  displayPosts(posts, ".post-list");

  //   const genreSelect = document.getElementById("genreSelect");
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
}

postsPage();
