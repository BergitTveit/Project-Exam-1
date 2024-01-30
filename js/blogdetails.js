import { fetchPostById } from "./api.js";
import { displaypostDetails } from "./render-blogdetails.js";

export async function postDetailPage() {
  const postDetailsContainer = document.querySelector(".post-details");

  try {
    const url = new URL(location.href);
    const postId = url.searchParams.get("id");

    if (postId) {
      const post = await fetchPostById(postId);
      displaypostDetails(post);
    } else {
      throw new Error("post ID is undefined");
    }
  } catch (error) {
    console.error("Error fetching post details:", error);
    postDetailsContainer.innerHTML = "Unable to fetch post details.";
  }
}

postDetailPage();
