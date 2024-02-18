import { fetchAllPosts, fetchPostById } from "../api.js";
import { displayPostDetails } from "../render-blogdetails.js";

// Update page title, for the post entered.
export async function updatePageTitle(postId) {
  try {
    const posts = await fetchAllPosts();

    const post = posts.find((post) => post.id === parseInt(postId));

    if (post && post.title) {
      document.title = post.title;
    } else {
      throw new Error("Post data or Title is undefined");
    }
  } catch (error) {
    document.title = "ERROR: can not fetch title";
    console.error("Error: can not fetch title", error);
  }
}

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("post-link")) {
    event.preventDefault();

    const postId = new URL(event.target.href).searchParams.get("id");

    await updatePageTitle(postId);
  }
});

// Creating the detail page for single post.

export async function postDetailPage() {
  const postDetailsContainer = document.querySelector(".post-details");

  try {
    const url = new URL(location.href);

    const postId = url.searchParams.get("id");
    await updatePageTitle(postId);

    if (postId) {
      const post = await fetchPostById(postId);
      displayPostDetails(post);
    } else {
      throw new Error("post ID is undefined");
    }
  } catch (error) {
    console.error("Error fetching post details:", error);
    postDetailsContainer.innerHTML = "Unable to fetch post details.";
  }
}

postDetailPage();
