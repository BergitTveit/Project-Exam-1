import { fetchAllPosts } from "./api.js";

export function renderCategoryDropdown(categories, containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  const dropdown = document.createElement("select");
  dropdown.id = "categoryDropdown";

  const defaultOption = document.createElement("option");
  defaultOption.text = "-- Select Category --";
  dropdown.add(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.text = category;
    dropdown.add(option);
  });

  container.appendChild(dropdown);

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

          console.log("Filtered posts:", filteredPosts);
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

    console.log("All Categories:", uniqueCategories);

    if (typeof renderDropdownCallback === "function") {
      renderDropdownCallback(uniqueCategories, "categoryDropdownContainer");
    }

    console.log("All Posts:", posts);

    const filteredPosts = posts.filter((post) => {
      console.log(`Post ID ${post.id} Categories:`, post.categories);
      return (
        post.categories &&
        post.categories.some(
          (category) =>
            category && category.toLowerCase() === targetCategory.toLowerCase()
        )
      );
    });

    console.log(
      `Filtered Posts for Category ${targetCategory}:`,
      filteredPosts
    );
    return filteredPosts;
  } catch (error) {
    console.error("Error fetching posts by category", error);
  }
}
fetchPostsByCategory("YourTargetCategory", renderCategoryDropdown);
