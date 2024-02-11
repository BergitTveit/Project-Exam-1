import { imageUrlByName, sendContactForm } from "./api.js";
import {
  validateTextField,
  // validateEmail,
  // validatePhoneNumber,
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

    const formData = new FormData(contactForm);

    sendContactForm(formData);
  });

  const firstNameInput = createInput(
    "text",
    "Enter your first name",
    "firstName",
    5
  );
  const lastNameInput = createInput(
    "text",
    "Enter your last name",
    "lastName",
    5
  );
  const emailInput = createInput("email", "Enter your email", "email");
  // const phoneNuImput = createInput("tel", "00000000", "phonenumber", true);

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
    "Date of the big day."
  );

  const alterationOption = createSelect(
    [
      "-- select alteration --",
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
  const subjectInput = createInput("text", "Short description", "subject", 15);
  const messageTextarea = document.createElement("textarea");
  messageTextarea.id = "message";
  messageTextarea.rows = "7";

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
  // contactForm.appendChild(phoneNuImput);
  // contactForm.appendChild(createLineBreak());
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

function createInput(type, placeholder, id, minLength) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.id = id;
  input.addEventListener("input", function () {
    validateTextField(id, minLength);
  });

  return input;
}

// function createPhoneInput (){}

// Creates and filters the option of requests
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

function createDateInput(id, placeholder) {
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = id;
  dateInput.style.display = "none";
  dateInput.placeholder = placeholder || "Date of the big day";

  dateInput.addEventListener("change", function () {
    validateDateofWedding(id);
  });
  return dateInput;
}

function createSelect(options, id) {
  const select = document.createElement("select");
  select.id = id;
  console.log("log 1", id);
  select.style.display = "none";

  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;

    select.appendChild(option);
  });

  return select;
}

displayContactForm();
// ASK MILENA // disableFirstSelectOption(id);
// function disableFirstSelectOption(selectId) {
//   console.log("log 2", selectId);
//   console.log("log 3", typeof selectId);
//   let selectDropdown = document.getElementById(selectId);

//   console.log("log 4", selectDropdown);
//   let selectionOptions = selectDropdown.getElementsByTagName("option");
//   selectionOptions[0].disabled = true;
// }

// function sendContactForm() {
//   // Make this, how to send it to the api? Can i solve this?
// }
