import { fetchAllPosts } from "./api.js";
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
        const postListContainer = document.querySelector(".post-list");
        postListContainer.innerHTML = "";
        renderPosts();
      } catch (error) {
        console.error("Error handling filtered posts:", error);
      }
    });
}

///////////////////////////////////////////////////////////////////

export async function fetchPostsByCategory(targetCategory) {
  try {
    const posts = await fetchAllPosts();

    const filteredPosts = posts.filter((post) => {
      return (
        post.categories &&
        post.categories.some(
          (category) =>
            category && category.toLowerCase() === targetCategory.toLowerCase()
        )
      );
    });

    return filteredPosts;
  } catch (error) {
    console.error("Error fetching posts by category", error);
  }
}

export function getSelectedCategory(dropdownName) {
  const categoryElement = document.getElementById(dropdownName + "Select");

  return categoryElement.options[categoryElement.selectedIndex].label;
}

export function isDefaultCategorySelected(category) {
  return category === defaultCategory;
}
