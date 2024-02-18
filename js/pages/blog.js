import { renderPosts } from "../components/bloglist.js";
import { renderCategoryDropdown } from "../components/category.js";

export async function loadBlogPage() {
  const categoryDropdownName = "categoryDropdownContainer";

  await renderCategoryDropdown(categoryDropdownName);
  await renderPosts();
}
