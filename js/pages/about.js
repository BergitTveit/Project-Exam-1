import { displayBigBannerSlider } from "../components/slider_homepage.js";

export async function loadAboutPage() {
  const aboutImages = ["About_me"];
  await displayBigBannerSlider(".about-slider", aboutImages);
  showUpAboutText();
}

function showUpAboutText() {
  var aboutElement = document.querySelector(".about");

  aboutElement.style.display = "block";
}
