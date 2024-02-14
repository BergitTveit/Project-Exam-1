import { fetchAllPosts } from "./api.js";

export function renderCategoryDropdown(categories, containerId) {
  const dropDowncontainer = document.getElementById(containerId);

  if (!dropDowncontainer) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  const dropdown = document.createElement("select");
  dropdown.id = "categoryDropdownElement";

  const defaultOption = document.createElement("option");
  defaultOption.text = "-- Select Category --";
  dropdown.add(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.text = category;
    dropdown.add(option);
  });

  dropDowncontainer.appendChild(dropdown);

  document
    .getElementById(containerId)
    .addEventListener("change", async (event) => {
      const selectedCategory = event.target.value;

      if (selectedCategory !== "-- Select Category --") {
        try {
          const filteredPosts = await fetchPostsByCategory(
            selectedCategory,
            renderCategoryDropdown
          );
        } catch (error) {
          console.error("Error handling filtered posts:", error);
        }
      }
    });
}

///////////////////////////////////////////////////////////////////

export async function fetchPostsByCategory(
  targetCategory,
  renderDropdownCallback
) {
  try {
    const posts = await fetchAllPosts();

    const uniqueCategories = [
      ...new Set(posts.flatMap((post) => post.categories)),
    ];

    if (typeof renderDropdownCallback === "function") {
      renderDropdownCallback(uniqueCategories, "categoryDropdownContainer");
    }

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
