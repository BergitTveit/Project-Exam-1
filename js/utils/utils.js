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
  input.name = inputVal.name;
  input.type = inputVal.type;
  input.placeholder = inputVal.placeholder;
  input.id = inputVal.id;
  input.addEventListener("input", function () {
    validateTextField(inputVal.id, inputVal.maxLength);
  });

  return input;
}

export function createEmailInput(emailVal) {
  const emailInput = document.createElement("input");
  emailInput.name = emailVal.name;
  emailInput.type = "email";
  emailInput.placeholder = emailVal.placeholder;
  emailInput.id = emailVal.id;
  emailInput.addEventListener("input", function () {
    validateEmail(emailVal.id);
  });
  return emailInput;
}

export function createPhoneInput(phoneVal) {
  const phoneInput = document.createElement("input");
  phoneInput.name = phoneVal.name;
  phoneInput.type = "tel";
  phoneInput.placeholder = phoneVal.placeholder;
  phoneInput.id = phoneVal.id;
  phoneInput.addEventListener("input", function () {
    validatePhone(phoneVal.id);
  });
  return phoneInput;
}

export function createRadio(radioValues) {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = radioValues.name;
  radio.id = radioValues.id;
  radio.value = radioValues.value;

  const radioLabel = document.createTextNode(" " + radioValues.label);
  const container = document.createElement("label");
  container.appendChild(radio);
  container.appendChild(radioLabel);

  return container;
}

export function createDateInput(dateInputValues) {
  const dateInput = document.createElement("input");
  dateInput.name = dateInputValues.name;
  dateInput.type = "date";
  dateInput.id = dateInputValues.id;
  dateInput.style.display = "none";
  dateInput.placeholder = dateInputValues.placeholder || "Date of the big day";

  dateInput.addEventListener("change", function () {
    validateDateOfWedding(dateInputValues.id);
  });

  return dateInput;
}

export function createSelect(selectValues) {
  const { name, options, id } = selectValues;

  const select = document.createElement("select");
  select.name = name;
  select.id = id;
  select.style.display = "none";

  options.forEach((optionText) => {
    const option = document.createElement("option");
    select.appendChild(option);
    option.value = optionText;
    option.text = optionText;
  });

  return select;
}

export function createMessageTextArea(messageVal) {
  const messageArea = document.createElement("textarea");
  messageArea.name = messageVal.name;
  messageArea.placeholder = messageVal.placeholder;
  messageArea.id = messageVal.id;
  messageArea.addEventListener("input", function () {
    validateTextField(messageVal.id, messageVal.maxLength);
  });
  messageArea.style.width = "400px";
  messageArea.style.height = "100px";

  return messageArea;
}

export function getSelectedCategory(dropdownName) {
  const categoryElement = document.getElementById(dropdownName + "Select");

  return categoryElement.options[categoryElement.selectedIndex].label;
}
