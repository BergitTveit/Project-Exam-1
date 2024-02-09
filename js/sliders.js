import { fetchPostsSortedByDate } from "./api.js";
import { displayPosts } from "./render-bloglist.js";
import { showLoader, hideLoader } from "./loader.js";
import { handleError } from "./errors.js";
let posts;
export async function sliderBlogPosts() {
  const sliderContainer = document.querySelector(".slider-container");

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

  displayPosts(posts, ".slider-container", 3);
  //   displaySlider();
}

// async function displaySlider() {
//   const sliderContainer = document.querySelector(".slider-container");
//   const posts = document.querySelectorAll(".post");
//   const totalPosts = posts.length;
//   let currentIndex = 0;

//   sliderContainer.style.width = `${totalPosts * 100}%`;

//   document.getElementById("prevBtn").addEventListener("click", function () {
//     slideTo(currentIndex - 1);
//   });

//   document.getElementById("nextBtn").addEventListener("click", function () {
//     slideTo(currentIndex + 1);
//   });

//   function slideTo(index) {
//     if (index >= totalPosts || index < 0) {
//       return;
//     }

//     const translateValue = -index * (100 / totalPosts) + "%";
//     sliderContainer.style.transform = "translateX(" + translateValue + ")";
//     currentIndex = index;
//   }
// }

sliderBlogPosts();
