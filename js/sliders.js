import { fetchPostsSortedByDate } from "./api.js";
import { displayPosts } from "./render-bloglist.js";
import { showLoader, hideLoader } from "./loader.js";
import { handleError } from "./errors.js";

let currentIndex = 0;
const singlePostWidth = 200;
const spaceBetweenPost = 20;
const widthArrows = 64 * 2;

let containerPostsCapasity;
calculatePostsCapasity();

function calculatePostsCapasity() {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  const widthWithoutArrows = width - widthArrows;

  containerPostsCapasity = Math.min(
    Math.floor(widthWithoutArrows / (singlePostWidth + spaceBetweenPost)),
    4
  );
}

addEventListener("resize", () => {
  const previousCapasity = containerPostsCapasity;

  calculatePostsCapasity();
  if (previousCapasity !== containerPostsCapasity) {
    sliderBlogPosts();
  }
});

export async function sliderBlogPosts() {
  const sliderContainer = document.querySelector(".slider-container");
  const backBtn = createElement("img", { src: "../assets/left_arrow.png" });
  const nextBtn = createElement("img", { src: "../assets/right_arrow.png" });
  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("slider-wrapper");

  console.log(containerPostsCapasity);

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

  displayPosts(
    posts.slice(currentIndex, currentIndex + containerPostsCapasity),
    ".slider-wrapper",
    containerPostsCapasity
  );
}

function moveSlider(posts, direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > posts.length - containerPostsCapasity) {
    currentIndex = posts.length - containerPostsCapasity;
  }

  const visiblePosts = posts.slice(
    currentIndex,
    currentIndex + containerPostsCapasity
  );
  const displayContainer = document.querySelector(".slider-wrapper");
  displayContainer.innerHTML = "";
  displayPosts(visiblePosts, ".slider-wrapper", containerPostsCapasity);
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
