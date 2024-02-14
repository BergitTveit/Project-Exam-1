//Render post details for single post entered. //////////////////////////////////////
export function displayPostDetails(post) {
  const postDetailsContainer = document.querySelector(".post-details");
  postDetailsContainer.classList.add("m-top", "m-bottom");

  const postContentContainer = document.createElement("div");
  postContentContainer.classList.add("frame");

  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title || "Untitled";

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-details-container");

  if (post.img) {
    const imgElement = document.createElement("img");
    imgElement.src = post.img;
    imgElement.alt = post.altTxt;
    console.log(imgElement.alt);
    imgElement.classList.add("img-details", "img-details-position");

    imgElement.addEventListener("click", () =>
      openModal(post.img, post.altTxt)
    );

    imgContainer.appendChild(imgElement);
  }

  const contentElement = document.createElement("div");
  contentElement.innerHTML = post.content;

  postDetailsContainer.innerHTML = "";
  postDetailsContainer.appendChild(postContentContainer);
  postContentContainer.appendChild(postTitle);
  postContentContainer.appendChild(imgContainer);

  postContentContainer.appendChild(contentElement);
}

// Open Modal on detailspage. ////////////////////////////////////////
function openModal(imgSrc, altTxt) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalImage = document.createElement("img");
  modalImage.src = imgSrc;
  modalImage.alt = altTxt;
  console.log("MODALIMAGE", modalImage);

  const modalText = document.createElement("p");
  modalText.textContent = altTxt;

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "X";
  closeModalBtn.addEventListener("click", () => closeModal(modalContainer));

  modalContainer.appendChild(modalContent);
  modalContent.appendChild(modalImage);
  modalContent.appendChild(modalText);
  modalContent.appendChild(closeModalBtn);
  document.body.appendChild(modalContainer);

  document.addEventListener("click", clickOutsideModal);
}

// Close Modal on detailspage. ///////////////////////////////////////////////
function closeModal(modalContainer) {
  document.body.removeChild(modalContainer);
  document.removeEventListener("click", clickOutsideModal);
}

function clickOutsideModal(event) {
  const modalContent = document.querySelector(".modal-content");
  const modalContainer = document.querySelector(".modal-container");

  if (
    !modalContent.contains(event.target) &&
    event.target.tagName.toLowerCase() !== "img"
  ) {
    closeModal(modalContainer);
  }
}
