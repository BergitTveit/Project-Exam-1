import { imageUrlByName } from "./api.js";
import { handleError } from "./utils/errors.js";
import { hideLoader } from "./utils/loader.js";

export const homepageImages = ["homepage1", "homepage2", "homepage3"];
const aboutImages = ["About_me"];
let HPImages = [];
let currentIndex = 0;
export async function imageSlider(containerSelector, imageNames) {
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
    const imageUrls = await Promise.all(
      imageNames.map((imageName) => imageUrlByName(imageName))
    );

    // create img with width

    const width = getDeviceWidth();

    imageUrls.forEach((imageUrl, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.style.width = "100%";
      imgElement.style.display = index === 0 ? "block" : "none";
      sliderWrapper.appendChild(imgElement);
      HPImages.push(imgElement);
    });

    container.appendChild(sliderWrapper);

    // Adding event listener for window resize
    window.addEventListener("resize", () => {
      const w = getDeviceWidth();
      HPImages.forEach((imgElement) => {
        setAttributeWidth(imgElement, w);
      });
    });
    window.addEventListener("keydown", handleKeyboardNavigation);

    const prevButton = createNavigationButton(
      "",
      showPrevImage,
      "prvBtn",
      "prev-button"
    );
    prevButton.setAttribute("aria-label", "Previous Button");
    container.appendChild(prevButton);
    container.appendChild(sliderWrapper);
    const nextButton = createNavigationButton(
      "",
      showNextImage,
      "nextBtn",
      "next-button"
    );
    nextButton.setAttribute("aria-label", "Next Button");
    container.appendChild(nextButton);

    function handleKeyboardNavigation(event) {
      if (event.key === "ArrowRight") {
        showNextImage();
      } else if (event.key === "ArrowLeft") {
        showPrevImage();
      }
    }
  } catch (error) {
    container.innerHTML = handleError(" Unable to load homepage images");
    hideLoader();
    return;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await imageSlider(".homepage-slider", homepageImages);
});
document.addEventListener("DOMContentLoaded", async () => {
  await imageSlider(".about-slider", aboutImages);
});
function showNextImage() {
  HPImages[currentIndex].style.display = "none";
  currentIndex = (currentIndex + 1) % HPImages.length;
  HPImages[currentIndex].style.display = "block";
}

function showPrevImage() {
  HPImages[currentIndex].style.display = "none";
  currentIndex = (currentIndex - 1 + HPImages.length) % HPImages.length;
  HPImages[currentIndex].style.display = "block";
}

function createNavigationButton(text, clickHandler, id, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  button.classList.add(className);
  button.id = id;
  return button;
}

function getDeviceWidth() {
  return window.innerWidth > 0 ? window.innerWidth : screen.width;
}

function setAttributeWidth(element, width) {
  element.width = width;
}
