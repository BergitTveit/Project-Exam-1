import { fetchAllPosts, fetchPostById } from "../api/fetching.js";
import { displayPostDetails } from "../render/blogdetails.js";

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
