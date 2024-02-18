import { loadBlogPage } from "../pages/blog.js";
import { loadHomePage } from "../pages/home.js";
import { loadAboutPage } from "../pages/about.js";
import { loadContactPage } from "../pages/contact.js";
import { loadLocationPage } from "../pages/location.js";
import { loadPostPage } from "../pages/post.js";

export async function rout() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      loadHomePage();
      break;
    case "/bloglist/":
    case "/bloglist":
    case "/bloglist/index.html":
      loadBlogPage();
      break;
    case "/about/":
    case "/about":
    case "/about/index.html":
      loadAboutPage();
      break;
    case "/contact/":
    case "/contact":
    case "/contact/index.html":
      loadContactPage();
      break;
    case "/location/":
    case "/location":
    case "/location/index.html":
      loadLocationPage();
      break;
    case "/blogdetails/":
    case "/blogdetails":
    case "/blogdetails/index.html":
      loadPostPage();
      break;
    default:
      console.log("404 - not found");
  }
}
