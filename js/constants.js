const apiurl = "http://assets.lykkeogliten.no/wp-json/wp/v2/";
const wpPostUrl = "posts/?_embed&per_page=20";
const wpImgUrl = "pages/?_embed";

export const url = new URL(wpPostUrl, apiurl);

export const imgUrl = new URL(wpImgUrl, apiurl);
