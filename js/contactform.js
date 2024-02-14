import { imageUrlByName, sendContactForm } from "./api.js";
import {
  validateTextField,
  validateEmail,
  validatePhone,
  validateDateofWedding,
} from "./validateform.js";

const imageUrl = await imageUrlByName("Contact_form");

export function displayContactForm() {
  const contactFormContainer = document.querySelector(".section-container");
  contactFormContainer.style.backgroundImage = `url("${imageUrl}")`;

  const formTitle = document.createElement("h1");
  formTitle.textContent = "Get in touch";

  const contactForm = document.createElement("form");
  contactForm.id = "contactForm";
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendContactForm(formData);
  });

  const firstNameInput = createInput(
    "firstName",
    "text",
    "Enter your first name",
    "firstName",
    5
  );
  const lastNameInput = createInput(
    "lastName",
    "text",
    "Enter your last name",
    "lastName",
    5
  );

  const emailInput = createEmailInput("email", "Enter your email", "email");

  const phoneNuInput = createPhoneInput(
    "phoneNumber",
    "Enter your phone number",
    "phoneNumber"
  );

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
  const subjectInput = createInput(
    "subject",
    "text",
    "Short description",
    "subject",
    15
  );

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

  contactFormContainer.appendChild(contactForm);
  contactForm.appendChild(formTitle);
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

function createInput(name, type, placeholder, id, minLength) {
  const input = document.createElement("input");
  input.name = name;
  input.type = type;
  input.placeholder = placeholder;
  input.id = id;
  input.addEventListener("input", function () {
    validateTextField(id, minLength);
  });

  return input;
}

function createEmailInput(name, placeholder, id) {
  const emailInput = document.createElement("input");
  emailInput.name = name;
  emailInput.type = "email";
  emailInput.placeholder = placeholder;
  emailInput.id = id;
  emailInput.addEventListener("input", function () {
    validateEmail(id);
  });
  return emailInput;
}

function createPhoneInput(name, placeholder, id) {
  const phoneInput = document.createElement("input");
  phoneInput.name = name;
  phoneInput.type = "tel";
  phoneInput.placeholder = placeholder;
  phoneInput.id = id;
  phoneInput.addEventListener("input", function () {
    validatePhone(id);
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
    validateDateofWedding(id);
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
