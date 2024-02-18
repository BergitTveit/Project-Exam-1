export function showLoader() {
  document.innerHtml = "";
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}
