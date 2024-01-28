export function displayFilmDetails(film) {
  const filmDetailsContainer = document.querySelector(".film-details");
  const filmTitle = document.createElement("h2");
  const filmImage = document.createElement("img");
  const filmPrice = document.createElement("p");
  const filmDescription = document.createElement("p");

  filmTitle.textContent = film.name;

  filmImage.src = film.images[0]?.src;
  filmImage.alt = film.name;
  if (film.prices && film.prices.price) {
    const majorUnitsPrice = parseFloat(film.prices.price) / 100;
    filmPrice.textContent = `${majorUnitsPrice.toFixed(0)} ,-`;
  } else {
    filmPrice.textContent = "Price not available";
  }
  filmDescription.innerHTML = film.description || "Description not available";

  filmDetailsContainer.innerHTML = "";

  filmDetailsContainer.appendChild(filmTitle);
  filmDetailsContainer.appendChild(filmImage);
  filmDetailsContainer.appendChild(filmPrice);
  filmDetailsContainer.appendChild(filmDescription);
}
