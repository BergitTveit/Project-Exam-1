const slidesContainer = document.getElementById("slides-container");

const slide = document.querySelector(".slide");

const prevButton = document.getElementById("slide-arrow-prev");

const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;

  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;

  slidesContainer.scrollLeft -= slideWidth;
});

export function homeSlider() {
  const sliderContainer = document.querySelector(".slider-container");
  const backBtn = createElement("img", { src: "../assets/left_arrow.png" });
  const nextBtn = createElement("img", { src: "../assets/right_arrow.png" });

  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("slider-wrapper");
}
