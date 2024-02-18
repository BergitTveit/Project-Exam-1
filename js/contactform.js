import { imageUrlByName, sendContactForm } from "./api.js";
import {
  validateTextField,
  validateEmail,
  validatePhone,
  validateDateOfWedding,
  getValidationMessage,
} from "./validateform.js";

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

const imageUrl = await imageUrlByName("Contact_form");

export function displayContactForm() {
  const contactFormContainer = document.querySelector(".section-container");
  // contactFormContainer.style.backgroundImage = `url("${imageUrl}")`;

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

// CREATES THE DIFFERENT INPUTS FOR THE FORM

function createLineBreak() {
  return document.createElement("br");
}

function createInput(inputVal) {
  const input = document.createElement("input");
  input.name = inputVal[0];
  input.type = inputVal[1];
  input.placeholder = inputVal[2];
  input.id = inputVal[3];
  input.addEventListener("input", function () {
    validateTextField(inputVal[3], inputVal[4]);
  });

  return input;
}

function createEmailInput(emailVal) {
  const emailInput = document.createElement("input");
  emailInput.name = emailVal[0];
  emailInput.type = "email";
  emailInput.placeholder = emailVal[1];
  emailInput.id = emailVal[2];
  emailInput.addEventListener("input", function () {
    validateEmail(emailVal[2]);
  });
  return emailInput;
}

function createPhoneInput(phoneVal) {
  const phoneInput = document.createElement("input");
  phoneInput.name = phoneVal[0];
  phoneInput.type = "tel";
  phoneInput.placeholder = phoneVal[1];
  phoneInput.id = phoneVal[2];
  phoneInput.addEventListener("input", function () {
    validatePhone(phoneVal[2]);
  });
  return phoneInput;
}

function createRadio(name, id, value, label) {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = name;
  radio.id = id;
  radio.value = value;

  const radioLabel = document.createTextNode(" " + label);
  const container = document.createElement("label");
  container.appendChild(radio);
  container.appendChild(radioLabel);

  return container;
}

function createDateInput(name, id, placeholder) {
  const dateInput = document.createElement("input");
  dateInput.name = name;
  dateInput.type = "date";
  dateInput.id = id;
  dateInput.style.display = "none";
  dateInput.placeholder = placeholder || "Date of the big day";

  dateInput.addEventListener("change", function () {
    validateDateOfWedding(id);
  });
  return dateInput;
}

function createSelect(name, options, id) {
  const select = document.createElement("select");
  select.name = name;
  select.id = id;
  console.log("log 1", id);
  select.style.display = "none";

  options.forEach((optionText, index) => {
    const option = document.createElement("option");
    select.appendChild(option);
    option.value = optionText;
    option.text = optionText;
  });

  return select;
}

displayContactForm();
