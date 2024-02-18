import { sendContactForm } from "../api/posting.js";
import { getValidationMessage } from "../utils/validateform.js";
import {
  createLineBreak,
  createInput,
  createEmailInput,
  createPhoneInput,
  createRadio,
  createDateInput,
  createSelect,
  createMessageTextArea,
} from "../utils/utils.js";
import {
  firstNameVal,
  lastNameVal,
  emailVal,
  phoneVal,
  bridalRadioVal,
  otherRadioVal,
  dateOfWeddingVal,
  alterationOptionValues,
  subjectVal,
  messageVal,
} from "../components/contact_form_values.js";

export function displayContactForm() {
  const contactFormContainer = document.querySelector(".section-container");

  const contactForm = document.createElement("form");
  contactForm.id = "contactForm";
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // sendContactForm(getValidationMessage());
    sendContactForm("");
  });

  const elements = getConfiguredContactFormElements();

  Object.values(elements).forEach((element) => {
    contactForm.appendChild(element);
    contactForm.appendChild(createLineBreak());
  });

  contactFormContainer.appendChild(contactForm);
}

function getConfiguredContactFormElements() {
  const elements = {
    firstName: createInput(firstNameVal),
    lastName: createInput(lastNameVal),
    email: createEmailInput(emailVal),
    phoneNu: createPhoneInput(phoneVal),
    bridalRadio: createRadio(bridalRadioVal),
    otherRadio: createRadio(otherRadioVal),
    dateOfWedding: createDateInput(dateOfWeddingVal),
    alterationOptions: createSelect(alterationOptionValues),
    messageLabel: document.createElement("span"),
    subjectInput: createInput(subjectVal),
    messageTextArea: createMessageTextArea(messageVal),
    sendContactFormButton: document.createElement("button"),
  };

  elements.bridalRadio.addEventListener("change", function () {
    elements.dateOfWedding.style.display = document.getElementById(
      "bridal_radio"
    ).checked
      ? "block"
      : "none";
    elements.alterationOptions.style.display = "none";
  });
  elements.otherRadio.addEventListener("change", function () {
    elements.alterationOptions.style.display = document.getElementById(
      "other_radio"
    ).checked
      ? "block"
      : "none";
    elements.dateOfWedding.style.display = "none";
  });
  elements.messageLabel.textContent = "What do you need help with?";
  elements.sendContactFormButton.type = "submit";
  elements.sendContactFormButton.textContent = "Send message";
  elements.sendContactFormButton.addEventListener("click", function (event) {
    event.preventDefault();
    // sendContactForm(getValidationMessage());
    sendContactForm("");
  });

  return elements;
}
