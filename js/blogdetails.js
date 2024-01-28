import { fetchFilmById } from "../api/api.js";
import { displayFilmDetails } from "../render/post.js";

export async function filmDetailPage() {
  const filmDetailsContainer = document.querySelector(".film-details");

  try {
    const url = new URL(location.href);
    const filmId = url.searchParams.get("id");

    if (filmId) {
      const film = await fetchFilmById(filmId);
      displayFilmDetails(film);
    } else {
      throw new Error("Film ID is undefined");
    }
  } catch (error) {
    console.error("Error fetching film details:", error);
    filmDetailsContainer.innerHTML = "Unable to fetch film details.";
  }
}

filmDetailPage();
