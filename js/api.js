import { url, imgUrl } from "./constants.js";

export async function fetchAllPosts() {
  try {
    const response = await fetch(url);
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const wpData = await response.json();
    // console.log("LOG WPDATA", wpData);
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
    // console.log(p);

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

export async function fetchpostsByCategory(targetCategory) {
  const posts = await fetchAllPosts();
  const filteredposts = posts.filter((post) => {
    return (
      post.categories &&
      post.categories.some(
        (category) =>
          category &&
          category.name &&
          category.name.toLowerCase() === targetCategory.toLowerCase()
      )
    );
  });
  // console.log(filteredposts);
  return filteredposts;
}
fetchpostsByCategory("Bridal");
// Add it to the corect place. in html/class/ functions etc

//-------------------------------------------------------------------------------------------------------//

// Slider images call

export async function fetchAllImgs() {
  try {
    const response = await fetch(imgUrl);
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const wpData = await response.json();
    console.log("LOG WPDATA", wpData);
    const pagesData = wpData.map((properties) => ({
      id: properties.id,
      images: extractImageSources(properties.content.rendered),
    }));

    console.log(pagesData);
    return await pagesData;
  } catch (error) {
    console.error("Error fetching posts:", error);

    throw error;
  }
}

function extractImageSources(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const images = Array.from(doc.querySelectorAll("img"));
  return images.map((img) => img.src);
}

fetchAllImgs();

// export async function fetchPostById(postId) {
//   try {
//     const posts = await fetchAllPosts();
//     posts.forEach((element) => {});
//     const p = posts.find((prop) => prop.id === Number(postId));
//     // console.log(p);

//     return p;
//   } catch (error) {
//     console.error("Error fetching post by ID:", error);
//     throw error;
//   }
// }
