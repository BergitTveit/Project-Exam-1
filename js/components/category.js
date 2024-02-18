import { fetchAllPosts } from "../api/fetching_api.js";
import { renderPosts } from "./bloglist.js";

const defaultCategory = "-- All Categories --";

export async function renderCategoryDropdown(containerId) {
  const dropDowncontainer = document.getElementById(containerId);
  if (!dropDowncontainer) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  const dropdown = document.createElement("select");
  dropdown.id = containerId + "Select";
  const defaultOption = document.createElement("option");
  defaultOption.text = defaultCategory;
  dropdown.add(defaultOption);

  const posts = await fetchAllPosts();
  const categories = [...new Set(posts.flatMap((post) => post.categories))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.text = category;
    dropdown.add(option);
  });
  dropDowncontainer.appendChild(dropdown);

  document
    .getElementById(containerId)
    .addEventListener("change", async (event) => {
      try {
        const postListContainer = document.querySelector(
          ".blog-list-container"
        );
        postListContainer.innerHTML = "";
        renderPosts();
      } catch (error) {
        console.error("Error handling filtered posts:", error);
      }
    });
}

export function isDefaultCategorySelected(category) {
  return category === defaultCategory;
}
