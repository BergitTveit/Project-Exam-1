// function mobileMenu() {
//   var x = document.getElementById("myLinks");
//   if (x.style.display === "block") {
//     x.style.display = "none";
//   } else {
//     x.style.display = "block";
//   }
// }
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const myLinks = document.getElementById("myLinks");
  console.log("loaded");
  menuToggle.addEventListener("click", function () {
    console.log("CLICK");
    myLinks.classList.toggle("show");
  });
});
