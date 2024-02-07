const apiUrl = "https://assets.lykkeogliten.no/wp-json/wp/v2/";
const wpPostUrl = "posts/?_embed&per_page=20";
const wpImgUrl = "pages/?_embed";
const wpMediaUrl = "media?per_page=100";

export const url = new URL(wpPostUrl, apiUrl);

export const imgUrl = new URL(wpImgUrl, apiUrl);

export const mediaUrl = new URL(wpMediaUrl, apiUrl);
