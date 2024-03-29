import { ContactFormUrl, mediaUrl, commentsUrl } from "../utils/constants.js";

export async function sendContactForm(invalidMessage) {
  if (invalidMessage.length === 0) {
    try {
      const formData = new FormData();

      formData.append("firstName", document.getElementById("firstName").value);
      formData.append("lastName", document.getElementById("lastName").value);
      formData.append("email", document.getElementById("email").value);
      formData.append(
        "phoneNumber",
        document.getElementById("phoneNumber").value
      );
      console.log(JSON.stringify(Object.fromEntries(formData)));
      formData.append(" _wpcf7_unit_tag", "randomTagName");
      const response = await fetch(ContactFormUrl.href, {
        method: "POST",

        body: formData,
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("HTTP Error! Status: ${response.status}");
      }

      const data = await response.json();
      console.log("SUCCESS POST CONTACT FORM API ", data);
    } catch (error) {
      console.error("ERROR;", error);
    }
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
