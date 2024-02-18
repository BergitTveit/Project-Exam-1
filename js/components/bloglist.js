import { fetchPostsSortedByDate } from "../api/api.js";
import { displayPosts } from "../render/bloglist.js";
import { showLoader, hideLoader } from "../utils/loader.js";
import { fetchPostsAccordingToSearch } from "./search.js";
import { handleError } from "../utils/errors.js";
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
  const postListContainer = document.querySelector(".blog-list-container");
  const loadMoreContainer = document.getElementById("load-more");
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

  displayPosts(posts, ".blog-list-container", numberOfPostsToDisplay);

  if (posts.length > numberOfPostsToDisplay) {
    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.textContent = "See more";
    loadMoreBtn.classList.add("load-more-button");
    loadMoreBtn.addEventListener("click", loadMorePosts);
    loadMoreContainer.appendChild(loadMoreBtn);
  }
}

// Loading more posts. ////////////////////////////////////////

async function loadMorePosts() {
  const postListContainer = document.querySelector(".blog-list-container");
  const loadMoreBtn = document.querySelector("button");

  const displayContainer = document.querySelector(".blog-list-container");
  displayContainer.innerHTML = "";
  displayPosts(posts, ".blog-list-container", posts.length);

  loadMoreBtn.style.display = "none";
}

postsPage();
