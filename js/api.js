import { url, mediaUrl, ContactFormUrl, commentsUrl } from "./constants.js";

// Get all Posts.
export async function fetchAllPosts() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const wpData = await response.json();

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
      categories: properties._embedded?.["wp:term"]?.[0]?.map(
        (category) => category.name
      ),
    }));
    console.log(postsData);
    return await postsData;
  } catch (error) {
    console.error("Error fetching posts:", error);

    throw error;
  }
}

//Get ID from single Post.
export async function fetchPostById(postId) {
  try {
    const posts = await fetchAllPosts();
    posts.forEach((element) => {});
    const p = posts.find((prop) => prop.id === Number(postId));

    return p;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
}

//Sort posts by date created.
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

// Get large images based on name, for easy maintenance of styling background images.

export async function imageUrlByName(imageName) {
  try {
    const response = await fetch(mediaUrl);

    if (!response.ok) {
      throw new Error(`Failed to images. Status: ${response.status}`);
    }

    const wpMedia = await response.json();

    const imageMatch = wpMedia.find(
      (properties) => properties.title.rendered === imageName
    );

    if (!imageMatch) {
      throw new Error(`Image with name "${imageName}" not found.`);
    }

    const imageUrl = imageMatch.media_details.sizes.full.source_url;

    return imageUrl;
  } catch (error) {
    console.error("Error fetching posts:", error);

    throw error;
  }
}

// Send Contact Form - Connect to API
export async function sendContactForm(invalidMessage) {
  if (invalidMessage.length === 0) {
    alert("CONTACT FORM SENT");
    // try {
    //   console.log(JSON.stringify(Object.fromEntries(formData)));
    //   formData.append(" _wpcf7_unit_tag", "randomTagName");
    //   const response = await fetch(ContactFormUrl.href, {
    //     method: "POST",

    //     body: formData,
    //   });
    //   console.log(response);
    //   if (!response.ok) {
    //     throw new Error("HTTP Error! Status: ${response.status}");
    //   }

    //   const data = await response.json();
    //   console.log("SUCCESS POST CONTACT FORM API ", data);
    // } catch (error) {
    //   console.error("ERROR;", error);
    // }
  } else {
    alert(invalidMessage);
  }
}

////////////////////////////////////////
export async function postComment(commentData) {
  try {
    const response = await fetch(commentsUrl, {
      method: "POST",
      body: commentData,
    });
    console.log("LOG RESPONSE PC:", response);
    if (!response.ok) {
      throw new Error("Could not create a comment. Status: ${response.status}");
    }
  } catch (error) {
    console.error("ERROR;", error);
  }
}
