export function initializeMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const myLinks = document.getElementById("myLinks");
  console.log("loaded");
  menuToggle.addEventListener("click", function () {
    console.log("CLICK");
    myLinks.classList.toggle("show");
  });
}
