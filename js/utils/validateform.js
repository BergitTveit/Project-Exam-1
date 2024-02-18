import {
  firstNameVal,
  lastNameVal,
  emailVal,
  phoneVal,
  subjectVal,
  dateOfWeddingVal,
} from "../components/contact_form_values.js";

export function validateTextField(fieldId, minLength) {
  const inputField = document.getElementById(fieldId);
  let fieldValue = inputField.value.trim();

  if (fieldValue.length < minLength) {
    changeColorIfNotValid(inputField);
    return false;
  }
  inputField.style.color = "black";
  return true;
}

export function validateEmail(emailId) {
  let emailElement = document.getElementById(emailId);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailElement.value)) {
    changeColorIfNotValid(emailElement);
    return false;
  }
  emailElement.style.color = "black";
  return true;
}

export function validatePhone(phoneNumberId) {
  const phoneElement = document.getElementById(phoneNumberId);
  let phoneRegex = /^(9|4)\d{7}$/;
  if (!phoneRegex.test(phoneElement.value)) {
    changeColorIfNotValid(phoneElement);

    return false;
  }

  phoneElement.style.color = "black";
  return true;
}

export function validateDateOfWedding(DOWId) {
  let dateElement = document.getElementById(DOWId);
  let dateValue = dateElement.value;
  let selectedDate = new Date(dateValue);
  let todayDate = Date.now();
  let minDate = new Date(todayDate + 3 * 7 * 24 * 60 * 60 * 1000);
  if (!isNaN(selectedDate) && selectedDate < minDate) {
    dateElement.style.color = "red";
    return false;
  } else {
    dateElement.style.color = "black";
    return true;
  }
}

export function getValidationMessage() {
  let message = "";
  if (!validateTextField(firstNameVal.id, firstNameVal.maxLength)) {
    message += "Name field must contain at least 5 characters\n";
  }
  if (!validateTextField(lastNameVal.id, lastNameVal.maxLength)) {
    message += "Last name field must contain at least 5 characters\n";
  }
  if (!validateEmail(emailVal.id)) {
    message += "Email has wrong format\n";
  }
  if (!validatePhone(phoneVal.id)) {
    message += "Phone number has wrong format\n";
  }
  if (!validateDateOfWedding(dateOfWeddingVal.id)) {
    message +=
      "Online requests must be made three weeks before; if not, please call.\n";
  }
  if (!validateTextField(subjectVal.id, subjectVal.maxLength)) {
    message += "Subject field must contain at least 5 characters\n";
  }

  return message;
}

function changeColorIfNotValid(element) {
  if (element.value.trim().length !== 0) {
    element.style.color = "red";
  } else {
    element.style.color = "black";
  }
}
