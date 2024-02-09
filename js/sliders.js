import { fetchPostsSortedByDate } from "./api.js";
import { displayPosts } from "./render-bloglist.js";
import { showLoader, hideLoader } from "./loader.js";
import { handleError } from "./errors.js";

let currentIndex = 0;

export async function sliderBlogPosts() {
  const sliderContainer = document.querySelector(".slider-container");
  const backBtn = createElement("img", { src: "../assets/left_arrow.png" });
  const nextBtn = createElement("img", { src: "../assets/right_arrow.png" });
  // const sliderWrapper = createElement("div", { class: "slider-wrapper" });
  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("slider-wrapper");
  let posts;
  try {
    showLoader();

    posts = await fetchPostsSortedByDate();
  } catch (error) {
    sliderContainer.innerHTML = handleError(" Unable to load posts slider");
    hideLoader();
    return;
  }
  hideLoader();
  sliderContainer.innerHTML = "";

  backBtn.addEventListener("click", () => moveSlider(posts, -1));
  nextBtn.addEventListener("click", () => moveSlider(posts, 1));

  sliderContainer.appendChild(backBtn);
  sliderContainer.appendChild(sliderWrapper);
  sliderContainer.appendChild(nextBtn);
  const sss = document.querySelector(".slider-wrapper");

  console.log("¤¤¤¤¤¤¤¤¤¤: ", sss);
  displayPosts(
    posts.slice(currentIndex, currentIndex + 3),
    ".slider-wrapper",
    3
  );
}

function moveSlider(posts, direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > posts.length - 3) {
    currentIndex = posts.length - 3;
  }

  const visiblePosts = posts.slice(currentIndex, currentIndex + 3);
  displayPosts(visiblePosts, ".slider-wrapper", 3);
}

function createElement(tag, options) {
  const element = document.createElement(tag);

  Object.assign(element, options);
  return element;
}

// sliderBlogPosts();
document.addEventListener("DOMContentLoaded", async () => {
  await sliderBlogPosts();
});
