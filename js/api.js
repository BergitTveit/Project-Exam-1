import { url } from "js/constants.js";

export async function fetchAllPosts() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const getResults = await response.json();

    return getResults;
  } catch (error) {
    console.error("Error fetching posts:", error);

    throw error;
  }
}

export async function fetchPostById(postId) {
  try {
    const postUrl = new URL(`${url}/${postId}`);

    const response = await fetch(postUrl.toString());

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post details. Status: ${response.status}`
      );
    }

    const post = await response.json();

    return post;
  } catch (error) {
    console.error("Error fetching film by ID:", error);
    throw error;
  }
}

/* 
export async function fetchPostsSortedByRaiting(amount) {
  let films = await fetchAllFilms();
  films.sort(
    (film1, film2) =>
      parseInt(film2.average_rating) - parseInt(film1.average_rating)
  );

  return films.slice(0, amount);
} */
//----------------------------------------------------------------------------------------------
function getDatePosted(post) {
  const releasedAttribute = post.attributes.find(
    (attribute) => attribute.name === "released" //check this maybe it is found another place
  );

  const releasedTerm = releasedAttribute?.terms?.[0];

  return releasedTerm ? parseInt(releasedTerm.name, 10) : 0;
} // UPDATE THIS TO BE WHEN POST CREATED

export async function fetchPostsSortedByDate(amount) {
  try {
    let posts = await fetchAllPosts();

    posts.sort((post1, post2) => {
      const created1 = getDatePosted(post1);
      const created2 = getDatePosted(post2);
      return created2 - created1;
    });

    return posts.slice(0, amount);
  } catch (error) {
    console.error("Error fetching and sorting films:", error);
    throw error;
  }
} // double check sorting function
//.-----------------------------------------------------------------------------------------
//Can this be updated to filter something else. ??
//-------------------------------------------------------------------------------------
/* export async function fetchFilmsByGenre(genre) {
  const films = await fetchAllFilms();
  const filteredFilms = films.filter((film) => {
    return film.categories.some(
      (category) => category.name.toLowerCase() === genre.toLowerCase()
    );
  });

  return filteredFilms;
}
 */
