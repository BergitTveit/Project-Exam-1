import { addToCart } from "../pages/cart.js";

export async function displayFilm(film, displaySectionName) {
  const displayContainer = document.querySelector(displaySectionName);

  const filmElements = document.createElement("div");
  filmElements.classList.add("film-item");

  const filmElement = document.createElement("a");
  filmElement.href = `/film/?id=${film.id}`;
  filmElement.classList.add("film-link");

  const img = document.createElement("img");
  img.src = film.images[0]?.src;
  img.alt = film.name;

  const title = document.createElement("h4");
  title.textContent = film.name;

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = film.add_to_cart.text;
  addToCartBtn.classList.add("button-style1");
  addToCartBtn.addEventListener(`click`, () => {
    addToCart(film);

    alert("button clicked ", film.name);
  });

  filmElement.append(img);
  filmElements.append(filmElement, title, addToCartBtn);

  if (displayContainer) {
    displayContainer.appendChild(filmElements);
  } else {
    console.error("Display container not found");
  }
}

export function displayFilms(filmList, displaySectionName) {
  const displayContainer = document.querySelector(displaySectionName);

  if (!displayContainer) {
    console.error("Display container not found");
    return;
  }

  displayContainer.innerHTML = "";

  filmList.forEach((film) => {
    displayFilm(film, displaySectionName);
  });
}
