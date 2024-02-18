import { fetchPostsSortedByDate } from "../api/fetching_api.js";
import { displayPosts } from "../render/bloglist.js";
import { showLoader, hideLoader } from "../utils/loader.js";
import { handleError } from "../utils/errors.js";
import { createElement } from "../utils/utils.js";

let currentIndex = 0;
const singlePostWidth = 200;

const widthArrows = 64 * 2;

let containerPostsCapasity;
calculatePostsCapacity();

// Finds gow many posts to display on device, for dynamic scaling ////////////////////////////
function calculatePostsCapacity() {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  const widthWithoutArrows = width - widthArrows;

  containerPostsCapasity = Math.min(
    Math.floor(widthWithoutArrows / singlePostWidth),
    4
  );
}

addEventListener("resize", () => {
  const previousCapasity = containerPostsCapasity;

  calculatePostsCapacity();
  if (previousCapasity !== containerPostsCapasity) {
    sliderBlogPosts(".slider-container", fetchPostsSortedByDate);
  }
});

export async function sliderBlogPosts(
  containerSelector,
  fetchPostsSourceCallback
) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error("Container not found.");
    return;
  }

  const backDiv = document.createElement("div");
  const backBtn = createElement("img", { src: "../assets/left_arrow.png" });
  backBtn.setAttribute("aria-label", "Previous Button");
  backDiv.appendChild(backBtn);

  const nextDiv = document.createElement("div");

  const nextBtn = createElement("img", { src: "../assets/right_arrow.png" });
  nextBtn.setAttribute("aria-label", "Next Button");
  nextDiv.appendChild(nextBtn);
  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("slider-wrapper");

  let posts;
  try {
    showLoader();

    if (typeof fetchPostsSourceCallback === "function") {
      posts = await fetchPostsSourceCallback();
    } else {
      throw new Error("fetchPostsSourceCallback is not a function");
    }
  } catch (error) {
    container.innerHTML = handleError(" Unable to load posts slider");
    hideLoader();
    return;
  }
  hideLoader();
  container.innerHTML = "";

  backBtn.addEventListener("click", () =>
    moveSlider(posts, -1, ".slider-wrapper", calculatePostsCapacity)
  );
  nextBtn.addEventListener("click", () =>
    moveSlider(posts, 1, ".slider-wrapper", calculatePostsCapacity)
  );

  container.appendChild(backDiv);
  container.appendChild(sliderWrapper);
  container.appendChild(nextDiv);

  displayPosts(
    posts.slice(currentIndex, currentIndex + containerPostsCapasity),
    ".slider-wrapper",
    containerPostsCapasity
  );
}

// Move Slider
export function moveSlider(items, direction, containerSelector, capacity) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > items.length - containerPostsCapasity) {
    currentIndex = items.length - containerPostsCapasity;
  }

  const visibleItems = items.slice(
    currentIndex,
    currentIndex + containerPostsCapasity
  );
  const displayContainer = document.querySelector(containerSelector);
  displayContainer.innerHTML = "";
  displayPosts(visibleItems, containerSelector, containerPostsCapasity);
}

document.addEventListener("DOMContentLoaded", async () => {
  await sliderBlogPosts(".slider-container", fetchPostsSortedByDate);
});
