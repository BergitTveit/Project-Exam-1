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
    return fetchAllPosts().find((prop) => prop.id === postId);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
}

// export async function fetchPostById(postId) {
//   try {
//     const postUrl = new URL(`${url}/${postId}`);

//     console.log(postUrl);
//     postUrl.searchParams.append("_embed", "");
//     console.log(postUrl);
//     const response = await fetch(postUrl.toString());

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch post details. Status: ${response.status}`
//       );
//     }

//     const post = await response.json();

//     return post;
//   } catch (error) {
//     console.error("Error fetching post by ID:", error);
//     throw error;
//   }
// }

/*  UPDATE TO SORT BY DATE ////////////////////////////
export async function fetchPostsSortedByRaiting(amount) {
  let posts = await fetchAllposts();
  posts.sort(
    (post1, post2) =>
      parseInt(post2.average_rating) - parseInt(post1.average_rating)
  );

  return posts.slice(0, amount);
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
    console.error("Error fetching and sorting posts:", error);
    throw error;
  }
}

// double check sorting function
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
