import { postDetailPage } from "../components/blogdetails.js";
import { displayComments } from "../components/comments.js";

export async function loadPostPage() {
  postDetailPage();
  displayComments();
}
