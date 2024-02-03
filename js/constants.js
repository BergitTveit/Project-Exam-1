const apiurl = "http://assets.lykkeogliten.no/";
const wpUrl = "wp-json/wp/v2/posts/?_embed";

export const url = new URL(wpUrl, apiurl);
