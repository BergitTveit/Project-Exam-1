import { imageUrlByName } from "./api.js";
import { handleError } from "./errors.js";
import { hideLoader } from "./loader.js";
import { displayPosts } from "./render-bloglist.js";
import { moveSlider, createElement } from "./sliders.js";

export const homepageImages = ["homepage1", "homepage2", "homepage3"];
let currentIndex = 0;

export async function wholescreenImageSlider(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error("Container not found.");
    return;
  }

  const backBtn = createElement("img", { src: "../assets/left_arrow.png" });
  const nextBtn = createElement("img", { src: "../assets/right_arrow.png" });

  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("homepage-slider-wrapper");

  // try {
  hideLoader();
  container.innerHTML = "";
  const HPImages = await Promise.all(
    homepageImages.map((imageName) => imageUrlByName(imageName))
  );
  console.log(HPImages);

  backBtn.addEventListener("click", () =>
    moveSlider(HPImages, -1, ".homepage-slider-wrapper")
  );
  nextBtn.addEventListener("click", () =>
    moveSlider(HPImages, 1, ".homepage-slider-wrapper")
  );

  container.appendChild(backBtn);
  container.appendChild(sliderWrapper);
  container.appendChild(nextBtn);
  HPImages.forEach((imageUrl) => {
    const imgElement = createElement("img", { src: imageUrl });
    sliderWrapper.appendChild(imgElement);
  });

  // } catch (error) {
  //   container.innerHTML = handleError(" Unable to load homepage images");
  //   hideLoader();
  //   return;
  // }
}

document.addEventListener("DOMContentLoaded", async () => {
  await wholescreenImageSlider(".homepage-slider");
});
