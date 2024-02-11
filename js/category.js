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
}

document
  .getElementById("categoryDropdown")
  .addEventListener("change", async (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory !== "-- Select Category --") {
      try {
        const filteredPosts = await fetchpostsByCategory(selectedCategory);

        console.log("Filtered posts:", filteredPosts);
      } catch (error) {
        console.error("Error handling filtered posts:", error);
      }
    }
  });
