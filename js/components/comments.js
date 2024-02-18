import { postComment } from "../api/api.js";

export function displayPostDetails() {
  const commentsContainer = document.querySelector(".comments-container");

  const postedCommentsContainer = document.createElement("div");

  // if(post.comment???){
  // const POSTCOMMENTELEMENT
  // postCommentContainer.appendChild(COMMENTELEMENT);
  // }

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
  //   commentsContainer.innerHTML = "";

  commentsContainer.appendChild(postedCommentsContainer);
  commentsContainer.appendChild(newCommentContainer);
  newCommentContainer.appendChild(button);
}
displayPostDetails();
