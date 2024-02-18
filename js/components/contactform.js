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
} from "../utils/utils.js";

export const firstNameVal = [
  "firstName",
  "text",
  "Enter your first name",
  "firstName",
  5,
];
export const lastNameVal = [
  "lastName",
  "text",
  "Enter your last name",
  "lastName",
  5,
];
export const emailVal = ["email", "Enter your email", "email"];
export const phoneVal = [
  "phoneNumber",
  "Enter your phone number",
  "phoneNumber",
];
export const subjectVal = [
  "subject",
  "text",
  "Short description",
  "subject",
  15,
];

export function displayContactForm() {
  const contactFormContainer = document.querySelector(".section-container");

  const contactForm = document.createElement("form");
  contactForm.id = "contactForm";
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // const formData = new FormData(event.target);
    sendContactForm(getValidationMessage());
  });

  const firstNameInput = createInput(firstNameVal);
  const lastNameInput = createInput(lastNameVal);

  const emailInput = createEmailInput(emailVal);

  const phoneNuInput = createPhoneInput(phoneVal);

  const bridalRadio = createRadio(
    "enquiry",
    "bridal_radio",
    "wedding",
    "Bridal alterations"
  );

  const otherRadio = createRadio(
    "enquiry",
    "other_radio",
    "other",
    "Other enquiries"
  );

  const dateOfWedding = createDateInput(
    "dateOfWedding",
    "dateOfWedding",
    "Date of the big day."
  );

  const alterationOption = createSelect(
    "alteration",
    [
      "Suit",
      "Trousers",
      "Dress",
      "Outerwear",
      "Repairs",
      "Custom",
      "Other Requests",
    ],
    "alteration"
  );

  const messageLabel = document.createElement("span");
  messageLabel.textContent = "What do you need help with?";
  const subjectInput = createInput(subjectVal);

  const messageTextarea = document.createElement("textarea");
  messageTextarea.name = "message";
  messageTextarea.id = "message";

  bridalRadio.addEventListener("change", function () {
    dateOfWedding.style.display = document.getElementById("bridal_radio")
      .checked
      ? "block"
      : "none";
    alterationOption.style.display = "none";
  });
  otherRadio.addEventListener("change", function () {
    alterationOption.style.display = document.getElementById("other_radio")
      .checked
      ? "block"
      : "none";
    dateOfWedding.style.display = "none";
  });

  const sendContactFormButton = document.createElement("button");
  sendContactFormButton.type = "submit";
  sendContactFormButton.textContent = "Send message";
  sendContactFormButton.addEventListener("click", function (event) {
    event.preventDefault();

    sendContactForm(getValidationMessage());
  });

  contactFormContainer.appendChild(contactForm);

  contactForm.appendChild(firstNameInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(lastNameInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(emailInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(phoneNuInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(bridalRadio);
  contactForm.appendChild(otherRadio);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(dateOfWedding);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(alterationOption);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(messageLabel);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(subjectInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(messageTextarea);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(sendContactFormButton);
  contactForm.appendChild(createLineBreak());
}
