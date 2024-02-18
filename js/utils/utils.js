import {
  validateTextField,
  validateEmail,
  validatePhone,
  validateDateOfWedding,
} from "../utils/validateform.js";

export function createElement(tag, options) {
  const element = document.createElement(tag);

  Object.assign(element, options);
  return element;
}
export function createLineBreak() {
  return document.createElement("br");
}

export function createInput(inputVal) {
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

export function createEmailInput(emailVal) {
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

export function createPhoneInput(phoneVal) {
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

export function createRadio(name, id, value, label) {
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

export function createDateInput(name, id, placeholder) {
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

export function createSelect(name, options, id) {
  const select = document.createElement("select");
  select.name = name;
  select.id = id;
  select.style.display = "none";

  options.forEach((optionText, index) => {
    const option = document.createElement("option");
    select.appendChild(option);
    option.value = optionText;
    option.text = optionText;
  });

  return select;
}

export function getSelectedCategory(dropdownName) {
  const categoryElement = document.getElementById(dropdownName + "Select");

  return categoryElement.options[categoryElement.selectedIndex].label;
}
