import { postComment } from "../api/posting.js";

export function displayComments() {
  const commentsContainer = document.querySelector(".comments-container");

  const postedCommentsContainer = document.createElement("div");

  const newCommentContainer = document.createElement("div");
  const button = document.createElement("button");
  button.innerText = "POST COMMENTS";
  button.addEventListener("click", () => {
    const comment = {
      author_name: "name",
      content: "lbdflsjdnflsdjkfnk",
      post: 1,
    };
    postComment(comment);
  });

  commentsContainer.appendChild(postedCommentsContainer);
  commentsContainer.appendChild(newCommentContainer);
  newCommentContainer.appendChild(button);
}
