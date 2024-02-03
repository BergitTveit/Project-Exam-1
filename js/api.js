import { url } from "./constants.js";

export async function fetchAllPosts() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const wpData = await response.json();
    console.log("LOG WPDATA", wpData);
    const postsData = wpData.map((properties) => ({
      id: properties.id,
      title: properties.title.rendered,
      content: properties.content.rendered,
      img: properties._embedded["wp:featuredmedia"]
        ? properties._embedded["wp:featuredmedia"][0].source_url
        : null,
      altTxt: properties._embedded["wp:featuredmedia"]
        ? properties._embedded["wp:featuredmedia"][0].alt_text
        : null,
      date: properties.date,
      description: properties.excerpt.rendered,
      categories: properties.categories,
    }));
    // FILTER POSTS THAT DOESNT CONTAIN properties._embedded["wp:featuredmedia"]:  .filter((post) => post.img !== null && post.altTxt !== null);
    return await postsData;
  } catch (error) {
    console.error("Error fetching posts:", error);

    throw error;
  }
}

export async function fetchPostById(postId) {
  try {
    const posts = await fetchAllPosts();
    posts.forEach((element) => {});
    const p = posts.find((prop) => prop.id === Number(postId));
    console.log(p);

    return p;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
}

export async function fetchPostsSortedByDate(amount) {
  try {
    let posts = await fetchAllPosts();

    posts.sort((post1, post2) => {
      return post2.date - post1.date;
    });

    return posts.slice(0, amount);
  } catch (error) {
    console.error("Error fetching and sorting posts:", error);
    throw error;
  }
}

//.-----------------------------------------------------------------------------------------
//Can this be updated to instead of genre, but fetch different ALTERATIONS/ WHAT WE OFFER
//-------------------------------------------------------------------------------------
/* export async function fetchpostsByGenre(genre) {
  const posts = await fetchAllposts();
  const filteredposts = posts.filter((post) => {
    return post.categories.some(
      (category) => category.name.toLowerCase() === genre.toLowerCase()
    );
  });

  return filteredposts;
}
 */
