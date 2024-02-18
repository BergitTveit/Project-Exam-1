const apiUrl = "https://assets.lykkeogliten.no/wp-json/";
const wpPostUrl = "wp/v2/posts/?_embed&per_page=20";
const wpMediaUrl = "wp/v2/media?per_page=100";
const CF7Url = "contact-form-7/v1/contact-forms/146/feedback";
const commentsWpUrl = "wp/v2/comments";

export const url = new URL(wpPostUrl, apiUrl);

export const mediaUrl = new URL(wpMediaUrl, apiUrl);

export const ContactFormUrl = new URL(CF7Url, apiUrl);

export const commentsUrl = new URL(commentsWpUrl, apiUrl);
