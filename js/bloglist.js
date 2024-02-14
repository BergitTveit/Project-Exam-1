import { fetchPostsSortedByDate } from "./api.js";
import { displayPosts } from "./render-bloglist.js";
import { showLoader, hideLoader } from "./loader.js";
import { fetchPostsAccordingToSearch } from "./search.js";
import { handleError } from "./errors.js";
import {
  fetchPostsByCategory,
  getSelectedCategory,
  renderCategoryDropdown,
  isDefaultCategorySelected,
} from "./category.js";

const numberOfPostsToDisplay = 9;
const categoryDropdownName = "categoryDropdownContainer";

let posts;
// Creating the posts page for all posts, initially show 9 posts.////////////////
export async function postsPage() {
  await renderCategoryDropdown(categoryDropdownName);
  await renderPosts();
}

export async function renderPosts() {
  const postListContainer = document.querySelector(".post-list");
  try {
    showLoader();

    const url = new URL(location.href);
    const searchValue = url.searchParams.get("search");

    const category = getSelectedCategory(categoryDropdownName);

    if (searchValue) {
      posts = await fetchPostsAccordingToSearch(searchValue);
    } else if (!isDefaultCategorySelected(category)) {
      posts = await fetchPostsByCategory(category);
    } else {
      posts = await fetchPostsSortedByDate();
    }
  } catch (error) {
    postListContainer.innerHTML = handleError(" Unable to load post page");
    hideLoader();
    return;
  }

  hideLoader();
  postListContainer.innerHTML = "";

  displayPosts(posts, ".post-list", numberOfPostsToDisplay);

  if (posts.length > numberOfPostsToDisplay) {
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

postsPage();
