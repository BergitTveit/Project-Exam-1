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

export function validatePhone(phoneNumberId) {
  let phoneValue = document.getElementById(phoneNumberId).value;
  let phoneRegex = /^(9|4)\d{7}$/;
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
  console.log("Selected Date:", selectedDate);
  console.log("Minimum Date:", minDate);
  if (selectedDate < minDate) {
    console.log("Invalid Date");
    alert("Online requests must be made three weeks before, if not call.");

    return false;
  } else {
    console.log("Valid Date");
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
