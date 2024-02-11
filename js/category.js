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

renderCategoryDropdown(
  ["Category1", "Category2", "Category3"],
  "categoryDropdownContainer"
);
