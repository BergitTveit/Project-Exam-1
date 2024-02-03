const apiurl = "http://assets.lykkeogliten.no/";
const wpUrl = "wp-json/wp/v2/posts/?_embed&per_page=20";

export const url = new URL(wpUrl, apiurl);
