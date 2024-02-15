import { fetchPostsSortedByDate } from "./api.js";
import { displayPosts } from "./render-bloglist.js";
import { showLoader, hideLoader } from "./loader.js";
import { handleError } from "./errors.js";

let currentIndex = 0;
const singlePostWidth = 200;
const spaceBetweenPost = 20;
const widthArrows = 64 * 2;

let containerPostsCapasity;
calculatePostsCapacity();

// Finds gow many posts to display on device, for dynamic scaling ////////////////////////////
function calculatePostsCapacity() {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  const widthWithoutArrows = width - widthArrows;

  containerPostsCapasity = Math.min(
    Math.floor(widthWithoutArrows / (singlePostWidth + spaceBetweenPost)),
    4
  );
}

addEventListener("resize", () => {
  const previousCapasity = containerPostsCapasity;

  calculatePostsCapacity();
  if (previousCapasity !== containerPostsCapasity) {
    sliderBlogPosts(fetchPostsSortedByDate);
  }
});

// Creating slider, Make more generic, so i can use it for homeslider ////////////******** */
export async function sliderBlogPosts(
  containerSelector,
  backAndNextButtons,
  fetchSlidesSourceCallback
) {
  const sliderContainer = document.querySelector(containerSelector);

  const backAndNextButtons = { leftArrow, rightArrow };

  const backBtn = createElement("img", { src: leftArrow });
  const nextBtn = createElement("img", { src: rightArrow });

  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("slider-wrapper");

  let posts;
  try {
    showLoader();

    if (typeof fetchSlidesSourceCallback === "function") {
      posts = await fetchSlidesSourceCallback();
    } else {
      throw new Error("fetchSLidesCallback is not a function");
    }
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
// Move Slider //////////////////////////////////////////////////////////////////
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

// Loading content..... /////////////////
document.addEventListener("DOMContentLoaded", async () => {
  await sliderBlogPosts();
});

//HOMEPAGE SLIDER
// WIDTH = device width
