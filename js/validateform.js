export function validateTextField(fieldId, minLength) {
  const inputField = document.getElementById(fieldId);
  let fieldValue = inputField.value.trim();

  if (fieldValue === "" || fieldValue.length < minLength) {
    messageElement.textContent = `${fieldId} must be longer than ${minLength}`;
    inputField.parentNode.appendChild(messageElement);
    return false;
  } else {
    return true;
  }
}

export function validateEmail(emailId) {
  let emailValue = document.getElementById(emailId).value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert(`${emailId} not a valid email adresss.`);
    return false;
  } else {
    return true;
  }
}

export function validatePhoneNumber(phoneNumberId) {
  let phoneValue = document.getElementById(phoneNumberId).value;
  let phoneRegex = /^\d{8}$/;
  if (!phoneRegex.test(phoneValue)) {
    alert(`${phoneNumberId} not a valid phone number.`);
    return false;
  } else {
    return true;
  }
}

export function validateDateofWedding(DOWId) {
  let dateValue = document.getElementById(DOWId).value;
  let selectedDate = new Date(dateValue);
  let todayDate = Date.now();
  let minDate = new Date(todayDate + 3 * 7 * 24 * 60 * 60 * 1000);

  if (selectedDate < minDate) {
    alert("Online requests must be made three weeks before, if not call.");
    //  (INSERT TEXT OR CALL FUNCTION???)
    return false;
  } else {
    return true;
  }
}

// export function validateContactForm() {
//   if (!validateTextField("firstName", 5)) {
//     return false;
//   }

//   if (!validateTextField("lastName", 5)) {
//     return false;
//   }
//   if (!validateTextField("subject", 15)) {
//     return false;
//   }
//   if (!validateTextField("message", 25)) {
//     return false;
//   }
//   if (!validateEmail("email")) {
//     return false;
//   }
//   if (!validatePhoneNumber("phonenumber")) {
//     return false;
//   }
//   if (!validateDateofWedding("dateOfWedding")) {
//     return false;
//   }
//   return true;
// }

// validateContactForm();
