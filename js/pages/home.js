import { displayBigBannerSlider } from "../components/slider_homepage.js";
import { fetchPostsSortedByDate } from "../api/fetching.js";
import {
  displayPostsSlider,
  calculatePostsCapacity,
  containerPostsCapacity,
} from "../components/sliders.js";

const homepageImages = ["homepage1", "homepage2", "homepage3"];

export async function loadHomePage() {
  calculatePostsCapacity();
  await displayBigBannerSlider(".homepage-slider", homepageImages);
  await displayPostsSlider(".slider-container", fetchPostsSortedByDate);
}

addEventListener("resize", () => {
  const previousCapasity = containerPostsCapacity;

  calculatePostsCapacity();
  if (previousCapasity !== containerPostsCapacity) {
    displayPostsSlider(".slider-container", fetchPostsSortedByDate);
  }
});
