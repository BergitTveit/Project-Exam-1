import {
  firstNameVal,
  lastNameVal,
  emailVal,
  phoneVal,
  subjectVal,
} from "../components/contactform.js";

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
  if (!validateTextField(firstNameVal[3], firstNameVal[4])) {
    message += "Name field must contain min 5 characters\n";
  }
  if (!validateTextField(lastNameVal[3], lastNameVal[4])) {
    message += "Last field must contain min 5 characters\n";
  }
  if (!validateEmail(emailVal[2])) {
    message += "Email has wrong format\n";
  }
  if (!validatePhone(phoneVal[2])) {
    message += "Phone number has wrong format\n";
  }
  if (!validateDateOfWedding("dateOfWedding")) {
    message +=
      "Online requests must be made three weeks before, if not call.\n";
  }
  if (!validateTextField(subjectVal[3], subjectVal[4])) {
    message += "Name field must contain min 5 characters\n";
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
