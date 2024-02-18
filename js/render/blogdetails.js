export function displayPostDetails(post) {
  const postDetailsContainer = document.querySelector(".post-details");
  postDetailsContainer.classList.add("m-top", "m-bottom");

  const postContentContainer = document.createElement("div");
  postContentContainer.classList.add("frame");

  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title || "Untitled";

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-details-container");

  const contentElement = document.createElement("div");
  contentElement.innerHTML = post.content;

  if (post.img) {
    const imgElement = document.createElement("img");
    imgElement.src = post.img;
    imgElement.alt = post.altTxt;
    imgElement.classList.add("img-details", "img-details-position");
    imgContainer.appendChild(imgElement);

    imgElement.addEventListener("click", () =>
      openModal(post.img, post.altTxt)
    );
  }

  postDetailsContainer.innerHTML = "";

  postDetailsContainer.appendChild(postContentContainer);
  postContentContainer.appendChild(postTitle);
  postContentContainer.appendChild(imgContainer);
  postContentContainer.appendChild(contentElement);
}

function openModal(imgSrc, altTxt) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const modalImage = document.createElement("img");
  modalImage.classList.add("modal-img");
  modalImage.src = imgSrc;
  modalImage.alt = altTxt;

  const modalText = document.createElement("p");
  modalText.classList.add("modal-text");
  modalText.textContent = altTxt;

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "x";
  closeModalBtn.classList.add("close-button");
  closeModalBtn.addEventListener("click", () => closeModal(modalContainer));

  modalContainer.appendChild(modalImage);
  modalContainer.appendChild(modalText);
  modalContainer.appendChild(closeModalBtn);
  document.body.appendChild(modalContainer);
  document.addEventListener("click", clickOutsideModal);
}

function closeModal(modalContainer) {
  document.body.removeChild(modalContainer);
  document.removeEventListener("click", clickOutsideModal);
}

function clickOutsideModal(event) {
  const modalContainer = document.querySelector(".modal-container");

  if (
    !modalContainer.contains(event.target) &&
    event.target.tagName.toLowerCase() !== "img"
  ) {
    closeModal(modalContainer);
  }
}
