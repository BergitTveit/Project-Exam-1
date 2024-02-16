import { imageUrlByName } from "./api.js";
import { handleError } from "./errors.js";
import { hideLoader } from "./loader.js";

import { moveSlider, createElement } from "./sliders.js";

export const homepageImages = ["homepage1", "homepage2", "homepage3"];
let currentIndex = 0;

export async function wholeScreenImageSlider(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error("Container not found.");
    return;
  }

  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("homepage-slider-wrapper");
  try {
    hideLoader();
    container.innerHTML = "";

    // Fetching image URLs
    const HPImages = await Promise.all(
      homepageImages.map((imageName) => imageUrlByName(imageName))
    );
    // create img with width
    console.log("ELEMENTS:::::", HPImages.id);
    const width = getDeviceWidth();

    HPImages.forEach((imageUrl) => {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.style.width = "100%";
      console.log("IMG ELEMENT", imgElement, imgElement.id);
      setAttributeWidth(imgElement, width);
      sliderWrapper.appendChild(imgElement);
    });
    container.appendChild(sliderWrapper);

    // Adding event listener for window resize
    window.addEventListener("resize", () => {
      const w = getDeviceWidth();
      HPImages.forEach((imgElement) => {
        setAttributeWidth(imgElement, w);
      });

      container.appendChild(sliderWrapper);
    });
  } catch (error) {
    container.innerHTML = handleError(" Unable to load homepage images");
    hideLoader();
    return;
  }
}

function getDeviceWidth() {
  return window.innerWidth > 0 ? window.innerWidth : screen.width;
}

function setAttributeWidth(element, width) {
  element.width = width;
}

document.addEventListener("DOMContentLoaded", async () => {
  await wholeScreenImageSlider(".homepage-slider");
});

// backBtn.addEventListener("click", () =>
//   moveSlider(HPImages, -1, ".homepage-slider-wrapper")
// );
// nextBtn.addEventListener("click", () =>
//   moveSlider(HPImages, 1, ".homepage-slider-wrapper")
// );
// container.appendChild(backBtn); // container.appendChild(nextBtn);
