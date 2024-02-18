export function initializeMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const myLinks = document.getElementById("myLinks");
  menuToggle.addEventListener("click", function () {
    myLinks.classList.toggle("show");
  });
}
