import { mediaUrl, commentsUrl } from "../utils/constants.js";

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
